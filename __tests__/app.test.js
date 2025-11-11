/**
 * Unit tests for Express application
 * These tests validate API endpoints
 */

const request = require('supertest');
const app = require('../src/app');

describe('Calculator API', () => {
  describe('GET /', () => {
    test('should return API information', async () => {
      const response = await request(app).get('/');
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('message');
      expect(response.body).toHaveProperty('endpoints');
    });
  });

  describe('GET /health', () => {
    test('should return health status', async () => {
      const response = await request(app).get('/health');
      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        status: 'OK',
        message: 'Application is running'
      });
    });
  });

  describe('POST /api/add', () => {
    test('should add two numbers correctly', async () => {
      const response = await request(app)
        .post('/api/add')
        .send({ a: 5, b: 3 });
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('result', 8);
      expect(response.body).toHaveProperty('operation', 'add');
    });

    test('should return error for invalid input', async () => {
      const response = await request(app)
        .post('/api/add')
        .send({ a: 'invalid', b: 3 });
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
    });
  });

  describe('POST /api/subtract', () => {
    test('should subtract two numbers correctly', async () => {
      const response = await request(app)
        .post('/api/subtract')
        .send({ a: 5, b: 3 });
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('result', 2);
      expect(response.body).toHaveProperty('operation', 'subtract');
    });

    test('should return error for invalid input', async () => {
      const response = await request(app)
        .post('/api/subtract')
        .send({ a: 5, b: 'invalid' });
      expect(response.status).toBe(400);
    });
  });

  describe('POST /api/multiply', () => {
    test('should multiply two numbers correctly', async () => {
      const response = await request(app)
        .post('/api/multiply')
        .send({ a: 4, b: 3 });
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('result', 12);
      expect(response.body).toHaveProperty('operation', 'multiply');
    });
  });

  describe('POST /api/divide', () => {
    test('should divide two numbers correctly', async () => {
      const response = await request(app)
        .post('/api/divide')
        .send({ a: 10, b: 2 });
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('result', 5);
      expect(response.body).toHaveProperty('operation', 'divide');
    });

    test('should return error for division by zero', async () => {
      const response = await request(app)
        .post('/api/divide')
        .send({ a: 10, b: 0 });
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
    });
  });
});

