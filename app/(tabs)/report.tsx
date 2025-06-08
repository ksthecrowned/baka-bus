import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  ScrollView, 
  TouchableOpacity, 
  TextInput,
  Alert,
  Image
} from 'react-native';
import { useRouter } from 'expo-router';
import { useTheme } from '@/contexts/ThemeContext';
import { useAuth } from '@/contexts/AuthContext';
import { useData } from '@/contexts/DataContext';
import { reportTypes } from '@/contexts/DataContext';
import { Camera, Send, ChevronDown } from 'lucide-react-native';
import * as ImagePicker from 'expo-image-picker';

export default function ReportScreen() {
  const { colors } = useTheme();
  const { user } = useAuth();
  const { addReport, getLinesByCity } = useData();
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    type: '',
    lineId: '',
    description: '',
    price: '',
    imageUri: '',
  });
  const [showTypePicker, setShowTypePicker] = useState(false);
  const [showLinePicker, setShowLinePicker] = useState(false);
  const [loading, setLoading] = useState(false);

  const userLines = user ? getLinesByCity(user.city) : [];
  const selectedType = reportTypes.find(type => type.key === formData.type);
  const selectedLine = userLines.find(line => line.id === formData.lineId);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission requise', 'Nous avons besoin de votre permission pour accéder à vos photos');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!result.canceled) {
      setFormData(prev => ({ ...prev, imageUri: result.assets[0].uri }));
    }
  };

  const handleSubmit = async () => {
    if (!formData.type || !formData.lineId || !formData.description.trim()) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs obligatoires');
      return;
    }

    if (!user) return;

    setLoading(true);
    try {
      await addReport({
        userId: user.id,
        userName: user.name,
        cityId: user.city,
        lineId: formData.lineId,
        lineName: selectedLine?.name || '',
        type: formData.type as any,
        description: formData.description,
        price: formData.price ? parseInt(formData.price) : undefined,
        imageUrl: formData.imageUri || undefined,
      });

      Alert.alert('Succès', 'Votre signalement a été envoyé avec succès', [
        { text: 'OK', onPress: () => router.push('/(tabs)') }
      ]);

      // Reset form
      setFormData({
        type: '',
        lineId: '',
        description: '',
        price: '',
        imageUri: '',
      });
    } catch (error) {
      Alert.alert('Erreur', 'Erreur lors de l\'envoi du signalement');
    } finally {
      setLoading(false);
    }
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
    section: {
      marginBottom: 24,
    },
    sectionTitle: {
      fontSize: 18,
      fontFamily: 'Inter-SemiBold',
      color: colors.text,
      marginBottom: 12,
    },
    required: {
      color: colors.error,
    },
    picker: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: colors.surface,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: colors.border,
      paddingHorizontal: 16,
      paddingVertical: 16,
    },
    pickerText: {
      fontSize: 16,
      fontFamily: 'Inter-Regular',
      color: colors.text,
    },
    pickerPlaceholder: {
      color: colors.textSecondary,
    },
    options: {
      backgroundColor: colors.surface,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: colors.border,
      marginTop: 8,
    },
    option: {
      paddingHorizontal: 16,
      paddingVertical: 12,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    optionLast: {
      borderBottomWidth: 0,
    },
    optionText: {
      fontSize: 16,
      fontFamily: 'Inter-Regular',
      color: colors.text,
    },
    optionDescription: {
      fontSize: 14,
      fontFamily: 'Inter-Regular',
      color: colors.textSecondary,
      marginTop: 2,
    },
    textInput: {
      backgroundColor: colors.surface,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: colors.border,
      paddingHorizontal: 16,
      paddingVertical: 16,
      fontSize: 16,
      fontFamily: 'Inter-Regular',
      color: colors.text,
      textAlignVertical: 'top',
    },
    imageSection: {
      gap: 12,
    },
    imageButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.surface,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: colors.border,
      paddingVertical: 16,
      gap: 8,
    },
    imageButtonText: {
      fontSize: 16,
      fontFamily: 'Inter-Medium',
      color: colors.text,
    },
    selectedImage: {
      width: '100%',
      height: 200,
      borderRadius: 12,
    },
    submitButton: {
      backgroundColor: colors.primary,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 16,
      borderRadius: 12,
      marginTop: 32,
      marginBottom: 40,
      gap: 8,
    },
    submitButtonDisabled: {
      backgroundColor: colors.textSecondary,
    },
    submitButtonText: {
      color: '#FFFFFF',
      fontSize: 16,
      fontFamily: 'Inter-SemiBold',
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Signaler un problème</Text>
        <Text style={styles.subtitle}>
          Aidez votre communauté en signalant les abus
        </Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Type de problème <Text style={styles.required}>*</Text>
          </Text>
          <TouchableOpacity 
            style={styles.picker}
            onPress={() => setShowTypePicker(!showTypePicker)}
          >
            <Text style={[styles.pickerText, !selectedType && styles.pickerPlaceholder]}>
              {selectedType ? selectedType.label : 'Sélectionnez le type de problème'}
            </Text>
            <ChevronDown size={20} color={colors.textSecondary} />
          </TouchableOpacity>
          {showTypePicker && (
            <View style={styles.options}>
              {reportTypes.map((type, index) => (
                <TouchableOpacity
                  key={type.key}
                  style={[styles.option, index === reportTypes.length - 1 && styles.optionLast]}
                  onPress={() => {
                    setFormData(prev => ({ ...prev, type: type.key }));
                    setShowTypePicker(false);
                  }}
                >
                  <Text style={styles.optionText}>{type.label}</Text>
                  <Text style={styles.optionDescription}>{type.description}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Ligne de transport <Text style={styles.required}>*</Text>
          </Text>
          <TouchableOpacity 
            style={styles.picker}
            onPress={() => setShowLinePicker(!showLinePicker)}
          >
            <Text style={[styles.pickerText, !selectedLine && styles.pickerPlaceholder]}>
              {selectedLine ? selectedLine.name : 'Sélectionnez la ligne'}
            </Text>
            <ChevronDown size={20} color={colors.textSecondary} />
          </TouchableOpacity>
          {showLinePicker && (
            <View style={styles.options}>
              {userLines.map((line, index) => (
                <TouchableOpacity
                  key={line.id}
                  style={[styles.option, index === userLines.length - 1 && styles.optionLast]}
                  onPress={() => {
                    setFormData(prev => ({ ...prev, lineId: line.id }));
                    setShowLinePicker(false);
                  }}
                >
                  <Text style={styles.optionText}>{line.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Description <Text style={styles.required}>*</Text>
          </Text>
          <TextInput
            style={[styles.textInput, { minHeight: 100 }]}
            value={formData.description}
            onChangeText={(text) => setFormData(prev => ({ ...prev, description: text }))}
            placeholder="Décrivez le problème rencontré..."
            placeholderTextColor={colors.textSecondary}
            multiline
            numberOfLines={4}
          />
        </View>

        {formData.type === 'overpriced' && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Prix payé (FCFA)</Text>
            <TextInput
              style={styles.textInput}
              value={formData.price}
              onChangeText={(text) => setFormData(prev => ({ ...prev, price: text }))}
              placeholder="Montant payé"
              placeholderTextColor={colors.textSecondary}
              keyboardType="numeric"
            />
          </View>
        )}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Photo (optionnel)</Text>
          <View style={styles.imageSection}>
            {formData.imageUri ? (
              <Image source={{ uri: formData.imageUri }} style={styles.selectedImage} />
            ) : (
              <TouchableOpacity style={styles.imageButton} onPress={pickImage}>
                <Camera size={20} color={colors.text} />
                <Text style={styles.imageButtonText}>Ajouter une photo</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

        <TouchableOpacity 
          style={[
            styles.submitButton, 
            (!formData.type || !formData.lineId || !formData.description.trim() || loading) && 
            styles.submitButtonDisabled
          ]}
          onPress={handleSubmit}
          disabled={!formData.type || !formData.lineId || !formData.description.trim() || loading}
        >
          <Send size={20} color="#FFFFFF" />
          <Text style={styles.submitButtonText}>
            {loading ? 'Envoi...' : 'Envoyer le signalement'}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}