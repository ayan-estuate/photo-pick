// app/capture/index.tsx
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Asset, CameraOptions, launchCamera } from "react-native-image-picker";
import { insertPhoto } from "../../src/db/photoRepository";
import { savePhoto } from "../../src/services/storageService";
import { Photo } from "../../src/types/photo";

export default function CaptureScreen() {
  const [busy, setBusy] = useState(false);
  const router = useRouter(); // ✅ instead of navigation.navigate()

  const handleCapture = async () => {
    const options: CameraOptions = {
      mediaType: "photo",
      saveToPhotos: false,
      quality: 0.8,
    };

    setBusy(true);
    try {
      const result = await launchCamera(options);

      if (result.didCancel) {
        setBusy(false);
        return;
      }

      const asset: Asset | undefined = result.assets?.[0];
      if (!asset?.uri) {
        setBusy(false);
        return;
      }

      // Save file locally (your own helper function)
      const saved = await savePhoto(
        asset.uri,
        asset.fileName ?? `photo-${Date.now()}.jpg`
      );

      const photo: Photo = {
        filename: saved.filename,
        filePath: saved.filePath,
        mimeType: asset.type ?? "image/jpeg",
        timestamp: new Date().toISOString(),
        status: "pending",
        retries: 0,
      };

      const id = await insertPhoto(photo);
      setBusy(false);

      // ✅ Navigate using expo-router
      router.push(`/preview/[id]?id=${id}`); // Navigate to preview screen with id parameter
    } catch (e) {
      console.error("Capture error", e);
      setBusy(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.info}>Tap below to open camera</Text>

      <TouchableOpacity
        style={styles.captureBtn}
        onPress={handleCapture}
        disabled={busy}
      >
        {busy ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.captureText}>Open Camera</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  info: { marginBottom: 20, fontSize: 16 },
  captureBtn: { backgroundColor: "#388E3C", padding: 14, borderRadius: 8 },
  captureText: { color: "#fff", fontSize: 16, fontWeight: "600" },
});
