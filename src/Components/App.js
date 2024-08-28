import { useState } from "react";
import Logo from "./Logo";
import Form from "./Form";
import PackingList from "./PackingList";
import Stats from "./Stats";

/* eslint-disable no-lone-blocks */
const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: true },
  { id: 2, description: "Socks", quantity: 12, packed: false },
  { id: 3, description: "Charger", quantity: 12, packed: false },
];

export default function App() {
  const [items, setItems] = useState([]);

  function handleAddItems(item) {
    //Create new array with the old array plus the new items.
    setItems((items) => [...items, item]);
  }

  function handleDeleteItem(id) {
    console.log(id);
    setItems((items) => items.filter((item) => item.id !== id));
  }

  function handleToggleItem(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  function deleteItems(id) {
    const confirmed = window.confirm(
      "Are you sure you want to delete all items"
    );
    if (confirmed) {
      setItems([]);
    }
  }

  return (
    <div className="App">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList
        items={items}
        onDeleteItem={handleDeleteItem}
        onToggleItem={handleToggleItem}
        ondeleteItems={deleteItems}
      />
      <Stats items={items} />
    </div>
  );
}
