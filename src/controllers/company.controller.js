import { getConnection } from "../database/database";

// get companies
const getCompanies = async (req, res) => {
  try {
    const connection = await getConnection();
    const result = await connection.query("SELECT * FROM company");
    res.json(result);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

// add new company
const addCompany = async (req, res) => {
  try {
    const { companyName, phone, nit, city, address } = req.body;

    if (
      companyName === undefined ||
      phone === undefined ||
      nit === undefined ||
      city === undefined ||
      address === undefined
    ) {
      res.status(400).json({ message: "Bad Request. Please fill all field." });
    }

    const company = {
      COMPANY_NAME: companyName,
      PHONE: phone,
      NIT: nit,
      CITY: city,
      ADDRESS: address,
    };

    const connection = await getConnection();
    await connection.query("INSERT INTO company SET ?", company);
    res.json({ message: "Company added" });
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

// get one company
const getCompany = async (req, res) => {
  try {
    const { id } = req.params;

    const connection = await getConnection();
    const result = await connection.query(
      "SELECT * FROM company WHERE ID_COMPANY = ?",
      id
    );
    res.json(result);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

// delete one company
const deleteCompany = async (req, res) => {
  try {
    const { id } = req.params;

    const connection = await getConnection();
    await connection.query("DELETE FROM company WHERE ID_COMPANY = ?", id);
    res.json({ message: "Company deleted" });
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

//update one company
const updateCompany = async (req, res) => {
  try {
    const { id } = req.params;
    const { companyName, phone, nit, city, address } = req.body;
    console.log(req.body);
    if (
      companyName === undefined ||
      phone === undefined ||
      nit === undefined ||
      city === undefined ||
      address === undefined ||
      id === undefined
    ) {
      res.status(400).json({ message: "Bad Request. Please fill all field." });
    }

    const company = {
      COMPANY_NAME: companyName,
      PHONE: phone,
      NIT: nit,
      CITY: city,
      ADDRESS: address,
    };

    const connection = await getConnection();
    await connection.query("UPDATE company SET ? WHERE ID_COMPANY = ?", [
      company,
      id,
    ]);
    res.json({ message: "Company updated" });
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const methods = {
  getCompanies,
  addCompany,
  getCompany,
  deleteCompany,
  updateCompany,
};
