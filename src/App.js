import './App.css';
import firebase from './firebase';

import Heading from './Heading.js';

import { useState } from 'react';
import { useEffect } from 'react';



function App() {

  //initialize state for the diary entries within the digital diary
  const [entryArray, setEntryArray] = useState([]);

  //initialize a state for the text input
  const [textInput, setTextInput] = useState('');

  //initialize a state for the title input
  const [titleInput, setTitleInput] = useState('');

  //initialize a state for the date input
  const [dateInput, setDateInput] = useState('');

  //reference our database and save in a variable
  const dbRef = firebase.database().ref();

  //define handleChange event handler
  const handleChange = (event) => {
    setTextInput(event.target.value);
    setTitleInput(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    setTextInput("");
    setTitleInput("");
    dbRef.push({
      title: titleInput,
      entry: textInput,
      date: dateInput
    })
  }

  //define useEffect hook
  useEffect( () => {

  //initiate the Firebase event listener -> the .on() method
  dbRef.on('value', (data) => {
    console.log(data.val());

    //save the database object within a variable
    const entryData = data.val();

    //create a variable equal to an empty array
    const entryBook = [];

    //use a for-in loop to traverse this object and push the diary entries into the empty array AKA entryBook
    //also use the .push() method to create a unique key for all diary entries
    for (let entryKey in entryData) {
      entryBook.push({
        uniqueKey: entryKey,
        title:entryData[entryKey] 
      });
    }
    // console.log(entryBook);

    //use setEntryArray updater function to UPDATE STATE with the value of entries created
    setEntryArray(entryData);
    console.log(entryData);
  })

  }, []);

  return (
    <div className="App">

      <Heading />

      <form action="" onSubmit={handleSubmit}>

        <label htmlFor="diaryDate">Date:</label>
        <input type="date" id="diaryDate" onChange={handleChange} value={dateInput}/>

        <label htmlFor="diaryTitle">Title:</label>
        <input type="text" id="diaryTitle" onChange={handleChange} value={titleInput}/>

        <label htmlFor="diaryEntry">Make an entry:</label>
        <textarea type="text" id="diaryEntry" onChange={handleChange} value={textInput}/>
        
        <button>Save Entry</button>

      </form>

      <ul className="digitalDiary">


      </ul>

    </div>
  );
}

export default App;
