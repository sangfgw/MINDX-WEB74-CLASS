import express from "express";
import morgan from "morgan";
import registerRouter from "./routes/registerRouter.js";
import env from 'dotenv';
import loginRouter from "./routes/loginRouter.js";
import usersRouter from "./routes/usersRouter.js";

env.config();
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('tiny'));
app.use('/register', registerRouter);
app.use('/login', loginRouter);
app.use('/users', usersRouter);


app.listen(PORT, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log(`You are listening on PORT ${PORT}`);
    }
});
