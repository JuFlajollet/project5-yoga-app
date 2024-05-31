describe('Account spec', () => {
    beforeEach(() => {
        cy.intercept({method: 'GET', url: '/api/session',},[]).as('session')
    });

    it('Access admin account info', () => {
        cy.adminLogin()

        cy.contains('span', 'Account').click();

        cy.fixture('adminUser').then((user) => {
            cy.intercept({method: 'GET', url: '/api/user/1',}, user).as('user')
        })
  
        cy.get('h1').contains('User information');
        cy.get('mat-card-content').contains('Name: Admin ADMIN');
        cy.get('mat-card-content').contains('Email: yoga@studio.com');
        cy.get('.my2').contains('You are admin');
        cy.get('.p2').contains('Create at: May 29, 2024');
        cy.get('.p2').contains('Last update: May 29, 2024');
    })

    it('Access regular user account info', () => {
        cy.regularLogin()

        cy.intercept({method: 'GET', url: '/api/session',},[]).as('session')

        cy.contains('span', 'Account').click();

        cy.fixture('regularUser').then((user) => {
            cy.intercept({method: 'GET', url: '/api/user/2',}, user).as('user')
        })
  
        cy.get('h1').contains('User information');
        cy.get('mat-card-content').contains('Name: Test TEST');
        cy.get('mat-card-content').contains('Email: test@gmail.com');
        cy.get('.my2').contains('You are not admin');
        cy.get('.p2').contains('Create at: May 29, 2024');
        cy.get('.p2').contains('Last update: May 29, 2024');
    })
});