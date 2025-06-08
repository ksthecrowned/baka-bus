import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { useTheme } from '@/contexts/ThemeContext';
import { Heart, Shield, Zap } from 'lucide-react-native';

export default function OnboardingCommunity() {
  const { colors } = useTheme();
  const router = useRouter();

  const benefits = [
    {
      icon: Heart,
      text: 'Aidez votre communauté',
      color: colors.error,
    },
    {
      icon: Shield,
      text: 'Voyagez en sécurité',
      color: colors.success,
    },
    {
      icon: Zap,
      text: 'Impact immédiat',
      color: colors.warning,
    },
  ];

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
      width: 240,
      height: 180,
      borderRadius: 16,
      marginBottom: 40,
    },
    title: {
      fontSize: 28,
      fontFamily: 'Inter-Bold',
      color: colors.text,
      textAlign: 'center',
      marginBottom: 16,
      lineHeight: 36,
    },
    subtitle: {
      fontSize: 16,
      fontFamily: 'Inter-Regular',
      color: colors.textSecondary,
      textAlign: 'center',
      lineHeight: 24,
      marginBottom: 32,
    },
    benefitsList: {
      gap: 16,
      marginBottom: 48,
    },
    benefitItem: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
    },
    benefitText: {
      fontSize: 16,
      fontFamily: 'Inter-Medium',
      color: colors.text,
    },
    button: {
      backgroundColor: colors.primary,
      paddingVertical: 16,
      paddingHorizontal: 48,
      borderRadius: 12,
      width: '100%',
      alignItems: 'center',
    },
    buttonText: {
      color: '#FFFFFF',
      fontSize: 16,
      fontFamily: 'Inter-SemiBold',
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Image
          source={{ uri: 'https://images.pexels.com/photos/1170412/pexels-photo-1170412.jpeg?auto=compress&cs=tinysrgb&w=800' }}
          style={styles.heroImage}
          resizeMode="cover"
        />
        
        <Text style={styles.title}>
          Ensemble, améliorons{'\n'}nos transports
        </Text>
        
        <Text style={styles.subtitle}>
          Votre voix compte. Chaque signalement contribue à créer un système de transport plus juste et transparent.
        </Text>
        
        <View style={styles.benefitsList}>
          {benefits.map((benefit, index) => {
            const IconComponent = benefit.icon;
            return (
              <View key={index} style={styles.benefitItem}>
                <IconComponent size={24} color={benefit.color} />
                <Text style={styles.benefitText}>{benefit.text}</Text>
              </View>
            );
          })}
        </View>
        
        <TouchableOpacity 
          style={styles.button}
          onPress={() => router.replace('/auth')}
        >
          <Text style={styles.buttonText}>Créer mon compte</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}