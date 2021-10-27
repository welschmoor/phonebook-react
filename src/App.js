import React, { useState, useEffect } from 'react'
import axios from 'axios'
import uniqid from 'uniqid'

import Searchinput from "./phoneComponents/Searchinput"
import Form from "./phoneComponents/Form"
import Personlist from "./phoneComponents/Personlist"
import {getAll, postItem} from './services/persons.js'  // getAll(), create(newItem)


const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newPhone, setNewPhone] = useState('')
    const [filter, setFilter] = useState('')  // only show contacts whose name .includes(filter) string
    

    useEffect(()=> {
      let unsub = false
      
      getAll().then(data => {if (!unsub) {setPersons(data)}}).catch(error=>console.error(error))
      
      return () => {unsub = true}
    },[])
  



    const submitHandler = (e) => {
      e.preventDefault()

      // checking for duplicates
      let abort = false
      persons.forEach(each => {
        if (each.name.toLowerCase() === newName.toLowerCase()) {abort = true};
      })
      if (abort) {
        alert(`name ${newName} already exists!`)
        setNewName('')
        setNewPhone('')
        return
      }


      const newContact = {name: newName, number: newPhone, id: uniqid() }
      postItem(newContact)
      .then(data=> {
        setPersons([...persons, data ])
        setNewName('')
        setNewPhone('')       
      })
    }


    const inputHandler = (e) => {
      setNewName(e.target.value)
    }
    const inputHandler2 = (e) => {
      setNewPhone(e.target.value)
    }

    const searchInputHandler = (e) => {
      setFilter(e.target.value)
    }

    const deleteHandler = (id) => {
      axios
      .delete(`http://localhost:3001/persons/${id}`)
      .then(res=>{
        setPersons(persons.filter(e=> {
          return e.id !==id 
        }))
      })
    }

    return (
    <center>
        <h1>Phonebook</h1>
        <Searchinput onChange={searchInputHandler} />
        <h2>+Add contact</h2>
        <Form sending={{submitHandler, newName, inputHandler, inputHandler2, newPhone}}/>
        <br/>
    
        <h2>Numbers</h2>

        <Personlist sending={{filter, persons, deleteHandler }}/>

    </center>
    )
}

export default App
