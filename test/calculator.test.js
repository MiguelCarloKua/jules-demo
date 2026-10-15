const test = require('node:test');
const assert = require('node:assert/strict');
const { calculateBill } = require('../js/calculator.js');

test('calculates bill split with tip correctly', () => {
  const result = calculateBill(1000, 4, 10);
  assert.equal(result.isValid, true);
  assert.equal(result.totalTip, 100);
  assert.equal(result.totalBill, 1100);
  assert.equal(result.perPerson, 275);
});

test('handles 0% tip', () => {
  const result = calculateBill(500, 2, 0);
  assert.equal(result.isValid, true);
  assert.equal(result.totalTip, 0);
  assert.equal(result.totalBill, 500);
  assert.equal(result.perPerson, 250);
});

test('handles default tip (optional)', () => {
  const result = calculateBill(300, 3);
  assert.equal(result.isValid, true);
  assert.equal(result.totalTip, 0);
  assert.equal(result.totalBill, 300);
  assert.equal(result.perPerson, 100);
});

test('handles decimal values and rounding', () => {
  const result = calculateBill(100, 3, 15);
  assert.equal(result.isValid, true);
  assert.equal(result.totalTip, 15);
  assert.equal(result.totalBill, 115);
  assert.equal(result.perPerson, 38.33);
});

test('rejects invalid or non-positive bill amounts', () => {
  const resultZero = calculateBill(0, 2, 10);
  assert.equal(resultZero.isValid, false);
  assert.equal(resultZero.error, 'Please enter a valid bill amount greater than 0.');

  const resultNegative = calculateBill(-50, 2, 10);
  assert.equal(resultNegative.isValid, false);

  const resultNaN = calculateBill('abc', 2, 10);
  assert.equal(resultNaN.isValid, false);
});

test('rejects invalid number of people', () => {
  const resultZeroPeople = calculateBill(100, 0, 10);
  assert.equal(resultZeroPeople.isValid, false);
  assert.equal(resultZeroPeople.error, 'Please enter a valid number of people (at least 1).');

  const resultNegativePeople = calculateBill(100, -2, 10);
  assert.equal(resultNegativePeople.isValid, false);
});

test('rejects negative tip percentage', () => {
  const resultNegativeTip = calculateBill(100, 2, -5);
  assert.equal(resultNegativeTip.isValid, false);
  assert.equal(resultNegativeTip.error, 'Please enter a valid tip percentage (0 or higher).');
});
