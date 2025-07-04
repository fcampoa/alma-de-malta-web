export const environment = {
    production: false,
    apiBaseUrl: 'https://localhost:7217/api',
    auth0: {
        domain: 'dev-g6ghivncjbkdrr86.us.auth0.com',
        clientId: 'Lyj9UZ5xFp15SsB3GJcIXKhoHcHEX1SE',
        audience: 'https://dev-g6ghivncjbkdrr86.us.auth0.com/api/v2/',
        redirectUri: window.location.origin,
        scope: 'openid profile email'
    }
}