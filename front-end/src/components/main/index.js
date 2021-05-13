import React from 'react';
import AddNote from './addNote';
import Notes from './notes';

const Main = () => {
  return (
    <div className="flex w-100 mb-4">
      <Notes />
      <AddNote />
    </div>
  )
}

export default Main;
