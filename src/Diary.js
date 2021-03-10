function Diary({title, date, entry, url, alt}) {
    return (
        <li className="diaryEntry">
            <h2>{title}</h2>
            <h3>{date}</h3>
            <p>{entry}</p>
            <div className="gifHolder">
                <img src={url} alt={alt}/>
            </div>
        </li>
    )
}

export default Diary;