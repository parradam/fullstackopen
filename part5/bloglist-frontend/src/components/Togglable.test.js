import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Togglable from './Togglable'

describe('togglable', () => {
    let container

    beforeEach(() => {
        container = render(
            <Togglable revealLabel="show" hideLabel="hide">
                <div className="testDiv">togglable content</div>
            </Togglable>
        ).container
    })

    test('renders children', async () => {
        await screen.findAllByText('togglable content')
    })

    test('initially children are not displayed', async () => {
        const div = container.querySelector('.togglableContent')
        expect(div).toHaveStyle('display: none')
    })

    test('after clicking show button, children are displayed', async () => {
        const user = userEvent.setup()
        const showButton = screen.getByText('show')
        await user.click(showButton)

        const div = container.querySelector('.togglableContent')
        expect(div).not.toHaveStyle('display: none')
    })

    test('after clicking hide button, children are not displayed', async () => {
        const user = userEvent.setup()
        const showButton = screen.getByText('show')
        await user.click(showButton)

        const hideButton = screen.getByText('hide')
        await user.click(hideButton)

        const div = container.querySelector('.togglableContent')
        expect(div).toHaveStyle('display: none')
    })
})
