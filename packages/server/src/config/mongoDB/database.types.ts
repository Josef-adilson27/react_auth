import mongoose from "mongoose";

export interface HealthCheckResult {
  status: "healthy" | "unhealthy" | "disconnected";
  timestamp: Date;
  dbName?: string;
  readyState?: number;
  error?: string;
}

export interface ConnectionStats {
  readyState: number;
  dbName?: string;
  host?: string;
  port?: number;
  models: string[];
}

export interface IDatabase {
  isConnected: boolean;
  connection: mongoose.Connection | null;
  connect(): Promise<mongoose.Connection>;
  disconnect(): Promise<void>;
  healthCheck(): Promise<HealthCheckResult>;
  getConnectionStats(): ConnectionStats;
}