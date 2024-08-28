export default function Stats({ items }) {
  if (!items.length) {
    return (
      <p className="stats">
        <em> Start Adding some items to your packing list 🤑</em>
      </p>
    );
  }
  const numItems = items.length;
  const numPacked = items.filter((item) => item.packed).length;
  const percetagePacked = Math.round((numPacked / numItems) * 100);
  return (
    <footer className="stats">
      <em>
        {percetagePacked === 100
          ? "You have packed everything! You are ready to go 🧳"
          : `📃You have ${numItems} items on your list, and you already packed
        ${numPacked} (${percetagePacked}%)`}
      </em>
    </footer>
  );
}
