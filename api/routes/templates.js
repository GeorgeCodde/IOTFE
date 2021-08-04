const express = require("express");
const router = express.Router();
const { checkAuth } = require("../middlewares/authentication.js");
const { default: Template } = require("../models/template.js");

//Template-LIST
router.get("/template", checkAuth, async (req, res) => {
  try {
    const userId = req.userData._id;
    const templates = await Template.find({ userId: userId });
    const toSend = {
      status: "success",
      data: templates,
    };
    return res.status(200).json(toSend);
  } catch (error) {
    console.log("ERROR EN LISTAR LOS DISPOSITIVOS");
    toSend = {
      status: "error",
      data: error,
    };
    return res.status(500).json(toSend);
  }
});

//Template-Insert
router.post("/template", checkAuth, async (req, res) => {
  try {
    const userId = req.userData._id;
    var newTemplate = req.body.template;
    console.log(newTemplate);
    newTemplate.userId = userId;
    newTemplate.createdTime = Date.now();
    const r = await Template.create(newTemplate);
    const response = {
      status: "success",
    };
    return res.status(200).json(response);
  } catch (error) {
    console.log("ERROR CREATING TEMPLATE");
    console.log(error);
    const response = {
      status: "error",
      error: error,
    };
    return res.status(500).json(response);
  }
});

//DELETE TEMPLATE
router.delete("/device", checkAuth, async (req, res) => {
  try {
    const userId = req.userData._id;
    const dId = req.query.dId;

    console.log(dId);

    const result = await Device.deleteOne({ userId: userId, dId: dId });

    const toSend = {
      status: "success",
      data: result,
    };

    return res.json(toSend);
  } catch (error) {
    console.log("ERROR DELETING DEVICE");
    console.log(error);
    const toSend = {
      status: "error",
      error: error,
    };
    return res.status(500).json(toSend);
  }
});

//UPDATE TEMPLATE

router.put("/device", checkAuth, (req, res) => {
  const dId = req.body.dId;
  const userId = req.userData._id;

  if (selectDevice(userId, dId)) {
    const toSend = {
      status: "success",
    };

    return res.json(toSend);
  } else {
    const toSend = {
      status: "error",
    };

    return res.json(toSend);
  }
});

//Funciones

module.exports = router;
