import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import CardApp from './card.js';
const pizzaData = [
  {
    name: 'Focaccia',
    ingredients: 'Bread with italian olive oil and rosemary',
    price: 6,
    photoName: 'pizzas/focaccia.jpg',
    soldOut: false,
  },
  {
    name: 'Pizza Margherita',
    ingredients: 'Tomato and mozarella',
    price: 10,
    photoName: 'pizzas/margherita.jpg',
    soldOut: false,
  },
  {
    name: 'Pizza Spinaci',
    ingredients: 'Tomato, mozarella, spinach, and ricotta cheese',
    price: 12,
    photoName: 'pizzas/spinaci.jpg',
    soldOut: false,
  },
  {
    name: 'Pizza Funghi',
    ingredients: 'Tomato, mozarella, mushrooms, and onion',
    price: 12,
    photoName: 'pizzas/funghi.jpg',
    soldOut: false,
  },
  {
    name: 'Pizza Salamino',
    ingredients: 'Tomato, mozarella, and pepperoni',
    price: 15,
    photoName: 'pizzas/salamino.jpg',
    soldOut: true,
  },
  {
    name: 'Pizza Prosciutto',
    ingredients: 'Tomato, mozarella, ham, aragula, and burrata cheese',
    price: 18,
    photoName: 'pizzas/prosciutto.jpg',
    soldOut: false,
  },
];

function App() {
  return (
    <div className="container">
      <Header />
      <Menu />
      <Footer />
    </div>
  );
}
function Header() {
  return (
    <header className="header">
      <h1>Fast Food</h1>;
    </header>
  );
}
function Menu() {
  const numPizzas = pizzaData.length;
  // const numPizzas = 0;
  return (
    // <></> fragment: when you dont want one more parent(wrap error)

    <main className="menu">
      {numPizzas > 0 ? (
        <>
          <p>Some text</p>
          <div className="pizzas">
            {pizzaData.map(pizza => (
              <Pizza pizzaObject={pizza} key={pizza.name} />
            ))}
          </div>
        </>
      ) : (
        <p>Still working on our menu</p>
      )}
    </main>
  );
}
function Pizza({ pizzaObject }) {
  console.log(pizzaObject);
  // if (props.pizzaObject.soldOut) return null; don't display pizza which is sold out
  return (
    <div className={`pizza ${pizzaObject.soldOut ? 'sold-out' : ''}`}>
      {/* add class sold out to pizza class */}
      <img src={pizzaObject.photoName} alt={pizzaObject.name} />
      <div>
        <h3>{pizzaObject.name}</h3>
        <p>{pizzaObject.ingredient}</p>
        <p>{pizzaObject.soldOut ? <span>Sold out</span> : pizzaObject.price}</p>
      </div>
    </div>
  );
}
function Footer() {
  const isOpen = true;
  const closeHour = 20;
  //&& operator if isOpen is true than render some text
  // return <footer>{isOpen && new Date().toLocaleTimeString()} footer description</footer>;
  return (
    // <footer className="footer">{isOpen ? <Order closeHour={closeHour} /> : <p>Currently we are closed</p>}</footer>
    <footer className="footer">{isOpen ? <Order closeHour={closeHour} /> : <p>Currently we are closed</p>}</footer>
  );
}
//destructuring props ---> closeHour but we need use {argument}
function Order({ closeHour }) {
  return (
    <div className="order">
      <p>open until {closeHour}</p>
      <button className="btn">Order</button>
    </div>
  );
}
// const Test =()=>{}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <CardApp />
  </React.StrictMode>
);
