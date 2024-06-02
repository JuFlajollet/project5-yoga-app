import dayjs from "dayjs";

describe('Account spec', () => {
    beforeEach(() => {
        cy.intercept({method: 'GET', url: '/api/session',},[]).as('session')
    });

    it('Access admin account info', () => {
        cy.adminLogin()

        cy.fixture('adminUser').then((user) => {
            cy.intercept({method: 'GET', url: '/api/user/1',}, user).as('user')
            
            cy.contains('span', 'Account').click()
            
            cy.get('h1').contains(`User information`)
            cy.get('mat-card-content').contains(`Name: ${user.firstName} ${user.lastName.toUpperCase()}`)
            cy.get('mat-card-content').contains(`Email: ${user.email}`)
            cy.get('.my2').contains(`You are admin`)
            cy.get('.p2').contains(`Create at: ${dayjs(user.createdAt).format("MMM DD, YYYY")}`)
            cy.get('.p2').contains(`Last update: ${dayjs(user.updatedAt).format("MMM DD, YYYY")}`)
            cy.get('.my2 :button').should('not.exist')
        })
    })

    it('Access regular user account info', () => {
        cy.regularLogin()

        cy.fixture('regularUser').then((user) => {
            cy.intercept({method: 'GET', url: '/api/user/2',}, user).as('user')

            cy.contains('span', 'Account').click()

            cy.get('h1').contains('User information')
            cy.get('mat-card-content').contains(`Name: ${user.firstName} ${user.lastName.toUpperCase()}`)
            cy.get('mat-card-content').contains(`Email: ${user.email}`)
            cy.get('.p2').contains(`Create at: ${dayjs(user.createdAt).format("MMM DD, YYYY")}`)
            cy.get('.p2').contains(`Last update: ${dayjs(user.updatedAt).format("MMM DD, YYYY")}`)
            cy.get('.my2 :button').should('exist')
            cy.get('.my2 :button').contains('Detail')
        })
    })
})