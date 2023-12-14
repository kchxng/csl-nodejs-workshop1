import cors from "cors";
import { Code } from "../utils/enum/code.enum";
/**Cors Config */
export const originOption = cors({
  origin: ["*"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  // allowedHeaders: ["Content-Type", "Authorization", "Token"],
  optionsSuccessStatus: Code.OK,
});
