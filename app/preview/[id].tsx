// app/preview/[id].tsx
import React, { useEffect, useState } from "react";
import { View, Image, StyleSheet, ActivityIndicator, Text } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { getPhotoById } from "../../src/db/photoRepository";
import { Photo } from "../../src/types/photo";

export default function PhotoPreviewScreen() {
  const { id } = useLocalSearchParams();
  const [photo, setPhoto] = useState<Photo | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (id) {
      getPhotoById(Number(id)).then(setPhoto);
    }
  }, [id]);

  if (!photo) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text>Loading photo...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image source={{ uri: photo.filePath }} style={styles.image} resizeMode="contain" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000", justifyContent: "center", alignItems: "center" },
  image: { width: "100%", height: "100%" },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
});
