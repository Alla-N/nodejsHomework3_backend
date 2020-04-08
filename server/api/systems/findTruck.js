const Load = require('../models/Load');
const Truck = require('../models/Truck');
const User = require('../models/User');

const findTruck = async (id) => {
  try {
    let message;
    let isSuccess;
    const load = await Load.findById(id);

    load.status = 'posted';
    load.save();


    const allTrucks = await Truck.find({status: 'inService'});

    if (allTrucks.length === 0) {
      load.status = 'new';
      load.save();
      message = 'Truck not found. Try again later';
      isSuccess = false;
      return {message, isSuccess};
    }

    const acceptableTrucks = await allTrucks.filter((item) => {
      return item.dimensions.width >= load.dimensions.width &&
      item.dimensions.height >= load.dimensions.height &&
      item.dimensions.length >= load.dimensions.length &&
      item.payload >= load.payload;
    });

    if (acceptableTrucks.length === 0) {
      load.status = 'new';
      load.save();
      message = 'Such a big truck not found. Try again later';
      isSuccess = false;
      return {message, isSuccess};
    }

    const assignedTruck =
      await acceptableTrucks.sort((a, b)=>{
        return a.payload-b.payload;
      })[0];

    load.status = 'assigned';
    load.state = 'En route to pick up';
    load.assigned_to = assignedTruck.created_by;
    await load.save();

    assignedTruck.status = 'onLoad';
    assignedTruck.assigned_to = load._id;
    await assignedTruck.save();

    const userId = assignedTruck.created_by;
    const user = await User.findById(userId);
    user.status = 'onLoad';
    user.save();

    message = 'Truck found. Wait for arrival';
    isSuccess = true;
    return {message, isSuccess};
  } catch (e) {
    return e.name;
  }
};

module.exports = findTruck;
