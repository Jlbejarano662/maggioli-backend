import { getConnection } from "../database/database";

// get employees
const getEmployees = async (req, res) => {
  try {
    const { idCompany } = req.params;
    console.log(idCompany);
    const connection = await getConnection();
    const result = await connection.query(
      "SELECT * FROM employee WHERE FK_ID_COMPANY = ?",
      idCompany
    );
    res.json(result);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

// add new employee
const addEmployee = async (req, res) => {
  try {
    const { idCompany } = req.params;
    const { dni, firstName, lastName, phone, position, salary } =
      await req.body;

    if (
      dni === undefined ||
      firstName === undefined ||
      lastName === undefined ||
      phone === undefined ||
      position === undefined ||
      salary === undefined ||
      idCompany === undefined
    ) {
      res.status(400).json({ message: "Bad Request. Please fill all field." });
    }

    const employee = {
      FK_ID_COMPANY: idCompany,
      DNI: dni,
      FIRST_NAME: firstName,
      LAST_NAME: lastName,
      PHONE: phone,
      POSITION: position,
      SALARY: salary,
    };

    const connection = await getConnection();
    await connection.query("INSERT INTO employee SET ?", employee);
    res.json({ message: "Employee added" });
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

// get one employee
const getEmployee = async (req, res) => {
  try {
    const { idCompany, id } = req.params;

    const connection = await getConnection();
    const company = await connection.query(
      "SELECT COMPANY_NAME FROM company WHERE ID_COMPANY = ?",
      idCompany
    );
    const employee = await connection.query(
      "SELECT * FROM employee WHERE ID_EMPLOYEE = ?",
      id
    );
    res.json({ company, employee });
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

// delete one employee
const deleteEmployee = async (req, res) => {
  try {
    const { id } = await req.body;

    const connection = await getConnection();
    await connection.query("DELETE FROM employee WHERE ID_EMPLOYEE = ?", id);
    res.json({ message: "Employee deleted" });
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

//update one employee
const updateEmployee = async (req, res) => {
  try {
    const { id, dni, firstName, lastName, phone, position, salary } =
      await req.body;

    if (
      dni === undefined ||
      firstName === undefined ||
      lastName === undefined ||
      phone === undefined ||
      position === undefined ||
      salary === undefined ||
      id === undefined
    ) {
      res.status(400).json({ message: "Bad Request. Please fill all field." });
    }

    const employee = {
      DNI: dni,
      FIRST_NAME: firstName,
      LAST_NAME: lastName,
      PHONE: phone,
      POSITION: position,
      SALARY: salary,
    };

    const connection = await getConnection();
    await connection.query("UPDATE employee SET ? WHERE ID_EMPLOYEE = ?", [
      employee,
      id,
    ]);
    res.json({ message: "Employe updated" });
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const methods = {
  getEmployees,
  addEmployee,
  getEmployee,
  deleteEmployee,
  updateEmployee,
};
