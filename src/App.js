import './App.css';
import { useState } from 'react'

function Square({value, onSquareClick}) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

// return X, O, or null
function calculateWinner(squares) {
  const winLines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  // for each winLine check if they have the same value
  for (let i = 0; i < winLines.length; i++) {
    const [a, b, c] = winLines[i]; // destructuring
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

// "squares" -> array representing 9 squares on tictactoe
function Board({xIsNext, squares, onPlay}) {
  const winner = calculateWinner(squares);
  let status = 'Next Player is X';
  if (winner) {
    status = 'Winner is ' + winner; 
  } else {
    status = "Next Player: " + (xIsNext ? 'X' : 'O');
  }

  function handleClick(i) {
    if (squares[i] || calculateWinner(squares)) {
      return;
    }
    const newSquares = squares.slice();
    if (xIsNext) {
      newSquares[i] = "X";
    } else {
      newSquares[i] = "O";
    }
    onPlay(newSquares);
  }
  return (
    <>
      <div>{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)}/>
        <Square value={squares[1]} onSquareClick={() => handleClick(1)}/>
        <Square value={squares[2]} onSquareClick={() => handleClick(2)}/>
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)}/>
        <Square value={squares[4]} onSquareClick={() => handleClick(4)}/>
        <Square value={squares[5]} onSquareClick={() => handleClick(5)}/>
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)}/>
        <Square value={squares[7]} onSquareClick={() => handleClick(7)}/>
        <Square value={squares[8]} onSquareClick={() => handleClick(8)}/>
      </div>
    </>
  );
}

// TODO: when a square that was initially clicked is clicked again, it overwrites it

function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquare = history[currentMove]; // !

  // run when square is clicked
  function handlePlay(newSquares) {
    
    const newHistory = [...history.slice(0, currentMove + 1), newSquares];
    setHistory(newHistory);
    setCurrentMove(newHistory.length - 1); // !
  }

  function jumpTo(move) {
    setCurrentMove(move); // !
  }
  // use .map to transform history to array of react elements
  const historyButtons = history.map((squares, i) => {
    let description = '';
    if (i == 0) {
      description = "Go to game start";
    } else if (i > 0) {
      description = "Go to move #" + i;
    }
    return (
      // link button to respective history
      <li key={i}>
        <button onClick={() => jumpTo(i)}>{description}</button>
      </li>
    )
  })

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquare} onPlay={handlePlay}/>
      </div>
      <div className="game-info">
        <ol>{historyButtons}</ol>
      </div>
    </div>
  );
}

export default Game;