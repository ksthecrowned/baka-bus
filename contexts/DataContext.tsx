import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  collection, 
  query, 
  orderBy, 
  onSnapshot, 
  addDoc, 
  deleteDoc, 
  doc, 
  where,
  getDocs 
} from 'firebase/firestore';
import { db } from '@/config/firebase';
import { City, TransportLine, Report, ReportType } from '@/types';
import { useAuth } from './AuthContext';

interface DataContextType {
  cities: City[];
  lines: TransportLine[];
  reports: Report[];
  loading: boolean;
  addReport: (report: Omit<Report, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  deleteReport: (reportId: string) => Promise<void>;
  getLinesByCity: (cityId: string) => TransportLine[];
  getReportsByLine: (lineId: string) => Report[];
  filteredReports: Report[];
  setFilters: (filters: { cityId?: string; lineId?: string; type?: string }) => void;
  filters: { cityId?: string; lineId?: string; type?: string };
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const reportTypes: ReportType[] = [
  {
    key: 'no_bus',
    label: 'Absence de bus',
    description: 'Aucun bus depuis longtemps',
    icon: 'bus',
    color: '#DC2626',
  },
  {
    key: 'overpriced',
    label: 'Prix abusif',
    description: 'Tarif supérieur au prix normal',
    icon: 'dollar-sign',
    color: '#F59E0B',
  },
  {
    key: 'overcrowded',
    label: 'Surcharge',
    description: 'Trop de passagers dans le véhicule',
    icon: 'users',
    color: '#8B5CF6',
  },
  {
    key: 'breakdown',
    label: 'Panne',
    description: 'Véhicule en panne',
    icon: 'wrench',
    color: '#EF4444',
  },
  {
    key: 'other',
    label: 'Autre',
    description: 'Autre type de problème',
    icon: 'alert-triangle',
    color: '#64748B',
  },
];

// Données initiales pour Brazzaville
const initialCities: City[] = [
  { id: 'brazzaville', name: 'Brazzaville', active: true },
  { id: 'pointe-noire', name: 'Pointe-Noire', active: true },
];

const initialLines: TransportLine[] = [
  { id: 'line-1', name: 'Ligne 1 - Centre-ville → Bacongo', cityId: 'brazzaville', route: 'Centre-ville - Bacongo', active: true },
  { id: 'line-2', name: 'Ligne 2 - Poto-Poto → Moungali', cityId: 'brazzaville', route: 'Poto-Poto - Moungali', active: true },
  { id: 'line-3', name: 'Ligne 3 - Makélékélé → Talangaï', cityId: 'brazzaville', route: 'Makélékélé - Talangaï', active: true },
  { id: 'line-4', name: 'Ligne 4 - Ouenzé → Centre-ville', cityId: 'brazzaville', route: 'Ouenzé - Centre-ville', active: true },
  { id: 'line-5', name: 'Ligne A - Port → Loandjili', cityId: 'pointe-noire', route: 'Port - Loandjili', active: true },
  { id: 'line-6', name: 'Ligne B - Tié-Tié → Mongo-Mpoukou', cityId: 'pointe-noire', route: 'Tié-Tié - Mongo-Mpoukou', active: true },
];

export function DataProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [cities, setCities] = useState<City[]>(initialCities);
  const [lines, setLines] = useState<TransportLine[]>(initialLines);
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<{ cityId?: string; lineId?: string; type?: string }>({});

  useEffect(() => {
    // Initialize data and set up real-time listeners
    initializeData();
    setupReportsListener();
  }, []);

  const initializeData = async () => {
    try {
      // In a real app, you would fetch this from Firestore
      // For now, we'll use the initial data
      setLoading(false);
    } catch (error) {
      console.error('Erreur lors de l\'initialisation des données:', error);
      setLoading(false);
    }
  };

  const setupReportsListener = () => {
    const reportsQuery = query(
      collection(db, 'reports'),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(reportsQuery, (snapshot) => {
      const reportsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate() || new Date(),
        updatedAt: doc.data().updatedAt?.toDate() || new Date(),
      })) as Report[];
      
      setReports(reportsData);
    });

    return unsubscribe;
  };

  const addReport = async (reportData: Omit<Report, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      const now = new Date();
      await addDoc(collection(db, 'reports'), {
        ...reportData,
        price: reportData.price ?? 0,
        imageUrl: reportData.imageUrl ?? '',
        createdAt: now,
        updatedAt: now,
      });
    } catch (error) {
      console.error('Erreur lors de l\'ajout du signalement:', error);
      throw error;
    }
  };

  const deleteReport = async (reportId: string) => {
    try {
      await deleteDoc(doc(db, 'reports', reportId));
    } catch (error) {
      console.error('Erreur lors de la suppression du signalement:', error);
      throw error;
    }
  };

  const getLinesByCity = (cityId: string) => {
    return lines.filter(line => line.cityId === cityId && line.active);
  };

  const getReportsByLine = (lineId: string) => {
    return reports.filter(report => report.lineId === lineId);
  };

  const filteredReports = reports.filter(report => {
    if (filters.cityId && report.cityId !== filters.cityId) return false;
    if (filters.lineId && report.lineId !== filters.lineId) return false;
    if (filters.type && report.type !== filters.type) return false;
    return true;
  });

  return (
    <DataContext.Provider
      value={{
        cities,
        lines,
        reports,
        loading,
        addReport,
        deleteReport,
        getLinesByCity,
        getReportsByLine,
        filteredReports,
        setFilters,
        filters,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}