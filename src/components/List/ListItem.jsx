import "./List.css";
import React from "react";

class ListItem extends React.Component {

  render() {
    let classNames = "todo-item";

    if (this.props.item.important) {
      classNames += " important";
    }

		if (this.props.item.done) {
      classNames += " done";
    }

    return (
      <li className={classNames}>
        <span className="todo-item-text" onClick={() => {this.props.onToggleCompleted(this.props.item.id)}}>{this.props.item.title}</span>
        <div className="btn-group">
          <button onClick={() => {this.props.onToggleImportant(this.props.item.id)}} role="button" className="btn btn-outline-dark btn-sm">
            Важное
          </button>
          <button onClick={() => {this.props.deleteItem(this.props.item.id)}} role="button" className="btn btn-outline-danger btn-sm">
            Удалить
          </button>
        </div>
      </li>
    );
  }
}

export default ListItem;
