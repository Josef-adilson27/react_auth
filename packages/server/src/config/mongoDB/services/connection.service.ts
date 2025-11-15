import mongoose from "mongoose";
import { getDatabaseConfig, getConnectionString } from "../database.config";
import { DatabaseEventHandler } from "./eventHandlers.service";

export class DatabaseConnectionService {
  private eventHandler: DatabaseEventHandler;

  constructor() {
    this.eventHandler = new DatabaseEventHandler();
  }

  async connect(): Promise<mongoose.Connection> {
    try {
      const options = getDatabaseConfig();
      const connectionString = getConnectionString();

      await mongoose.connect(connectionString, options);
      
      this.eventHandler.setupEventHandlers();
      console.log("New database connection established");

      return mongoose.connection;
    } catch (error) {
      console.error("Failed to connect to database:", error);
      throw error;
    }
  }
  
  async disconnect(): Promise<void> {
    await mongoose.connection.close();
    console.log("MongoDB connection closed");
  }

  getCurrentConnection(): mongoose.Connection {
    return mongoose.connection;
  }

}