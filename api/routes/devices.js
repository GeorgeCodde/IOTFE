const express = require("express");
const router = express.Router();
const { checkAuth } = require("../middlewares/authentication.js");
const { default: Device } = require("../models/device.js");
//Device-LIST
router.get("/device", checkAuth, async (req, res) => {
  try {
    const userId = req.userData._id;
    const devices = await Device.find({ userId: userId });
    const toSend = {
      status: "success",
      data: devices,
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

//Device-Insert
router.post("/device", checkAuth, async (req, res) => {
  try {
    const userId = req.userData._id;
    var newDevice = req.body.newDevice;
    console.log(newDevice);
    newDevice.userId = userId;
    newDevice.createdTime = Date.now();
    const device = await Device.create(newDevice);
    selectDevice(userId, newDevice.dId);

    const toSend = {
      status: "success",
    };
    return res.status(200).json(toSend);
  } catch (error) {
    console.log("ERROR CREATING NEW DEVICE");
    console.log(error);
    const toSend = {
      status: "error",
      error: error,
    };
    return res.status(500).json(toSend);
  }
});

//DELETE DEVICE
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

//UPDATE DEVICE

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

async function selectDevice(userId, dId) {
  try {
    const result = await Device.updateMany(
      { userId: userId },
      { selected: false }
    );

    const result2 = await Device.updateOne(
      { dId: dId, userId: userId },
      { selected: true }
    );

    return true;
  } catch (error) {
    console.log("ERROR IN 'selectDevice' FUNCTION ");
    console.log(error);
    return false;
  }
}

//Endpoint
router.get("/testing", (req, res) => {
  console.log(req.query);
  var toReturn = {
    status: "seccess",
    data: req.query,
  };
  res.json(toReturn);
});

router.post("/testing", (req, res) => {
  console.log(req.body);
  var toReturn = {
    status: "seccess",
    data: "Por post",
  };
  res.json(toReturn);
});

module.exports = router;
