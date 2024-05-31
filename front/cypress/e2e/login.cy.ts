describe('Login spec', () => {
  beforeEach(() => {
    cy.visit('/login');
  });

  it('Login successful', () => {
    cy.intercept('POST', '/api/auth/login', {
      body: {
        fixture: 'validLogin.json'
      },
    })

    cy.intercept({method: 'GET', url: '/api/session',},[]).as('session')

    cy.get('input[formControlName=email]').type("yoga@studio.com")
    cy.get('input[formControlName=password]').type(`${"test!1234"}{enter}{enter}`)

    cy.url().should('include', '/sessions')
  })

  it('Login failed because of incorrect login and password', () => {
    cy.intercept('POST', '/api/auth/login', {
      statusCode: 401,
      body: {
        fixture: 'invalidLogin.json'
      }
    })

    cy.get('input[formControlName=email]').type("notyoga@studio.com")
    cy.get('input[formControlName=password]').type(`${"test"}{enter}{enter}`)

    cy.url().should('include', '/login')
    cy.get('.error').contains('An error occurred')
  })
});