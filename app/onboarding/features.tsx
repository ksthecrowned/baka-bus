import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useTheme } from '@/contexts/ThemeContext';
import { TriangleAlert as AlertTriangle, Bell, Users, ChevronRight } from 'lucide-react-native';

export default function OnboardingFeatures() {
  const { colors } = useTheme();
  const router = useRouter();

  const features = [
    {
      icon: AlertTriangle,
      title: 'Signaler les abus',
      description: 'Prix excessifs, absence de bus, surcharge... Signalez tous les problèmes rencontrés.',
      color: colors.error,
    },
    {
      icon: Bell,
      title: 'Alertes en temps réel',
      description: 'Recevez des notifications sur vos lignes préférées pour éviter les problèmes.',
      color: colors.warning,
    },
    {
      icon: Users,
      title: 'Communauté active',
      description: 'Rejoignez une communauté engagée pour améliorer les transports urbains.',
      color: colors.success,
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
      paddingTop: 40,
    },
    title: {
      fontSize: 28,
      fontFamily: 'Inter-Bold',
      color: colors.text,
      textAlign: 'center',
      marginBottom: 12,
    },
    subtitle: {
      fontSize: 16,
      fontFamily: 'Inter-Regular',
      color: colors.textSecondary,
      textAlign: 'center',
      marginBottom: 40,
    },
    featuresList: {
      flex: 1,
      gap: 24,
    },
    featureCard: {
      backgroundColor: colors.surface,
      padding: 24,
      borderRadius: 16,
      borderWidth: 1,
      borderColor: colors.border,
    },
    featureIcon: {
      marginBottom: 16,
    },
    featureTitle: {
      fontSize: 20,
      fontFamily: 'Inter-SemiBold',
      color: colors.text,
      marginBottom: 8,
    },
    featureDescription: {
      fontSize: 16,
      fontFamily: 'Inter-Regular',
      color: colors.textSecondary,
      lineHeight: 24,
    },
    footer: {
      paddingVertical: 24,
      gap: 16,
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
      alignItems: 'center',
      paddingVertical: 12,
    },
    skipText: {
      color: colors.textSecondary,
      fontSize: 16,
      fontFamily: 'Inter-Medium',
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Fonctionnalités</Text>
        <Text style={styles.subtitle}>
          Découvrez comment l'application peut vous aider au quotidien
        </Text>

        <View style={styles.featuresList}>
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <View key={index} style={styles.featureCard}>
                <View style={styles.featureIcon}>
                  <IconComponent size={32} color={feature.color} />
                </View>
                <Text style={styles.featureTitle}>{feature.title}</Text>
                <Text style={styles.featureDescription}>{feature.description}</Text>
              </View>
            );
          })}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.button}
          onPress={() => router.push('/onboarding/community')}
        >
          <Text style={styles.buttonText}>Continuer</Text>
          <ChevronRight size={20} color="#FFFFFF" />
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.skipButton}
          onPress={() => router.replace('/auth')}
        >
          <Text style={styles.skipText}>Passer l'introduction</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}