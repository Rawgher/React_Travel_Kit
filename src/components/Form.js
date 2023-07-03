import { useState } from 'react';

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

export default Form;
