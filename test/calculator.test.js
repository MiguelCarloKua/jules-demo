const test = require('node:test');
const assert = require('node:assert/strict');
const { calculateBill } = require('../js/calculator.js');

test('calculates 1000 ÷ 3 with 0% tip correctly', () => {
  const result = calculateBill(1000, 3, 0);
  assert.equal(result.isValid, true);
  assert.equal(result.totalTip, 0);
  assert.equal(result.totalBill, 1000);
  assert.equal(result.breakdownText, '2 people pay ₱333.33, 1 person pays ₱333.34');
});

test('calculates 1 ÷ 3 with 0% tip correctly', () => {
  const result = calculateBill(1, 3, 0);
  assert.equal(result.isValid, true);
  assert.equal(result.totalTip, 0);
  assert.equal(result.totalBill, 1);
  assert.equal(result.breakdownText, '2 people pay ₱0.33, 1 person pays ₱0.34');
});

test('calculates bill split with tip correctly', () => {
  const result = calculateBill(1000, 4, 10);
  assert.equal(result.isValid, true);
  assert.equal(result.totalTip, 100);
  assert.equal(result.totalBill, 1100);
  assert.equal(result.perPerson, 275);
  assert.equal(result.breakdownText, '4 people pay ₱275.00');
});

test('handles 0% tip', () => {
  const result = calculateBill(500, 2, 0);
  assert.equal(result.isValid, true);
  assert.equal(result.totalTip, 0);
  assert.equal(result.totalBill, 500);
  assert.equal(result.perPerson, 250);
});

test('treats blank tip as 0%', () => {
  const result1 = calculateBill(300, 3, '');
  assert.equal(result1.isValid, true);
  assert.equal(result1.totalTip, 0);
  assert.equal(result1.totalBill, 300);

  const result2 = calculateBill(300, 3, null);
  assert.equal(result2.isValid, true);
  assert.equal(result2.totalTip, 0);
});

test('rejects tip percentage above 100% or below 0%', () => {
  const resultNegative = calculateBill(100, 2, -1);
  assert.equal(resultNegative.isValid, false);
  assert.equal(resultNegative.error, 'Tip percentage must be between 0% and 100%.');

  const resultOver100 = calculateBill(100, 2, 101);
  assert.equal(resultOver100.isValid, false);
  assert.equal(resultOver100.error, 'Tip percentage must be between 0% and 100%.');
});

test('rejects non-positive bill amounts', () => {
  const resultZero = calculateBill(0, 2, 10);
  assert.equal(resultZero.isValid, false);
  assert.equal(resultZero.error, 'Please enter a valid bill amount greater than 0.');

  const resultNegative = calculateBill(-50, 2, 10);
  assert.equal(resultNegative.isValid, false);
});

test('rejects non-whole or non-positive number of people', () => {
  const resultZeroPeople = calculateBill(100, 0, 10);
  assert.equal(resultZeroPeople.isValid, false);

  const resultDecimalPeople = calculateBill(100, 2.5, 10);
  assert.equal(resultDecimalPeople.isValid, false);
  assert.equal(resultDecimalPeople.error, 'Please enter a valid whole number of people (at least 1).');
});
