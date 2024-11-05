const { generateToken } = require("../config/auth.config");
const db = require("../config/db.config");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ status: "error", errorCode: 400, message: "Email and password are required" });
    }
    const query = `SELECT COUNT(*) as exist, id, role FROM user_account WHERE email = $1 AND password = $2 GROUP BY id;`;
    db.query(query, [email, password], (err, data) => {
      if (err) {
        throw err;
      }
      if (data.rows[0].exist == 1) {
        const user = {
          id: data.rows[0].id,
          role: data.rows[0].role,
        };
        return res.status(200).json({ status: "success", data: { token: generateToken(user) } });
      } else {
        return res.status(401).json({ status: "error", errorCode: 401, message: "Invalid email or password" });
      }
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: "error", errorCode: 500, message: "Internal Server Error: " + error.message });
  }
};

const register = async (req, res) => {
  try {
    const { email, pseudo, first_name, last_name, password, id_avatar } = req.body;

    db.query(`SELECT COUNT(email) AS mail_exist FROM user_account WHERE email = $1;`, [email], (err, data) => {
      if (err) {
        throw err;
      } else {
        if (data.rows[0].mail_exist) {
          return res.status(409).json({ status: "error", errorCode: 409, message: "Email already use." });
        } else {
          const query = `INSERT INTO user_account (email, pseudo, first_name, last_name, password, role, id_avatar) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id;`;

          db.query(query, [email, pseudo, first_name, last_name, password, "user", id_avatar], (err, data) => {
            if (err) {
              throw err;
            } else {
              const user = {
                id: data.rows[0].id,
                role: "user",
              };
              return res.status(200).json({ status: "success", data: { token: generateToken(user) } });
            }
          });
        }
      }
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: "error", errorCode: 500, message: "Internal Server Error :" + error });
  }
};

module.exports = { login, register };
