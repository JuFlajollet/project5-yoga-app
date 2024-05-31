describe('Session deletion spec', () => {
    beforeEach(() => {
        cy.adminLogin()
    
        cy.fixture('sessions').then((sessions) => {
            cy.intercept({method: 'GET', url: '/api/session',}, [sessions]).as('session')
        })
    });

    it('Session deleted successfully', () => {

    });
});