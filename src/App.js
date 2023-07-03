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
      <Footer items={itemList} />
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
  const [sort, setSort] = useState('input');

  function setSortedStatus(e) {
    setSort(e.target.value);
  }

  let sortedItems;

  if (sort === 'input') {
    sortedItems = items;
  }

  if (sort === 'name') {
    sortedItems = items.slice().sort((a, b) => a.item.localeCompare(b.item));
  }

  if (sort === 'packed') {
    sortedItems = items.slice().sort((a, b) => Number(a.packed) - Number(b.packed));
  }

  return (
    <div className="list">
      <ul>
        {sortedItems.map((item) => (
          <Item item={item} key={item.id} onRemoveItem={onRemoveItem} onItemPacked={onItemPacked} />
        ))}
      </ul>

      <div className="actions">
        <select value={sort} onChange={setSortedStatus}>
          <option value="input">Sort by input order</option>
          <option value="name">Sort by name</option>
          <option value="packed">Sort by packed status</option>
        </select>
      </div>
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

function Footer({ items }) {
  if (!items.length) {
    return (
      <footer className="stats">
        <em>Start adding items to your packing list</em>
      </footer>
    );
  }

  let numItems = items.length;
  let numPacked = items.filter((item) => item.packed).length;
  let percentPacked = Math.round((numPacked / numItems) * 100);

  return (
    <footer className="stats">
      <em>
        {percentPacked === 100
          ? 'You have everything packed. Have a great trip!'
          : `You have ${numItems} items on your list, and have packed ${numPacked} items so far (${percentPacked}%) for your trip`}
      </em>
    </footer>
  );
}

export default App;
