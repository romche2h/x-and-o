import "./App.css";
import { useState } from "react";

const SYMBOL_X = "X";
const SYMBOL_O = "O";

const computeWinner = (cells) => {
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
    if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
      return [a, b, c];
    }
  }
};

function App() {
  const [cells, setCells] = useState(Array(9).fill(null));
  const [currentStep, setCurrentStep] = useState(SYMBOL_O);
  const [winnerSequence, setWinnerSequence] = useState(null);
  const [moves, setMoves] = useState(0);
  const totalCells = 9;

  const getSymbolClassName = (symbol) => {
    if (symbol === SYMBOL_O) return "symbol--o";
    if (symbol === SYMBOL_X) return "symbol--x";
    return "";
  };

  const handlerClick = (index) => {
    if (cells[index] || winnerSequence) {
      return;
    }
    const cellsCopy = cells.slice();
    cellsCopy[index] = currentStep;
    const winner = computeWinner(cellsCopy);

    setCells(cellsCopy);
    setCurrentStep(currentStep === SYMBOL_O ? SYMBOL_X : SYMBOL_O);
    setWinnerSequence(winner);
    setMoves(moves + 1);
  };

  const renderSymbol = (symbol) => (
    <span className={`symbol ${getSymbolClassName(symbol)}`}>{symbol}</span>
  );

  const winnerSymbol = winnerSequence ? cells[winnerSequence[0]] : undefined;

  const clearButton = () => {
    setCells(Array(9).fill(null));
    setCurrentStep(SYMBOL_X);
    setWinnerSequence(null);
    setMoves(0);
  };

  const checkDraw = moves === totalCells && !winnerSequence;

  return (
    <div className="game">
      <div className="game-info">
        {winnerSequence ? "Выиграл" : checkDraw ? "Ничья" : "Ход"}
        {!checkDraw && renderSymbol(winnerSymbol ?? currentStep)}
      </div>
      <div className="game-field">
        {cells.map((symbol, index) => {
          const isWinner = winnerSequence?.includes(index);
          return (
            <button
              onClick={() => handlerClick(index)}
              key={index}
              className={`cell ${isWinner ? "cell--win" : ""}`}
            >
              {symbol ? renderSymbol(symbol) : null}
            </button>
          );
        })}
        <button className="clear" onClick={clearButton}>
          clear
        </button>
      </div>
    </div>
  );
}

export default App;
