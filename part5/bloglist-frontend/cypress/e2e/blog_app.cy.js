const user = {
    name: 'Cypress Testing',
    username: 'cypress_testing',
    password: 'cypress_password',
}

const blog = {
    title: 'The title of my blog',
    author: 'Arthur Bloggs',
    url: 'awesomesite.com',
}

const secondUser = {
    name: 'A Different User',
    username: 'second_user',
    password: 'second_password',
}

const secondBlog = {
    title: "Not Cypress Testing's blog!",
    author: 'A Different Author',
    url: 'rubbishsite.com',
}

describe('Blog app', () => {
    beforeEach(function () {
        cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
        cy.request('POST', `${Cypress.env('BACKEND')}/users`, user)
        cy.visit('')
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

    describe('When logged in', function () {
        beforeEach(function () {
            cy.login(user)
        })

        it('A blog can be created', function () {
            const { title, author, url } = blog
            cy.contains('New post').click()
            cy.get('#title').type(title)
            cy.get('#author').type(author)
            cy.get('#url').type(url)
            cy.get('#blog-button').click()

            cy.contains(blog.title)
        })

        describe('And a blog exists', function () {
            beforeEach(function () {
                cy.createBlog(blog)
                cy.visit('')
            })

            it('The blog can be liked', function () {
                cy.contains('Show details').click()
                cy.contains('Likes: 0')
                cy.get('#like-button').click()
                cy.contains('Likes: 1')
            })

            it('The creator can delete it', function () {
                cy.contains('Show details').click()
                cy.get('#remove-button').click()

                cy.contains(blog.title).should('not.exist')
            })

            describe('And another user has created a blog', function () {
                this.beforeEach(function () {
                    cy.createBlogForAnotherUser(secondUser, secondBlog)
                })

                it('The first user cannot see the delete button', function () {
                    // code to check that delete button does not show
                    cy.contains(secondBlog.title)
                        .parent()
                        .contains('Show details')
                        .click()
                    cy.contains(secondBlog.title)
                        .parent()
                        .should('not.have.descendants', '#remove-button')
                })

                it('The blog with the most likes is displayed first', function () {
                    cy.contains(secondBlog.title)
                        .parent()
                        .contains('Show details')
                        .click()
                    cy.contains(secondBlog.title)
                        .parent()
                        .find('#like-button')
                        .click()

                    cy.get('.blog').should(($blog) => {
                        expect($blog.first()).to.contain(secondBlog.title)
                    })
                })
            })
        })
    })
})
