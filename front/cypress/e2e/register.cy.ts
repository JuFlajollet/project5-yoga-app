describe('register spec', () => {
  it('Register successful', () => {
    cy.visit('/register')

    cy.intercept('POST', '/api/auth/register', {
      body: {
        id: 2,
        username: 'userName',
        firstName: 'firstName',
        lastName: 'lastName',
        admin: false
      },
    })

    cy.intercept(
      {
        method: 'GET',
        url: '/api/session',
      },
      []).as('session')

    cy.get('input[formControlName=firstName]').type("toto")
    cy.get('input[formControlName=lastName]').type("toto")
    cy.get('input[formControlName=email]').type("toto3@toto.com")
    cy.get('input[formControlName=password]').type(`${"test!1234"}{enter}{enter}`)
    
    cy.url().should('include', '/login')
  })

  it('Register failed because email is not valid', () => {
    cy.visit('/register')

    cy.intercept('POST', '/api/auth/register', {
      body: {
        id: 2,
        username: 'userName',
        firstName: 'firstName',
        lastName: 'lastName',
        admin: false
      },
    })

    cy.intercept(
      {
        method: 'GET',
        url: '/api/session',
      },
      []).as('session')

      cy.get('input[formControlName=firstName]').type("toto")
      cy.get('input[formControlName=lastName]').type("toto")
      cy.get('input[formControlName=email]').type("toto")
      cy.get('input[formControlName=password]').type(`${"test!1234"}{enter}{enter}`)
    
    cy.url().should('include', '/register')
    cy.get(':button').should('be.disabled')
  })
})