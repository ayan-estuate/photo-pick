// src/services/storageService.ts
import * as FileSystem from 'expo-file-system/legacy'

/** Directory to store photos */
export const PHOTOS_DIR = FileSystem.documentDirectory + 'photos/'

/** Type for saved photo metadata */
export interface SavedPhoto {
  filePath: string
  filename: string
}

/**
 * Ensure 'photos' directory exists
 */
export async function ensureDirExists(): Promise<void> {
  try {
    const info = await FileSystem.getInfoAsync(PHOTOS_DIR)
    if (!info.exists) {
      await FileSystem.makeDirectoryAsync(PHOTOS_DIR, { intermediates: true })
    }
  } catch (e) {
    console.warn('Error ensuring directory exists', e)
  }
}

/**
 * Save a photo from camera/gallery to app folder
 * @param uri URI returned by image picker
 * @param filename Desired filename
 */
export async function savePhoto(uri: string, filename: string): Promise<SavedPhoto> {
  await ensureDirExists()
  const dest = PHOTOS_DIR + filename

  try {
    await FileSystem.copyAsync({ from: uri, to: dest })
    return { filePath: dest, filename }
  } catch (e) {
    console.warn('Copy failed, fallback to downloadAsync', e)
    const res = await FileSystem.downloadAsync(uri, dest)
    return { filePath: res.uri, filename }
  }
}

/**
 * Get file URI for Image component
 */
export async function readFileUri(filePath: string): Promise<string> {
  return filePath
}

/**
 * Delete a photo file
 * @param filePath Local file path
 */
export async function deletePhotoFile(filePath: string): Promise<void> {
  try {
    await FileSystem.deleteAsync(filePath, { idempotent: true })
  } catch (e) {
    console.warn('delete file error', e)
  }
}
