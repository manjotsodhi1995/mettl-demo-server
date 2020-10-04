const db = require("../models");
const File = db.files;

// Create and Save a new file
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a file
  const file = new File({
    title: req.body.title,
    description: req.body.description,
    published: req.body.published ? req.body.published : false
  });

  // Save file in the database
  file
    .save(file)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the file."
      });
    });
};

// Retrieve all files from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title
    ? { title: { $regex: new RegExp(title), $options: "i" } }
    : {};

  File.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving files."
      });
    });
};

// Find a single file with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  File.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found file with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res.status(500).send({ message: "Error retrieving file with id=" + id });
    });
};

// Update a file by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  File.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update file with id=${id}. Maybe file was not found!`
        });
      } else res.send({ message: "file was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating file with id=" + id
      });
    });
};

// Delete a file with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  File.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete file with id=${id}. Maybe file was not found!`
        });
      } else {
        res.send({
          message: "file was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete file with id=" + id
      });
    });
};

// Delete all files from the database.
exports.deleteAll = (req, res) => {
  File.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} files were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while removing all files."
      });
    });
};

// Find all published files
exports.findAllPublished = (req, res) => {
  File.find({ published: true })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving files."
      });
    });
};
