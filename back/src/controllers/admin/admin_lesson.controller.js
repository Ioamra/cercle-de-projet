const fs = require("fs");
const path = require("path");
const db = require("../../config/db.config");

const create = async (req, res) => {
  try {
    const { title, video, content, description } = req.body;
    let img_name = null;
    if (req.file) {
      const uploadDir = path.join(__dirname, "../../../uploads/lesson");
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      const filePath = path.join(uploadDir, req.file.filename);
      fs.writeFileSync(filePath, req.file.buffer);

      img_name = `/uploads/lesson/${req.file.filename}`;
    }
    await db.query("INSERT INTO lesson (title, img, video, content, description) VALUES ($1, $2, $3, $4, $5)", [
      title,
      img_name,
      video,
      content,
      description,
    ]);

    res.status(201).json({
      response: "Lesson correctly added",
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
