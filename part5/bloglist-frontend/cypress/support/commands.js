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
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('login', ({ username, password }) => {
    cy.request('POST', `${Cypress.env('BACKEND')}/login`, {
        username,
        password,
    }).then((response) => {
        localStorage.setItem('loggedInBlogUser', JSON.stringify(response.body))
        cy.visit('')
    })
})

Cypress.Commands.add('createBlog', ({ title, author, url }) => {
    cy.request({
        url: `${Cypress.env('BACKEND')}/blogs`,
        method: 'POST',
        body: { title, author, url },
        headers: {
            Authorization: `Bearer ${
                JSON.parse(localStorage.getItem('loggedInBlogUser')).token
            }`,
        },
    })

    cy.visit('')
})

Cypress.Commands.add('createBlogForAnotherUser', function (user, blog) {
    const { name, username, password } = user
    const { title, author, url } = blog

    // Create a new user
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, {
        name,
        username,
        password,
    }).then(function () {
        // Log in new user but don't save to local storage
        cy.request('POST', `${Cypress.env('BACKEND')}/login`, {
            username,
            password,
        }).then((response) => {
            const token = response.body.token

            // Create a new blog post with the user's token
            cy.request({
                url: `${Cypress.env('BACKEND')}/blogs`,
                method: 'POST',
                body: { title, author, url },
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })

            cy.visit('')
        })
    })
})
