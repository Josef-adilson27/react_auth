import mongoose from "mongoose";
import { IDatabase, HealthCheckResult, ConnectionStats } from "./database.types";
import { DatabaseConnectionService } from "./services/connection.service";
import { DatabaseHealthService } from "./services/eventHealth.service";

export class MongoDataBase implements IDatabase {

  private static instance: MongoDataBase;
  private connectionService: DatabaseConnectionService;
  private healthService: DatabaseHealthService;
  
  isConnected: boolean;
  connection: mongoose.Connection | null;

  private constructor() {
    this.isConnected = false;
    this.connection = mongoose.connection;
    this.connectionService = new DatabaseConnectionService();
    this.healthService = new DatabaseHealthService();
  }

  static getInstance(): MongoDataBase {
    if (!MongoDataBase.instance) {
      MongoDataBase.instance = new MongoDataBase();
    }
    return MongoDataBase.instance;
  }

  async connect(): Promise<mongoose.Connection> {

    if (this.isConnected && this.connection) {
      console.log("Using existing database connection");
      return this.connection;
    }

    this.connection = await this.connectionService.connect();
    this.isConnected = true;

    return this.connection;

  }

  async disconnect(): Promise<void> {
    if (this.isConnected) {
      await this.connectionService.disconnect();
      this.isConnected = false;
      this.connection = null;
    }
  }

  async healthCheck(): Promise<HealthCheckResult> {
    return await this.healthService.performHealthCheck(this.isConnected);
  }

  getConnectionStats(): ConnectionStats {
    return this.healthService.getConnectionStats();
  }

}

export const databaseInstance = MongoDataBase.getInstance()