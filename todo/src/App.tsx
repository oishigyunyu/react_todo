// React から useState フックをインポート
import { useState } from 'react';

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

  return (
    <div>
      <form onSubmit={(e) => e.preventDefault()}>
        {/*
          入力中テキストの値を text ステートが
          持っているのでそれを value として表示

          onChange イベント（＝入力テキストの変化）を
          text ステートに反映する
         */}
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <input
          type="submit"
          value="追加"
          onSubmit={(e) => e.preventDefault()}
        />
      </form>
    </div>
  );
};