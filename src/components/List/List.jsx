import ListItem from "./ListItem";
import "./List.css";

const List = (props) => {
  const render = props.data.map((el) => {
    return (
      <ListItem
        onToggleCompleted={props.onToggleCompleted}
        onToggleImportant={props.onToggleImportant}
				deleteItem={props.deleteItem}
        key={el.id}
        item={el}
      />
    );
  });

  const noTasks = (
    <li className="todo-item justify-content-center">
      <span className="todo-item-text">Список дел пуст</span>
    </li>
  );

  return (
    <ul className="todo-list">{props.data.length > 0 ? render : noTasks}</ul>
  );
};

export default List;
