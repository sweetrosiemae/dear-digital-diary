import './sass/App.scss';
import firebase from './firebase';
import axios from 'axios';

import Heading from './Heading.js';
import DiaryEntryForm from './DiaryEntryForm';
import Diary from './Diary.js';


import { useState, useEffect } from 'react';

function App() {
  //initialize state for the diary entries within the digital diary
  const [entryArray, setEntryArray] = useState([]);
  //initialize a state for the text input
  const [textInput, setTextInput] = useState('');
  //initialize a state for the title input
  const [titleInput, setTitleInput] = useState('');
  //initialize a state for the date input
  const [dateInput, setDateInput] = useState('');
  //initialize a state for the one word input
  const [oneWordInput, setOneWordInput] = useState('');

  const [giphy, setGiphy] = useState([]);

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

  const handleOneWordInput = (event) => {
    setOneWordInput(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    axios({
      method: 'GET',
      url: '//api.giphy.com/v1/gifs/search',
      dataResponse: 'JSON',
      params: {
          api_key: 'nvw7hevoBD8qy6VrKgrSxLTmYbJIiRUS',
          q: {oneWordInput},
          limit: 1
      }
  }).then(response => {
      response = response.data.data
      setGiphy(response);
      console.log(response);
  })

    setTextInput("");
    setTitleInput("");
    setDateInput("");
    setOneWordInput("");

    dbRef.push({
      title: titleInput,
      entry: textInput,
      date: dateInput,
      word: oneWordInput
    })
  }


  //define useEffect hook
  useEffect( () => {

  //initiate the Firebase event listener -> the .on() method
  dbRef.on('value', (data) => {

    //save the database object within a variable
    const entryData = data.val();
    //create a variable equal to an empty array
    const entryDiary = [];
    //use a for-in loop to traverse this object and push the diary entries into the empty array AKA entryDiary
    //also use the .push() method to create a unique key for all diary entries
    for (let entryKey in entryData) {
      entryDiary.push({
        uniqueKey: entryKey,
        id:entryData[entryKey] 
      });
    }
    //use setEntryArray updater function to UPDATE STATE with the value of entries created
    setEntryArray(entryDiary);
  })
  }, []);

  //delete an entry from the diary
  const handleClick = (entryKey) => {
    dbRef.child(entryKey).remove();
  }

  return (
    <div className="wrapper">
      <div className="headingInfoContainer">
        <Heading />

        {/* LET USER COMPLETE A DIARY ENTRY VIA A FORM */}
        <div className="diaryEntryFormContainer">
          <DiaryEntryForm 
            submit={handleSubmit}
            dateChange={handleDateChange}
            date={dateInput}
            titleChange={handleTitleChange}
            title={titleInput}
            textChange={handleTextChange}
            text={textInput}
            wordChange={handleOneWordInput}
            oneWord={oneWordInput}
          />
        </div>
      </div>

      {/* MAP THROUGH THE DIARY ENTRY & DISPLAY ON THE PAGE VIA A LIST */}
      <ul className="digitalDiary">
        {
          entryArray.map((entry) => {

            return(
              <div key={entry.uniqueKey}>
                <Diary 
                  // key={entry.uniqueKey}
                  title={entry.id.title}
                  date={entry.id.date}
                  entry={entry.id.entry}
                />

                {
                  giphy.map((gif) => {
                    return(
                        <div key={gif.id}>
                            <img src={gif.images.fixed_height.url} alt={gif.title} />
                        </div>
                    )
                  })
                }

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
