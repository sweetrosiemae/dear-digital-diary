function DiaryEntryForm( {submit, dateChange, date, titleChange, title, textChange, text}) {
    return (
        <form action="" onSubmit={submit}>
            <label htmlFor="dateInput">Date:</label>
            <input type="date" name="dateInput" id="dateInput" required onChange={dateChange} value={date}/>

            <label htmlFor="titleInput">Title:</label>
            <input type="text" name="titleInput" id="titleInput" required onChange={titleChange} value={title}/>

            <label htmlFor="textInput">Make an entry:</label>
            <textarea type="text" name="textInput" id="textInput" required onChange={textChange} value={text}/>
            
            <button>Save Entry</button>
        </form>
    )
}

export default DiaryEntryForm;