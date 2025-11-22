import { Feather } from '@expo/vector-icons';
import { Link, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

const Category = () => {
  const { id } = useLocalSearchParams<{ id: string }>();

  return (
    <View style={styles.wrapper}>
      <View style={styles.categories}>
        <Link href={{ pathname: '/home', params: { id } }} asChild>
          <TouchableOpacity style={styles.categoryItem}>
            <Feather name="home" size={24} color="#111827" />
          </TouchableOpacity>
        </Link>

        <Link href={{ pathname: '/lembrete', params: { id } }} asChild>
          <TouchableOpacity style={styles.categoryItem}>
            <Feather name="calendar" size={24} color="#111827" />
          </TouchableOpacity>
        </Link>

        <Link href={{ pathname: '/metas', params: { id } }} asChild>
          <TouchableOpacity style={styles.categoryItem}>
            <Feather name="book" size={24} color="#111827" />
          </TouchableOpacity>
        </Link>

        <Link href={{ pathname: '/tarefas', params: { id } }} asChild>
          <TouchableOpacity style={styles.categoryItem}>
            <Feather name="list" size={24} color="#111827" />
          </TouchableOpacity>
        </Link>

        <Link href={{ pathname: '/timer', params: { id } }} asChild>
          <TouchableOpacity style={styles.categoryItem}>
            <Feather name="clock" size={24} color="#111827" />
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
};

export default Category;

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  categories: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#A7C7E7',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#B5EAD7',
    width: '90%',
  },
  categoryItem: {
    alignItems: 'center',
    padding: 6,
  },
});
