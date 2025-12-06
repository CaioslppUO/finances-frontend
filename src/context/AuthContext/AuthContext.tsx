// React
import React, { createContext, useContext, useReducer } from "react";
import {
    type AuthContextType,
    type AuthProviderProps,
    type AuthState,
    type UserData,
} from "./interfaces";

/**
 * Estado inicial da autenticação.
 */
const initialState: AuthState = {
    user: null,
    access: null,
    refresh: null,
    isAuthenticated: false,
};

/**
 * Possíveis ações para o reducer.
 */
type AuthAction =
    | {
          type: "LOGIN";
          payload: {
              user: UserData;
              access: string;
              refresh: string;
          };
      }
    | { type: "LOGOUT" }
    | { type: "REFRESH_TOKEN"; payload: { newAccessToken: string } };

/**
 * Reducer das ações de autenticação.
 * @param state Estado atual de autenticação.
 * @param action Ação de autenticação a ser executada.
 * @returns Estado de autenticação atualizado.
 */
const authReducer = (state: AuthState, action: AuthAction): AuthState => {
    switch (action.type) {
        case "LOGIN":
            return {
                ...state,
                user: action.payload.user,
                access: action.payload.access,
                refresh: action.payload.refresh,
                isAuthenticated: true,
            };
        case "LOGOUT":
            return initialState;
        case "REFRESH_TOKEN":
            return {
                ...state,
                access: action.payload.newAccessToken,
            };
        default:
            // Garante que o Reducer sempre retorne um estado válido
            return state;
    }
};

// Contexto de autenticação
const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * Provider do contexto de autenticação.
 */
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, initialState);

    // Função de login tipada
    const login = (data: {
        user: UserData;
        access: string;
        refresh: string;
    }) => {
        // Lógica para persistir no localStorage
        localStorage.setItem("authData", JSON.stringify(data));
        dispatch({ type: "LOGIN", payload: data });
    };

    // Função de logout tipada
    const logout = () => {
        localStorage.removeItem("authData");
        dispatch({ type: "LOGOUT" });
    };

    // Função de refresh tipada
    const refreshToken = (newAccessToken: string) => {
        // ... Lógica para atualizar o token persistido
        dispatch({ type: "REFRESH_TOKEN", payload: { newAccessToken } });
    };

    // O valor do contexto tipado como AuthContextType
    const contextValue: AuthContextType = {
        ...state,
        login,
        logout,
        refreshToken,
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};

/**
 * Hook para utilização do contexto de autenticação.
 */
export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);

    if (context === undefined) {
        throw new Error("useAuth deve ser usado dentro de um AuthProvider");
    }

    return context;
};
