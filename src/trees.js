const trees = [
  {
    id: 1,
    name: "Pine",
    type: "coniferous",
  },
  {
    id: 2,
    name: "Oak",
    type: "leafy",
  },
  {
    id: 3,
    name: "Willow",
    type: "leafy",
  },
];

function Tree(id, name, type) {
  (this.id = id), (this.name = name), (this.type = type);
}

module.exports.trees = trees;
module.exports.Tree = Tree;
