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

export default Item;
