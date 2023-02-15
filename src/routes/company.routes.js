import { request, response, Router } from "express";
// controller
import { methods as companyController } from "../controllers/company.controller";

const router = Router();

router.get("/", companyController.getCompanies);
router.get("/:id", companyController.getCompany);
router.delete("/:id", companyController.deleteCompany);
router.put("/:id", companyController.updateCompany);
router.post("/", companyController.addCompany);

export default router;
