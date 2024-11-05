const db = require("../../config/db.config");

const create = async (req, res) => {
  try {
    const data = await db.query("SELECT 'AAAAAAAAAAAAAAAAAAAA' AS prout");

    res.status(201).json({
      data: data.rows[0],
    });
  } catch (error) {
    console.error("Registration error:", error);
    return res.status(500).json({ status: "error", errorCode: 500, message: "Internal Server Error :" + error });
  }
};

const update = async (req, res) => {
  try {
    const data = await db.query("SELECT 'AAAAAAAAAAAAAAAAAAAA' AS prout");

    res.status(201).json({
      data: data,
    });
  } catch (error) {
    console.error("Registration error:", error);
    return res.status(500).json({ status: "error", errorCode: 500, message: "Internal Server Error :" + error });
  }
};

const remove = async (req, res) => {
  try {
    const data = await db.query("SELECT 'AAAAAAAAAAAAAAAAAAAA' AS prout");

    res.status(201).json({
      data: data,
    });
  } catch (error) {
    console.error("Registration error:", error);
    return res.status(500).json({ status: "error", errorCode: 500, message: "Internal Server Error :" + error });
  }
};

module.exports = { create, update, remove };
