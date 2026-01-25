export interface DatabaseConfig {
  maxPoolSize: number;
  serverSelectionTimeoutMS: number;
  socketTimeoutMS: number;
}

export const getDatabaseConfig = (): DatabaseConfig => ({
  maxPoolSize: 10,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
});

export const getConnectionString = (): string => {
  const env = (process.env.NODE_ENV || "development") as | "development"  | "test" | "production";
  const connectionStrings = {
    development: process.env.MONGODB_URI_DEV || "mongodb://admin:password@mongo:27017/mydb?authSource=admin",
    test:  process.env.MONGODB_URI_TEST || "mongodb://localhost:27017/test_database",
    production:  process.env.MONGODB_URI_PROD || "mongodb://localhost:27017/prod_database",
  };
  return connectionStrings[env];
};