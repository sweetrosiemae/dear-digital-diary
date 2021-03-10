import { Link } from 'react-scroll';

function DiaryEntryForm( {submit, dateChange, date, titleChange, title, textChange, text, oneWord, wordChange}) {
    return (
        <form action="" onSubmit={submit} className="diaryEntryForm">
            <label htmlFor="dateInput">Date:</label>
            <input 
            type="date" 
            name="dateInput"
            className="dateInput"
            id="dateInput" 
            required 
            onChange={dateChange} 
            value={date}/>

            <label htmlFor="titleInput">Title:</label>
            <input 
            type="text" 
            name="titleInput"
            className="titleInput"
            id="titleInput" 
            required 
            onChange={titleChange} 
            value={title}/>

            <label htmlFor="textInput">Make an entry:</label>
            <textarea 
            type="text" 
            name="textInput"
            className="textInput"
            id="textInput" 
            required 
            onChange={textChange} 
            value={text}/>

            <label htmlFor="giphyInput">Pick one word that best describes your mood:</label>
            <input 
            type="text" 
            name="giphyInput" 
            className="giphyInput"
            id="giphyInput" 
            value={oneWord} 
            onChange={wordChange}/>
            
            <div className="buttons">
                <button>Save Entry</button>
                <Link activeClass="active" to="digitalDiary" smooth={true} offset={-70} duration={500}>
                    <button>Open Diary</button>
                </Link>
            </div>

        </form>
    )
}

export default DiaryEntryForm;