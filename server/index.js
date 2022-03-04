import express from "express";
import router from "./routes/index.js";
import db from "./config/db.js";
import dotenv from "dotenv";
dotenv.config({ path: "variables.env" });
const app = express();

//conectar a la base de datos
db.authenticate()
  .then(() => console.log("Base de datos conectada"))
  .catch((error) => console.log(error));

//habilitar PUG
app.set("view engine", "pug");

//obtener el año actual
app.use((req, res, next) => {
  const year = new Date();
  res.locals.actualYear = year.getFullYear();
  res.locals.siteName = "Agencia de viajes";
  next();
});

//agregar body parser para leer datos de form
app.use(express.urlencoded({ extended: true }));

//definir la carpeta publica
app.use(express.static("public"));

//agregar router
app.use("/", router);

//definir puerto
const host = process.env.HOST || "0.0.0.0";
const port = process.env.PORT || 3000;

app.listen(port, host, () => {
  console.log("El servidor está funcionando");
});
