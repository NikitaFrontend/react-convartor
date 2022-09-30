import React from 'react';
import { Block } from './Block';
import './index.scss';

function App() {
  const [rates, setRates] = React.useState({});
  const [fromСurrency, setFromСurrency] = React.useState('RUB');
  const [toСurrency, setToСurrency] = React.useState('USD');
  const [fromPrice, setFromPrice] = React.useState('');
  const [toPrice, setToPrice] = React.useState('');

  React.useEffect(() => {
    fetch('https://cdn.cur.su/api/latest.json')
      .then((res) => res.json())
      .then((json) => setRates(json.rates))
      .catch((err) => {
        console.warr(err);
        alert('не удалось получить информацию');
      });
  }, []);

  const onChangeValueFrom = (value) => {
    const price = value / rates[fromСurrency];
    const result = price * rates[toСurrency];
    setToPrice(result.toFixed(3));
    setFromPrice(value);
  };

  const onChangeValueTo = (value) => {
    const result = (rates[fromСurrency] / rates[toСurrency]) * value;
    setFromPrice(result.toFixed(3));
    setToPrice(value);
  };

  React.useEffect(() => {
    onChangeValueFrom(fromPrice);
  }, [fromСurrency]);

  React.useEffect(() => {
    onChangeValueTo(toPrice);
  }, [toСurrency]);

  return (
    <div className="App">
      <Block
        value={fromPrice}
        currency={fromСurrency}
        onChangeCurrency={setFromСurrency}
        onChangeValue={onChangeValueFrom}
      />
      <Block
        value={toPrice}
        currency={toСurrency}
        onChangeCurrency={setToСurrency}
        onChangeValue={onChangeValueTo}
      />
    </div>
  );
}

export default App;
