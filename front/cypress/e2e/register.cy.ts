describe('register spec', () => {
  beforeEach(() => {
    cy.visit('/register');
  });

  it('Register successful', () => {
    cy.intercept('POST', '/api/auth/register', {
      body: {
        fixture: 'register.json'
      },
    })

    cy.get('input[formControlName=firstName]').type("toto")
    cy.get('input[formControlName=lastName]').type("toto")
    cy.get('input[formControlName=email]').type("toto3@toto.com")
    cy.get('input[formControlName=password]').type(`${"test!1234"}{enter}{enter}`)
    
    cy.url().should('include', '/login')
  })

  it('Register cannot be submitted because email is not valid', () => {
    cy.get('input[formControlName=firstName]').type("toto")
    cy.get('input[formControlName=lastName]').type("toto")
    cy.get('input[formControlName=email]').type("toto")
    cy.get('input[formControlName=password]').type(`${"test!1234"}{enter}{enter}`)
    
    cy.url().should('include', '/register')
    cy.get(':button').should('be.disabled')
  })
})