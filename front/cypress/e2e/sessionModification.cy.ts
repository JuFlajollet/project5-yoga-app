describe('Session modification spec', () => {
    beforeEach(() => {
        cy.fixture('sessions').then((sessions) => {
            cy.intercept({method: 'GET', url: '/api/session',}, [sessions]).as('session')
        })
        
        cy.adminLogin()
    })

    it('Session modified successfully', () => {

    })

    it('Display error if missing required form field', () => {

    })
});