/**
 * Simple Express application using the Calculator module
 * This is a sample web application for demonstration
 */

const express = require('express');
const Calculator = require('./calculator');

const app = express();
const calculator = new Calculator();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Application is running' });
});

// Calculator endpoints
app.post('/api/add', (req, res) => {
  try {
    const { a, b } = req.body;
    const result = calculator.add(a, b);
    res.json({ result, operation: 'add', operands: { a, b } });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.post('/api/subtract', (req, res) => {
  try {
    const { a, b } = req.body;
    const result = calculator.subtract(a, b);
    res.json({ result, operation: 'subtract', operands: { a, b } });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.post('/api/multiply', (req, res) => {
  try {
    const { a, b } = req.body;
    const result = calculator.multiply(a, b);
    res.json({ result, operation: 'multiply', operands: { a, b } });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.post('/api/divide', (req, res) => {
  try {
    const { a, b } = req.body;
    const result = calculator.divide(a, b);
    res.json({ result, operation: 'divide', operands: { a, b } });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Calculator API',
    version: '1.0.0',
    endpoints: {
      health: 'GET /health',
      add: 'POST /api/add',
      subtract: 'POST /api/subtract',
      multiply: 'POST /api/multiply',
      divide: 'POST /api/divide'
    }
  });
});

// Start server
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Calculator API server running on port ${PORT}`);
  });
}

module.exports = app;

