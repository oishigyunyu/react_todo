// React から useState フックをインポート
import React, { useState } from 'react';

type Todo = {
  value: string;
};



export const App = () => {
  /**
   * text = ステートの値
   * setText = ステートの値を更新するメソッド
   */
  const [text, setText] = useState('');

  const [todos, setTodos] = useState<Todo[]>([]);

  const handleOnSubmit = () => {
    // 何も入力されていなかったらリターン
    if (!text) return;

    // 新しい Todo を作成
    const newTodo: Todo = {
      value: text,
    };

    /**
     * スプレッド構文を用いて todos ステートのコピーへ newTodo を追加する
     *
     * 以下と同義
     * const oldTodos = todos.slice();
     * oldTodos.splice(0, 0, newTodo);
     * setTodos(oldTodos);
     *
     **/
    setTodos([newTodo, ...todos]);
    // フォームへの入力をクリアする
    setText('');
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  return (
    <div>
      <form 
          onSubmit={(e) => {
            e.preventDefault();
            handleOnSubmit();
      }}
      >
        {/*
          入力中テキストの値を text ステートが
          持っているのでそれを value として表示

          onChange イベント（＝入力テキストの変化）を
          text ステートに反映する
         */}
        <input
          type="text"
          value={text}
          onChange={(e) => handleOnChange(e)}
        />
        <input
          type="submit" value="追加" onSubmit={handleOnSubmit}
        />
      </form>
    </div>
  );
};