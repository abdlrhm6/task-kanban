function getEnv(key:string): string{
    const envVar =process.env[key];
    if(!envVar){
        throw new Error(`Environment variable ${key} is not defined`);
    }
    return envVar;
}




export const config = {
    PORT: getEnv("PORT"),
    DATABASE_URL: getEnv("DATABASE_URL"),
    DATABASE_PORT: getEnv("DATABASE_PORT"),
    DATABASE_HOST: getEnv("DATABASE_HOST"),
    DATABASE_USER: getEnv("DATABASE_USER"),
    DATABASE_PASSWORD: getEnv("DATABASE_PASSWORD"),
    DATABASE_NAME: getEnv("DATABASE_NAME"),
    JWT_SECRET: getEnv("JWT_SECRET"),
}