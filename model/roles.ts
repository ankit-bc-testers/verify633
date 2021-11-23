import { getModelForClass, modelOptions, prop } from "@typegoose/typegoose";

@modelOptions({
  schemaOptions: {
    collection: "roles",
  },
})
export class Roles {
  @prop()
  name: string;
}

const RolesModel = getModelForClass(Roles);
export default RolesModel;
