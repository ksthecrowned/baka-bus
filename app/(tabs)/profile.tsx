import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  ScrollView, 
  TouchableOpacity, 
  Switch,
  Alert
} from 'react-native';
import { useRouter } from 'expo-router';
import { useTheme } from '@/contexts/ThemeContext';
import { useAuth } from '@/contexts/AuthContext';
import { useData } from '@/contexts/DataContext';
import { 
  User, 
  MapPin, 
  Bell, 
  Moon, 
  Sun, 
  Settings, 
  LogOut,
  Trash2,
  ChevronRight
} from 'lucide-react-native';

export default function ProfileScreen() {
  const { colors, darkMode, toggleDarkMode } = useTheme();
  const { user, logout, updateUserProfile } = useAuth();
  const { getLinesByCity } = useData();
  const router = useRouter();
  
  const [showPreferences, setShowPreferences] = useState(false);

  if (!user) return null;

  const userLines = getLinesByCity(user.city);
  const preferredLines = userLines.filter(line => user.preferredLines.includes(line.id));

  const toggleNotifications = async () => {
    try {
      await updateUserProfile({ notifications: !user.notifications });
    } catch (error) {
      Alert.alert('Erreur', 'Erreur lors de la mise à jour des notifications');
    }
  };

  const handleLogout = () => {
    Alert.alert(
      'Déconnexion',
      'Êtes-vous sûr de vouloir vous déconnecter ?',
      [
        { text: 'Annuler', style: 'cancel' },
        { text: 'Déconnecter', style: 'destructive', onPress: logout }
      ]
    );
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      'Supprimer le compte',
      'Cette action est irréversible. Toutes vos données seront supprimées.',
      [
        { text: 'Annuler', style: 'cancel' },
        { 
          text: 'Supprimer', 
          style: 'destructive', 
          onPress: () => {
            // Implementation for account deletion
            Alert.alert('Info', 'Fonctionnalité en cours de développement');
          }
        }
      ]
    );
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
      paddingTop: 20,
    },
    header: {
      paddingHorizontal: 24,
      paddingTop: 20,
      paddingBottom: 16,
      backgroundColor: colors.background,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    title: {
      fontSize: 28,
      fontFamily: 'Inter-Bold',
      color: colors.text,
      marginBottom: 4,
    },
    subtitle: {
      fontSize: 16,
      fontFamily: 'Inter-Regular',
      color: colors.textSecondary,
    },
    content: {
      flex: 1,
      paddingHorizontal: 24,
      paddingTop: 24,
    },
    profileCard: {
      backgroundColor: colors.surface,
      borderRadius: 16,
      padding: 24,
      marginBottom: 24,
      borderWidth: 1,
      borderColor: colors.border,
    },
    profileHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 16,
    },
    avatar: {
      width: 60,
      height: 60,
      borderRadius: 30,
      backgroundColor: colors.primary,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 16,
    },
    profileInfo: {
      flex: 1,
    },
    userName: {
      fontSize: 20,
      fontFamily: 'Inter-Bold',
      color: colors.text,
      marginBottom: 4,
    },
    userEmail: {
      fontSize: 16,
      fontFamily: 'Inter-Regular',
      color: colors.textSecondary,
    },
    profileDetail: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 8,
    },
    profileDetailText: {
      fontSize: 16,
      fontFamily: 'Inter-Regular',
      color: colors.text,
      marginLeft: 12,
    },
    section: {
      marginBottom: 24,
    },
    sectionTitle: {
      fontSize: 18,
      fontFamily: 'Inter-SemiBold',
      color: colors.text,
      marginBottom: 12,
    },
    settingItem: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: colors.surface,
      padding: 16,
      borderRadius: 12,
      marginBottom: 8,
      borderWidth: 1,
      borderColor: colors.border,
    },
    settingItemLeft: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
    },
    settingItemContent: {
      marginLeft: 12,
    },
    settingItemText: {
      fontSize: 16,
      fontFamily: 'Inter-Medium',
      color: colors.text,
    },
    settingItemDescription: {
      fontSize: 14,
      fontFamily: 'Inter-Regular',
      color: colors.textSecondary,
      marginTop: 2,
    },
    lineItem: {
      backgroundColor: colors.surface,
      padding: 12,
      borderRadius: 8,
      marginBottom: 8,
      borderWidth: 1,
      borderColor: colors.border,
    },
    lineItemText: {
      fontSize: 16,
      fontFamily: 'Inter-Medium',
      color: colors.text,
    },
    emptyLines: {
      padding: 16,
      backgroundColor: colors.surface,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: colors.border,
    },
    emptyLinesText: {
      fontSize: 16,
      fontFamily: 'Inter-Regular',
      color: colors.textSecondary,
      textAlign: 'center',
    },
    dangerSection: {
      marginTop: 32,
      paddingTop: 24,
      borderTopWidth: 1,
      borderTopColor: colors.border,
    },
    dangerButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.error,
      padding: 16,
      borderRadius: 12,
      gap: 8,
    },
    dangerButtonText: {
      color: '#FFFFFF',
      fontSize: 16,
      fontFamily: 'Inter-SemiBold',
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Profil</Text>
        <Text style={styles.subtitle}>
          Gérez vos préférences et paramètres
        </Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.profileCard}>
          <View style={styles.profileHeader}>
            <View style={styles.avatar}>
              <User size={30} color="#FFFFFF" />
            </View>
            <View style={styles.profileInfo}>
              <Text style={styles.userName}>{user.name}</Text>
              <Text style={styles.userEmail}>{user.email}</Text>
            </View>
          </View>

          <View style={styles.profileDetail}>
            <MapPin size={20} color={colors.textSecondary} />
            <Text style={styles.profileDetailText}>{user.city}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Lignes préférées</Text>
          {preferredLines.length > 0 ? (
            preferredLines.map((line) => (
              <View key={line.id} style={styles.lineItem}>
                <Text style={styles.lineItemText}>{line.name}</Text>
              </View>
            ))
          ) : (
            <View style={styles.emptyLines}>
              <Text style={styles.emptyLinesText}>
                Aucune ligne préférée configurée
              </Text>
            </View>
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Paramètres</Text>
          
          <View style={styles.settingItem}>
            <View style={styles.settingItemLeft}>
              <Bell size={20} color={colors.textSecondary} />
              <View style={styles.settingItemContent}>
                <Text style={styles.settingItemText}>Notifications</Text>
                <Text style={styles.settingItemDescription}>
                  Recevoir des alertes pour vos lignes
                </Text>
              </View>
            </View>
            <Switch
              value={user.notifications}
              onValueChange={toggleNotifications}
              trackColor={{ false: colors.border, true: colors.primary }}
              thumbColor={user.notifications ? '#FFFFFF' : colors.textSecondary}
            />
          </View>

          <View style={styles.settingItem}>
            <View style={styles.settingItemLeft}>
              {darkMode ? (
                <Moon size={20} color={colors.textSecondary} />
              ) : (
                <Sun size={20} color={colors.textSecondary} />
              )}
              <View style={styles.settingItemContent}>
                <Text style={styles.settingItemText}>Mode sombre</Text>
                <Text style={styles.settingItemDescription}>
                  Basculer entre thème clair et sombre
                </Text>
              </View>
            </View>
            <Switch
              value={darkMode}
              onValueChange={toggleDarkMode}
              trackColor={{ false: colors.border, true: colors.primary }}
              thumbColor={darkMode ? '#FFFFFF' : colors.textSecondary}
            />
          </View>

          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingItemLeft}>
              <Settings size={20} color={colors.textSecondary} />
              <View style={styles.settingItemContent}>
                <Text style={styles.settingItemText}>Préférences</Text>
                <Text style={styles.settingItemDescription}>
                  Configurer ville et lignes
                </Text>
              </View>
            </View>
            <ChevronRight size={20} color={colors.textSecondary} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem} onPress={handleLogout}>
            <View style={styles.settingItemLeft}>
              <LogOut size={20} color={colors.textSecondary} />
              <View style={styles.settingItemContent}>
                <Text style={styles.settingItemText}>Déconnexion</Text>
                <Text style={styles.settingItemDescription}>
                  Se déconnecter de l'application
                </Text>
              </View>
            </View>
            <ChevronRight size={20} color={colors.textSecondary} />
          </TouchableOpacity>
        </View>

        <View style={styles.dangerSection}>
          <TouchableOpacity style={styles.dangerButton} onPress={handleDeleteAccount}>
            <Trash2 size={20} color="#FFFFFF" />
            <Text style={styles.dangerButtonText}>Supprimer mon compte</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}