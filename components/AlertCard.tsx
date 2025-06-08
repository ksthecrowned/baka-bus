import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Alert, AlertType } from '@/types';
import { useTheme } from '@/contexts/ThemeContext';
import { Clock, Bus, DollarSign, TriangleAlert as AlertTriangle } from 'lucide-react-native';

interface AlertCardProps {
  alert: Alert;
}

const alertTypes: Record<string, AlertType> = {
  no_bus: {
    key: 'no_bus',
    label: 'Absence de bus',
    icon: 'bus',
    color: '#DC2626',
  },
  overpriced: {
    key: 'overpriced',
    label: 'Prix abusif',
    icon: 'dollar',
    color: '#F59E0B',
  },
  other: {
    key: 'other',
    label: 'Autre problème',
    icon: 'alert',
    color: '#64748B',
  },
};

export function AlertCard({ alert }: AlertCardProps) {
  const { colors } = useTheme();
  const alertType = alertTypes[alert.type];

  const formatTime = (date: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 60) {
      return `${diffInMinutes}m`;
    } else if (diffInMinutes < 1440) {
      return `${Math.floor(diffInMinutes / 60)}h`;
    } else {
      return `${Math.floor(diffInMinutes / 1440)}j`;
    }
  };

  const getIcon = () => {
    switch (alert.type) {
      case 'no_bus':
        return <Bus size={16} color={alertType.color} />;
      case 'overpriced':
        return <DollarSign size={16} color={alertType.color} />;
      default:
        return <AlertTriangle size={16} color={alertType.color} />;
    }
  };

  const styles = StyleSheet.create({
    card: {
      backgroundColor: colors.surface,
      borderRadius: 12,
      padding: 16,
      marginBottom: 12,
      borderWidth: 1,
      borderColor: colors.border,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: 8,
    },
    badge: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.background,
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 6,
      gap: 4,
    },
    badgeText: {
      fontSize: 12,
      fontWeight: '600',
      color: alertType.color,
    },
    timeContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
    },
    timeText: {
      fontSize: 12,
      color: colors.textSecondary,
    },
    lineName: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.text,
      marginBottom: 4,
    },
    city: {
      fontSize: 14,
      color: colors.textSecondary,
      marginBottom: 8,
    },
    message: {
      fontSize: 14,
      color: colors.text,
      lineHeight: 20,
    },
    priceInfo: {
      marginTop: 8,
      paddingTop: 8,
      borderTopWidth: 1,
      borderTopColor: colors.border,
    },
    priceText: {
      fontSize: 14,
      fontWeight: '600',
      color: colors.error,
    },
  });

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.badge}>
          {getIcon()}
          <Text style={styles.badgeText}>{alertType.label}</Text>
        </View>
        <View style={styles.timeContainer}>
          <Clock size={12} color={colors.textSecondary} />
          <Text style={styles.timeText}>{formatTime(alert.createdAt)}</Text>
        </View>
      </View>
      
      <Text style={styles.lineName}>{alert.lineName}</Text>
      <Text style={styles.city}>{alert.city}</Text>
      <Text style={styles.message}>{alert.message}</Text>
      
      {alert.pricePaid && (
        <View style={styles.priceInfo}>
          <Text style={styles.priceText}>Prix payé: {alert.pricePaid} FCFA</Text>
        </View>
      )}
    </View>
  );
}