import React, {useState, useEffect} from 'react';
import '../style.css';

const WinnersList = () => {
    const [winnerNames, setWinnerNames] = useState([])
    const [category, setCategory] = React.useState('');

    const handleCategoryChange = (category) => {
       setCategory(category);
       console.log(category);
   }

     const buildWinners = async () => {
        const url = 'http://api.nobelprize.org/v1/prize.json';
        const response = await fetch(url);
        const data = await response.json();
        const winnersFreq = {}
        const finalWinners = []
        data.prizes && data.prizes.forEach((prizeObject, idx) => {
            const winners = prizeObject.laureates
            winners && winners.forEach(person => {
                if (!(person.id in winnersFreq)) {
                    winnersFreq[person.id] = 0
                }
                winnersFreq[person.id] += 1
                if(winnersFreq[person.id] > 1) {
                    const name = person.firstname + " " + person.surname
                        if(name.length < 22) {
                            finalWinners.push(name)
                        }
                    }
                }
                
            )
        })
        // console.log(finalWinners)
        setWinnerNames(finalWinners)

    }

    useEffect(() => {
        buildWinners()
    },  [])

    return (
        <div className='dropdown-list'>
            <select name="category" value={category} onChange={event => handleCategoryChange(event.target.value)}>
                <option value='chemistry'>Chemistry</option>
                <option value='economics'>Economics</option>
                <option value='literature'>Literature</option>
                <option value='peace'>Peace</option>
                <option value='physics'>Physics</option>
                <option value='medicine'>Medicine</option>
            </select>
        </div>
    )
}
export default WinnerList