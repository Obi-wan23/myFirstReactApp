import React from "react";
import Header from "../Header/Header";
import Search from "../Search/Search";
import StatusBar from "../StatusBar/StatusBar";
import List from "../List/List";
import Footer from "../Footer/Footer";

import "./App.css";

class App extends React.Component {
  state = {
    todoData: [
      { id: 0, title: "Проснуться пораньше", important: false, done: false },
      { id: 1, title: "Сделать зарядку", important: true, done: false },
      { id: 2, title: "Выпить кофе", important: true, done: false },
      {
        id: 3,
        title: "Написать React приложение",
        important: false,
        done: false,
      },
    ],
    term: "",
    status: "all",
  };

  onToggleImportant = (id) => {
    console.log("onToggleImportantClick", id);
    this.setState((state) => {
      const index = state.todoData.findIndex((el) => {
        return el.id === id;
      });

      const oldItem = state.todoData[index];
      const newItem = { ...oldItem, important: !oldItem.important };

      const part1 = state.todoData.slice(0, index);
      const part2 = state.todoData.slice(index + 1);
      const newArray = [...part1, newItem, ...part2];

      return {
        todoData: newArray,
      };
    });
  };

  onToggleCompleted = (id) => {
    this.setState((state) => {
      const index = state.todoData.findIndex((el) => {
        return el.id === id;
      });

      const oldItem = state.todoData[index];
      const newItem = { ...oldItem, done: !oldItem.done };

      const part1 = state.todoData.slice(0, index);
      const part2 = state.todoData.slice(index + 1);
      const newArray = [...part1, newItem, ...part2];

      return {
        todoData: newArray,
      };
    });
  };

  deleteItem = (id) => {
    this.setState((state) => {
      const index = state.todoData.findIndex((el) => {
        return el.id === id;
      });

      const part1 = state.todoData.slice(0, index);
      const part2 = state.todoData.slice(index + 1);
      const newArray = [...part1, ...part2];

      return {
        todoData: newArray,
      };
    });
  };

  addItem = (title) => {
    console.log(title);

    this.setState((state) => {
      const ID = state.todoData[state.todoData.length - 1]["id"] + 1;
      const newItem = { id: ID, title: title, important: false, done: false };
      const newArray = [...state.todoData, newItem];

      return {
        todoData: newArray,
      };
    });
  };

  search = (items, term) => {
    if (term.trim().length === 0) {
      return items;
    }

    return items.filter((item) => {
      if (item.title.toLowerCase().indexOf(term.toLowerCase().trim()) > -1) {
        return true;
      }
    });
  };

  changeTerm = (term) => {
    console.log("changeTerm Fired!", term);
    this.setState({
      term: term,
    });
  };

  filterByStatus = (items, status) => {
    switch (status) {
      case "all":
        return items;
      case "active":
        return items.filter((item) => item.done === false);
      case "done":
        return items.filter((item) => item.done === true);
      default:
        return items;
    }
  };

  changeStatus = (status) => {
    this.setState({ status: status });
  };

  render() {
    const filteredBySearchItems = this.search(
      this.state.todoData,
      this.state.term
    );
    const filteredByStatusItems = this.filterByStatus(
      filteredBySearchItems,
      this.state.status
    );
    return (
      <div className="todo-app p-5">
        <Header />
        <div className="search">
          <Search changeTerm={this.changeTerm} term={this.state.term} />
          <StatusBar changeStatus={this.changeStatus} status={this.state.status}/>
        </div>
        <List
          data={filteredByStatusItems}
          onToggleImportant={this.onToggleImportant}
          onToggleCompleted={this.onToggleCompleted}
          deleteItem={this.deleteItem}
        />
        <Footer addItem={this.addItem} />
      </div>
    );
  }
}

export default App;
