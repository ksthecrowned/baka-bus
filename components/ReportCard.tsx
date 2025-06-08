import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { useAuth } from '@/contexts/AuthContext';
import { useData } from '@/contexts/DataContext';
import { Report } from '@/types';
import { reportTypes } from '@/contexts/DataContext';
import { Clock, MapPin, Trash2 } from 'lucide-react-native';

interface ReportCardProps {
  report: Report;
}

export function ReportCard({ report }: ReportCardProps) {
  const { colors } = useTheme();
  const { user } = useAuth();
  const { deleteReport } = useData();

  const reportType = reportTypes.find(type => type.key === report.type);
  const isOwner = user?.id === report.userId;

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

  const handleDelete = () => {
    if (isOwner) {
      deleteReport(report.id);
    }
  };

  const styles = StyleSheet.create({
    card: {
      backgroundColor: colors.surface,
      borderRadius: 16,
      padding: 16,
      marginBottom: 16,
      borderWidth: 1,
      borderColor: colors.border,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: 12,
    },
    badge: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.background,
      paddingHorizontal: 10,
      paddingVertical: 6,
      borderRadius: 8,
      gap: 6,
    },
    badgeText: {
      fontSize: 12,
      fontFamily: 'Inter-SemiBold',
      color: reportType?.color || colors.text,
    },
    timeContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
    },
    timeText: {
      fontSize: 12,
      fontFamily: 'Inter-Regular',
      color: colors.textSecondary,
    },
    lineName: {
      fontSize: 18,
      fontFamily: 'Inter-SemiBold',
      color: colors.text,
      marginBottom: 4,
    },
    locationContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
      marginBottom: 8,
    },
    locationText: {
      fontSize: 14,
      fontFamily: 'Inter-Regular',
      color: colors.textSecondary,
    },
    description: {
      fontSize: 16,
      fontFamily: 'Inter-Regular',
      color: colors.text,
      lineHeight: 22,
      marginBottom: 12,
    },
    image: {
      width: '100%',
      height: 200,
      borderRadius: 12,
      marginBottom: 12,
    },
    footer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingTop: 12,
      borderTopWidth: 1,
      borderTopColor: colors.border,
    },
    author: {
      fontSize: 14,
      fontFamily: 'Inter-Medium',
      color: colors.textSecondary,
    },
    priceInfo: {
      backgroundColor: colors.error + '20',
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 6,
    },
    priceText: {
      fontSize: 14,
      fontFamily: 'Inter-SemiBold',
      color: colors.error,
    },
    deleteButton: {
      padding: 8,
    },
  });

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.badge}>
          <View 
            style={{
              width: 8,
              height: 8,
              borderRadius: 4,
              backgroundColor: reportType?.color || colors.text,
            }}
          />
          <Text style={styles.badgeText}>{reportType?.label}</Text>
        </View>
        
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
          <View style={styles.timeContainer}>
            <Clock size={12} color={colors.textSecondary} />
            <Text style={styles.timeText}>{formatTime(report.createdAt)}</Text>
          </View>
          
          {isOwner && (
            <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
              <Trash2 size={16} color={colors.error} />
            </TouchableOpacity>
          )}
        </View>
      </View>
      
      <Text style={styles.lineName}>{report.lineName}</Text>
      
      <View style={styles.locationContainer}>
        <MapPin size={14} color={colors.textSecondary} />
        <Text style={styles.locationText}>{report.cityId}</Text>
      </View>
      
      <Text style={styles.description}>{report.description}</Text>
      
      {report.imageUrl && (
        <Image source={{ uri: report.imageUrl }} style={styles.image} resizeMode="cover" />
      )}
      
      <View style={styles.footer}>
        <Text style={styles.author}>Par {report.userName}</Text>
        
        {report.price && report.price !== 0 ? (
          <View style={styles.priceInfo}>
            <Text style={styles.priceText}>{report.price} FCFA</Text>
          </View>
        ) : null}
      </View>
    </View>
  );
}