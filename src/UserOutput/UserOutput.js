import React from 'react';

const userOutput = (props) =>{
    return (
        <div>
            <p>What is your username?</p>
            <p> It is {props.user}</p>
        </div>
    );
};

export default userOutput;