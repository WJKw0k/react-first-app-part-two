import React, {useState} from 'react'
import Form from './Form';
import Table from './Table';

function MyApp() {
  const [characters, setCharacters] = useState([
    {
      name: 'Charlie',
      job: 'Janitor',
       // the rest of the data
    },
  ]);
  
  function removeOneCharacter(index) {
    const updated = characters.filter((character, i) => {
      return i !== index
    });
    setCharacters(updated)
  }

  return (
    <div className="container">
      <Table characterData={characters} removeCharacter={removeOneCharacter} />
      <Form />
    </div>
  )
}

export default MyApp;
