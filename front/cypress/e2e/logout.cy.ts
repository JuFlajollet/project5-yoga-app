describe('Logout spec', () => {
    beforeEach(() => {
        cy.intercept({method: 'GET', url: '/api/session',},[]).as('session')

        cy.regularLogin()
    });

    it('Logout successful', () => {
        cy.contains('span', 'Logout').click()

        cy.url().should('include', '/')
        cy.contains('span', 'Register').should('exist')
        cy.contains('span', 'Login').should('exist')
    })
})