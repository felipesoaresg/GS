import { Feather } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

const BackButton = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id?: string }>();

  const handleBack = () => {
    router.push({ pathname: "/home", params: id ? { id } : {} });
  };

  return (
    <View style={styles.header}>
      <TouchableOpacity style={styles.backButton} onPress={handleBack}>
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
    backgroundColor: '#A7C7E7',
    padding: 5,
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 12,
    borderBottomColor: '#A7C7E7',
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
