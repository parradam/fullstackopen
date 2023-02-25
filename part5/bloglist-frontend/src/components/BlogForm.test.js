import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

describe('blog form', () => {
    test('form calls event handler with correct data on submit', async () => {
        const newBlog = {
            title: 'title',
            author: 'arthur',
            url: 'url.com',
        }

        const createBlog = jest.fn()
        const user = userEvent.setup()

        render(<BlogForm createBlog={createBlog} />)

        const titleInput = screen.getByPlaceholderText('Enter a title...')
        const authorInput = screen.getByPlaceholderText('Enter the author...')
        const urlInput = screen.getByPlaceholderText('Enter a URL...')

        await user.type(titleInput, newBlog.title)
        await user.type(authorInput, newBlog.author)
        await user.type(urlInput, newBlog.url)

        const submitButton = screen.getByText('Create')
        await user.click(submitButton)

        expect(createBlog).toHaveBeenCalledTimes(1)
        expect(createBlog).toHaveBeenCalledWith(newBlog)
    })
})
