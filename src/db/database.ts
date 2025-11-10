import SQLite from "react-native-sqlite-storage";

SQLite.DEBUG(true);
SQLite.enablePromise(true);

const DB_NAME = "photos.db";
const DB_LOCATION = "default";

let dbInstance: SQLite.SQLiteDatabase | null = null;

export async function getDB(): Promise<SQLite.SQLiteDatabase> {
  if (dbInstance) return dbInstance;
  dbInstance = await SQLite.openDatabase({
    name: DB_NAME,
    location: DB_LOCATION,
  });
  await initializeTables(dbInstance);
  return dbInstance;
}

async function initializeTables(db: SQLite.SQLiteDatabase) {
  const createTableSql = `
    CREATE TABLE IF NOT EXISTS photos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      filename TEXT,
      filePath TEXT,
      mimeType TEXT,
      timestamp TEXT,
      status TEXT,
      retries INTEGER,
      location TEXT,
      serverId TEXT
    );
  `;
  await db.executeSql(createTableSql);
}

export async function closeDB() {
  if (dbInstance) {
    await dbInstance.close();
    dbInstance = null;
  }
}
