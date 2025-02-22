const mongoose = require('mongoose');


// Define a schema
const customerSchema = new mongoose.Schema({
    email: String,
    integration: Number,
    domain: String,
    customer_code: String,
    id: Number,
    identified: Boolean,
    identifications: mongoose.Schema.Types.Mixed,
    createdAt: Date,
    updatedAt: Date
  });
  
  // Create a model
  const CustomerModel = mongoose.model('Customer', customerSchema);

  module.exports = CustomerModel
  