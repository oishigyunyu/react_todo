import { GlobalStyles } from '@mui/styled-engine';
import React, { useState } from 'react';
import { FormDialog } from './FormDialog'
import { TodoItem } from './TodoItems'
import { ToolBar } from './ToolBar'

type Todo = {
  value: string;
  id: number;
  checked: boolean;
  removed: boolean;
};

type Filter = 'all' | 'checked' | 'unchecked' | 'removed';


export const App = () => {
  const [text, setText] = useState('');
  const [todos, setTodos] = useState<Todo[]>([]);
  // eslint-disable-next-line
  const [filter, setFilter] = useState<Filter>('all');

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const handleOnSubmit = () => {
    if (!text) return;

    const newTodo: Todo = {
      value: text,
      id: new Date().getTime(),
      checked: false,
      removed: false,
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

  const handleOnCheck = (id: number, checked: boolean) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.checked = !checked;
      }
      return todo;
    });

    setTodos(newTodos);
  };

  const handleOnRemove = (id: number, removed: boolean) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.removed = !removed;
      }

      return todo
    });

    setTodos(newTodos);
  };

  const filteredTodos = todos.filter((todo) => {
    switch(filter) {
      case 'all':
        return !todo.removed;
      case 'checked':
         return todo.checked && !todo.removed;
      case 'unchecked':
        return !todo.checked && !todo.removed;
      case 'removed':
        return todo.removed;
      default:
        return todo;
    }
  });


  // eslint-disable-next-line
  const handleOnEnpty = () => {
    const newTodos = todos.filter((todo) => !todo.removed);
    setTodos(newTodos);
  };

  return (
    <div>
      <GlobalStyles styles={{ body: { margin: 0, padding: 0 } }} />
      <ToolBar filter={filter}/>
      <FormDialog
        text={text}
        onChange={handleOnChange}
        onSubmit={handleOnSubmit}
      />
      <ul>
        {filteredTodos.map((todo) => {
          return (
            <TodoItem
              key={todo.id}
              todo={todo}
              onCheck={handleOnCheck}
              onEdit={handleOnEdit}
              onRemove={handleOnRemove}
            />
          )
        })}
      </ul>
    </div>
  );
};