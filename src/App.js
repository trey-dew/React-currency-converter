import { useState, useEffect } from 'react';
import './App.css';
import CurrencyInput from './currencyInput';
import axios from 'axios';

var historyArray = [];

function App() {

const [amount1, setAmount1] = useState(1);
const [amount2, setAmount2] = useState(1);
const [currency1, setCurrency1] = useState('USD')
const [currency2, setCurrency2] = useState('EUR')
const [rates, setRates] = useState([]);

const url = 'http://data.fixer.io/api/latest?access_key=';



useEffect(() =>{
  axios.get(url)
  .then(response => {
    setRates(response.data.rates);
  })
}, []);

useEffect(() => {
  if(!!rates){
    handleAmount1Change(1);
  }
}, [rates]);

function format(number){
  return number.toFixed(4);
}

function handleAmount1Change(amount1){
  setAmount2(format(amount1 * rates[currency2]/ rates[currency1]));
  setAmount1(amount1);
  historyCalculator()
}

function handleCurrency1Change(currency1){
  setAmount2(format(amount1 * rates[currency2]/ rates[currency1]));
  setCurrency1(currency1);
  historyCalculator()
}

function handleAmount2Change(amount2){
  setAmount1(format(amount2 * rates[currency1]/ rates[currency2]));
  setAmount2(amount2);
  historyCalculator()
}

function handleCurrency2Change(currency2){
  setAmount1(format(amount2 * rates[currency1]/ rates[currency2]));
  setCurrency2(currency2);
  historyCalculator()
}

function historyCalculator()
{
  var historyElement = amount1 + " " + currency1 + " " + " = " + amount2 + " " + currency2;
  historyArray.unshift(historyElement);  

}

  return (
    <div >
      
      <h1>Currency Converter</h1>       
      <CurrencyInput 
        onAmountChange={handleAmount1Change}
        onCurrencyChange={handleCurrency1Change}
        currencies={Object.keys(rates)} 
        amount={amount1} 
        currency={currency1}/>

      <CurrencyInput
        onAmountChange={handleAmount2Change}
        onCurrencyChange={handleCurrency2Change} 
        currencies={Object.keys(rates)} 
        amount={amount2} 
        currency={currency2}/>

      <h2>History</h2>      
      <ul>
        {historyArray.map((item,index) =>
          <li key={index}>{item}</li>
        )}
      </ul>      
    </div>
  );
}

export default App;