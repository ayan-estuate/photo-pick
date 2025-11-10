// app/index.tsx
import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import PhotoCard from "../src/components/PhotoCard";
import { usePhotos } from "../src/hooks/usePhotos";

export default function HomeScreen() {
  const router = useRouter();
  const { photos, loadPhotos } = usePhotos();

  useEffect(() => {
    loadPhotos();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/capture")}
        >
          <Text style={styles.buttonText}>Capture</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/gallery")}
        >
          <Text style={styles.buttonText}>Gallery</Text>
        </TouchableOpacity>
      </View>

      {photos.length === 0 ? (
        <View style={styles.empty}>
          <Text>No photos yet. Tap Capture to take a photo.</Text>
        </View>
      ) : (
        <FlatList
          data={photos}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => <PhotoCard photo={item} />}
          contentContainerStyle={styles.list}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 12 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  button: { backgroundColor: "#1976D2", padding: 10, borderRadius: 6 },
  buttonText: { color: "#fff", fontWeight: "600" },
  empty: { flex: 1, alignItems: "center", justifyContent: "center" },
  list: { paddingBottom: 24 },
});
