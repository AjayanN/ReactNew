import React from 'react';


const userInput = (props) =>{
    return (
        <div>
            <p>Change User name</p>
            <input type= "text" onChange={props.changed} value={props.user} />
        </div>
    );
};

export default userInput;