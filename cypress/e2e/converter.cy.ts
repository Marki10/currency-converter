describe('Currency Converter - Happy Path', () => {
  it('converts USD to EUR successfully', () => {
    cy.intercept('GET', '**/currencies*', {
      statusCode: 200,
      body: {
        response: [
          { short_code: 'USD', name: 'US Dollar', code: '840' },
          { short_code: 'EUR', name: 'Euro', code: '978' },
        ],
      },
    });

    cy.intercept('GET', '**/convert*', {
      statusCode: 200,
      body: {
        response: { value: 91.23 },
      },
    }).as('convertCall');

    cy.visit('http://localhost:3000');

    cy.contains('Currency Converter');

    cy.get('input[type="number"]').clear().type('100');
    cy.get('button').contains('Convert').click();

    cy.wait('@convertCall');

    cy.get('body').then(($body) => {
      cy.log($body.text());
    });

    cy.contains(/1000\s+USD\s*=\s*91\.23\s+EUR/i).should('exist');
  });
});

describe('Currency Converter - Unhappy Path', () => {
  it('shows error when API fails', () => {
    cy.intercept('GET', '**/currencies*', {
      statusCode: 500,
      body: {},
    });

    cy.visit('http://localhost:3000');

    cy.contains('Failed to load currencies. Please try again.');
  });
});
