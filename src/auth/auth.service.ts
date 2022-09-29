import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
    constructor() {}

    async fetchToken(code: String) {
        const response = await fetch("https://oauth2.googleapis.com/token", {
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify({
                client_id: process.env.GOOGLE_ID,
                client_secret: process.env.GOOGLE_SECRET,
                grant_type: 'authorization_code',
                redirect_uri: 'http://localhost:3000/api/auth/redirect',
                access_type: 'offline',
                code
            })
        });

        return response;
    }

    async refreshToken(token: String) {
        const response = await fetch("https://oauth2.googleapis.com/token", {
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify({
                client_id: process.env.GOOGLE_ID,
                client_secret: process.env.GOOGLE_SECRET,
                grant_type: 'refresh_token',
                refresh_token: token
            })
        });

        return response;
    }
}
