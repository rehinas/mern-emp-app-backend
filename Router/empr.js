const express = require('express');
const router = express.Router();
const empModel = require('../model/Emp'); 
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.post('/employees', async (req, res) => {
  try {
    const { name, address, email, phn,salary } = req.body;

    // Add validation for required fields
    if (!name || !address || !email || !phn||!salary) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const newEmployee = new empModel({ name, address, email, phn ,salary});
    await newEmployee.save();
    res.status(201).json(newEmployee);
  } catch (err) {
    console.error('Error creating employee:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
router.get('/employees/:id', async (req, res) => {
  try {
    const employee = await empModel.findById(req.params.id);
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }
    res.status(200).json(employee);
  } catch (err) {
    console.error('Error retrieving employee:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// GET operation to retrieve all employees
router.get('/employees', async (req, res) => {
  try {
    const employees = await empModel.find();
    res.status(200).json(employees);
  } catch (err) {
    console.error('Error retrieving employees:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// PUT operation to update an existing employee
router.put('/employees/:id', async (req, res) => {
  try {
    const { name, address, email, phn } = req.body;
    const updatedEmployee = await empModel.findByIdAndUpdate(
      req.params.id,
      { name, address, email, phn },
      { new: true }
    );
    if (!updatedEmployee) {
      return res.status(404).json({ error: 'Employee not found' });
    }
    res.status(200).json(updatedEmployee);
  } catch (err) {
    console.error('Error updating employee:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// DELETE operation to remove an employee
router.delete('/employees/:id', async (req, res) => {
  try {
    const deletedEmployee = await empModel.findByIdAndDelete(req.params.id);
    if (!deletedEmployee) {
      return res.status(404).json({ error: 'Employee not found' });
    }
    res.status(200).json({ message: 'Employee deleted successfully' });
  } catch (err) {
    console.error('Error deleting employee:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;

