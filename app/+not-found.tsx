import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useTheme } from '@/contexts/ThemeContext';
import { Chrome as Home, ArrowLeft } from 'lucide-react-native';

export default function NotFoundScreen() {
  const { colors } = useTheme();
  const router = useRouter();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 24,
    },
    title: {
      fontSize: 64,
      fontFamily: 'Inter-Bold',
      color: colors.primary,
      marginBottom: 16,
    },
    subtitle: {
      fontSize: 24,
      fontFamily: 'Inter-SemiBold',
      color: colors.text,
      marginBottom: 8,
      textAlign: 'center',
    },
    description: {
      fontSize: 16,
      fontFamily: 'Inter-Regular',
      color: colors.textSecondary,
      textAlign: 'center',
      lineHeight: 24,
      marginBottom: 32,
    },
    button: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.primary,
      paddingHorizontal: 24,
      paddingVertical: 16,
      borderRadius: 12,
      gap: 8,
    },
    buttonText: {
      color: '#FFFFFF',
      fontSize: 16,
      fontFamily: 'Inter-SemiBold',
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>404</Text>
      <Text style={styles.subtitle}>Page introuvable</Text>
      <Text style={styles.description}>
        La page que vous recherchez n'existe pas ou a été déplacée.
      </Text>
      <TouchableOpacity 
        style={styles.button}
        onPress={() => router.replace('/(tabs)')}
      >
        <Home size={20} color="#FFFFFF" />
        <Text style={styles.buttonText}>Retour à l'accueil</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}