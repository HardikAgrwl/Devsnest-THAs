import { FaEdit, FaTrash } from "react-icons/fa";

const List = ({ id, dish, calorie, removeItem, editItem }) => {
  return (
    <article className="item">
      <div className="item-title">
        <p className="title">{dish}</p>
        <span> : </span>
        <p className="title">{calorie} Calories</p>
      </div>
      <div className="btn-container">
        <button
          type="button"
          className="edit-btn"
          onClick={() => editItem(id, { id, dish, calorie })}
        >
          <FaEdit />
        </button>
        <button
          type="button"
          className="delete-btn"
          onClick={() => removeItem(id)}
        >
          <FaTrash />
        </button>
      </div>
    </article>
  );
};

export default List;
