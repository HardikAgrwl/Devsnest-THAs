import React, { useEffect, useRef, useState } from "react";
import Alert from "./Components/Alert";
import List from "./Components/List";

function App() {
  const [list, setList] = useState([]);
  const [item, setItem] = useState({ dish: "", calorie: "" });
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState(null);
  const [alert, setAlert] = useState({
    show: false,
    msg: "",
    type: "",
  });

  useEffect(() => {
    let storedList = localStorage.getItem("list") || "";
    setList(JSON.parse(storedList));
  }, []);

  const refContainer = useRef(null);
  const submitHandler = (e) => {
    e.preventDefault();
    if (!item.dish || !item.calorie) {
      showAlert(true, "danger", "Please Enter Values");
    } else if (item && isEdit) {
      setList(
        list.map((it) => {
          if (it.id === editId) {
            return { ...it, ...item };
          }
          return it;
        })
      );
      setItem({ dish: "", calorie: "" });
      setIsEdit(false);
      refContainer.current.blur();
      showAlert(true, "success", "Item Edited");
    } else {
      setList([...list, { id: new Date().getTime().toString(), ...item }]);
      setItem({ dish: "", calorie: "" });
      setIsEdit(false);
      refContainer.current.blur();
      setAlert({ show: true, msg: "Item Added", type: "success" });
    }
  };
  const removeItem = (id) => {
    const newList = list.filter((item) => item.id !== id);
    showAlert(true, "danger", "Item Deleted");
    setList(newList);
  };
  const editItem = (id, item) => {
    setIsEdit(true);
    setItem(item);
    setEditId(id);
    refContainer.current.focus();
  };
  const clearItems = () => {
    setList([]);
    showAlert(true, "danger", "List Cleared");
  };
  const showAlert = (show = false, type = "", msg = "") => {
    setAlert({ show, type, msg });
  };
  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
  }, [list]);

  return (
    <section className="section-center">
      <div className="item-form">
        {alert.show && <Alert {...alert} removeAlert={showAlert} list={list} />}
        <h3>Calorie Tracker</h3>
        <form className="form-control" onSubmit={submitHandler}>
          <input
            className="item-obj"
            type="text"
            name="dish"
            id="dish"
            ref={refContainer}
            placeholder="e.g. Pizza"
            onChange={(e) => setItem({ ...item, dish: e.target.value })}
            value={item.dish}
          />
          <input
            className="item-obj"
            type="number"
            name="calorie"
            id="calorie"
            placeholder="0"
            onChange={(e) => setItem({ ...item, calorie: e.target.value })}
            value={item.calorie}
          />
          <button className="submit-btn" type="submit">
            {isEdit ? "Edit" : "Submit"}
          </button>
        </form>
      </div>
      <div className="item-container">
        {list.map((item) => {
          return (
            <List
              key={item.id}
              {...item}
              removeItem={removeItem}
              editItem={editItem}
            />
          );
        })}
      </div>
      {list.length > 0 && (
        <button className="clear-btn" onClick={() => clearItems()}>
          Clear Items
        </button>
      )}
    </section>
  );
}

export default App;
