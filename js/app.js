document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('calculator-form');
  const billAmountInput = document.getElementById('bill-amount');
  const peopleCountInput = document.getElementById('people-count');
  const customTipInput = document.getElementById('custom-tip');
  const tipButtons = document.querySelectorAll('.tip-btn');

  const errorMessageEl = document.getElementById('error-message');
  const perPersonAmountEl = document.getElementById('per-person-amount');
  const splitBreakdownEl = document.getElementById('split-breakdown');
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

  function clearResults() {
    perPersonAmountEl.textContent = '0.00';
    splitBreakdownEl.textContent = '1 person pays ₱0.00';
    tipAmountEl.textContent = '₱0.00';
    totalWithTipEl.textContent = '₱0.00';
    errorMessageEl.textContent = '';
    errorMessageEl.classList.add('hidden');
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

  // --- Input Restrictions ---

  // For people input: block +, -, e, E and decimal points '.'
  peopleCountInput.addEventListener('keydown', (e) => {
    if (['+', '-', 'e', 'E', '.'].includes(e.key)) {
      e.preventDefault();
    }
  });

  peopleCountInput.addEventListener('input', () => {
    peopleCountInput.value = peopleCountInput.value.replace(/[^0-9]/g, '');
    clearResults();
  });

  // For bill input: allow at most two decimal places and no minus sign
  billAmountInput.addEventListener('keydown', (e) => {
    if (['-', '+', 'e', 'E'].includes(e.key)) {
      e.preventDefault();
    }
  });

  billAmountInput.addEventListener('input', () => {
    let val = billAmountInput.value;
    // Remove negative signs or illegal chars if pasted
    val = val.replace(/[^0-9.]/g, '');

    // Ensure at most two decimal places
    const parts = val.split('.');
    if (parts.length > 2) {
      val = parts[0] + '.' + parts.slice(1).join('');
    }
    if (parts[1] && parts[1].length > 2) {
      val = parts[0] + '.' + parts[1].substring(0, 2);
    }

    if (billAmountInput.value !== val) {
      billAmountInput.value = val;
    }
    clearResults();
  });

  // Custom tip input restrictions
  customTipInput.addEventListener('keydown', (e) => {
    if (['-', '+', 'e', 'E'].includes(e.key)) {
      e.preventDefault();
    }
  });

  customTipInput.addEventListener('input', () => {
    if (customTipInput.value.trim() !== '') {
      clearTipButtons();
    }
    clearResults();
  });

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
      clearResults();
    });
  });

  function performCalculation() {
    clearResults();

    const bill = billAmountInput.value;
    const people = peopleCountInput.value;
    const tip = getSelectedTip();

    const result = calculateBill(bill, people, tip);

    if (!result.isValid) {
      errorMessageEl.textContent = result.error;
      errorMessageEl.classList.remove('hidden');
      return;
    }

    perPersonAmountEl.textContent = formatCurrency(result.perPerson);
    splitBreakdownEl.textContent = result.breakdownText;
    tipAmountEl.textContent = `₱${formatCurrency(result.totalTip)}`;
    totalWithTipEl.textContent = `₱${formatCurrency(result.totalBill)}`;
  }

  // Calculate ONLY on form submit (which includes Calculate button click)
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    performCalculation();
  });
});
