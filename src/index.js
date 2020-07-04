import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Winner from './Components/Winner';
function Square(props) {
    const winningSquareStyle = {
        backgroundColor: '#ccc'
    };
    return (
        <button className="square" onClick={props.click} style={props.winningSquare ? winningSquareStyle : null}>
            {props.value}
        </button>
    );
}

function Board(props) {

    //rendering squres

    const renderSquare = (i) => {
        let winningSquare = props.winner && props.winner.includes(i) ? true : false;
        return <Square
            value={props.squares[i]}
            click={() => props.onClick(i)}
            winningSquare={winningSquare} />;
    }

    return (
        <div className="board">
            <div className="board-row">
                {renderSquare(0)}
                {renderSquare(1)}
                {renderSquare(2)}
            </div>
            <div className="board-row">
                {renderSquare(3)}
                {renderSquare(4)}
                {renderSquare(5)}
            </div>
            <div className="board-row">
                {renderSquare(6)}
                {renderSquare(7)}
                {renderSquare(8)}
            </div>
        </div>
    );

}

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null),
            }],
            stepNumber: 0,
            xIsNext: true,
            mode: 1
        }
    }
    handleClick = (i) => {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = [...current.squares];
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        if (computerPlayer) {
            let computerMove = computerPlayer(squares, i);
            squares[computerMove] = this.state.xIsNext ? 'O' : 'X';
            console.log(squares[computerMove]);
        }

        this.setState({
            history: history.concat([{ squares: squares }]),
            stepNumber: history.length,
            //xIsNext: !this.state.xIsNext,

        });
    }
    singlePlayer = (squares) => {

    }
    doublePlayer = () => {

    }
    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0
        });
    }

    reset = () => {
        this.setState({
            history: [{
                squares: Array(9).fill(null),
            }],
            stepNumber: 0,
            xIsNext: true
        });
    }
    back = () => {
        const history = this.state.history.slice(0, this.state.stepNumber);

        if (history.length > 0) {
            this.setState({ history: history, stepNumber: history.length - 1 });
        }

    }
    render() {

        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winnerObj = calculateWinner(current.squares);

        let winner;
        if (winnerObj) {
            winner = winnerObj.winner;
        }
        let winnerComp;
        if (winner) {
            // status = 'Winner: ' + winner;
            winnerComp = (<Winner winner={winner} reset={this.reset} />);
        }

        return (
            <div className="game">
                <div className="heading">Tic Tac Toe</div>
                <div className="game-board">
                    <Board
                        squares={current.squares}
                        onClick={this.handleClick}
                        winner={winnerObj && winnerObj.winningSquares} />
                </div>
                <div className="game-info">
                    <button className="btn" onClick={this.reset}>Reset</button>
                    <button className="btn" onClick={this.back}>Go Back</button>
                    {winnerComp}
                </div>
            </div>
        );
    }
}



ReactDOM.render(
    <Game />,
    document.getElementById('root')
);
//helper function
function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];

        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {

            return { winner: squares[a], winningSquares: lines[i] };
        }
    }
    return null;
};
function computerPlayer(squares, index) {
    let random;

    console.log(index);
    if (calculateWinner(squares)) {
        return false;
    }
    if (index === 4) {
        random = Math.floor(Math.random() * squares.length);
        if (squares[random]) {
            return computerPlayer(squares, index);
        } else {
            return random;
        }
    } else if (squares[4] === null) {
        return 4;
    } else {
        let corners = [0, 2, 6, 8];
        for (let i = 0; i < corners.length; i++) {
            if (squares[corners[i]] == null) {
                console.log(corners[i])
                return corners[i];
            }
        }
        let compArr = [];
        for (let i = 0; i < squares.length; i++) {
            if (squares[i] == null) {
                compArr.push(i)
            }
        }
        console.log(compArr);
        random = Math.floor(Math.random() * compArr.length);
        return compArr[random];
    }
};