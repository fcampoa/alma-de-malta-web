export const environment = {
    production: true,
    apiBaseUrl: 'https://alma-de-malta-api-9ae5ef3d2276.herokuapp.com/api',
    auth0: {
        domain: 'dev-g6ghivncjbkdrr86.us.auth0.com',
        clientId: 'Lyj9UZ5xFp15SsB3GJcIXKhoHcHEX1SE',
        audience: 'https://alma-de-malta-api',
        redirectUri: window.location.origin,
        scope: 'openid profile email'
    }
}