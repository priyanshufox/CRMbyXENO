const mongoose = require('mongoose');
const Customer = require('./models/customer');
const dotenv = require('dotenv');

dotenv.config();

mongoose.connect("mongodb+srv://priyanshugevra:root@crm.hwgbjua.mongodb.net/?retryWrites=true&w=majority&appName=crm", {

}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

const customers = [
  {
    name: 'Alice',
    email: 'alice@example.com',
    totalSpends: 15000,
    visits: 2,
    lastVisit: new Date('2024-01-01')
  },
  {
    name: 'Bob',
    email: 'bob@example.com',
    totalSpends: 8000,
    visits: 5,
    lastVisit: new Date('2024-03-01')
  },
  {
    name: 'Charlie',
    email: 'charlie@example.com',
    totalSpends: 500,
    visits: 1,
    lastVisit: new Date('2023-10-01')
  }
];

const seedDB = async () => {
  await Customer.deleteMany({});
  await Customer.insertMany(customers);
  console.log('Database seeded');
};

seedDB().then(() => {
  mongoose.connection.close();
});
