import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Modal, 
  TouchableOpacity, 
  ScrollView,
  SafeAreaView
} from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { useAuth } from '@/contexts/AuthContext';
import { useData } from '@/contexts/DataContext';
import { reportTypes } from '@/contexts/DataContext';
import { X, RotateCcw } from 'lucide-react-native';

interface FilterModalProps {
  visible: boolean;
  onClose: () => void;
}

export function FilterModal({ visible, onClose }: FilterModalProps) {
  const { colors } = useTheme();
  const { user } = useAuth();
  const { filters, setFilters, getLinesByCity } = useData();

  const userLines = user ? getLinesByCity(user.city) : [];

  const clearFilters = () => {
    setFilters({});
  };

  const hasActiveFilters = Object.values(filters).some(Boolean);

  const styles = StyleSheet.create({
    overlay: {
      flex: 1,
      backgroundColor: colors.overlay,
      justifyContent: 'flex-end',
    },
    modal: {
      backgroundColor: colors.background,
      borderTopLeftRadius: 24,
      borderTopRightRadius: 24,
      maxHeight: '80%',
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 24,
      paddingVertical: 20,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    title: {
      fontSize: 20,
      fontFamily: 'Inter-SemiBold',
      color: colors.text,
    },
    closeButton: {
      padding: 4,
    },
    content: {
      paddingHorizontal: 24,
      paddingVertical: 20,
    },
    section: {
      marginBottom: 24,
    },
    sectionTitle: {
      fontSize: 16,
      fontFamily: 'Inter-SemiBold',
      color: colors.text,
      marginBottom: 12,
    },
    filterOptions: {
      gap: 8,
    },
    filterOption: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 16,
      paddingVertical: 12,
      backgroundColor: colors.surface,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: colors.border,
    },
    filterOptionActive: {
      backgroundColor: colors.primary,
      borderColor: colors.primary,
    },
    filterOptionText: {
      fontSize: 16,
      fontFamily: 'Inter-Medium',
      color: colors.text,
      marginLeft: 8,
    },
    filterOptionTextActive: {
      color: '#FFFFFF',
    },
    filterDot: {
      width: 12,
      height: 12,
      borderRadius: 6,
    },
    footer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 24,
      paddingVertical: 20,
      borderTopWidth: 1,
      borderTopColor: colors.border,
    },
    clearButton: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 16,
      paddingVertical: 10,
      backgroundColor: colors.surface,
      borderRadius: 8,
      gap: 6,
    },
    clearButtonText: {
      fontSize: 14,
      fontFamily: 'Inter-Medium',
      color: colors.text,
    },
    applyButton: {
      backgroundColor: colors.primary,
      paddingHorizontal: 24,
      paddingVertical: 12,
      borderRadius: 8,
    },
    applyButtonText: {
      color: '#FFFFFF',
      fontSize: 16,
      fontFamily: 'Inter-SemiBold',
    },
  });

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <TouchableOpacity style={styles.overlay} activeOpacity={1} onPress={onClose}>
        <TouchableOpacity style={styles.modal} activeOpacity={1}>
          <SafeAreaView>
            <View style={styles.header}>
              <Text style={styles.title}>Filtres</Text>
              <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                <X size={24} color={colors.text} />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Type de problème</Text>
                <View style={styles.filterOptions}>
                  {reportTypes.map((type) => {
                    const isActive = filters.type === type.key;
                    return (
                      <TouchableOpacity
                        key={type.key}
                        style={[styles.filterOption, isActive && styles.filterOptionActive]}
                        onPress={() =>
                          setFilters({
                            ...filters,
                            type: isActive ? undefined : type.key,
                          })
                        }
                      >
                        <View 
                          style={[
                            styles.filterDot, 
                            { backgroundColor: isActive ? '#FFFFFF' : type.color }
                          ]} 
                        />
                        <Text
                          style={[
                            styles.filterOptionText,
                            isActive && styles.filterOptionTextActive,
                          ]}
                        >
                          {type.label}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>

              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Ligne de transport</Text>
                <View style={styles.filterOptions}>
                  {userLines.map((line) => {
                    const isActive = filters.lineId === line.id;
                    return (
                      <TouchableOpacity
                        key={line.id}
                        style={[styles.filterOption, isActive && styles.filterOptionActive]}
                        onPress={() =>
                          setFilters({
                            ...filters,
                            lineId: isActive ? undefined : line.id,
                          })
                        }
                      >
                        <View 
                          style={[
                            styles.filterDot, 
                            { backgroundColor: isActive ? '#FFFFFF' : colors.primary }
                          ]} 
                        />
                        <Text
                          style={[
                            styles.filterOptionText,
                            isActive && styles.filterOptionTextActive,
                          ]}
                        >
                          {line.name}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>
            </ScrollView>

            <View style={styles.footer}>
              {hasActiveFilters && (
                <TouchableOpacity style={styles.clearButton} onPress={clearFilters}>
                  <RotateCcw size={16} color={colors.text} />
                  <Text style={styles.clearButtonText}>Effacer</Text>
                </TouchableOpacity>
              )}
              
              <TouchableOpacity style={styles.applyButton} onPress={onClose}>
                <Text style={styles.applyButtonText}>Appliquer</Text>
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
}