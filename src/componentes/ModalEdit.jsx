/* eslint-disable react/prop-types */
import React, {useState} from 'react';
import { Button, Modal, Form} from 'semantic-ui-react'
import { MdCreate } from 'react-icons/md';
import {updateNote} from '../firebase/firestore';
export const ModalEdit = ({note, arrayNotes, setArrayNotes}) => {
  const  exampleReducer = (state, action) => {
    switch (action.type) {
      case 'close':
        return { open: false }
      case 'open':
        return { open: true, size: action.size }
      case 'save':
        return{ open: false };
      default:
        throw new Error('Unsupported action...')
    }
  }
  const [state, dispatch] = React.useReducer(exampleReducer, {
    open: false,
    size: undefined
  })
  const { open, size } = state
  const editNote = (e) => {
    e.preventDefault();
    updateNote(note.id, {title: e.target.title.value, description:e.target.description.value})
    .then((response) => {
      const temp = [...arrayNotes];
      temp.forEach(element => {
        if(element.id === note.id){
          element.title = e.target.title.value;
          element.description = e.target.description.value;          
          setArrayNotes(temp);
        }
      });
    })
    .catch((error) => {
    });
    dispatch({ type: 'save'})
  }
  return (
    <>
    <MdCreate className='edit-icon' size='1.3em' onClick={() => dispatch({ type: 'open', size: 'mini'})}></MdCreate>
      <Modal
        size={size}
        open={open}
        onClose={() => dispatch({ type: 'close' })}
      >
        <Modal.Content>
          <Form onSubmit={editNote}>
                <Form.Field>
                  <input placeholder='Title' defaultValue={note.title} id='title'/>
                </Form.Field>
                <Form.Field>
                  <textarea className='noteDescrip' placeholder='Description' id='description' defaultValue={note.description}></textarea>
                </Form.Field>
                <Modal.Actions>
                  <Button type = "button" color='red' onClick={() => dispatch({ type: 'close' })}>Cancel</Button>
                  <Button type = "submit" color='green'>Save Chages</Button>
                </Modal.Actions>
            </Form>
        </Modal.Content>
      </Modal>
    </>
  )
}