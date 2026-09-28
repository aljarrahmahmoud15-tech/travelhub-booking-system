const Customer = require('../models/Customer');

exports.createCustomer = async (req, res) => {
  try {
    const { name, phone, city, notes } = req.body;

    if (!name || !phone) {
      return res.status(400).json({ success: false, message: 'اسم العميل ورقمه مطلوبان' });
    }

    const customer = await Customer.create({ name, phone, city, notes });
    res.status(201).json({ success: true, message: 'تم إضافة العميل بنجاح', data: customer });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getAllCustomers = async (req, res) => {
  try {
    const customers = await Customer.find().sort({ createdAt: -1 });
    res.json({ success: true, data: customers });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
