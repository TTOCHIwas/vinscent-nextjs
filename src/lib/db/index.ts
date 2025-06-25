import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import * as schema from './schema';

// MySQL 연결 설정
const connection = mysql.createPool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Drizzle ORM 인스턴스 생성
export const db = drizzle(connection, { schema, mode: 'default' });

// 연결 테스트 함수
export async function testConnection() {
  try {
    const [rows] = await connection.execute('SELECT 1 as test');
    console.log('✅ 데이터베이스 연결 성공:', rows);
    return true;
  } catch (error) {
    console.error('❌ 데이터베이스 연결 실패:', error);
    return false;
  }
}

export default db;