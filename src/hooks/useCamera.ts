import { launchCamera, launchImageLibrary, CameraOptions } from 'react-native-image-picker';

export async function openCamera() {
  const options: CameraOptions = { mediaType: 'photo', quality: 0.8, saveToPhotos: false };
  const res = await launchCamera(options);
  return res;
}

export async function openGallery() {
  const res = await launchImageLibrary({ mediaType: 'photo', quality: 0.8 });
  return res;
}
