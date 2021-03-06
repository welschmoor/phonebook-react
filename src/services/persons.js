

import axios from "axios"

// const url = `http://localhost:3001/persons` // json server URL
// const url = `http://localhost:3001/api/persons` // BackEndUrl
const url = `/api/persons` // Express url


export const getAll = () => {
    const response = axios.get(url, {
        headers:{
            "accepts":"application/json"
        }})
    return response.then(res=>res.data)
}

export const postItem = (newItem) => {
    const response = axios.post(url,newItem)
    return response.then(res=>res.data)
}


