import React from 'react'
import './Winner.css';
function Winner(props) {
    return (
        <div className="winner">
            <div>winner: "{props.winner}"</div>
            <button className="playAgainBtn" onClick={props.reset}>Play Again</button>
        </div>
    )
}

export default Winner
