const connectDB = require('./connectDB');
let { invoices } = require('../../data/invoices.json');
const Invoice = require('../models/invoice');

const deleteAllData = async () => {
  try {
    await Invoice.deleteMany({});
    console.log('deleted all data');
  } catch (err) {
    console.log(err);
  }
};

const insertdata = async (userId) => {
  try {
    invoices = invoices.map((invoice) => {
      return { ...invoice, user: userId };
    });
    await Invoice.insertMany(invoices);
    console.log('Data seeded');
  } catch (err) {
    console.log(err);
  }
};

seedData = async () => {
  connectDB();
  await deleteAllData();
  await insertdata('61ed2f6ee17b35eaaec80a3d');
  return 0;
};

seedData().then((code) => process.exit(code));
