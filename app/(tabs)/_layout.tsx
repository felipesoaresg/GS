import Category from '@/components/Category';
import { Tabs } from 'expo-router';
import React from 'react';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}
      tabBar={() => <Category />}
    >
      <Tabs.Screen name="index" options={{ title: "Home" }} />
      <Tabs.Screen name="lembretes" options={{ title: "Calendário" }} />
      <Tabs.Screen name="tarefas" options={{ title: "Lista" }} />
      <Tabs.Screen name="metas" options={{ title: "Metas" }} />
      <Tabs.Screen name="relogio" options={{ title: "Relógio" }} />
    </Tabs>
  );
}
