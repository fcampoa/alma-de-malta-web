export interface ApiResponse {
    body?: any; // Puedes reemplazar 'any' con un tipo específico si lo conoces
    status?: number; // Representa HttpStatusCode, que es un número en TS
    message?: string; // Mensaje de error o éxito
}