// Placeholder: since this is standalone offline-only, we provide simple retry logic scaffold.
// If later you add a backend you can implement upload via axios here.

import { fetchPendingPhotos, updatePhotoStatus } from '../db/photoRepository';
import { Photo } from '../types/photo';

const MAX_RETRIES = 5;

export async function attemptSyncAll(dummyUploadFn?: (p: Photo) => Promise<{ serverId?: string }>) {
  const pending = await fetchPendingPhotos();
  for (const p of pending) {
    try {
      if (!dummyUploadFn) {
        // No backend configured. Mark as failed after 0 attempts (or leave pending).
        // We'll leave as pending for manual action.
        continue;
      }
      const res = await dummyUploadFn(p);
      if (res?.serverId) {
        await updatePhotoStatus(Number(p.id), 'uploaded', res.serverId, p.retries);
      } else {
        const newRetries = (p.retries ?? 0) + 1;
        if (newRetries >= MAX_RETRIES) {
          await updatePhotoStatus(Number(p.id), 'failed', null, newRetries);
        } else {
          await updatePhotoStatus(Number(p.id), 'pending', null, newRetries);
        }
      }
    } catch (e) {
      const newRetries = (p.retries ?? 0) + 1;
      if (newRetries >= MAX_RETRIES) {
        await updatePhotoStatus(Number(p.id), 'failed', null, newRetries);
      } else {
        await updatePhotoStatus(Number(p.id), 'pending', null, newRetries);
      }
    }
  }
}
