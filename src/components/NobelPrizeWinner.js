import React from 'react';
import '../style.css';

export default class NobelPrizeWinner extends React.Component {

    state = {
        loading: true,
        nobelWinner: [],
    }

    async componentDidMount(){
        const url = 'http://api.nobelprize.org/v1/prize.json';
        const response = await fetch(url);
        const data = await response.json();
        this.setState({nobelWinner: data.prizes, loading: false})
    }

    render(){
        return ( <div className='loading-page'>
                {this.state.loading || !this.state.nobelWinner ?( 
                    <div>loading...</div>
                ) : ( 
                    <div className='entire-list'>
                            {this.state.nobelWinner.map( (post, i) => 
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
                    )         
        }
    </div>
    );
    }
}