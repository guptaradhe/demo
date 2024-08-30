import mysql from "mysql2/promise";

let dbconnection;

export async function connectDB() {
  if (!dbconnection) {
    dbconnection = await mysql.createPool({
      host: process.env.MYSQL_HOST,
      port: process.env.MYSQL_PORT,
      database: process.env.MYSQL_DATABASE,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      connectionLimit: 10,
    });

    console.log("Database connected");
  }
}

export async function disconnectDB() {
  if (dbconnection) {
    await dbconnection.end();
    console.log("Database connection closed");
    dbconnection = null;
  }
}

export function getConnection() {
  return dbconnection;
}

export async function query({ query, values = [] }) {
  const connection = await dbconnection.getConnection();

  try {
    const [results] = await connection.execute(query, values);
    return results;
  } catch (error) {
    throw Error(error.message);
  } finally {
    connection.release();
    console.log("Connection %d released", connection.threadId);
  }
}
