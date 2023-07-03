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

export default Footer;
