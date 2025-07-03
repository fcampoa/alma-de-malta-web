export interface AuthState {
    isAuthenticated: boolean;
    user: any | null;
    accessToken?: string;
    idToken: string | null;
    error: string | null;
    loading: boolean;
}

export interface AuthStateFeature {
    auth: AuthState;
}