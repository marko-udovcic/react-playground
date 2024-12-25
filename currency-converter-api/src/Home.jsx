import { useEffect } from "react";
import { useState } from "react";
export default function Home() {
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [convertedAmount, setConvertedAmount] = useState(0);
  const [isloading, setIsLoading] = useState(false);

  useEffect(() => {
    async function convertCurrency() {
      setIsLoading(true);
      const response = await fetch(
        `https://api.frankfurter.app/latest?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`,
      );
      const data = await response.json();
      setConvertedAmount(data.rates[toCurrency]);
      setIsLoading(false);
    }
    if (fromCurrency === toCurrency) return setConvertedAmount(amount);
    convertCurrency();
  }, [amount, fromCurrency, toCurrency]);

  return (
    <div>
      <input
        type="text"
        className="m-5"
        disabled={isloading}
        value={amount}
        onChange={(e) => {
          setAmount(e.target.value);
        }}
      />
      <select className="m-5" onChange={(e) => setFromCurrency(e.target.value)} value={fromCurrency}>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="GBP">GBP</option>
        <option value="CAD">CAD</option>
      </select>
      <select className="m-5" onChange={(e) => setToCurrency(e.target.value)} value={toCurrency}>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="GBP">GBP</option>
        <option value="CAD">CAD</option>
      </select>
      {isloading && <h1 className="text-white m-5">Loading...</h1>}
      <h1 className="text-white m-5 text-xl">
        {convertedAmount} {toCurrency}
      </h1>
    </div>
  );
}
