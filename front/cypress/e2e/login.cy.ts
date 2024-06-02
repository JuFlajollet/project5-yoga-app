describe('Login spec', () => {
  beforeEach(() => {
    cy.visit('/login');
  });

  it('Login successful', () => {
    cy.fixture('regularLogin').then((login) => {
      cy.intercept({method: 'POST', url: '/api/auth/login'}, login).as('login')
      cy.intercept({method: 'GET', url: '/api/session'},[]).as('session')

      cy.get('input[formControlName=email]').type(login.username)
      cy.get('input[formControlName=password]').type(`${"test!1234"}{enter}{enter}`)

      cy.url().should('include', '/sessions')
    })
  })

  it('Login failed because of incorrect login and password', () => {
    cy.fixture('invalidLogin').then((login) => {
      cy.intercept({method: 'POST', url: '/api/auth/login'},{
        statusCode: 401,
        body: {
          login
        }
      }).as('invalidLogin')

      cy.get('input[formControlName=email]').type("invalidLogin@test.com")
      cy.get('input[formControlName=password]').type(`${"test"}{enter}{enter}`)

      cy.url().should('include', '/login')
      cy.get('.error').contains('An error occurred')
    })
  })
});