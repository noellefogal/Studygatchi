import { useState } from "react";
import "./App.css";

export default function ToDoList() {
  const [items, setItems] = useState([
    "Lock in time",
    "Read Chapters 2-3",
    "Write new Draft",
  ]);
  const [newItem, setNewItem] = useState("");
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>(
    () =>
      items.reduce((acc, item) => {
        acc[item] = false;
        return acc;
      }, {} as Record<string, boolean>)
  );
  const [taskToDelete, setTaskToDelete] = useState<string | null>(null);
  //null when task is not selected for deletion
  //string when we have selected the task to delete
  //start w/ null b/c user hasn't selected anything to delete when project first starts

  const addItem = (event: React.FormEvent) => {
    event.preventDefault();
    if (!newItem.trim()) return;

    setItems((prev) => [...prev, newItem]);
    setCheckedItems((prev) => ({ ...prev, [newItem]: false }));
    setNewItem("");
  };

  const checkItem = (item: string) => {
    setCheckedItems((prev) => ({ ...prev, [item]: !prev[item] }));
  };

  const removeItem = (item: string) => {
    setItems((prev) => prev.filter((i) => i !== item));
    setCheckedItems((prev) => {
      const copy = { ...prev };
      delete copy[item];
      return copy;
    });
  };

  return (
    <div>
      <div className="todolist-logo">
        <h1>Goober To Do List</h1>
      </div>

      <form className="Add-item" onSubmit={addItem}>
        <input
          type="text"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
        />
        <button className="todolist-addItem" type="submit">
          Add
        </button>
      </form>

      <ul
        style={{
          maxWidth: "400px",
          margin: "0 auto",
          listStyleType: "none",
          padding: 0,
        }}
      >
        {items.map((item) => (
          <li key={item} className="todolist-item">
            <div className="wrapper">
              <input
                type="checkbox"
                id={`checkbox-${item}`}
                name={item}
                checked={checkedItems[item]}
                onChange={() => checkItem(item)}
              />
              <label htmlFor={`checkbox-${item}`}>{item}</label>
            </div>
            <button
              className="todolist-trashbutton"
              onClick={() => setTaskToDelete(item)}
            >
              Del
            </button>
          </li>
        ))}
      </ul>
      {/*if user has selected a task to delete open taskToDelete container*/}
      {taskToDelete !== null && (
        <div className="delete-confirmation">
          {/*create textbox*/}
          <p>Are you sure you want to delete "{taskToDelete}"?</p>
          {/*create no button*/}
          <button className="delete-no-button" 
              onClick={() => setTaskToDelete(null)}>
              No
          </button>
          {/*create yes button*/}
          <button className="delete-yes-button" 
              onClick={() => {
                removeItem(taskToDelete);
                setTaskToDelete(null); 
            }}>
              Yes
          </button>
        </div>
      )}
      
    </div>
  );
}
