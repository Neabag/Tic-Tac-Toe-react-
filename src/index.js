import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Winner from './Components/Winner';
function Square(props) {
    return (
        <button className="square" onClick={props.click}>
            {props.value}
        </button>
    );
}

function Board(props) {

    //rendering squres
    const renderSquare = (i) => {
        return <Square
            value={props.squares[i]}
            click={() => props.onClick(i)} />;
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
            xIsNext: true
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
        this.setState({
            history: history.concat([{ squares: squares }]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext,

        });
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
            this.setState({ history: history, stepNumber: history.length - 1, xIsNext: !this.state.xIsNext });
        }

    }
    render() {

        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);

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
                        onClick={this.handleClick} />
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
            return squares[a];
        }
    }
    return null;
}