import { useState } from 'react';
import Item from './Item';

function List({ items, onRemoveItem, onItemPacked, clearItems }) {
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
        <button onClick={clearItems}>Clear All Items</button>
      </div>
    </div>
  );
}

export default List;
