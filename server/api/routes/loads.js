const express = require('express');
const Router = express.Router;
const router = new Router;
const findTruck = require('../systems/findTruck');
const config = require('config');
const {secret} = config.get('JWT');
const jwt = require('jsonwebtoken');
const Loads = require('../models/Load');
const User = require('../models/User');
const changeLoadState = require('../systems/changeLoadState');


router.post('/loads', async (req, res) => {
  try {
    const token = req.headers.authorization;
    const {userId} = jwt.verify(token, secret);

    const newLoad = await new Loads({
      status: 'new',
      state: null,
      created_by: userId,
      assigned_to: null,
      dimensions: {
        width: +req.body.dimensions.width,
        height: +req.body.dimensions.height,
        length: +req.body.dimensions.length,
      },
      payload: +req.body.payload,
    });

    await newLoad.save();

    res.status(200).json({message: 'new load created', load: newLoad,
      status: 'Load created successfully'});
  } catch (e) {
    res.status(500).json({message: `Error: ${e}`});
  }
});


router.get('/loads', async (req, res) => {
  try {
    const token = req.headers.authorization;
    const {userId} = jwt.verify(token, secret);

    const user = await User.findById(userId);

    if (user && user.role === 'driver') {
      await Loads.find({assigned_to: userId})
          .then((loads) => {
            res.status(200).json({'status': 'Success', 'loads': loads});
          })
          .catch((err) => {
            return res.status(404).json({status: err.name});
          });
    } else if (user && user.role === 'shipper') {
      await Loads.find({created_by: userId})
          .then((loads) => {
            res.status(200).json({status: 'Success', loads: loads});
          })
          .catch((err) => {
            return res.status(404).json({status: err.name});
          });
    }
  } catch (e) {
    return res.status(404).json({status: e.name});
  }
});

router.delete('/loads/:id', async (req, res) => {
  const {id} = req.params;
  const {loadId} = req.body;

  const load = await Loads.findOne({_id: loadId});

  if (String(load.created_by) !== id ) {
    return res.status(403).json({message: 'Access rejected'});
  }

  if (load.status !== 'new') {
    return res.status(403).json({message: 'You can not delete assigned load'});
  }

  await Loads.deleteOne({_id: loadId})
      .then(()=>{
        res.status(200).json({message: 'Deleted is done'});
      })
      .catch((e)=>{
        return res.status(404).json({status: e.name});
      });
});

router.patch('/loads/:id/post', async (req, res) => {
  try {
    const loadId = req.params.id;
    const token = req.headers.authorization;
    const {userId} = jwt.verify(token, secret);

    const load = await Loads.findOne({_id: loadId, created_by: userId});

    if (load) {
      const answer = await findTruck(load._id);
      const {message, isSuccess} = answer;

      if (isSuccess) {
        return res.status(200).json({
          message: message, id: load._id,
          status: 'Load status changed successfully',
        });
      } else {
        return res.status(403).json({message: message});
      }
    } else {
      return res.status(404).json({message: 'Load not found'});
    }
  } catch (e) {
    return res.status(404).json({message: e.name});
  }
});

router.patch('/loads/:id/state', async (req, res) => {
  try {
    const loadId = req.params.id;
    const token = req.headers.authorization;
    const {userId} = jwt.verify(token, secret);

    const isSuccess = await changeLoadState(loadId, userId);

    if (isSuccess) {
      return res.status(200).json({
        message: 'Load status changed',
        status: 'Load status changed successfully',
      });
    } else {
      return res.status(403).json({message: 'Some error happened'});
    }
  } catch (e) {
    return res.status(404).json({message: e.name});
  }
});

router.patch('/loads/change', async (req, res) => {
  try {
    const {
      userId,
      id,
      name,
      width,
      height,
      length,
      weight,
      pickUpAddress,
      deliveryAddress,
    } = req.body;


    const load = await Loads.findById(id);


    if (load) {
      if (String(load.created_by) !== userId ) {
        return res.status(403).json({message: 'Access rejected'});
      }

      if (load.status !== 'new') {
        return res.status(403)
            .json({message: 'You can not edit assigned load'});
      }

      load.name = name;
      load.dimensions.width = width;
      load.dimensions.height = height;
      load.dimensions.length = length;
      load.weight = weight;
      load.pickUpAddress = pickUpAddress;
      load.pdeliveryAddress = deliveryAddress;

      load.save();
      return res.status(200).json({message: 'Load updated', load});
    } else {
      return res.status(404).json({message: 'Load not found'});
    }
  } catch (e) {
    return res.status(404).json({message: e.name});
  }
});

module.exports = router;


