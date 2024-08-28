import { useState } from "react";
export default function Form({ onAddItems }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  {
    /*  
      The handleSubmit function ensures to disable the default behaviour of forms within 
      html so that the page doesn't reload when adding new elements, i.e., no page reload.
    */
  }
  function handleSubmit(e) {
    e.preventDefault();
    if (!description) return;
    const newItems = { description, quantity, packed: false, id: Date.now() };
    console.log(newItems);

    setDescription("");
    setQuantity("");
    onAddItems(newItems);
  }

  return (
    <form class="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your trip ?</h3>
      <select
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      >
        {/* Creating form elements */}
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Item..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button>Add</button>
    </form>
  );
}
