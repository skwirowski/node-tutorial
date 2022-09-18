const { trees, Tree } = require("./src/trees");
const { StatusCodes, ReasonPhrases } = require("http-status-codes");
const treeSchema = require("./src/trees.schema");

const express = require("express");
const app = express();
app.use(express.json());
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Route parameters
app.get("/api/items/:id", (req, res) => {
  res.send(`item id: ${req.params.id}`);

  // localhost:3000/api/items/1
});

app.get("/api/items/:year/:month", (req, res) => {
  res.send(`item year: ${req.params.year}, item month: ${req.params.month}`);

  // localhost:3000/api/items/2020/04
});

// Query parameters
app.get("/api/items", (request, response) => {
  response.send(request.query);

  // http://localhost:3000/api/items?sortBy=date
});

// Trees endpoints

app.get("/api/trees", (req, res) => {
  res.send(trees);
});

app.get("/api/trees/:id", (req, res) => {
  const tree = trees.find((t) => t.id === parseInt(req.params.id));

  if (!tree) {
    res.status(StatusCodes.NOT_FOUND).send(ReasonPhrases.NOT_FOUND);
  }

  res.send(tree);
});

app.post("/api/trees", (req, res) => {
  const validation = treeSchema.validate(req.body);

  if (validation.error) {
    res.status(StatusCodes.BAD_REQUEST).send(validation.error.details);
  }

  const tree = new Tree(trees.length + 1, req.body.name, req.body.type);

  trees.push(tree);
  res.send(tree);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
