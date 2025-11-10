import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Photo } from '../types/photo';
import { readFileUri } from '../services/storageService';
import UploadStatusBadge from './UploadStatusBadge';

export default function PhotoCard({ photo }: { photo: Photo }) {
  const uri = readFileUri(photo.filePath);

  return (
    <View style={styles.card}>
      <Image source={{ uri: photo.filePath }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.filename}>{photo.filename}</Text>
        <Text style={styles.timestamp}>{new Date(photo.timestamp).toLocaleString()}</Text>
      </View>
      <UploadStatusBadge status={photo.status} />
    </View>
  );
}

const styles = StyleSheet.create({
  card: { flexDirection: 'row', alignItems: 'center', marginBottom: 12, backgroundColor: '#fff', padding: 8, borderRadius: 8, elevation: 2 },
  image: { width: 80, height: 80, borderRadius: 6, marginRight: 12 },
  info: { flex: 1 },
  filename: { fontWeight: '600' },
  timestamp: { color: '#666', marginTop: 6, fontSize: 12 }
});
