import express from "express";
import db from "./Db/db.js";
import { fileURLToPath } from "url";
import path, { dirname } from "path";
import cors from "cors";
import routes from "./router/router.js";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const rootPath1 = path.resolve(__dirname, "image/imageProduit");
const rootPath2 = path.resolve(__dirname, "image/logoFournisseur");
app.use(express.static(rootPath1));
app.use(express.static(rootPath2));

app.use(cors());
app.use(express.json());
app.use(routes);
db.sync()
  .then(console.log("dbmande"))
  .catch((error) => console.log(error));

app.listen(2000);
