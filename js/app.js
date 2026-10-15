document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('calculator-form');
  const billAmountInput = document.getElementById('bill-amount');
  const peopleCountInput = document.getElementById('people-count');
  const customTipInput = document.getElementById('custom-tip');
  const tipButtons = document.querySelectorAll('.tip-btn');

  const errorMessageEl = document.getElementById('error-message');
  const perPersonAmountEl = document.getElementById('per-person-amount');
  const tipAmountEl = document.getElementById('tip-amount');
  const totalWithTipEl = document.getElementById('total-with-tip');

  let selectedTipPreset = null;

  // Format currency with standard 2 decimal places and thousands separators
  function formatCurrency(amount) {
    return amount.toLocaleString('en-PH', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  }

  function getSelectedTip() {
    if (customTipInput.value.trim() !== '') {
      return customTipInput.value;
    }
    if (selectedTipPreset !== null) {
      return selectedTipPreset;
    }
    return 0;
  }

  function clearTipButtons() {
    tipButtons.forEach(btn => btn.classList.remove('active'));
    selectedTipPreset = null;
  }

  tipButtons.forEach(button => {
    button.addEventListener('click', () => {
      const tipVal = button.getAttribute('data-tip');

      if (button.classList.contains('active')) {
        button.classList.remove('active');
        selectedTipPreset = null;
      } else {
        clearTipButtons();
        button.classList.add('active');
        selectedTipPreset = tipVal;
        customTipInput.value = '';
      }
      performCalculation();
    });
  });

  customTipInput.addEventListener('input', () => {
    if (customTipInput.value.trim() !== '') {
      tipButtons.forEach(btn => btn.classList.remove('active'));
      selectedTipPreset = null;
    }
    performCalculation();
  });

  function performCalculation() {
    const bill = billAmountInput.value;
    const people = peopleCountInput.value;
    const tip = getSelectedTip();

    // Hide error banner initially
    errorMessageEl.classList.add('hidden');
    errorMessageEl.textContent = '';

    if (!bill && !people) {
      return;
    }

    const result = calculateBill(bill, people, tip);

    if (!result.isValid) {
      errorMessageEl.textContent = result.error;
      errorMessageEl.classList.remove('hidden');
      return;
    }

    perPersonAmountEl.textContent = formatCurrency(result.perPerson);
    tipAmountEl.textContent = `₱${formatCurrency(result.totalTip)}`;
    totalWithTipEl.textContent = `₱${formatCurrency(result.totalBill)}`;
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    performCalculation();
  });

  billAmountInput.addEventListener('input', performCalculation);
  peopleCountInput.addEventListener('input', performCalculation);
});
