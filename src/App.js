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
  return (
    <div className="add-form">
      <h3>What do we need to pack?</h3>
    </div>
  );
}

function List() {
  return (
    <div className="list">
      <ul>
        {initialItems.map((item) => (
          <Item item={item} />
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
