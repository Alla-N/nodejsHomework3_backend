const Load = require('../models/Load');
const User = require('../models/User');

const changeLoadState = async (loadId, userId) => {
  try {
    const load = await Load.findOne({_id: loadId, assigned_to: uderId});
    const user = await User.findById(userId);

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
        return true;
      }
    } else {
      return false;
    }
  } catch (e) {
    return res.status(404).json({message: e.name});
  }
};

module.exports = changeLoadState;
