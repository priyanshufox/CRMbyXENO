const express = require('express');
const router = express.Router();
const Customer = require('../models/customer');

// Create a customer
router.post('/', async (req, res) => {
  const customer = new Customer(req.body);
  try {
    await customer.save();
    res.status(201).send(customer);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get customers with filters
router.get('/', async (req, res) => {
  const { spends, visits, noVisitsSince } = req.query;
  let filter = {};

  if (spends) filter.totalSpends = { $gt: spends };
  if (visits) filter.visits = { $lt: visits };
  if (noVisitsSince) filter.lastVisit = { $lt: new Date(noVisitsSince) };

  try {
    const customers = await Customer.find(filter);
    res.send(customers);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
