// React
import { type ReactNode } from "react";

/**
 * Dados do usuário que são retornados da API.
 */
export interface UserData {
    id: string;
    username: string;
    email: string;
}

/**
 * Controle de autenticação.
 */
export interface AuthState {
    user: UserData | null;
    access: string | null;
    refresh: string | null;
    isAuthenticated: boolean;
}

/**
 * Interface com os métodos.
 */
export interface AuthContextType extends AuthState {
    login: (data: { user: UserData; access: string; refresh: string }) => void;
    logout: () => void;
    refreshToken: (newAccessToken: string) => void;
}

/**
 * Propriedades do provider.
 */
export interface AuthProviderProps {
    children: ReactNode;
}
