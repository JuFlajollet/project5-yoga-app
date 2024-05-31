describe('Session creation spec', () => {
    beforeEach(() => {
        cy.fixture('sessions').then((sessions) => {
            cy.intercept({method: 'GET', url: '/api/session',}, [sessions]).as('session')
        })

        cy.adminLogin()
    })

    it('Session created successfully', () => {
        cy.contains('span', 'Create').click();

        cy.get(':button').should('be.disabled');
        cy.get('input[formControlName=name]').type("Test session creation")
        cy.get('input[formControlName=date]').type("2024-06-01")
        cy.get('input[formControlName=teacher]').click().get('mat-option').contains('Hélène THIERCELIN').click();
        cy.get('input[formControlName=description]').type("Test session creation")

        cy.contains('span', 'Save').click();

        cy.url().should('include', '/sessions')
        cy.get('matSnackBar').should('exist');
    })

    it('Display error if missing required form field', () => {
        cy.contains('span', 'Create').click();

        cy.get('input[formControlName=name]').click()
        cy.contains('span', 'Save').click()

        cy.get('input[formControlName=name]').should('have.class','mat-form-field-invalid');
        cy.contains('span', 'Save').should('be.disabled')
    })
});