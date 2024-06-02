describe('Session deletion spec', () => {
    beforeEach(() => {
        cy.fixture('sessions').then((sessions) => {
            cy.intercept({method: 'GET', url: '/api/session',}, sessions).as('sessions')
        })
        cy.fixture('session').then((session) => {
            cy.intercept({method: 'GET', url: '/api/session/1',}, session).as('session')
        })
        cy.fixture('teacher').then((teacher) => {
            cy.intercept({method: 'GET', url: '/api/teacher/1',}, teacher).as('teacher')
        })

        cy.adminLogin()
    });

    it('Session deleted successfully', () => {
        cy.contains('span', 'Detail').click();

        cy.url().should('include', '/sessions/detail/1')

        cy.intercept({method: 'DELETE', url: '/api/session/1',}, {statusCode: 200})

        cy.contains('span', 'Delete').click();

        cy.url().should('include', '/sessions')
        cy.get('.mat-simple-snack-bar-content').contains("Session deleted !")
    });
});