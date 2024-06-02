describe('Session modification spec', () => {
    beforeEach(() => {
        cy.fixture('sessions').then((sessions) => {
            cy.intercept({method: 'GET', url: '/api/session'}, sessions).as('sessions')
        })
        
        cy.adminLogin()

        cy.fixture('session').then((session) => {
            cy.intercept({method: 'GET', url: '/api/session/1'}, session).as('session')
        })
        cy.fixture('teachers').then((teachers) => {
            cy.intercept({method: 'GET', url: '/api/teacher'}, teachers).as('teachers')
        })

        cy.contains('span', 'Edit').click()

        cy.url().should('include', '/sessions/update/1')
    })

    it('Session modified successfully', () => {
        cy.get('input[formControlName=name]').type("Test session update")
        cy.get('input[formControlName=date]').type("2024-06-01")
        cy.get('mat-select[formControlName=teacher_id]').click().get('mat-option').contains('Hélène THIERCELIN').click()
        cy.get('textarea[formControlName=description]').type("Test session update")
    
        cy.fixture('updatedSession').then((session) => {
            cy.intercept({method: 'PUT', url: '/api/session'}, session)
        })

        cy.get('button[type=submit]').click()

        cy.url().should('include', '/sessions')
        cy.get('.mat-simple-snack-bar-content').contains("Session updated !")
    })

    it('Display error if missing required form field', () => {
        cy.get('input[formControlName=name]').type("")

        cy.contains('span', 'Save').click()

        cy.get('input[formControlName=name]').should('have.class','ng-invalid')
        cy.get('button[type=submit]').should('be.disabled')
    })
});