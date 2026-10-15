# Bill Splitter Web Application

A modern, responsive, mobile-friendly single-page web app built with vanilla HTML, CSS, and JavaScript to easily split restaurant bills and calculate tip amounts per person in pesos (₱).

## Features

- **Inputs**: Total bill amount in pesos (₱), number of people splitting the bill, and tip percentage (presets or custom value).
- **Instant & Accurate Calculation**: Pure calculation logic (`calculateBill`) calculating exact share per person, tip total, and grand total.
- **Modern & Friendly UI**: Pastel color palette (soft green, soft blue, warm yellow, soft pink), rounded container card, soft depth shadows, and crisp typography.
- **Highlighted Results**: Large highlighted result displaying per person payment with breakdown details underneath.
- **Tested & Validated**: Built-in unit tests verifying core logic and edge cases using Node.js test runner.

## File Structure

```text
.
├── index.html          # Main HTML structure
├── styles.css          # CSS styles & pastel design system
├── js/
│   ├── calculator.js   # Isolated core calculation logic function
│   └── app.js          # Web application DOM handler & UI binding
├── test/
│   └── calculator.test.js # Unit test suite for calculation logic
└── README.md           # Documentation
```

## Running the Web Application

No build step or server setup is required!

1. Simply open `index.html` in any web browser.
2. Alternatively, serve the files locally using any local web server:
   ```bash
   npx http-server .
   ```

## Running Unit Tests

Unit tests are written using Node.js built-in test runner. To execute the tests, run:

```bash
node --test
```
