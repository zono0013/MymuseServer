export interface User {
    id: string;
    name: string;
    email: string;
    photoUrl?: string;
}

export interface Session {
    picture: string;
    email: string;
    name: string;
    user_id: string;
    isLoggedIn: boolean;
}