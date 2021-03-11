import './sass/App.scss';
import firebase from './firebase';
import axios from 'axios';
import { Link } from 'react-scroll';

import Heading from './Heading.js';
import DiaryEntryForm from './DiaryEntryForm';
import Diary from './Diary.js';

import { useState, useEffect } from 'react';

function App() {
  const [entryArray, setEntryArray] = useState([]);
  const [textInput, setTextInput] = useState('');
  const [titleInput, setTitleInput] = useState('');
  const [dateInput, setDateInput] = useState('');
  const [oneWordInput, setOneWordInput] = useState('');

  const dbRef = firebase.database().ref();

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

  //CALL THE API ONCE FORM IS SUBMITTED & PUSH FORM INFO TO FIREBASE
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
        dbRef.push({
          title: titleInput,
          entry: textInput,
          date: dateInput,
          word: oneWordInput,
          giphyUrl: response[0].images.fixed_height.url,
          giphyAlt: response[0].title
        })
    }).catch (() => {
      alert(`Oops, there's something fishy with this entry. Please try again!`);
  })
      setTextInput("");
      setTitleInput("");
      setDateInput("");
      setOneWordInput("");
  }

  useEffect( () => {

    dbRef.on('value', (data) => {
      const entryData = data.val();
      const entryDiary = [];
      //USE FOR IN LOOP TO PUSH ENTRIES INTO EMPTY ARRAY
      for (let entryKey in entryData) {
        entryDiary.push({
          uniqueKey: entryKey,
          id:entryData[entryKey] 
        });
      }
    //UPDATE STATE
    setEntryArray(entryDiary);
    })
  }, []);


  //DELETE DIARY ENTRY
  const handleClick = (entryKey) => {
    dbRef.child(entryKey).remove();
  }

  // CREATE THE DIARY ENTRY FROM A FORM ENTRY
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
      <ul className="digitalDiary" id="digitalDiary">
        {
          entryArray.map((entry) => {
            return(
              <div key={entry.uniqueKey}>
                <Diary 
                  title={entry.id.title}
                  date={entry.id.date}
                  entry={entry.id.entry}
                  url={entry.id.giphyUrl}
                  alt={entry.id.giphyAlt}
                />
                <button className="deleteButton" onClick={ () => { handleClick(entry.uniqueKey) } }>Delete Entry</button>
              </div>
            )
          })
        }
      </ul>

      <div className="scrollToTop">
        <Link to="headingInfoContainer" smooth={true} duration={800}>
          <button>Back to Top</button>
        </Link>
      </div>

      <footer>
        <p>Created at <a href="https://www.junocollege.com">Juno College</a></p>
      </footer>

    </div>
  );
}

export default App;
