
const db = require("../models");

const Role = db.role;
const Leave = db.leave;



exports.leaveapply = (req, res) => {
  const leave = new Leave({
    username: req.body.username,
    email: req.body.email,
    mobile: req.body.mobile,
    startdate: req.body.startdate,
    enddate: req.body.enddate,
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


