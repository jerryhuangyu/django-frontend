import React, { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'

import { ReactComponent as ArrowLeft } from '../assets/arrow-left.svg'

const NotePage = ({ match, history }) => {

  const { id } = useParams()
  const navigate = useNavigate()
  let [note, setNote] = useState(null)

  useEffect(() => {
    getNote()
  }, [id])

  let getNote = async () => {
    if (id === 'new') return
    let response = await fetch(`/api/notes/${id}/`)
    let data = await response.json()
    setNote(data)
  }

  let updateNote = async () => {
    fetch(`/api/notes/${id}/update`, {
      method: "PUT",
      headers: {
        'content-Type': 'application/json'
      },
      body: JSON.stringify(note)
    })
  }

  let createNote = async () => {
    fetch(`/api/notes/create`, {
      method: "POST",
      headers: {
        'content-Type': 'application/json'
      },
      body: JSON.stringify(note)
    })
  }

  let deleteNote = async () => {
    fetch(`/api/notes/${id}/delete`, {
      method: "DELETE",
      headers: {
        'content-Type': 'application/json'
      },
    })
    navigate('/notes/')
  }

  let handleSubmit = () => {
    if(id !== 'new' && !note.body){
      deleteNote()  
    }else if(id !== 'new'){
      updateNote()
    }else if(id === 'new' && note){
      createNote()
    }
    // console.log(note.body)

    navigate('/notes/')
  }

  let handleChange = (value) => {
    setNote(note => ({...note, 'body': value}) )
    // console.log(note)
  }

  return (
    <div className='note'>
        <div className='note-header'>
          <h3>
              <ArrowLeft onClick={handleSubmit} />
          </h3>
          {id !== 'new' ? (
            <button onClick={deleteNote}>Delete</button>
          ) : (
            <button onClick={handleSubmit}>Done</button>
          )}
        </div>
        <textarea onChange={(e) => { handleChange(e.target.value) }} defaultValue={note?.body}></textarea>
    </div>
  )
}

export default NotePage