import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { PhotoStatus } from '../types/photo';

export default function UploadStatusBadge({ status }: { status: PhotoStatus }) {
  let bg = '#FFC107';
  let text = 'Pending';
  if (status === 'uploaded') {
    bg = '#4CAF50';
    text = 'Uploaded';
  } else if (status === 'failed') {
    bg = '#F44336';
    text = 'Failed';
  }
  return (
    <View style={[styles.badge, { backgroundColor: bg }]}>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: { paddingVertical: 4, paddingHorizontal: 8, borderRadius: 12 },
  text: { color: '#fff', fontWeight: '600', fontSize: 12 }
});
