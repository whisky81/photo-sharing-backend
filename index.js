const express = require("express");
const app = express();
const cors = require("cors");
const dbConnect = require("./db/dbConnect");
const UserRouter = require("./routes/UserRouter");
const PhotoRouter = require("./routes/PhotoRouter");
const CommentRouter = require("./routes/CommentRouter");

dbConnect();

app.use(cors());
app.use(express.json());
app.use("/api/user", UserRouter);
app.use("/api/photo", PhotoRouter);
app.use("/api/comment", CommentRouter); 

app.get("/", (req, res) => {
  res.send({ 
    "/": "Guide",
    "user": {
      "/api/user/list": "Get All Users",
      "/api/user/:userId": "Get User By ID",
    },
    "photo": {
      "/api/photo/list": "Get All Photos",
      "/api/photo/:photoId": "Get Photo By ID",
      "/api/photo/user/:userId": "Get Photos By User ID"
    },
    "comment": {
      "/api/comment/user/:userId": "Get Comments By User ID"
    }
  });
});

app.listen(8081, () => {
  console.log("server listening on port 8081");
});
