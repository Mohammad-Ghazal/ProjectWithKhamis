const registerRouter = require('./register-router');
const accountEditRouter = require("./account-edit-router");
const postRouter = require("./post-router");
const likesRouter = require("./likes-router");
const friendsRouter = require("./friends-router");
const express = require("express");


require("dotenv").config();

const app = express();

app.use(express.json());
app.use(registerRouter);
app.use(accountEditRouter);
app.use(postRouter);
app.use(likesRouter);
app.use(friendsRouter.authRouter);


const PORT = 3000 || process.env.PORT;
app.listen(PORT, () => console.log(`Server On at http://localhost:${PORT}`));