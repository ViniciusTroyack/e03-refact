import companies from "../config/database";
import jwt from "jsonwebtoken";

const config = {
    secret: "the_greatest_secret_key",
    expiresIn: "604800",
};

export const verifyDuplicateCnpj = (req, res, next) => {
    let { cnpj } = req.body;

    let company = companies.find((company) => company.cnpj == cnpj);

    if (company) {
        return res.status(400).json({ message: "CNPJ already registered" });
    }

    return next();
};

export const verifyCompanyExistence = (req, res, next) => {
    let { cnpj } = req.params;

    let company = companies.find((company) => company.cnpj == cnpj);

    if (!company) {
        return res.status(400).json({ message: "Company not registered" });
    }

    req.company = company;

    return next();
};


export const authenticateCompany = (req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(401).json({ message: "Missing authorization" });
    }

    let token = req.headers.authorization.split(" ")[1];

    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            console.log(err);
            return res.status(401).json({ message: "Invalid Token." });
        } else {
            return next();
        }
    });
};
