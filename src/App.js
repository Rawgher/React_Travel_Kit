import { useState } from 'react';
import './App.css';

const initialItems = [
  { id: 1, description: 'Passports', quantity: 2, packed: false },
  { id: 2, description: 'Socks', quantity: 12, packed: false },
  { id: 3, description: 'Charger', quantity: 1, packed: true },
];

function App() {
  return (
    <div className="App">
      <Header />
      <Form />
      <List />
      <Footer />
    </div>
  );
}

function Header() {
  return <h1>Packing List 🛫</h1>;
}

function Form() {
  const [item, setItem] = useState('');
  const [amount, setAmount] = useState(1);

  function handleInputChange(e) {
    setItem(e.target.value);
  }

  function handleSelectChange(e) {
    setAmount(Number(e.target.value));
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!item) return;

    const newItem = { item, amount, packed: false, id: Date.now() };
    console.log(newItem);

    setItem('');
    setAmount(1);
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do we need to pack?</h3>
      <select value={amount} onChange={handleSelectChange}>
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input type="text" placeholder="Item Name..." value={item} onChange={handleInputChange} />
      <button>Add</button>
    </form>
  );
}

function List() {
  return (
    <div className="list">
      <ul>
        {initialItems.map((item) => (
          <Item item={item} key={item.id} />
        ))}
      </ul>
    </div>
  );
}

function Item({ item }) {
  return (
    <li>
      <span style={item.packed ? { textDecoration: 'line-through' } : {}}>
        {item.quantity} {item.description}
      </span>
      <button>❌</button>
    </li>
  );
}

function Footer() {
  return (
    <footer className="stats">
      <em>You have X items on your list, and you have packed X (X%) for your trip</em>
    </footer>
  );
}

export default App;
