const express = require("express");
const router = express.Router();
const Hospital = require("../models/Hospital");

// GET
router.get("/", async (req, res) => {
  const data = await Hospital.find();
  res.json(data);
});

// POST
router.post("/", async (req, res) => {
  const newHospital = new Hospital(req.body);
  await newHospital.save();
  res.json(newHospital);
});

module.exports = router;