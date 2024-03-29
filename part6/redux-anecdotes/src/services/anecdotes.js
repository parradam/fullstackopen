import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const createNew = async (content) => {
    const object = { content, votes: 0 }
    const response = await axios.post(baseUrl, object)
    return response.data
}

const updateVotes = async (id) => {
    const getResponse = await axios.get(`${baseUrl}/${id}`)
    const currentAnecdote = getResponse.data
    const putResponse = await axios.put(`${baseUrl}/${id}`, {
        ...currentAnecdote,
        votes: currentAnecdote.votes + 1,
    })
    return putResponse.data
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, createNew, updateVotes }
