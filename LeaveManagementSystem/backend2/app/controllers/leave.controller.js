
const db = require("../models");

const Role = db.role;
const Leave = db.leave;


exports.viewoneleave = (req, res) => {
  const id = req.params.id;

  Leave.findById({
    _id: id
    })
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Leave applications not found!!!" });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving leave application!!!"  });
    });
};

exports.viewallLeave = (req, res) => {
  const username = req.params.username;

  Leave.find({
    username: username
    })
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Leave applications not found!!!" });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving leave application!!!"  });
    });
};

exports.deleteLeave = (req, res) => {
  const leaveid = req.params.leaveid;

  Leave.findByIdAndRemove(leaveid)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Leave application with id =${leaveid}. `
        });
      } else {
        res.send({
          message: "Leave application was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Leave application with id =" + leaveid
      });
    });
};

exports.updateleave = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to be updated can not be empty!"
    });
  }

  const leaveid = req.params.leaveid;

  Leave.findByIdAndUpdate(leaveid, {
    username: req.body.username,
    leavetype: req.body.leavetype,
    startdate: req.body.startdate,
    enddate: req.body.enddate,
    status: false,
  
    roles: req.body.roles,
  }, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update leave application with id =${leaveid}.`
        });
      } else res.send({ message: "Leave application was updated successfully." });
    })
    .catch(err => {
      console.log(err);
      res.status(500).send({
        message: "Error updating leave application with id=" + err
      });
    });
};


exports.updateleaveStatus = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to be updated can not be empty!"
    });
  }

  const leaveid = req.params.leaveid;

  Leave.findByIdAndUpdate(leaveid, {
    username: req.body.username,
    leavetype: req.body.leavetype,
    startdate: req.body.startdate,
    enddate: req.body.enddate,
    status: req.body.status,
  
    roles: req.body.roles,
  }, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update leave application with id =${leaveid}.`
        });
      } else res.send({ message: "Leave application was updated successfully." });
    })
    .catch(err => {
      console.log(err);
      res.status(500).send({
        message: "Error updating leave application with id=" + err
      });
    });
};


exports.leaveapply = (req, res) => {
  const leave = new Leave({
    username: req.body.username,
    leavetype: req.body.leavetype,
    startdate: req.body.startdate,
    enddate: req.body.enddate,
    status: false,
  });

  leave.save((err, leave) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (req.body.roles) {
      Role.find(
        {
          name: { $in: req.body.roles }
        },
        (err, roles) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }

          leave.roles = roles.map(role => role._id);
          leave.save(err => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }

            res.send({ message: "Leave application submitted successfully!" });
          });
        }
      );
    } else {
      Role.findOne({ name: "leave" }, (err, role) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        leave.roles = [role._id];
        leave.save(err => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }

          res.send({ message: "Leave application submitted successfully!" });
        });
      });
    }
  });
};


