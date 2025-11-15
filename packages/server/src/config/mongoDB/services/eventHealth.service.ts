import mongoose from "mongoose";
import { HealthCheckResult, ConnectionStats } from "../database.types";

export class DatabaseHealthService {
  async performHealthCheck(isConnected: boolean): Promise<HealthCheckResult> {
    try {
      if (!isConnected || !mongoose.connection.db) {
        return { status: "disconnected", timestamp: new Date() };
      }

      await mongoose.connection.db.admin().ping();
      
      return {
        status: "healthy",
        timestamp: new Date(),
        dbName: mongoose.connection.db.databaseName,
        readyState: mongoose.connection.readyState,
      };
    } catch (error: any) {
      return {
        status: "unhealthy",
        error: error.message,
        timestamp: new Date(),
      };
    }
  }

  getConnectionStats(): ConnectionStats {
    return {
      readyState: mongoose.connection.readyState,
      dbName: mongoose.connection.db?.databaseName,
      host: mongoose.connection.host,
      port: mongoose.connection.port,
      models: Object.keys(mongoose.connection.models),
    };
  }
}