const {Schema, model, Types} = require('mongoose');


const TruckSchema = new Schema({
  model: {type: String, required: true},
  status: {type: String, required: true},
  dimensions: {
    width: {type: Number, required: true},
    height: {type: Number, required: true},
    length: {type: Number, required: true},
  },
  payload: {type: Number, required: true},
  created_by: {type: Types.ObjectId, ref: 'User', required: true},
  assigned_to: {type: Types.ObjectId, ref: 'User'},
});


module.exports = model('Truck', TruckSchema);
