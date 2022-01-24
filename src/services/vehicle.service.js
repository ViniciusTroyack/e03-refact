import companies from "../config/database";

export const verifyDuplicateVehiclePlate = (req, res, next) => {
    let { plate } = req.body;

    let vehicle = companies.some((company) =>
        company.vehicles.some((vehicle) => vehicle.plate === plate)
    );

    if (vehicle) {
        return res.status(400).json({ message: "Vehicle already registered" });
    }

    return next();
};


export const verifyVehicleExistence = (req, res, next) => {
    let { plate } = req.params;

    let vehicle = companies.some((company) =>
        company.vehicles.some((vehicle) => vehicle.plate === plate)
    );

    if (!vehicle) {
        return res.status(400).json({ message: "Vehicle not registered" });
    }

    req.vehicle = vehicle;

    return next();
};