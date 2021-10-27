
import axios from "axios"

const url = `http://localhost:3001/persons`

export const getAll = () => {
    const response = axios.get(url)
    return response.then(res=>res.data)
}

export const postItem = (newItem) => {
    const response = axios.post(url,newItem)
    return response.then(res=>res.data)
}


