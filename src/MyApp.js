import React, {useState, useEffect} from 'react'
import Form from './Form';
import Table from './Table';
import axios from 'axios';

function MyApp() {
  const [characters, setCharacters] = useState([]);
 
  useEffect(() => {
    fetchAll().then( result => {
       if (result)
          setCharacters(result);
     });
 }, [] );

 async function fetchAll(){
  try {
     const response = await axios.get('http://localhost:5000/users');
     return response.data.users_list;     
  }
  catch (error){
     //We're not handling errors. Just logging into the console.
     console.log(error); 
     return false;         
  }
}

  async function makePostCall(person){
    try {
      const response = await axios.post('http://localhost:5000/users', person);
      return response;
    }
    catch (error) {
      console.log(error);
      return false;
    }
  }

  function updateList(person) { 
    makePostCall(person).then( result => {
      if (result && result.status === 201) {
        person = result.data;
        setCharacters([...characters, person]);
        console.log(result.data);
      }
      console.log(characters);
    });
  }

  async function makeDeleteCall(person) {
    try {
      console.log("REEEEE " + person.id);
      const response = await axios.delete('http://localhost:5000/users/' + person.id);
      return response
    }
    catch (error) {
      console.log(error);
      return false;
    }
  }

  function deletePerson(index) {
    const person = characters[index];
    makeDeleteCall(person).then( result => {
      if (result && result.status === 204) {
        removeOneCharacter(index);
      } else {
        console.log("delete of " + person + " is unsuccessful.");
      }
    });
  }


  function removeOneCharacter(index) {
    const updated = characters.filter((character, i) => {
      return i !== index
    });
    setCharacters(updated)
  }

  return (
    <div className="container">
      <Table characterData={characters} removeCharacter={deletePerson} />
      <Form handleSubmit={updateList} />
    </div>
  )
}

export default MyApp;
