import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';

const dbDirectory = path.join(process.cwd(), 'src', 'database');
const dbPath = path.join(dbDirectory, 'mydatabase.db');

let dbInstance: Database.Database | null = null;

export function getDbConnection() {
  if (!dbInstance) {
    try {
      if (!fs.existsSync(dbDirectory)) {
        fs.mkdirSync(dbDirectory, { recursive: true });
      }

      dbInstance = new Database(dbPath, { /* verbose: console.log */ });
      console.log(`Successfully connected to SQLite database at: ${dbPath}`);
      dbInstance.pragma('foreign_keys = ON');

      const createTableStmt = dbInstance.prepare(`
        CREATE TABLE IF NOT EXISTS reports (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          title TEXT NOT NULL,
          disaster_category TEXT NOT NULL,
          location TEXT NOT NULL,
          description TEXT NOT NULL,
          author TEXT NOT NULL,
          documentation TEXT,
          created_at INTEGER NOT NULL,
          likes INTEGER DEFAULT 0 NOT NULL  -- TAMBAHKAN KOLOM INI
        );
      `);
      createTableStmt.run();
      console.log("Table 'reports' is ready (schema updated for likes).");
    } catch (error) {
      console.error(`Failed to connect/initialize SQLite at ${dbPath}:`, error);
      if (error instanceof Error) {
        console.error("Original error message:", error.message);
      }
      throw error;
    }
  }
  return dbInstance;
}

export function closeDbConnection() {
  if (dbInstance) {
    dbInstance.close();
    dbInstance = null;
    console.log('SQLite database connection closed.');
  }
}

const cleanup = () => {
  closeDbConnection();
  process.exit(0);
};
process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);