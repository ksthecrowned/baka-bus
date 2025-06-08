import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { useData } from '@/contexts/DataContext';
import { Filter, X } from 'lucide-react-native';

export function FilterBar() {
  const { colors } = useTheme();
  const { cities, lines, filters, setFilters, user } = useData();
  const [showFilters, setShowFilters] = useState(false);

  const activeFiltersCount = Object.values(filters).filter(Boolean).length;
  
  const userCityLines = lines.filter(line => line.city === user?.city);

  const alertTypes = [
    { key: 'no_bus', label: 'Absence de bus' },
    { key: 'overpriced', label: 'Prix abusif' },
    { key: 'other', label: 'Autre' },
  ];

  const clearFilters = () => {
    setFilters({});
  };

  const styles = StyleSheet.create({
    container: {
      marginBottom: 16,
    },
    filterButton: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.surface,
      paddingHorizontal: 16,
      paddingVertical: 12,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: colors.border,
      gap: 8,
    },
    filterButtonActive: {
      backgroundColor: colors.primary,
      borderColor: colors.primary,
    },
    filterButtonText: {
      color: colors.text,
      fontWeight: '500',
    },
    filterButtonTextActive: {
      color: '#FFFFFF',
    },
    badge: {
      backgroundColor: colors.primary,
      borderRadius: 10,
      minWidth: 20,
      height: 20,
      justifyContent: 'center',
      alignItems: 'center',
    },
    badgeText: {
      color: '#FFFFFF',
      fontSize: 12,
      fontWeight: '600',
    },
    filtersPanel: {
      backgroundColor: colors.surface,
      borderRadius: 12,
      padding: 16,
      marginTop: 8,
      borderWidth: 1,
      borderColor: colors.border,
    },
    filterSection: {
      marginBottom: 16,
    },
    filterSectionTitle: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.text,
      marginBottom: 8,
    },
    filterOptions: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 8,
    },
    filterOption: {
      paddingHorizontal: 12,
      paddingVertical: 6,
      backgroundColor: colors.background,
      borderRadius: 16,
      borderWidth: 1,
      borderColor: colors.border,
    },
    filterOptionActive: {
      backgroundColor: colors.primary,
      borderColor: colors.primary,
    },
    filterOptionText: {
      fontSize: 14,
      color: colors.text,
    },
    filterOptionTextActive: {
      color: '#FFFFFF',
    },
    clearButton: {
      alignSelf: 'flex-start',
      paddingHorizontal: 12,
      paddingVertical: 6,
      backgroundColor: colors.error,
      borderRadius: 16,
      marginTop: 8,
    },
    clearButtonText: {
      color: '#FFFFFF',
      fontSize: 14,
      fontWeight: '500',
    },
  });

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.filterButton, activeFiltersCount > 0 && styles.filterButtonActive]}
        onPress={() => setShowFilters(!showFilters)}
      >
        <Filter size={16} color={activeFiltersCount > 0 ? '#FFFFFF' : colors.text} />
        <Text style={[styles.filterButtonText, activeFiltersCount > 0 && styles.filterButtonTextActive]}>
          Filtres
        </Text>
        {activeFiltersCount > 0 && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{activeFiltersCount}</Text>
          </View>
        )}
      </TouchableOpacity>

      {showFilters && (
        <View style={styles.filtersPanel}>
          <View style={styles.filterSection}>
            <Text style={styles.filterSectionTitle}>Type d'alerte</Text>
            <View style={styles.filterOptions}>
              {alertTypes.map((type) => (
                <TouchableOpacity
                  key={type.key}
                  style={[
                    styles.filterOption,
                    filters.type === type.key && styles.filterOptionActive,
                  ]}
                  onPress={() =>
                    setFilters({
                      ...filters,
                      type: filters.type === type.key ? undefined : type.key,
                    })
                  }
                >
                  <Text
                    style={[
                      styles.filterOptionText,
                      filters.type === type.key && styles.filterOptionTextActive,
                    ]}
                  >
                    {type.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.filterSection}>
            <Text style={styles.filterSectionTitle}>Ligne</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={styles.filterOptions}>
                {userCityLines.map((line) => (
                  <TouchableOpacity
                    key={line.id}
                    style={[
                      styles.filterOption,
                      filters.line === line.id && styles.filterOptionActive,
                    ]}
                    onPress={() =>
                      setFilters({
                        ...filters,
                        line: filters.line === line.id ? undefined : line.id,
                      })
                    }
                  >
                    <Text
                      style={[
                        styles.filterOptionText,
                        filters.line === line.id && styles.filterOptionTextActive,
                      ]}
                    >
                      {line.name}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          </View>

          {activeFiltersCount > 0 && (
            <TouchableOpacity style={styles.clearButton} onPress={clearFilters}>
              <Text style={styles.clearButtonText}>Effacer les filtres</Text>
            </TouchableOpacity>
          )}
        </View>
      )}
    </View>
  );
}