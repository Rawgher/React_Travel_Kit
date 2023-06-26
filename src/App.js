import './App.css';

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
  return <div className="list">Packing List</div>;
}

function Footer() {
  return (
    <footer className="stats">
      <em>You have X items on your list, and you have packed X (X%) for your trip</em>
    </footer>
  );
}

export default App;
