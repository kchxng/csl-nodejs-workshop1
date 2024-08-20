import "reflect-metadata";
import { originOption } from "./config/cors.config";
import express, { Application, Request, Response } from "express";
import ip from "ip";
require("dotenv").config();
import conn from "./config/db.config";
import { router } from "./routes/appRouter";

/*************************************************************/
// Desc: Server Application Configuration
/*************************************************************/
export class App {
  public readonly app: Application;

  constructor() {
    this.app = express();
    this.middleware();
    this.routes();
  }

  private middleware() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(originOption);
  }

  private routes() {
    this.app.get("/", (req: Request, res: Response) => {
      return res.json({ message: "Welcome to CSL API Core" });
    });

    // Player Feature
    this.app.use("/api", router);
  }
}

const connectDB = async (): Promise<void> => {
  await conn
    .sync({ force: false })
    .then(() => {
      console.log("Connected to db and models synchronized.");
    })
    .catch((err) => {
      console.error("Unable to connect to the database:", err);
    });
};
// Start the server
const app = new App().app;

const PORT = process.env.APP_PORT || 3000;
app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on http://${ip.address()}:${PORT}`);
});
