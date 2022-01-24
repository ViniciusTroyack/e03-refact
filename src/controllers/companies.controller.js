import companies from "../config/database";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";

const config = {
    secret: "the_greatest_secret_key",
    expiresIn: "604800",
};

export const create = async (req, res) => {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    let company = {
        ...req.body,
        id: uuidv4(),
        vehicles: [],
        password: hashedPassword,
    };

    companies.push(company);

    res.status(201).json({ message: "Company successfully created", company });
};

export const login = async (req, res) => {
    const { cnpj, password } = req.body;

    let company = companies.find((company) => company.cnpj === cnpj);

    const match = await bcrypt.compare(password, company.password);

    if (!company) {
        return res.status(401).json({ message: "Company not found" });
    }
    if (!match) {
        return res.status(401).json({ message: "User and password missmatch." });
    }

    let token = jwt.sign({ cnpj: cnpj }, config.secret, {
        expiresIn: config.expiresIn,
    });

    res.status(200).json({ token, company });
};


export const listAll = (req, res) => {
    res.status(200).json(companies);
};


export const updateCompany = (req, res) => {
    let { company } = req;
    let updatedCompany = { ...company, ...req.body };

    let index = companies.indexOf(company);

    companies[index] = updatedCompany;

    res.status(200).json({ messagem: "Company updated", companies });
};


export const deleteCompany = (req, res) => {
    let { cnpj } = req.params;

    companies = companies.filter((company) => company.cnpj !== cnpj);

    res.status(200).json({ messagem: "Company deleted", companies });
};


export const createVehicle = async (req, res) => {
    let newVehicle = {
        ...req.body,
        id: uuidv4(),
        acquisition_date: new Date(),
    };

    let { company } = req;

    company.vehicles.push(newVehicle);

    res.status(201).json({
        message: `Vehicle ${newVehicle.model} from year ${newVehicle.year} was acquired to the ${company.name}'s fleet`,
        vehicle: newVehicle,
    });
};

export const listCompanyVehivle = (req, res) => {
    res.status(200).json(req.company.vehicles);
};


export const updateCompanyVehicle = (req, res) => {
    let { vehicle, company } = req;

    let updatedVehicle = { ...vehicle, ...req.body };

    let index = company.vehicles.indexOf(vehicle);

    company.vehicles[index] = updatedVehicle;

    res
        .status(200)
        .json({ message: "Vehicle updated", vehicle: updatedVehicle });
};

export const deleteCompanyVehicle = async (req, res) => {
    let { plate } = req.params;

    let { company } = req;

    company.vehicles = company.vehicles.filter(
        (vehicle) => vehicle.plate !== plate
    );

    res
        .status(200)
        .json({ messagem: "Vehicle deleted", vehicles: company.vehicles });
};