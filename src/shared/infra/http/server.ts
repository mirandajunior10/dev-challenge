/* eslint-disable no-console */
// Arquivo principal do servidor

import "reflect-metadata"; // Import obrigatório para que o typORM acesse o banco de dados
import "dotenv/config";

import express, { Response, Request, NextFunction } from "express";
import cors from "cors";
import AppError from "../../errors/AppError";
import { errors } from "celebrate";
import "express-async-errors";

import routes from "./routes";
import "../../infra/typeorm";

const app = express();
app.use(cors());

// Possibilita que o servidor entenda uma request JSON
app.use(express.json());
app.use(routes);

app.use(errors());

app.use((err: Error, req: Request, res: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: "error",
      message: err.message,
    });
  }
  console.log(err);
  return res.status(500).json({
    status: "error",
    message: "Internal server error",
  });
});

// Inicializa o servidor na porta 3333
app.listen(3333, () => console.log("Backend started!"));
