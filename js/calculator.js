/**
 * Calculates the split bill amounts per person including tip.
 *
 * @param {number|string} billAmount - Total bill in pesos
 * @param {number|string} numberOfPeople - Number of people splitting the bill
 * @param {number|string} [tipPercent=0] - Tip percentage (optional)
 * @returns {Object} Object containing perPerson amount, totalBill with tip, totalTip, isValid flag, and optional error message.
 */
function calculateBill(billAmount, numberOfPeople, tipPercent = 0) {
  const bill = parseFloat(billAmount);
  const people = parseInt(numberOfPeople, 10);
  const tip = tipPercent === '' || tipPercent === null || tipPercent === undefined ? 0 : parseFloat(tipPercent);

  if (isNaN(bill) || bill <= 0) {
    return {
      isValid: false,
      error: 'Please enter a valid bill amount greater than 0.',
      totalTip: 0,
      totalBill: 0,
      perPerson: 0
    };
  }

  if (isNaN(people) || people < 1) {
    return {
      isValid: false,
      error: 'Please enter a valid number of people (at least 1).',
      totalTip: 0,
      totalBill: 0,
      perPerson: 0
    };
  }

  if (isNaN(tip) || tip < 0) {
    return {
      isValid: false,
      error: 'Please enter a valid tip percentage (0 or higher).',
      totalTip: 0,
      totalBill: 0,
      perPerson: 0
    };
  }

  const totalTip = Math.round((bill * (tip / 100)) * 100) / 100;
  const totalBill = Math.round((bill + totalTip) * 100) / 100;
  const perPerson = Math.round((totalBill / people) * 100) / 100;

  return {
    isValid: true,
    error: null,
    totalTip,
    totalBill,
    perPerson
  };
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { calculateBill };
}
