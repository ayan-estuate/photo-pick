import React, { useEffect } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import PhotoCard from "../../src/components/PhotoCard";
import { usePhotos } from "../../src/hooks/usePhotos";

export default function GalleryScreen() {
  const { photos, loadPhotos } = usePhotos();

  useEffect(() => {
    loadPhotos();
  }, []);

  return (
    <View style={styles.container}>
      {photos.length === 0 ? (
        <View style={styles.empty}>
          <Text>No photos available.</Text>
        </View>
      ) : (
        <FlatList
          data={photos}
          keyExtractor={(i) => String(i.id)}
          renderItem={({ item }) => <PhotoCard photo={item} />}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 12 },
  empty: { flex: 1, alignItems: "center", justifyContent: "center" },
});
