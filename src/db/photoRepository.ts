import { Photo } from "../types/photo";
import { getDB } from "./database";

export async function insertPhoto(photo: Photo): Promise<number> {
  const db = await getDB();
  const res = await db.executeSql(
    `INSERT INTO photos (filename, filePath, mimeType, timestamp, status, retries, location, serverId) VALUES (?, ?, ?, ?, ?, ?, ?, ?);`,
    [
      photo.filename,
      photo.filePath,
      photo.mimeType,
      photo.timestamp,
      photo.status,
      photo.retries,
      photo.location ?? null,
      photo.serverId ?? null,
    ]
  );
  const insertId = res[0].insertId ?? -1;
  return Number(insertId);
}

export async function updatePhotoStatus(
  id: number,
  status: string,
  serverId?: string | null,
  retries?: number
) {
  const db = await getDB();
  await db.executeSql(
    `UPDATE photos SET status = ?, serverId = ?, retries = ? WHERE id = ?;`,
    [status, serverId ?? null, retries ?? 0, id]
  );
}
export async function getPhotoById(id: number): Promise<Photo | null> {
  const db = await getDB();
  const results = await db.executeSql('SELECT * FROM photos WHERE id = ?', [id]);
  const rows = results[0].rows;
  if (rows.length > 0) return rows.item(0) as Photo;
  return null;
}

export async function fetchAllPhotos(): Promise<Photo[]> {
  const db = await getDB();
  const res = await db.executeSql(`SELECT * FROM photos ORDER BY id DESC;`);
  const rows = res[0].rows;
  const result: Photo[] = [];
  for (let i = 0; i < rows.length; i++) {
    result.push(rows.item(i));
  }
  return result;
}

export async function fetchPendingPhotos(): Promise<Photo[]> {
  const db = await getDB();
  const res = await db.executeSql(
    `SELECT * FROM photos WHERE status = ? ORDER BY id ASC;`,
    ["pending"]
  );
  const rows = res[0].rows;
  const result: Photo[] = [];
  for (let i = 0; i < rows.length; i++) {
    result.push(rows.item(i));
  }
  return result;
}

export async function deletePhotoById(id: number) {
  const db = await getDB();
  await db.executeSql(`DELETE FROM photos WHERE id = ?;`, [id]);
}
