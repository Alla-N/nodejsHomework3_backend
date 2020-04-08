const express = require('express');
const Router = express.Router;
const router = new Router;
const config = require('config');
const {secret} = config.get('JWT');
const jwt = require('jsonwebtoken');
const Truck = require('../models/Truck');
const User = require('../models/User');


router.post('/trucks', async (req, res) => {
  try {
    const {type} = req.body;
    const token = req.headers.authorization;
    const {userId} = jwt.verify(token, secret);
    let width;
    let height;
    let length;
    let payload;

    if (type === 'SPRINTER') {
      width = 300;
      height = 250;
      length = 170;
      payload = 1700;
    } else if (type === 'SMALL STRAIGHT') {
      width = 500;
      height = 250;
      length = 170;
      payload = 2500;
    } else if (type === 'LARGE STRAIGHT') {
      width = 700;
      height = 350;
      length = 200;
      payload = 4000;
    }

    const newTruck = await new Truck({
      model: type,
      status: 'created',
      created_by: userId,
      assigned_to: null,
      dimensions: {
        width: width,
        height: height,
        length: length,
      },
      payload: payload,
    });

    await newTruck.save();

    res.status(200).json({
      message: 'new truck created',
      status: 'Truck created successfully',
      truck: newTruck});
  } catch (e) {
    res.status(500).json({message: `Error: ${e}`});
  }
});


router.get('/trucks', async (req, res) => {
  const token = req.headers.authorization;
  const {userId} = jwt.verify(token, secret);

  await Truck.find({created_by: userId})
      .then((trucks) => {
        res.status(200).json({
          status: 'Success',
          trucks: trucks});
      })
      .catch((err) => {
        return res.status(404).json({status: err.name});
      });
});

router.delete('/truck/:id', async (req, res) => {
  const {id} = req.params;
  const {truckId} = req.body;

  const truck = await Trucks.findOne({_id: truckId});
  const user= await User.findOne({_id: id});

  if (String(truck.created_by) !== id ) {
    return res.status(403).json({message: 'Access rejected'});
  }

  if (user.status === 'onLoad' ) {
    return res.status(403).json({message: 'You can not do it while onload'});
  }

  if (truck.status !== 'created') {
    return res.status(403).json({message: 'You can not delete assigned truck'});
  }

  await Trucks.deleteOne({_id: truckId})
      .then(()=>{
        res.status(200).json({message: 'Deleted is done'});
      })
      .catch((e)=>{
        return res.status(404).json({status: e.name});
      });
});

router.patch('/trucks/:id/assign', async (req, res) => {
  try {
    const token = req.headers.authorization;
    const {userId} = jwt.verify(token, secret);
    const nextTruckId = req.params.id;

    console.log(nextTruckId);

    const nextTruck =
        await Truck.findOne({_id: nextTruckId, created_by: userId});
    const user= await User.findOne({_id: userId});

    if (user.status === 'onLoad' ) {
      return res.status(403).json({message: 'You can not do it while onload'});
    }


    if (nextTruck) {
      nextTruck.status = 'inService';
      nextTruck.save();
      user.status = 'inService';
      user.save();
      return res.status(200)
          .json({
            message: 'Truck assigned',
            id: nextTruck._id,
            status: 'Truck assigned successfully'});
    } else {
      return res.status(404).json({message: 'Truck not found'});
    }
  } catch (e) {
    return res.status(404).json({message: e.name});
  }
});


router.patch('/trucks/:id/switch', async (req, res) => {
  try {
    const token = req.headers.authorization;
    const {userId} = jwt.verify(token, secret);
    const {nextTruckId} = req.params;
    const currentTruck =await Trucks.findOne({status: 'inService'});
    const nextTruck =
      await Truck.findOne({_id: nextTruckId, created_by: userId});
    const user= await User.findOne({_id: userId});

    if (user.status === 'onLoad' ) {
      return res.status(403).json({message: 'You can not do it while onload'});
    }

    if (currentTruck && nextTruck) {
      currentTruck.status = 'created';
      currentTruck.save();
      nextTruck.status = 'inService';
      nextTruck.save();
      return res.status(200)
          .json({
            message: 'Truck assigned',
            id: nextTruck._id,
            status: 'Truck assigned successfully'});
    } else {
      return res.status(404).json({message: 'Trucks not found'});
    }
  } catch (e) {
    return res.status(404).json({message: e.name});
  }
});


router.patch('/trucks/:id/end', async (req, res) => {
  try {
    const token = req.headers.authorization;
    const {userId} = jwt.verify(token, secret);
    const {currentTruckId} = req.params;
    const currentTruck = await Truck.findOne({_id: currentTruckId});
    const user= await User.findOne({_id: userId});


    if (user.status === 'onLoad' ) {
      return res.status(403).json({message: 'You can not do it while onload'});
    }

    if (currentTruck) {
      currentTruck.status = 'created';
      currentTruck.save();
      user.status = 'ready';
      user.save();
      return res.status(200).json({message: 'Work ended'});
    } else {
      return res.status(404).json({message: 'Truck not found'});
    }
  } catch (e) {
    return res.status(404).json({message: e.name});
  }
});

router.patch('/truck', async (req, res) => {
  try {
    const {
      userId,
      id,
      model,
      width,
      height,
      length,
      payload,
    } = req.body;


    const truck = await Trucks.findById(id);
    const user= await User.findById(userId);


    if (user.status === 'onLoad' ) {
      return res.status(403).json({message: 'You can not do it while onload'});
    }

    if (truck) {
      if (String(truck.created_by) !== userId ) {
        return res.status(403).json({message: 'Access rejected'});
      }

      if (truck.status === 'inService') {
        return res.status(403).json({message: 'You can not edit assigned truck'});
      }

      truck.model = model;
      truck.dimensions.width = width;
      truck.dimensions.height = height;
      truck.dimensions.length = length;
      truck.payload = payload;

      truck.save();
      return res.status(200).json({message: 'Truck updated', truck});
    } else {
      return res.status(404).json({message: 'Truck not found'});
    }
  } catch (e) {
    return res.status(404).json({message: e.name});
  }
});

module.exports = router;


