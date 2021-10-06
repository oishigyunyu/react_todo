import { useState } from 'react';

import GlobalStyles from '@mui/material/GlobalStyles';
import { indigo, pink } from '@mui/material/colors';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';

import { FormDialog } from './FormDialog';
import { TodoItem } from './TodoItem';
import { ToolBar } from './ToolBar';
import { SideBar } from './SideBar';
import { QR } from './QR';
import { AlertDialog } from './AlertDialog';
import { ActionButton } from './ActionButton';

const Container = styled('div')({
  margin: '0 auto',
  maxWidth: '640px',
  fontFamily: '-apple-system, BlinkMacSystemFont, Roboto, sans-serif',
});

const theme = createTheme({
  palette: {
    primary: {
      main: indigo[500],
    },
    secondary: {
      main: pink[500],
    },
  },
});

export const App = () => {
  const [text, setText] = useState('');
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<Filter>('all');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [qrOpen, setQrOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);

  const handleOnChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
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
    setDialogOpen(false);
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
      return todo;
    });

    setTodos(newTodos);
  };

  const handleOnEmpty = () => {
    const newTodos = todos.filter((todo) => !todo.removed);
    setTodos(newTodos);
  };

  const handleOnSort = (filter: Filter) => {
    setFilter(filter);
  };

  const toggleAlert = () => setAlertOpen(!alertOpen);
  const toggleDrawer = () => setDrawerOpen(!drawerOpen);

  const onQROpen = () => setQrOpen(true);
  const onQRClose = () => setQrOpen(false);

  const toggleDialog = () => {
    setDialogOpen(!dialogOpen);
    setText('');
  };

  const filteredTodos = todos.filter((todo) => {
    switch (filter) {
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

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles styles={{ body: { margin: 0, padding: 0 } }} />
      <ToolBar filter={filter} toggleDrawer={toggleDrawer} />
      <SideBar
        drawerOpen={drawerOpen}
        toggleDrawer={toggleDrawer}
        onSort={handleOnSort}
        onOpen={onQROpen}
      />
      <QR open={qrOpen} onClose={onQRClose} />
      <FormDialog
        text={text}
        dialogOpen={dialogOpen}
        onChange={handleOnChange}
        onSubmit={handleOnSubmit}
        toggleDialog={toggleDialog}
      />
      <AlertDialog
        alertOpen={alertOpen}
        onEmpty={handleOnEmpty}
        toggleAlert={toggleAlert}
      />
      <Container>
        {filteredTodos.map((todo) => {
          return (
            <TodoItem
              key={todo.id}
              todo={todo}
              filter={filter}
              onCheck={handleOnCheck}
              onEdit={handleOnEdit}
              onRemove={handleOnRemove}
            />
          );
        })}
        <ActionButton
          todos={todos}
          filter={filter}
          alertOpen={alertOpen}
          dialogOpen={dialogOpen}
          toggleAlert={toggleAlert}
          toggleDialog={toggleDialog}
        />
      </Container>
    </ThemeProvider>
  );
};