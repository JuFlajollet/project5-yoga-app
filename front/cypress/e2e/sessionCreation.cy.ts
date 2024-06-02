describe('Session creation spec', () => {
    beforeEach(() => {
        cy.fixture('sessions').then((sessions) => {
            cy.intercept({method: 'GET', url: '/api/session',}, sessions).as('sessions')
        })
        cy.fixture('teachers').then((teachers) => {
            cy.intercept({method: 'GET', url: '/api/teacher',}, teachers).as('teachers')
        })

        cy.adminLogin()
    })

    it('Session created successfully', () => {
        cy.contains('span', 'Create').click();

        cy.url().should('include', '/sessions/create')

        cy.get(':button').should('be.disabled');
        cy.get('input[formControlName=name]').type("Test session creation")
        cy.get('input[formControlName=date]').type("2024-06-01")
        cy.get('mat-select[formControlName=teacher_id]').click().get('mat-option').contains('Hélène THIERCELIN').click();
        cy.get('textarea[formControlName=description]').type("Test session creation")

        cy.fixture('createdSession').then((session) => {
            cy.intercept({method: 'POST', url: '/api/session',}, session)
        })

        cy.get('button[type=submit]').click();

        cy.url().should('include', '/sessions')
        cy.get('.mat-simple-snack-bar-content').contains("Session created !")
    })

    it('Display error if missing required form field', () => {
        cy.contains('span', 'Create').click();

        cy.url().should('include', '/sessions/create')

        cy.get('input[formControlName=name]').click()
        cy.contains('span', 'Save').click();

        cy.get('input[formControlName=name]').should('have.class','ng-invalid');
        cy.get('button[type=submit]').should('be.disabled');
    })
});