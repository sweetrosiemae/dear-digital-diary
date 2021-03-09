import './App.scss';
import firebase from './firebase';

import Heading from './Heading.js';
import DiaryEntryForm from './DiaryEntryForm';
import Diary from './Diary.js';

import { useState, useEffect } from 'react';
import GiphyPic from './GiphyPic';



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

  //define handle 'date/title/text' Change event handlers
  const handleDateChange = (event) => {
    setDateInput(event.target.value);
  }

  const handleTitleChange = (event) => {
    setTitleInput(event.target.value);
  }

  const handleTextChange = (event) => {
    setTextInput(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    // if (titleInput === "") {
    //   alert(`Please fill out the diary entry 'Title'`);
    // }if (dateInput === "") {
    //   alert(`Please fill out the diary entry 'Date'`);
    // }if (textInput === "") {
    //   alert(`Please fill out the diary 'Entry'`);
    // }
    
    setTextInput("");
    setTitleInput("");
    setDateInput("");

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

    //save the database object within a variable
    const entryData = data.val();

    //create a variable equal to an empty array
    const entryBook = [];

    //use a for-in loop to traverse this object and push the diary entries into the empty array AKA entryBook
    //also use the .push() method to create a unique key for all diary entries
    for (let entryKey in entryData) {
      entryBook.push({
        uniqueKey: entryKey,
        id:entryData[entryKey] 
      });
    }

    //use setEntryArray updater function to UPDATE STATE with the value of entries created
    setEntryArray(entryBook);
  })

  }, []);

  //delete an entry from the diary
  const handleClick = (entryKey) => {
    dbRef.child(entryKey).remove();
  }

  return (
    <div className="App">

      <Heading />

      {/* LET USER COMPLETE A DIARY ENTRY VIA A FORM */}
      <DiaryEntryForm 
        submit={handleSubmit}
        dateChange={handleDateChange}
        date={dateInput}
        titleChange={handleTitleChange}
        title={titleInput}
        textChange={handleTextChange}
        text={textInput}
      />

      {/* MAP THROUGH THE DIARY ENTRY & DISPLAY ON THE PAGE VIA A LIST */}
      <ul className="digitalDiary">
        {
          entryArray.map((entry) => {
            console.log(entry.uniqueKey)
            return(
              <div>
                <Diary 
                  key={entry.uniqueKey}
                  title={entry.id.title}
                  date={entry.id.date}
                  entry={entry.id.entry}
                  // deleteEntry={ () => { handleClick(entry.uniqueKey) } }
                />

                <GiphyPic />

                <button onClick={ () => { handleClick(entry.uniqueKey) } }>Delete Entry</button>

              </div>
            )
          })
        }
      </ul>


    </div>
  );
}

export default App;
