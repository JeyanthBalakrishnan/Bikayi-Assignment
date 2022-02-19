import React, {useState, useEffect} from 'react';
import '../style.css';

const WinnersList = () => {
    const [elements, setElements] = useState([])
    const [category, setCategory] = useState('All');
    const [year, setYear] = useState("")

    const[finalYear, setFinalYear] = useState(-1)

    const handleCategoryChange = (category) => {
       setCategory(category);
       console.log(category);
   }

   const handleYearChange = (year) => {
        
        setYear(year);
        console.log(year);
    }

    const handleSubmit =(event) => {
        event.preventDefault()
        if(year === "-1") {
            setFinalYear(-1)
            setYear("")
            return
        }
        let finalYearTemp = -1
        try {
            console.log("Came here")
            finalYearTemp = parseInt(year)
            if( year < 1900 || year > 2018) {
                alert("Please enter a valid year.")
            }
        }
        catch (error) {
            setYear("")
            setFinalYear(0)
            alert("Please enter a valid year.")
        }
        setFinalYear(finalYearTemp)
        setYear("")
        console.log(finalYear)

    }


     const buildWinners = async () => {
        const url = 'http://api.nobelprize.org/v1/prize.json';
        const response = await fetch(url);
        const data = await response.json();
        let toShow = []

        if(category === 'All') {
            if(finalYear !== -1) {
                console.log(finalYear)
                toShow = data.prizes && data.prizes.filter(prize => parseInt(prize.year) == finalYear)
            }
            else
                toShow = data.prizes && data.prizes.filter(prize => parseInt(prize.year) >= 1900 && parseInt(prize.year) <= 2018)
            setElements(toShow)
            return;
        }
        if(finalYear !== -1) {
            console.log(finalYear)
            toShow = data.prizes && data.prizes.filter(prize => prize.category === category && parseInt(prize.year) == finalYear)
        
        }
        else
            toShow = data.prizes && data.prizes.filter(prize => prize.category === category && parseInt(prize.year) >= 1900 && parseInt(prize.year) <= 2018)
        setElements(toShow)
        // console.log(finalWinners)

    }

    useEffect(() => {
        buildWinners()
    },  [category, finalYear])

    console.log(elements)
    return (
        <div style={{margin: "0 auto"}}>
            <div className='dropdown-list-category'>
                <select name="category" value={category} onChange={event => handleCategoryChange(event.target.value)}>
                    <option value='All'>All</option>
                    <option value='chemistry'>Chemistry</option>
                    <option value='economics'>Economics</option>
                    <option value='literature'>Literature</option>
                    <option value='peace'>Peace</option>
                    <option value='physics'>Physics</option>
                    <option value='medicine'>Medicine</option>
                </select>
                <div>
                    <form onSubmit={handleSubmit}>
                        <label>Enter year to filter by year or enter -1 to remove year filter</label>
                        <input value={year} onChange={event => handleYearChange(event.target.value)}/>
                        <input type="submit" value = "submit"/>
                    </form>
                </div>

            </div>
            <div className='entire-list' 
                style={{
                    display: "flex",
                    direction: "row",
                    flexWrap: "wrap",
                    flexBasis: 4
                }}
            >
                {elements && elements.map( (post, i) => 
                    (
                    <div key={i}  className='nobel-prize-winner'>
                        <h3 className='year-cat'>
                            { post.year + " " }
                            { post.category }
                        </h3>
                        <ul>
                        {
                            post.laureates && post.laureates.map( person =>
                            <li key={person.id}>
                                {person.firstname + " " + person.surname}
                            </li>)
                            }
                        </ul> 
                    </div>
                    
                    )
                )}
                        
            </div>
        </div>
    )
}
export default WinnersList