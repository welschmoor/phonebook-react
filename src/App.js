import React, { useState, useEffect } from 'react'
import axios from 'axios'
import uniqid from 'uniqid'

import Searchinput from "./phoneComponents/Searchinput"
import Form from "./phoneComponents/Form"
import Personlist from "./phoneComponents/Personlist"
import {getAll, postItem} from './services/persons.js'  // getAll(), create(newItem)
import Notification from './phoneComponents/Notification'


const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newPhone, setNewPhone] = useState('')
    const [filter, setFilter] = useState('')  // only show contacts whose name .includes(filter) string
    const [notification, setNotification] = useState(null)
    const [error, setError] = useState(null)


    // fetching all data on mount
    useEffect(()=> {
      let unsub = false
      
      getAll().then(data => {if (!unsub) {setPersons(data)}}).catch(error=>console.error(error))
      
      return () => {unsub = true}
    },[])
  

    const submitHandler = (e) => {
      e.preventDefault()

      // checking for duplicates
      let duplicate = false
      persons.forEach(each => {
        if (each.name.toLowerCase() === newName.toLowerCase()) {duplicate = true};
      })

      if (duplicate) {
        if (window.confirm('Do you want to change the number?')) {
          const ourPerson = persons.find(each => each.name.toLowerCase() === newName.toLowerCase())
          const updatedPerson = { ...ourPerson, number: newPhone }
          axios
          .put(`http://localhost:3001/persons/${ourPerson.id}`, updatedPerson )
          .then(res=> {
            setPersons(persons.map(each=> each.name === ourPerson.name ? updatedPerson : each ))
          }).catch(error=>{
            console.log(updatedPerson)
            setError(`${updatedPerson.name} no longer in phone book!`)
            setTimeout(()=>{
              setError(null)
            }, 4000)
          })
          return
        }
        alert(`name ${newName} already exists!`)
        setNewName('')
        setNewPhone('')
        return
      } //


      const newContact = {name: newName.trim(), number: newPhone.trim(), id: uniqid() }
      postItem(newContact)
      .then(data=> {
        setPersons([...persons, data ])
        setNewName('')
        setNewPhone('')   
        setNotification(`${data.name} added to contacts!`) 
        setTimeout(()=>{
          setNotification(null)
        }, 4000)   
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
        <Notification message={notification} whatkind={"success"} />
        <Notification message={error} whatkind={"error"} />
        <Form sending={{submitHandler, newName, inputHandler, inputHandler2, newPhone}}/>
        <br/>
    
        <h2>Numbers</h2>

        <Personlist sending={{filter, persons, deleteHandler }}/>

    </center>
    )
}

export default App
