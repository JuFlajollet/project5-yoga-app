// ***********************************************
// This example namespace declaration will help
// with Intellisense and code completion in your
// IDE or Text Editor.
// ***********************************************
// declare namespace Cypress {
//   interface Chainable<Subject = any> {
//     customCommand(param: any): typeof customCommand;
//   }
// }
//
// function customCommand(param: any): void {
//   console.warn(param);
// }
//
// NOTE: You can use it like so:
// Cypress.Commands.add('customCommand', customCommand);
//
// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add("regularLogin", () => {
    cy.visit('/login')

    cy.intercept('POST', '/api/auth/login', {
        body: {
            fixture: 'regularLogin.json'
        },
    })
  
    cy.get('input[formControlName=email]').type('test')
    cy.get('input[formControlName=password]').type(`${"test!1234"}{enter}{enter}`)

    cy.url().should('include', '/sessions')
    cy.contains('span', 'Logout').should('exist')
})

Cypress.Commands.add("adminLogin", () => {
    cy.visit('/login')

    cy.intercept('POST', '/api/auth/login', {
        body: {
            id: 1,
            username: 'userName',
            firstName: 'firstName',
            lastName: 'lastName',
            admin: true
        },
        //fixture: 'adminLogin.json'
        //},
    })
  
    cy.get('input[formControlName=email]').type('yoga@studio.com')
    cy.get('input[formControlName=password]').type(`${"test!1234"}{enter}{enter}`)
  
    cy.url().should('include', '/sessions')
    cy.contains('span', 'Logout').should('exist')
})