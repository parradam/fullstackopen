import axios from 'axios'
const baseUrl = '/api/persons'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = newObject => {
    const request = axios.post(baseUrl, newObject)
    return request.then(response => response.data)
}

const deletePerson = id => {
    const deleteUrl = `${baseUrl}/${id}`
    const request = axios.delete(deleteUrl)
    return request.then(response => response.data)
}

const update = (id, updatedObject) => {
    const updateUrl = `${baseUrl}/${id}`
    const request = axios.put(updateUrl, updatedObject)
    return request.then(response => response.data)
}

const phonebookService = { getAll, create, deletePerson, update }

export default phonebookService