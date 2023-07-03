import { useState } from 'react';
import Header from './components/Header';
import Form from './components/Form';
import List from './components/List';
import Footer from './components/Footer';
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

  function clearItems() {
    const confirmed = window.confirm('Are you sure you want to delete your list?');
    if (confirmed) setItemList([]);
  }

  return (
    <div className="App">
      <Header />
      <Form onAddItems={handleAddItems} />
      <List items={itemList} onRemoveItem={handleRemoveItem} onItemPacked={handleItemPacked} clearItems={clearItems} />
      <Footer items={itemList} />
    </div>
  );
}

export default App;
