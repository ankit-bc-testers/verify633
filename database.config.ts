
import {
  AnyParamConstructor,
  ReturnModelType,
} from "@typegoose/typegoose/lib/types";
import Mongoose from "mongoose";

class DatabaseConfig {
  public database: Mongoose.Connection;
  public connectDatabase = async (): Promise<any> => {
    const uri =
      "mongodb+srv://T9bd6gf47CWrgQKD:RWrqz2N4M44KbsFw@cluster0.3qybf.mongodb.net?retryWrites=true&w=majority" ??
      "";
    if (this.database) {
      return;
    }
    await Mongoose.connect(uri);
    this.database = Mongoose.connection;
    this.database.once("open", async () => {
      console.log("Connected to database");
    });
    this.database.on("error", () => {
      console.log("Error connecting to database");
    });
  };
  disconnectDatabase = () => {
    if (!this.database) {
      return;
    }
    Mongoose.disconnect();
  };

  getModelForDb<T extends AnyParamConstructor<any>>(
    databaseName: string,
    model: ReturnModelType<T>
  ): ReturnModelType<T> & T {
    const db = Mongoose.connection.useDb(databaseName);

    const DbModel = db.model(
      model.modelName,
      model.schema
    ) as ReturnModelType<T> & T;
    console.log(db.modelNames());
    return DbModel;
  }
}

export default new DatabaseConfig();
