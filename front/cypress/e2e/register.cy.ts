describe('register spec', () => {
  beforeEach(() => {
    cy.visit('/register');
  });

  it('Register successful', () => {
    cy.fixture('register').then((user) => {
      cy.intercept({method: 'POST', url: '/api/auth/register'}, user).as('newUser')

      cy.get('input[formControlName=firstName]').type(user.firstName)
      cy.get('input[formControlName=lastName]').type(user.lastName)
      cy.get('input[formControlName=email]').type(user.username)
      cy.get('input[formControlName=password]').type(`${"test!1234"}{enter}{enter}`)

      cy.url().should('include', '/login')
    })
  })

  it('Register cannot be submitted because email is not valid', () => {
    cy.fixture('invalidRegister').then((user) => {
      cy.get('input[formControlName=firstName]').type(user.firstName)
      cy.get('input[formControlName=lastName]').type(user.lastName)
      cy.get('input[formControlName=email]').type(user.username)
      cy.get('input[formControlName=password]').type(`${"test!1234"}{enter}{enter}`)
    
      cy.url().should('include', '/register')
      cy.get(':button').should('be.disabled')
    })
  })
})