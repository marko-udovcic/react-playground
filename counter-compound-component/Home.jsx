import { createContext, useContext, useState } from "react";
import Nav from "../components/Nav";

const CounterContext = createContext();

//Counter.jsx
function Counter({ children }) {
  const [count, setCount] = useState(0);
  const increase = () => setCount((c) => c + 1);
  const decrease = () => setCount((c) => c - 1);

  return (
    <CounterContext.Provider value={{ increase, decrease, count }}>
      <span>{children}</span>
    </CounterContext.Provider>
  );
}

function Count() {
  const { count } = useContext(CounterContext);
  return <span className="text-white">{count}</span>;
}
function Label({ children }) {
  return <span>{children}</span>;
}

function Increase({ icon }) {
  const { increase } = useContext(CounterContext);
  return (
    <button onClick={increase} className="text-white">
      {icon}
    </button>
  );
}
function Decrease({ icon }) {
  const { decrease } = useContext(CounterContext);
  return (
    <button onClick={decrease} className="text-white">
      {icon}
    </button>
  );
}

Counter.Count = Count;
Counter.Label = Label;
Counter.Increase = Increase;
Counter.Decrease = Decrease;

function Home() {
  return (
    <>
      <Counter>
        <Counter.Label>Title</Counter.Label>
        <Counter.Increase icon="+" />
        <Counter.Decrease icon="-" />
        <Counter.Count />
      </Counter>
    </>
  );
}

export default Home;
