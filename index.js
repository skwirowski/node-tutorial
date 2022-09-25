const express = require("express");
const morgan = require("morgan");
const logger = require("./middleware/customMiddleware");

const items = require("./routes/items/items");
const trees = require("./routes/trees/trees");
const hello = require("./routes/hello/hello");

const app = express();
// build-in middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
// custom middleware
app.use(logger);
// 3rd party middleware
app.use(morgan("dev"));
// routes
app.use("/api/items", items);
app.use("/api/trees", trees);
app.use("/", hello);

const port = 3000;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
