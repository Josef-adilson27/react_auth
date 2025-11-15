import mongoose from "mongoose";

export class DatabaseEventHandler {
  private isConnected: boolean;

  constructor() {
    this.isConnected = false;
  }

  setupEventHandlers(onConnectionChange?: (connected: boolean) => void) {

    mongoose.connection.on("connected", () => {
      console.log("Mongoose connected to MongoDB");
      this.isConnected = true;
      onConnectionChange?.(true);
    });

    mongoose.connection.on("error", (err) => {
      console.error("Mongoose connection error:", err);
      this.isConnected = false;
      onConnectionChange?.(false);
    });
    
    mongoose.connection.on("disconnected", () => {
      console.log("Mongoose disconnected");
      this.isConnected = false;
      onConnectionChange?.(false);
    });
    
    this.setupGracefulShutdown();
  }

  private setupGracefulShutdown() {
    process.on("SIGINT", this.gracefulShutdown.bind(this));
    process.on("SIGTERM", this.gracefulShutdown.bind(this));
  }

  private async gracefulShutdown() {
    console.log("🛑 Closing MongoDB connection...");
    try {
      await mongoose.connection.close();
      console.log("✅ MongoDB connection closed gracefully");
      process.exit(0);
    } catch (error) {
      console.error("❌ Error closing MongoDB connection:", error);
      process.exit(1);
    }
  }

  getConnectionStatus(): boolean {
    return this.isConnected;
  }
}