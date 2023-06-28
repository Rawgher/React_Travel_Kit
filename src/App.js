import { useState } from 'react';
import './App.css';

function App() {
  const [itemList, setItemList] = useState([]);

  function handleAddItems(newItem) {
    setItemList((itemList) => [...itemList, newItem]);
  }

  function handleRemoveItem(id) {
    setItemList((itemList) => itemList.filter((item) => item.id !== id));
  }

  function handleItemPacked(id) {
    setItemList((itemList) => itemList.map((item) => (item.id === id ? { ...item, packed: !item.packed } : item)));
  }

  return (
    <div className="App">
      <Header />
      <Form onAddItems={handleAddItems} />
      <List items={itemList} onRemoveItem={handleRemoveItem} onItemPacked={handleItemPacked} />
      <Footer />
    </div>
  );
}

function Header() {
  return <h1>Packing List 🛫</h1>;
}

function Form({ onAddItems }) {
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
    onAddItems(newItem);

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

function List({ items, onRemoveItem, onItemPacked }) {
  return (
    <div className="list">
      <ul>
        {items.map((item) => (
          <Item item={item} key={item.id} onRemoveItem={onRemoveItem} onItemPacked={onItemPacked} />
        ))}
      </ul>
    </div>
  );
}

function Item({ item, onRemoveItem, onItemPacked }) {
  return (
    <li>
      <input type="checkbox" value={item.packed} onChange={() => onItemPacked(item.id)} />
      <span style={item.packed ? { textDecoration: 'line-through' } : {}}>
        {item.amount} {item.item}
      </span>
      <button onClick={() => onRemoveItem(item.id)}>❌</button>
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
