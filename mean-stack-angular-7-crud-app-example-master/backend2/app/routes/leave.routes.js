const controller = require("../controllers/leave.controller");


module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

//   app.post("/api/auth/leaverequest", controller.leaveapply);

  app.post("/api/test/leave", controller.leaveapply);
  app.get("/api/test/viewone/:username", controller.viewoneleave);
  app.get("/api/test/viewall/:username", controller.viewallLeave);
  app.delete("/api/test/delete/:leaveid", controller.deleteLeave);
  app.put("/api/test/update/:leaveid", controller.updateleave);
};
