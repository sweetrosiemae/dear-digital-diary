function Diary({title, date, entry}) {
    return (
        <li>
            <h2>{title}</h2>
            <h3>{date}</h3>
            <p>{entry}</p>
        </li>
    )
}

export default Diary;