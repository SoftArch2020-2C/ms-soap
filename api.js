
const express = require('express');
const router = express.Router();
const path = require("path");
var consumer = require('./consumer');

router.route("/").get(async function(req, res) {

    return await consumer.getAsignatures().then((res) => {
      return  res.status(200).json({ data: res });
    }).catch((error) =>{
      return  res.status(500).json({ data: "ERROR" });
    });
    
  });

/*
router.get( async function(req, res) {

    try {
        let asignatures = await consumer.getAsignatures();
        console.log(asignatures)
        return  res.status(200).json({ data: asignatures });
      } catch (error) {
        return  res.status(500).json({ data: "error" });
      }
      
  });
*/
exports.router = router;