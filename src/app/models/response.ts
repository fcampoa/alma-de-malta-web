export interface Response {
    body?: any; // Puedes reemplazar 'any' con un tipo específico si lo conoces
    status?: number; // Representa HttpStatusCode, que es un número en TS
    successMessage?: string;
    errorMessage?: string;
    isSuccess?: boolean;
    isError?: boolean;
}