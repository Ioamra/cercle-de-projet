const express = require("express");
const port = 5001;
const cors = require("cors");
const app = express();
const path = require("path");

const allowedOrigins = ["http://localhost:3000"];

const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/img", express.static(path.join(__dirname, "upload")));

// Routes
app.use("/api/user-account", require("./routes/user_account.routes"));
app.use("/api/quiz", require("./routes/quiz.routes"));
app.use("/api/quiz-result", require("./routes/quiz_result.routes"));
app.use("/api/lesson", require("./routes/lesson.routes"));
// Admin Routes
app.use("/api/admin/lesson", require("./routes/admin/admin_lesson.routes"));
app.use("/api/admin/user-account", require("./routes/admin/admin_user_account.routes"));
app.use("/api/admin/quiz", require("./routes/admin/admin_quiz.routes"));
app.use("/api/admin/quiz-result", require("./routes/admin/admin_quiz_result.routes"));

app.listen(port, () => {
  console.log(`Backend started on port ${port}`);
});
