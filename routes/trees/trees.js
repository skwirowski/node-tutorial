const express = require("express");
const { StatusCodes, ReasonPhrases } = require("http-status-codes");

const { trees, Tree } = require("./data");
const treeSchema = require("./trees.schema");

const router = express.Router();

router.get("/", (req, res) => {
  res.send(trees);
});

router.get("/:id", (req, res) => {
  const tree = trees.find((t) => t.id === parseInt(req.params.id));

  if (!tree) {
    return res.status(StatusCodes.NOT_FOUND).send(ReasonPhrases.NOT_FOUND);
  }

  res.send(tree);
});

router.post("/", (req, res) => {
  const validation = treeSchema.validate(req.body);

  if (validation.error) {
    return res.status(StatusCodes.BAD_REQUEST).send(validation.error.details);
  }

  const tree = new Tree(trees.length + 1, req.body.name, req.body.type);

  trees.push(tree);
  res.send(tree);
});

router.put("/:id", (req, res) => {
  const tree = trees.find((t) => t.id === parseInt(req.params.id));

  if (!tree) {
    return res.status(StatusCodes.NOT_FOUND).send(ReasonPhrases.NOT_FOUND);
  }

  const { error } = treeSchema.validate(req.body);

  if (error) {
    return res.status(StatusCodes.BAD_REQUEST).send(error.details);
  }

  tree.name = req.body.name;
  tree.type = req.body.type;

  res.send(tree);
});

router.delete("/:id", (req, res) => {
  const tree = trees.find((t) => t.id === parseInt(req.params.id));

  if (!tree) {
    return res.status(StatusCodes.NOT_FOUND).send(ReasonPhrases.NOT_FOUND);
  }

  const updatedTrees = trees.filter(
    (tree) => tree.id !== parseInt(req.params.id)
  );

  res.send(updatedTrees);
});

module.exports = router;
