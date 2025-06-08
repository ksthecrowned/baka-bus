import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { useTheme } from '@/contexts/ThemeContext';
import { ChevronRight } from 'lucide-react-native';

export default function OnboardingWelcome() {
  const { colors } = useTheme();
  const router = useRouter();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    content: {
      flex: 1,
      paddingHorizontal: 24,
      justifyContent: 'center',
      alignItems: 'center',
    },
    heroImage: {
      width: 280,
      height: 200,
      borderRadius: 16,
      marginBottom: 40,
    },
    title: {
      fontSize: 32,
      fontFamily: 'Inter-Bold',
      color: colors.text,
      textAlign: 'center',
      marginBottom: 16,
      lineHeight: 40,
    },
    subtitle: {
      fontSize: 18,
      fontFamily: 'Inter-Regular',
      color: colors.textSecondary,
      textAlign: 'center',
      lineHeight: 26,
      marginBottom: 48,
    },
    button: {
      backgroundColor: colors.primary,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 16,
      paddingHorizontal: 32,
      borderRadius: 12,
      gap: 8,
    },
    buttonText: {
      color: '#FFFFFF',
      fontSize: 16,
      fontFamily: 'Inter-SemiBold',
    },
    skipButton: {
      position: 'absolute',
      top: 60,
      right: 24,
      paddingVertical: 8,
      paddingHorizontal: 16,
    },
    skipText: {
      color: colors.textSecondary,
      fontSize: 16,
      fontFamily: 'Inter-Medium',
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity 
        style={styles.skipButton}
        onPress={() => router.replace('/auth')}
      >
        <Text style={styles.skipText}>Passer</Text>
      </TouchableOpacity>

      <View style={styles.content}>
        <Image
          source={{ uri: 'https://images.pexels.com/photos/1756957/pexels-photo-1756957.jpeg?auto=compress&cs=tinysrgb&w=800' }}
          style={styles.heroImage}
          resizeMode="cover"
        />
        
        <Text style={styles.title}>
          Transport Citoyen{'\n'}Brazzaville
        </Text>
        
        <Text style={styles.subtitle}>
          Signalez les abus dans les transports en commun et aidez votre communauté à voyager en toute sécurité.
        </Text>
        
        <TouchableOpacity 
          style={styles.button}
          onPress={() => router.push('/onboarding/features')}
        >
          <Text style={styles.buttonText}>Commencer</Text>
          <ChevronRight size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}