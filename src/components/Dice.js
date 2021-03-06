import React, { useState } from 'react';
// import firebase from '../Firebase';

export default function Dice() {
    const [face, setFace] = useState(6);
    const [total, setTotal] = useState("Rodar 3x dados:");
    let result = 0;
    let a;

    function rollDice() {
        let min = 1;
        a = (Math.floor(Math.random() * (parseInt(face) - min + 1) + min));
        result += a;
        return `${a}`
    }

    function rollThreeTimes() {
        setTotal(`${rollDice()} + ${rollDice()} + ${rollDice()} = ${result}`);
        a = 0;
        result = 0;
    }

    return (
        <div>
            <label htmlFor="author">{total}</label>
            <input type="number" className="form-control" name="author" value={face} onChange={e => setFace(e.target.value)} placeholder="Player" min="1" max="100"/><br></br>
            <button className="btn btn-success" onClick={rollThreeTimes}>Rodar 3x D6</button>
        </div>
    )
}