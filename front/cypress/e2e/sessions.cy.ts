describe('Sessions spec', () => {
    beforeEach(() => {
        cy.fixture('sessions').then((sessions) => {
            cy.intercept({method: 'GET', url: '/api/session',}, sessions).as('session')
        })
    })

    it('Display list of sessions', () => {
        cy.adminLogin()

        cy.get('.item').should('have.length', 2)

        cy.get('mat-card-title').eq(0).should('contain.text', 'session 1')
        cy.get('mat-card-subtitle').eq(0).should('contain.text', 'Session on: 2012-01-01T00:00:00.000+00:00')
        cy.get('mat-card-content').eq(0).should('contain.text', 'my first description')

        cy.get('mat-card-title').eq(1).should('contain.text', 'session 2')
        cy.get('mat-card-subtitle').eq(1).should('contain.text', 'Session on: 2012-01-01T00:00:00.000+00:00')
        cy.get('mat-card-content').eq(1).should('contain.text', 'my second description')
    })

    it('Display Create and Detail button if user is admin', () => {
        cy.adminLogin()

        cy.get('button[ng-reflect-router-link="create"]').should('exist')
        cy.get('button[ng-reflect-router-link="update,1"]]').should('exist')
        cy.get('button[ng-reflect-router-link="update,2"]]').should('exist')
    })

    it('Absence of Create and Detail button if user is not admin', () => {
        cy.regularLogin()

        cy.get('button[ng-reflect-router-link="create"]').should('not.exist')
        cy.get('button[ng-reflect-router-link="update,1"]]').should('not.exist')
        cy.get('button[ng-reflect-router-link="update,2"]]').should('not.exist')
    })
})