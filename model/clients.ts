import {
  getModelForClass,
  prop,
  modelOptions,
  Ref,
} from "@typegoose/typegoose";
import { Roles } from "./roles";


@modelOptions({
  schemaOptions: {
    collection: "clients",
    timestamps: true,
  },
})
export class BaseClients {
  @prop()
  name: string;

  @prop({ ref: ()=> Roles })
  role: Ref<Roles>;
}

const BASE_CLIENTS_MODEL = getModelForClass(BaseClients);
export default BASE_CLIENTS_MODEL;
