export interface User {
    federatedId: string;
    providerId: string;
    email: string;
    emailVerified: boolean;
    firstName: string;
    fullName: string;
    lastName: string;
    photoUrl: string;
    localId: string;
    displayName: string;
    idToken: string;
    context: string;
    oauthAccessToken: string;
    oauthExpireIn: number;
    refreshToken: string;
    expiresIn: string;
}
