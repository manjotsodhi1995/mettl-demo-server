module.exports = app => {
  const files = require("../controllers/file.controller.js");

  var router = require("express").Router();

  // Create a new file
  router.post("/", files.create);

  // Retrieve all files
  router.get("/", files.findAll);

  // Retrieve all published files
  router.get("/published", files.findAllPublished);

  // Retrieve a single file with id
  router.get("/:id", files.findOne);

  // Update a file with id
  router.put("/:id", files.update);

  // Delete a file with id
  router.delete("/:id", files.delete);

  // Create a new file
  router.delete("/", files.deleteAll);

  app.use("/api/files", router);
};
