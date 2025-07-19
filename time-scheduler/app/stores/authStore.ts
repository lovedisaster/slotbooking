import { atom } from 'jotai';

export interface User {
  id: number;
  email: string;
  name: string;
  role: 'ADMIN' | 'TEACHER' | 'STUDENT' | 'PARENT';
  avatar?: string;
}

// Core atoms
export const userAtom = atom<User | null>(null);
export const isAuthenticatedAtom = atom((get) => get(userAtom) !== null);
export const userRoleAtom = atom((get) => get(userAtom)?.role || null);

// Loading and error states
export const isLoadingAtom = atom<boolean>(false);
export const errorAtom = atom<string | null>(null);

// Action atoms
export const loginAtom = atom(
  null,
  async (get, set, credentials: { email: string; password: string }) => {
    set(isLoadingAtom, true);
    set(errorAtom, null);
    
    try {
      // Mock login - replace with actual API call
      const mockUser: User = {
        id: 1,
        email: credentials.email,
        name: 'John Doe',
        role: 'ADMIN',
      };
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
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
    set(userAtom, null);
    set(errorAtom, null);
  }
); 