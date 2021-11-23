import express, { Application, NextFunction, Request, Response } from "express";
import "reflect-metadata";
import base_user_service from "./base_service";
import databaseConfig from "./database.config";
const app: Application = express();

app.use(express.json({ limit: "50mb" }));

app.use(express.urlencoded({ extended: true, limit: "50mb" }));

(async()=>{
 await databaseConfig.connectDatabase();


app.get("/", async (req: Request, res: Response, next: NextFunction) => {
  let result = await base_user_service.get_user_details(req);

  if (result && result.status_code === 200)
    return res.status(result.status_code).json({
      status_code: result.status_code,
      success: true,
      data: result.data,
    });
  else
    return res.status(result.status_code).json({
      status_code: result.status_code,
      success: false,
      errors: [result.data],
    });
});

const PORT = 5001;

app.listen(PORT, () =>
  console.log(`App listening on port - ${PORT}`)
);
})();
