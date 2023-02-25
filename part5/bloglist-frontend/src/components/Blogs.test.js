import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blogs from './Blogs'

describe('blog - rendering', () => {
    let container

    beforeEach(() => {
        const blogs = [
            {
                id: 1,
                title: 'title',
                author: 'arthur',
                url: 'url.com',
                likes: 100,
            },
        ]

        container = render(<Blogs blogs={blogs} />).container
    })

    test('renders content', () => {
        const initialElement = screen.getByText('title - arthur')
        expect(initialElement).toBeDefined()
    })

    test('initially additional content is not displayed', () => {
        const div = container.querySelector('.togglableContent')
        expect(div).toHaveStyle('display: none')
    })
})

describe('blog - like API', () => {
    test('clicking like button twice calls event handler twice', async () => {
        const blogs = [
            {
                id: 1,
                title: 'title',
                author: 'arthur',
                url: 'url.com',
                likes: 100,
            },
        ]

        const handleLikeBlog = jest.fn()
        const user = userEvent.setup()

        render(<Blogs blogs={blogs} handleLikeBlog={handleLikeBlog} />)

        const likeButton = screen.getByText('Like')
        await user.click(likeButton)
        await user.click(likeButton)

        expect(handleLikeBlog).toHaveBeenCalledTimes(2)
    })
})
