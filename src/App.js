import { useState } from "react";

/* eslint-disable no-lone-blocks */
const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: true },
  { id: 2, description: "Socks", quantity: 12, packed: false },
  { id: 3, description: "Charger", quantity: 12, packed: false },
];

export default function App() {
  const [items, setItems] = useState([]);

  function handleAddItems(item){
    //Create new array with the old array plus the new items.
    setItems(items => [...items, item]);
  }

  function handleDeleteItem(id){
    console.log(id);
    setItems(items=> items.filter((item) => item.id !== id));
  
  }

  function handleToggleItem(id){
    setItems((items) => items.map((item) => item.id === id ? {...item, packed: !item.packed} : item));
  }

  return (
    <div className="App">
      <Logo />
      <Form onAddItems={handleAddItems}/>
      <PackingList items={items} onDeleteItem={handleDeleteItem} onToggleItem={handleToggleItem}/>
      <Stats />
    </div>
  );
}

function Logo() {
  return <h1> 👜 Far Away ✈️</h1>;
}

function Form({onAddItems}) {
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
    const newItems = {description, quantity, packed: false, id: Date.now()};
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
function PackingList({items, onDeleteItem, onToggleItem}) {
  return (
    <div className="list">
      <ul>
        {items.map(function (item) {
          return <Item item={item} onDeleteItem={onDeleteItem} key={item.id} onToggleItem={onToggleItem}/>;
        })}
      </ul>
    </div>
  );
}
function Item({ item, onDeleteItem, onToggleItem }) {
  return (
    <li>
    <input type='checkbox' value={item.packed} onChange={() => onToggleItem(item.id)}/>
      {/* Conditionally render the css */}
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
        <button onClick={()=>onDeleteItem(item.id)}>❎</button>
      </span>
    </li>
  );
}
function Stats() {
  return (
    <footer className="stats">
      <em>📃You have X items on your list, and you already packed X (X%)</em>
    </footer>
  );
}
//
