import { atom } from 'jotai';

export interface User {
  id: number;
  email: string;
  name: string;
  role: 'ADMIN' | 'TEACHER' | 'STUDENT' | 'PARENT';
  avatar?: string;
  phone?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Core atoms - ONLY store user data, NEVER credentials
export const userAtom = atom<User | null>(null);
export const isAuthenticatedAtom = atom((get) => get(userAtom) !== null);
export const userRoleAtom = atom((get) => get(userAtom)?.role || null);

// Loading and error states
export const isLoadingAtom = atom<boolean>(false);
export const errorAtom = atom<string | null>(null);

// Action atoms
export const loginAtom = atom(
  null,
  async (get, set, credentials: { email: string; password: string; role: string }) => {
    set(isLoadingAtom, true);
    set(errorAtom, null);
    
    try {
      // Mock login - replace with actual API call
      // In real app, this would be: POST /api/auth/login
      const mockUser: User = {
        id: 1,
        email: credentials.email,
        name: credentials.email.split('@')[0], // Use email prefix as name
        role: credentials.role as 'ADMIN' | 'TEACHER' | 'STUDENT' | 'PARENT',
        avatar: undefined,
        phone: undefined,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Only store the user data, NEVER the credentials
      set(userAtom, mockUser);
      set(isLoadingAtom, false);
    } catch (error) {
      set(errorAtom, error instanceof Error ? error.message : 'Login failed');
      set(isLoadingAtom, false);
    }
  }
);

export const logoutAtom = atom(
  null,
  (get, set) => {
    // Clear all auth-related data
    set(userAtom, null);
    set(errorAtom, null);
    set(isLoadingAtom, false);
  }
);

// Helper atom for registration (doesn't store credentials)
export const registerAtom = atom(
  null,
  async (get, set, userData: { name: string; email: string; role: string }) => {
    set(isLoadingAtom, true);
    set(errorAtom, null);
    
    try {
      // Mock registration - replace with actual API call
      // In real app, this would be: POST /api/auth/register
      const mockUser: User = {
        id: Math.floor(Math.random() * 1000) + 1,
        email: userData.email,
        name: userData.name,
        role: userData.role as 'ADMIN' | 'TEACHER' | 'STUDENT' | 'PARENT',
        avatar: undefined,
        phone: undefined,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For registration, we might want to auto-login or redirect to login
      // For now, we'll just clear the loading state
      set(isLoadingAtom, false);
      
      return mockUser; // Return user data for potential auto-login
    } catch (error) {
      set(errorAtom, error instanceof Error ? error.message : 'Registration failed');
      set(isLoadingAtom, false);
      throw error;
    }
  }
); 