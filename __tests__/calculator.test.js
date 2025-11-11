/**
 * Unit tests for Calculator module
 * These tests validate all calculator operations
 */

const Calculator = require('../src/calculator');

describe('Calculator', () => {
  let calculator;

  beforeEach(() => {
    calculator = new Calculator();
  });

  describe('add', () => {
    test('should add two positive numbers correctly', () => {
      expect(calculator.add(2, 3)).toBe(5);
    });

    test('should add negative numbers correctly', () => {
      expect(calculator.add(-2, -3)).toBe(-5);
    });

    test('should add positive and negative numbers', () => {
      expect(calculator.add(5, -3)).toBe(2);
    });

    test('should add zero correctly', () => {
      expect(calculator.add(5, 0)).toBe(5);
    });

    test('should add decimal numbers', () => {
      expect(calculator.add(2.5, 3.7)).toBeCloseTo(6.2);
    });

    test('should throw error for non-number arguments', () => {
      expect(() => calculator.add('2', 3)).toThrow('Both arguments must be numbers');
      expect(() => calculator.add(2, '3')).toThrow('Both arguments must be numbers');
      expect(() => calculator.add(null, 3)).toThrow('Both arguments must be numbers');
    });
  });

  describe('subtract', () => {
    test('should subtract two positive numbers correctly', () => {
      expect(calculator.subtract(5, 3)).toBe(2);
    });

    test('should subtract negative numbers correctly', () => {
      expect(calculator.subtract(-2, -3)).toBe(1);
    });

    test('should subtract and return negative result', () => {
      expect(calculator.subtract(3, 5)).toBe(-2);
    });

    test('should subtract zero correctly', () => {
      expect(calculator.subtract(5, 0)).toBe(5);
    });

    test('should subtract decimal numbers', () => {
      expect(calculator.subtract(5.5, 2.3)).toBeCloseTo(3.2);
    });

    test('should throw error for non-number arguments', () => {
      expect(() => calculator.subtract('5', 3)).toThrow('Both arguments must be numbers');
      expect(() => calculator.subtract(5, '3')).toThrow('Both arguments must be numbers');
    });
  });

  describe('multiply', () => {
    test('should multiply two positive numbers correctly', () => {
      expect(calculator.multiply(2, 3)).toBe(6);
    });

    test('should multiply negative numbers correctly', () => {
      expect(calculator.multiply(-2, -3)).toBe(6);
    });

    test('should multiply positive and negative numbers', () => {
      expect(calculator.multiply(2, -3)).toBe(-6);
    });

    test('should multiply by zero', () => {
      expect(calculator.multiply(5, 0)).toBe(0);
    });

    test('should multiply decimal numbers', () => {
      expect(calculator.multiply(2.5, 4)).toBe(10);
    });

    test('should throw error for non-number arguments', () => {
      expect(() => calculator.multiply('2', 3)).toThrow('Both arguments must be numbers');
      expect(() => calculator.multiply(2, '3')).toThrow('Both arguments must be numbers');
    });
  });

  describe('divide', () => {
    test('should divide two positive numbers correctly', () => {
      expect(calculator.divide(6, 3)).toBe(2);
    });

    test('should divide negative numbers correctly', () => {
      expect(calculator.divide(-6, -3)).toBe(2);
    });

    test('should divide positive and negative numbers', () => {
      expect(calculator.divide(6, -3)).toBe(-2);
    });

    test('should divide decimal numbers', () => {
      expect(calculator.divide(7.5, 2.5)).toBe(3);
    });

    test('should throw error for division by zero', () => {
      expect(() => calculator.divide(5, 0)).toThrow('Division by zero is not allowed');
    });

    test('should throw error for non-number arguments', () => {
      expect(() => calculator.divide('6', 3)).toThrow('Both arguments must be numbers');
      expect(() => calculator.divide(6, '3')).toThrow('Both arguments must be numbers');
    });
  });

  describe('power', () => {
    test('should calculate power correctly', () => {
      expect(calculator.power(2, 3)).toBe(8);
    });

    test('should calculate power with zero exponent', () => {
      expect(calculator.power(5, 0)).toBe(1);
    });

    test('should calculate power with negative exponent', () => {
      expect(calculator.power(2, -2)).toBeCloseTo(0.25);
    });

    test('should calculate power with decimal base', () => {
      expect(calculator.power(2.5, 2)).toBeCloseTo(6.25);
    });

    test('should throw error for non-number arguments', () => {
      expect(() => calculator.power('2', 3)).toThrow('Both arguments must be numbers');
      expect(() => calculator.power(2, '3')).toThrow('Both arguments must be numbers');
    });
  });

  describe('sqrt', () => {
    test('should calculate square root correctly', () => {
      expect(calculator.sqrt(16)).toBe(4);
    });

    test('should calculate square root of zero', () => {
      expect(calculator.sqrt(0)).toBe(0);
    });

    test('should calculate square root of decimal numbers', () => {
      expect(calculator.sqrt(2.25)).toBe(1.5);
    });

    test('should throw error for negative numbers', () => {
      expect(() => calculator.sqrt(-4)).toThrow('Cannot calculate square root of negative number');
    });

    test('should throw error for non-number arguments', () => {
      expect(() => calculator.sqrt('16')).toThrow('Argument must be a number');
      expect(() => calculator.sqrt(null)).toThrow('Argument must be a number');
    });
  });
});

