import React, { useState } from 'react';

type Todo = {
  value: string;
  id: number;
};



export const App = () => {
  const [text, setText] = useState('');
  const [todos, setTodos] = useState<Todo[]>([]);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const handleOnSubmit = () => {
    if (!text) return;

    const newTodo: Todo = {
      value: text,
      id: new Date().getTime(),
    };

    setTodos([newTodo, ...todos]);
    setText('');
  };
  
  const handleOnEdit = (id: number, value: string) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.value = value;
      }
      return todo;
    });

    setTodos(newTodos);
  };

  return (
    <div>
      <form 
          onSubmit={(e) => {
            e.preventDefault();
            handleOnSubmit();
      }}
      >
        <input type="text" value={text} onChange={(e) => handleOnChange(e)} />
        <input type="submit" value="追加" onSubmit={handleOnSubmit} />
      </form>
      <ul>
        {todos.map((todo) => {
          return (
            <li key={todo.id}>
              <input type="text"
                     value={todo.value}
                     onChange={(e) => handleOnEdit(todo.id, e.target.value)}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
};