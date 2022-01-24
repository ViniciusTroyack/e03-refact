import { companiesRoutes } from "./company.routes";
import express from "express";

export const routes = (app) => {
    app.use(express.json());
    companiesRoutes(app);
};