import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

const BackButton = () => {
  const router = useRouter();

  return (
    <View style={styles.header}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <View style={styles.backCircle}>
          <Feather name="arrow-left" size={20} color="#111827" />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default BackButton;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#A7C7E7',
    marginBottom: 1,
  },
  backButton: {
    marginLeft: 4,
  },
  backCircle: {
    backgroundColor: '#B5EAD7',
    borderRadius: 20,
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
