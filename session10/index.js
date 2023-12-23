import express from "express";
import databaseService from "./services/database.service.js";
import userRoute from "./routes/users.routes.js";
import { config } from "dotenv";
import mediaRoute from "./routes/medias.routes.js";
import postRoute from "./routes/posts.routes.js";

const app = express();
const PORT = 4000;
config();

app.use(express.static("./upload/images"));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

databaseService.run();

app.use("/users", userRoute);
app.use("/medias", mediaRoute);
app.use("/posts", postRoute);

app.use((err, req, res, next) => {
  return res.json({
    error: err,
  });
});

app.listen(PORT, (err) => {
  if (err) {
    console.log(`Error ${err.message}`);
  } else {
    console.log(`Your server is listening on PORT ${PORT}`);
  }
});
