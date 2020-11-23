
const express = require('express');
const router = express.Router();
const path = require("path");
var consumer = require('./consumer');

router.get('/all-asignatures', async function(req, res) {

    try {
        let asignatures = await consumer.getAsignatures();
        console.log(asignatures)
        return  res.status(200).json({ data: asignatures });
      } catch (error) {
        return  res.status(500).json({ data: "error" });
      }
      
  });

exports.router = router;