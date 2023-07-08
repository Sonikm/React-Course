import { useState } from "react";
import Logo from "./Logo";
import Form from "./Form";
import PackingList from "./PackingList";
import State from "./State";

const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 4, packed: false },
  { id: 3, description: "Shirt", quantity: 8, packed: false },
  { id: 4, description: "Water bottle", quantity: 1, packed: false },
];

export default function App() {
  const [items, setItems] = useState(initialItems);
  // const [items, setItems] = useState([]);

  function handleAddItems(newItem) {
    setItems((item) => [...item, newItem]);
  }

  function handleDeleteItems(id) {
    setItems(items.filter((item) => item.id !== id));
  }

  function handleToggleItem(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  function handleClearList() {
    const confirmed = window.confirm(
      "Are you sure you want to delete all items?"
    );
    if (confirmed) setItems([]);
    else return;
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList
        items={items}
        onDeleteItem={handleDeleteItems}
        onToggleItem={handleToggleItem}
        onClearList={handleClearList}
      />
      <State items={items} />
    </div>
  );
}
