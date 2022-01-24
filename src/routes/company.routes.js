import { Router } from "express";
import { companySchema } from "../models/company.validation.model";
import { vehicleSchema } from "../models/vehicle.validation.model";
import { validate } from "../middlewares/validate.middleware";
import { verifyDuplicateCnpj, authenticateCompany, verifyCompanyExistence } from "../services/company.service";
import { verifyVehicleExistence, verifyDuplicateVehiclePlate } from "../services/vehicle.service";
import { create, login, listAll, updateCompany, deleteCompany, createVehicle, listCompanyVehivle, updateCompanyVehicle, deleteCompanyVehicle } from "../controllers/companies.controller";

const route = Router();

export const companiesRoutes = (app) => {

    route.post("/register", validate(companySchema), verifyDuplicateCnpj, create);
    route.post("/login", login);
    route.get("", listAll);
    route.put("/:cnpj", authenticateCompany, verifyCompanyExistence, updateCompany);
    route.delete("/:cnpj", authenticateCompany, verifyCompanyExistence, deleteCompany);

    route.post("/:cnpj/vehicles", authenticateCompany, verifyCompanyExistence, verifyDuplicateVehiclePlate, validate(vehicleSchema), createVehicle);
    route.get("/:cnpj/vehicles", authenticateCompany, verifyCompanyExistence, listCompanyVehivle);
    route.put("/:cnpj/vehicles/:plate", authenticateCompany, verifyCompanyExistence, verifyVehicleExistence, updateCompanyVehicle);
    route.delete("/:cnpj/vehicles/:plate", authenticateCompany, verifyCompanyExistence, verifyVehicleExistence, deleteCompanyVehicle);


    app.use("/companies", route);
};