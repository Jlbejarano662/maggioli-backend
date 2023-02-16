import { request, response, Router } from "express";
// controller
import { methods as employeeController } from "../controllers/employee.controller";

const router = Router();

router.get("/:idCompany", employeeController.getEmployees);
router.get("/employee/:id", employeeController.getEmployee);  
router.delete("/", employeeController.deleteEmployee);
router.put("/", employeeController.updateEmployee);
router.post("/:idCompany", employeeController.addEmployee); 

export default router;
