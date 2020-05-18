const { Schema, model } = require('mongoose');

const hiveSchema = new Schema({ 
  hive: {
    type: String,
    required: true
  },
  bees: {
    type: String,
    required: true
  }
});

module.exports = model('Hives', hiveSchema);
