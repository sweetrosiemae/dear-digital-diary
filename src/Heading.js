import flowerIcon from './assets/flowerIcon.png';

function Heading() {
    return (   
        <div className="headerContainer">   
            <div className="flowerSpinner">
                <img src={flowerIcon} alt="spinning 70s style flower"/>
            </div>
            <h1>Dear Digital Diary</h1>
        </div>  
    )
}

export default Heading;