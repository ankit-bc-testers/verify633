import { mongoose } from "@typegoose/typegoose";
import { Request } from "express";
import databaseConfig from "./database.config";

import BASE_CLIENTS_MODEL, { BaseClients } from './model/clients';

class BaseService {
  get_user_details = async (req: Request): Promise<any> => {
    try {
      
      let client_id = databaseConfig.getModelForDb<
        typeof BaseClients
      >("base_db", BASE_CLIENTS_MODEL);
//base_db is a dynamic name, for testing purpose it is hardcoded.

      let found_users = await client_id
        .findById(new mongoose.Types.ObjectId("619cee5091f3aaedfd5f8d80"))
        .populate(["role"]);
      return {
        status_code: 200,
        data: {
          found_users,
        },
      };
    } catch (error) {
      console.log(error);
      return {
        status_code: 500,
        data: {
          message: "Internal server error",
          error: "On Fetch Error",
        },
      };
    }
  };
}
export default new BaseService();
