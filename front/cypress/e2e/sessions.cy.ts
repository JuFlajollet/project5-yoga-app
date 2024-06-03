import dayjs from "dayjs"

describe('Sessions spec', () => {
    beforeEach(() => {
        cy.fixture('sessions').then((sessions) => {
            cy.intercept({method: 'GET', url: '/api/session',}, sessions).as('session')
        })
    })

    it('Display list of sessions', () => {
        cy.adminLogin()

        cy.get('.item').should('have.length', 2)

        cy.fixture('sessions').then((sessions) => {
            cy.get('.items mat-card-title').eq(0).should('contain.text', `${sessions[0].name}`)
            cy.get('.items mat-card-subtitle').eq(0).should('contain.text', `Session on ${dayjs(sessions[0].date).format("MMMM D, YYYY")}`)
            cy.get('.items mat-card-content').eq(0).should('contain.text', `${sessions[0].description}`)

            cy.get('.items mat-card-title').eq(1).should('contain.text',  `${sessions[1].name}`)
            cy.get('.items mat-card-subtitle').eq(1).should('contain.text', `Session on ${dayjs(sessions[1].date).format("MMMM D, YYYY")}`)
            cy.get('.items mat-card-content').eq(1).should('contain.text', `${sessions[1].description}`)
        })
    })

    it('Display Create and Edit button if user is admin', () => {
        cy.adminLogin()

        cy.get(`button[routerLink="create"]`).should('exist')
        cy.contains('button','Edit').should('exist')
    })

    it('Absence of Create and Edit button if user is not admin', () => {
        cy.regularLogin()

        cy.get(`button[routerLink="create"]`).should('not.exist')
        cy.contains('button','Edit').should('not.exist')
    })
})