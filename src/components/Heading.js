import React from "react";
import '../style.css';

export default class Heading extends React.Component{

    render(){
        return(
            <div>
                <div className="header">
                    <h1>List Of Nobel Laureates</h1>
                </div>
                <div className="dropdowns">
                    <select id='category-dropdown'>
                        <option value='chemistry'>Chemistry</option>
                        <option value='economics'>Economics</option>
                        <option value='literature'>Literature</option>
                        <option value='peace'>Peace</option>
                        <option value='physics'>Physics</option>
                        <option value='medicine'>Medicine</option>
                    </select>
                </div>
            </div>
        )
    }
}