import React, { Component } from 'react';
import './App.css';
import ToDoListItem from "./ToDoListItem.js"

class App extends Component {
  //ToDoListをstateに定義、初期値はlocalStorageから取得または[]
  state = {
    todoList: JSON.parse(localStorage.getItem("todoList")) || []
  }

  //todoListのItem追加
  addTodo = (item, callBack) => {
    //todoList stateに追加
    this.setState(
      {
        todoList: this.state.todoList.concat(item)
      },
      () => {
        //localStorageにtodoList stateを保存
        localStorage.setItem("todoList", JSON.stringify(this.state.todoList))
        //callBack関数が引数に渡された場合実行
        callBack && callBack()
      }
    )
  }

  //todoListからitemを削除
  removeTodo = (item, callBack) => {
    this.setState(
      {
        todoList: this.state.todoList.filter(x => x !== item)
      },
      () => {
        //localStrorageにtodoList stateを保存
        localStorage.setItem("todoList", JSON.stringify(this.state.todoList))
        //callBack関数が引数に渡された場合実行
        callBack && callBack()
      }
    )
  }


  render(){
    return (
      <div className="App">
        <form 
          className="App-form"
          onSubmit={e => {
            //formのデフォルトイベントをキャンセル
            e.preventDefault();

            //idがtitle　descreption　それぞれのエレメントを取得
            const titleElement = e.target.elements["title"]
            const descreptionElement = e.target.elements["descreption"]
  
            //ToDoList stateに追加
            this.addTodo(
              {
                title: titleElement.value,
                descreption: descreptionElement.value
              },
              //stateの変数変更後に入力した値をからにする
              () => {
                titleElement.value = "";
                descreptionElement.value = "";
              }
            )
          }}
        >
          <div>
            <input id="title" placeholder="title" />
              <textarea id="descreption" placeholder="descreption" />
          </div>
          <div>
            <button type="submit">登録</button>
          </div>
        </form>
        <div>
          {/*ToDoList配列の要素分ToDoListItemコンポーネントを展開*/}
          {this.state.todoList.map(todo => (
              <ToDoListItem 
                key={todo.title}
                title={todo.title}
                descreption={todo.descreption}
                //クリックされたアイテムをtodoList　stateから削除
                onClick={() => this.removeTodo(todo)}
              />
            ))}
        </div>
      </div>
    );
  }
  
}

export default App;
