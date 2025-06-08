import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
  User as FirebaseUser
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '@/config/firebase';
import { User, AuthState } from '@/types';

interface AuthContextType extends AuthState {
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name: string, city: string) => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updateUserProfile: (updates: Partial<User>) => Promise<void>;
  deleteAccount: (password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser: FirebaseUser | null) => {
      if (firebaseUser) {
        try {
          const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
          if (userDoc.exists()) {
            const userData = userDoc.data() as User;
            setAuthState({
              user: { ...userData, id: firebaseUser.uid },
              loading: false,
              error: null,
            });
          }
        } catch (error) {
          setAuthState({
            user: null,
            loading: false,
            error: 'Erreur lors du chargement du profil',
          });
        }
      } else {
        setAuthState({
          user: null,
          loading: false,
          error: null,
        });
      }
    });

    return unsubscribe;
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      setAuthState(prev => ({ ...prev, loading: true, error: null }));
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error: any) {
      setAuthState(prev => ({
        ...prev,
        loading: false,
        error: 'Email ou mot de passe incorrect',
      }));
      throw error;
    }
  };

  const signUp = async (email: string, password: string, name: string, city: string) => {
    try {
      setAuthState(prev => ({ ...prev, loading: true, error: null }));
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      const newUser: User = {
        id: userCredential.user.uid,
        email,
        name,
        city,
        preferredLines: [],
        darkMode: false,
        notifications: true,
        createdAt: new Date(),
      };

      await setDoc(doc(db, 'users', userCredential.user.uid), newUser);
    } catch (error: any) {
      setAuthState(prev => ({
        ...prev,
        loading: false,
        error: 'Erreur lors de la création du compte',
      }));
      throw error;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
    }
  };

  const resetPassword = async (email: string) => {
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error: any) {
      throw new Error('Erreur lors de l\'envoi de l\'email de réinitialisation');
    }
  };

  const updateUserProfile = async (updates: Partial<User>) => {
    if (!authState.user) return;
    
    try {
      const updatedUser = { ...authState.user, ...updates };
      await setDoc(doc(db, 'users', authState.user.id), updatedUser);
      setAuthState(prev => ({ ...prev, user: updatedUser }));
    } catch (error) {
      throw new Error('Erreur lors de la mise à jour du profil');
    }
  };

  const deleteAccount = async (password: string) => {
    // Implementation for account deletion
    // This would require re-authentication and then deletion
    throw new Error('Fonctionnalité non implémentée');
  };

  return (
    <AuthContext.Provider
      value={{
        ...authState,
        signIn,
        signUp,
        logout,
        resetPassword,
        updateUserProfile,
        deleteAccount,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}