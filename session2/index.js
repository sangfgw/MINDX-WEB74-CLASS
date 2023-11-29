import express from "express";
import studentRouter from "./routes/students.routes.js";
const app = express();
const PORT = 4000;

app.use(express.json());

app.use("/students", studentRouter);

app.listen(PORT, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`Your app is listening on PORT ${PORT}`);
  }
});
