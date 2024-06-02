describe('Session information spec', () => {
    beforeEach(() => {
        cy.fixture('sessions').then((sessions) => {
            cy.intercept({method: 'GET', url: '/api/session'}, sessions).as('sessions')
        })
        cy.fixture('session').then((session) => {
            cy.intercept({method: 'GET', url: '/api/session/1'}, session).as('session')
        })
        cy.fixture('teacher').then((teacher) => {
            cy.intercept({method: 'GET', url: '/api/teacher/1'}, teacher).as('teacher')
        })
    })
    
    it('Display information of session correctly', () => {
        cy.adminLogin()
        
        cy.contains('span', 'Detail').click();

        cy.url().should('include', '/sessions/detail/1')
    })

    it('Display Delete button if user is admin', () => {
        cy.adminLogin()

        cy.contains('span', 'Detail').click();

        cy.url().should('include', '/sessions/detail/1')
        cy.contains('span', 'Delete').should('exist')
    })

    it('Absence of Delete button if user is not admin', () => {
        cy.regularLogin()

        cy.contains('span', 'Detail').click();

        cy.url().should('include', '/sessions/detail/1')
        cy.contains('span', 'Delete').should('not.exist')
    })
});