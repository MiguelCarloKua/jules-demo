/**
 * Calculates the split bill amounts per person including tip, handling exact centavo distribution.
 *
 * @param {number|string} billAmount - Total bill in pesos
 * @param {number|string} numberOfPeople - Number of people splitting the bill
 * @param {number|string} [tipPercent=0] - Tip percentage (0 to 100)
 * @returns {Object} Object containing bill metrics, breakdown text, validity flag, and error message.
 */
function calculateBill(billAmount, numberOfPeople, tipPercent = 0) {
  const bill = parseFloat(billAmount);

  // Validate Bill
  if (isNaN(bill) || bill <= 0) {
    return {
      isValid: false,
      error: 'Please enter a valid bill amount greater than 0.',
      totalTip: 0,
      totalBill: 0,
      perPerson: 0,
      breakdownText: ''
    };
  }

  // Validate Number of People (must be whole number >= 1)
  const peopleNum = Number(numberOfPeople);
  if (isNaN(peopleNum) || peopleNum < 1 || !Number.isInteger(peopleNum)) {
    return {
      isValid: false,
      error: 'Please enter a valid whole number of people (at least 1).',
      totalTip: 0,
      totalBill: 0,
      perPerson: 0,
      breakdownText: ''
    };
  }
  const people = peopleNum;

  // Validate Tip Percentage (optional, default 0, between 0 and 100)
  let tip = 0;
  if (tipPercent !== '' && tipPercent !== null && tipPercent !== undefined) {
    tip = parseFloat(tipPercent);
  }

  if (isNaN(tip) || tip < 0 || tip > 100) {
    return {
      isValid: false,
      error: 'Tip percentage must be between 0% and 100%.',
      totalTip: 0,
      totalBill: 0,
      perPerson: 0,
      breakdownText: ''
    };
  }

  // Perform money math in whole centavos
  const billCentavos = Math.round(bill * 100);
  const tipCentavos = Math.round(billCentavos * (tip / 100));
  const totalBillCentavos = billCentavos + tipCentavos;

  const baseShareCentavos = Math.floor(totalBillCentavos / people);
  const extraCentavos = totalBillCentavos % people;

  const baseCount = people - extraCentavos;
  const extraCount = extraCentavos;

  const perPersonBase = baseShareCentavos / 100;
  const perPersonExtra = (baseShareCentavos + 1) / 100;

  let breakdownText = '';
  if (extraCount === 0) {
    const personWord = people === 1 ? 'person' : 'people';
    const payWord = people === 1 ? 'pays' : 'pay';
    breakdownText = `${people} ${personWord} ${payWord} ₱${perPersonBase.toFixed(2)}`;
  } else {
    const basePersonWord = baseCount === 1 ? 'person' : 'people';
    const basePayWord = baseCount === 1 ? 'pays' : 'pay';
    const baseStr = `${baseCount} ${basePersonWord} ${basePayWord} ₱${perPersonBase.toFixed(2)}`;

    const extraPersonWord = extraCount === 1 ? 'person' : 'people';
    const extraPayWord = extraCount === 1 ? 'pays' : 'pay';
    const extraStr = `${extraCount} ${extraPersonWord} ${extraPayWord} ₱${perPersonExtra.toFixed(2)}`;

    breakdownText = `${baseStr}, ${extraStr}`;
  }

  return {
    isValid: true,
    error: null,
    totalTip: tipCentavos / 100,
    totalBill: totalBillCentavos / 100,
    perPerson: extraCount > 0 ? perPersonExtra : perPersonBase,
    perPersonBase,
    perPersonExtra,
    baseCount,
    extraCount,
    breakdownText
  };
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { calculateBill };
}
