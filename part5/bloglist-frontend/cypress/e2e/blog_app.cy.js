describe('template spec', () => {
    beforeEach(function () {
        cy.request('POST', 'http://localhost:3000/api/testing/reset')
        cy.visit('http://localhost:3000')
    })

    it('Login form can be opened', function () {
        cy.contains('Show login').click()
    })
})
