const {Schema, model, Types} = require('mongoose');


const LoadSchema = new Schema({
  name: {type: String},
  status: {type: String},
  state: {type: String},
  dimensions: {
    width: {type: Number, required: true},
    height: {type: Number, required: true},
    length: {type: Number, required: true},
  },
  payload: {type: Number, required: true},
  pickUpAddress: {type: String},
  deliveryAddress: {type: String},
  created_by: {type: Types.ObjectId, ref: 'User'},
  assigned_to: {type: Types.ObjectId, ref: 'User'},
});


module.exports = model('Load', LoadSchema);
