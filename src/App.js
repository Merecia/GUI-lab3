import React, { useState } from 'react';
import style from './App.module.scss';
import Button from './components/Button/Button';
import Input from './components/Input/Input';
import Popup from './components/Popup/Popup';

function App() {

  const [functionIndex, setFunctionIndex] = useState('1');
  const [x, setX] = useState(null);
  const [results, setResults] = useState(null);
  const [modal, setModal] = useState(false);

  const togglePopup = () => setModal(!modal);
  const radioButtonChangeHandler = event => setFunctionIndex(event.target.value);
  const pointInputChangeHandler = event => setX(event.target.value);

  const f1 = x => 10 ** (1 + x ** 2) - 10 ** (1 - x ** 2);
  const f2 = x => Math.tan(3 * x - 156) + Math.tan(x) - 4 * Math.sin(x);

  const formula1 = <span>10<sup>1+x<sup>2</sup></sup> - 10<sup>1-x<sup>2</sup></sup></span>
  const formula2 = <span>tg(3x-156) + tgx - 4sinx</span>

  function calculateButtonClickHandler() {

    if (isValid()) calculate();

    else togglePopup();

  }

  function inputKeyPressHandler(event) {

    if (event.key === 'Enter') {

      if (isValid()) calculate();

      else togglePopup();

    }

  }

  function calculate() {

    const results = {}

    results.x = x;

    switch (functionIndex) {

      case '1':
        results.y = f1(x);
        results.formula = formula1;
        setResults(results);
        break;

      case '2':
        results.y = f2(x);
        results.formula = formula2;
        setResults(results);
        break;

      default:
        setResults(null);

    }

  }

  const isValid = () => /^-?\d+$/.test(x);

  function renderResults() {

    const { x, y, formula } = results;

    return <div className={style.Results}>

      <hr />

      <p> f(x) = {formula} </p>

      <p> x = {x} </p>

      <p> f({x}) = {y} </p>

    </div>

  }

  return (
    <div className={style.App}>

      {
        modal &&
        <Popup
          handleClose={togglePopup}
          text='You entered incorrect data. You should enter the number'
        />
      }

      <div className={style.Form}>

        <div className={style.Top}>

          <p> Select a function from the list below: </p>

          <ul className={style.FunctionList}>

            <li className={style.FunctionList__Item}>

              <input
                type='radio'
                value="1"
                checked={functionIndex === '1' ? true : false}
                onChange={radioButtonChangeHandler}
              />

              <span className={style.Function}>
                {formula1}
              </span>

            </li>

            <li className={style.FunctionList__Item}>

              <input
                type='radio'
                value="2"
                checked={functionIndex === '2' ? true : false}
                onChange={radioButtonChangeHandler}
              />

              <span className={style.Function}>
                {formula2}
              </span>

            </li>

          </ul>

          <Input
            placeholder="Enter x"
            value={x}
            onChange={pointInputChangeHandler}
            onKeyPress={inputKeyPressHandler}
            width='90%'
          />

          <Button
            isActive={x ? true : false}
            onClick={calculateButtonClickHandler}
            color='Blue'
            width='90%'
            height='50px'
          >
            Calculate
          </Button>

        </div>

        <div className={style.Bottom}>

          {results ? renderResults() : null}

        </div>

      </div>

    </div>
  )

}

export default App