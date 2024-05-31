describe('Session information spec', () => {
    beforeEach(() => {
        cy.fixture('sessions').then((sessions) => {
            cy.intercept({method: 'GET', url: '/api/session',}, [sessions]).as('session')
        })
    })
    
    it('Display information of session correctly', () => {

    })

    it('Display Delete button if user is admin', () => {
        cy.adminLogin()
    })

    it('Absence of Delete button if user is not admin', () => {
        cy.regularLogin()
    })
});