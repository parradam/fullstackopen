const user = {
    name: 'Cypress Testing',
    username: 'cypress_testing',
    password: 'cypress_password',
}

describe('Blog app', () => {
    beforeEach(function () {
        cy.request('POST', 'http://localhost:3000/api/testing/reset')
        cy.request('POST', 'http://localhost:3003/api/users', user)
        cy.visit('http://localhost:3000')
    })

    it('Login form can be opened', function () {
        cy.contains('Show login').click()
    })

    describe('Login', function () {
        it('Succeeds with correct credentials', function () {
            cy.contains('Show login').click()
            cy.get('#username').type(user.username)
            cy.get('#password').type(user.password)
            cy.get('#login-button').click()
            cy.contains(`${user.username} signed in`)
        })

        it('Fails with incorrect credentials', function () {
            cy.contains('Show login').click()
            cy.get('#username').type('incorrect_username')
            cy.get('#password').type('incorrect_password')
            cy.get('#login-button').click()
            cy.contains('incorrect_username signed in').should('not.exist')
            cy.contains('Incorrect credentials: please try again.')
        })
    })
})
