import React, { useState, useRef } from "react";
import SmallBoard from "./SmallBoard";
import styles from "./MainBoard.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Win from "./Win";
import ReactDOM from "react-dom";

function MainBoard() {
  const initialBoard = Array.from({ length: 3 }, () =>
    Array.from({ length: 3 }, () => "")
  );

  const trueBoard = Array.from({ length: 3 }, () =>
    Array.from({ length: 3 }, () => true)
  );

  const falseBoard = Array.from({ length: 3 }, () =>
    Array.from({ length: 3 }, () => false)
  );

  const [board, setBoard] = useState(initialBoard);
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const boardRef = useRef(null);
  const [winner, setWinner] = useState(null);
  const [currentBoard, setCurrentBoard] = useState(trueBoard);
  const playerX = useRef(null);
  const playerO = useRef(null);
  const [over, setOver] = useState(false);

  const handleMainBoard = (row, col) => {
    const newBoard = board.slice();
    newBoard[row] = board[row].slice();
    newBoard[row][col] = currentPlayer;
    setBoard(newBoard);

    if (checkWin(newBoard)) {
      while (boardRef.current.children.length > 0) {
        boardRef.current.removeChild(boardRef.current.children[0]);
      }
      setOver(true);
      playerX.current.removeChild(playerX.current.firstChild);
      playerO.current.removeChild(playerO.current.firstChild);
    }
  };

  const setCurrentSmallBoard = (row, col, flag) => {
    if (board[row][col] !== "" || flag) {
      setCurrentBoard(trueBoard);
    } else {
      const tempBoard = falseBoard.slice();
      tempBoard[row][col] = true;
      setCurrentBoard(tempBoard);
    }
  };

  const checkWin = (board) => {
    if (checkRow(board) || checkCol(board) || checkCross(board)) {
      return true;
    }
    return false;
  };

  const checkCross = (board) => {
    if (board[0][0] !== "") {
      let count = 1;
      for (let i = 1; i < 3; i++) {
        if (board[i][i] !== board[0][0]) {
          break;
        }
        count++;
      }
      if (count === 3) {
        return true;
      }
    }
    if (board[0][2] !== "") {
      let count = 1;
      for (let i = 1; i < 3; i++) {
        if (board[i][2 - i] !== board[0][2]) {
          break;
        }
        count++;
      }
      if (count === 3) {
        return true;
      }
    }
    return false;
  };

  const checkRow = (board) => {
    for (let r = 0; r < 3; r++) {
      if (board[r][0] === "") {
        continue;
      }
      let count = 1;
      for (let c = 1; c < 3; c++) {
        if (board[r][c] !== board[r][0]) {
          break;
        }
        count++;
      }
      if (count === 3) {
        return true;
      }
    }
    return false;
  };

  const checkCol = (board) => {
    for (let c = 0; c < 3; c++) {
      if (board[0][c] === "") {
        continue;
      }
      let count = 1;
      for (let r = 1; r < 3; r++) {
        if (board[r][c] !== board[0][c]) {
          break;
        }
        count++;
      }
      if (count === 3) {
        return true;
      }
    }
    return false;
  };

  return (
    <div>
      {over ? <Win winner={currentPlayer}></Win> : <></>}
      <div className={styles.playerX} ref={playerX}>
        <img
          src="cross.svg"
          className={
            currentPlayer === "X" ? styles.currentplayer : styles.nonplayer
          }
        ></img>
      </div>
      <div className={styles.board} ref={boardRef} src={winner}>
        <h2>Ultimate Tic-Tac-Toe</h2>
        <br></br>
        {board.map((row, rowIndex) => (
          <div className={styles.row} key={rowIndex}>
            {row.map((cell, col) => (
              <SmallBoard
                key={col}
                currentPlayer={currentPlayer}
                setCurrentPlayer={setCurrentPlayer}
                setMainBoard={handleMainBoard}
                rowIndex={rowIndex}
                colIndex={col}
                currentBoard={currentBoard[rowIndex][col]}
                setCurrentSmallBoard={setCurrentSmallBoard}
              ></SmallBoard>
            ))}
          </div>
        ))}
      </div>
      <div className={styles.playerO} ref={playerO}>
        <img
          src="circle.svg"
          className={
            currentPlayer === "O" ? styles.currentplayer : styles.nonplayer
          }
        ></img>
      </div>
    </div>
  );
}

export default MainBoard;
