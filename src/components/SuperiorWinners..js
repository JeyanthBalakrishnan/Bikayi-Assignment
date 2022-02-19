import React, {useState, useEffect} from 'react';
import '../style.css';

const SuperiorWinners = () => {
    const [winnerNames, setWinnerNames] = useState([])

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
        <div className='superior-list'>
            <h3 className='superior-header'>Nobel Laureates with more than 1 Awards</h3>
            {winnerNames && winnerNames.map( (winner, index) =>(
                
            <ul key={index}>
               
               <div key={index} className=''>{winner}</div>
            </ul>
        ))}
        </div>
    )
}
export default SuperiorWinners