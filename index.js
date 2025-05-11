const express = require("express");
const app = express();
const cors = require("cors");
const dbConnect = require("./db/dbConnect");
const UserRouter = require("./routes/UserRouter");
const PhotoRouter = require("./routes/PhotoRouter");
// const CommentRouter = require("./routes/CommentRouter");
const UserController = require("./controllers/UserController");

dbConnect();

app.use(cors());
app.use(express.json());
app.use("/api/user", UserRouter);
app.use("/api/photo", PhotoRouter);

app.get("/", (request, response) => {
  response.send({ message: "Hello from photo-sharing app API!" });
});

app.get("/api/photosOfUser/:id", UserController.getUserById, UserController.photosOfUser);

app.get("/api/comments/:id", UserController.getUserById, UserController.commentsOfUser);

app.listen(8081, () => {
  console.log("server listening on port 8081");
});
