const Load = require('../models/Load');
const User = require('../models/User');
const Truck = require('../models/Truck');

const changeLoadState = async (loadId, userId) => {
  try {
    const load = await Load.findById(loadId);
    const user = await User.findById(userId);
    const truck = await Truck.findOne({'created_by': userId});

    if (load) {
      if (load.state === 'En route to pick up') {
        load.state = 'Arrived to pick up';
        load.save();
        return true;
      } else if (load.state === 'Arrived to pick up') {
        load.state = 'En route to delivery';
        load.save();
        return true;
      } else if (load.state === 'En route to delivery') {
        load.state = 'Arrived to delivery';
        load.status = 'shipped';
        load.save();
        user.status = 'ready';
        user.save();
        truck.status = 'created';
        truck.save();
        return true;
      }
    } else {
      return false;
    }
  } catch (e) {
    return false;
  }
};

module.exports = changeLoadState;
