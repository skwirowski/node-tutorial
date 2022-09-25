const express = require("express");

const router = express.Router();

// Route parameters
router.get("/:id", (req, res) => {
  res.send(`item id: ${req.params.id}`);

  // localhost:3000/api/items/1
});

router.get("/:year/:month", (req, res) => {
  res.send(`item year: ${req.params.year}, item month: ${req.params.month}`);

  // localhost:3000/api/items/2020/04
});

// Query parameters
router.get("/", (request, response) => {
  response.send(request.query);

  // http://localhost:3000/api/items?sortBy=date
});

module.exports = router;
