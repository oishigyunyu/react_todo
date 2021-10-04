type Props = {
    todo: Todo;
    onCheck: (id: number, checked: boolean) => void;
    onEdit: (id: number, text: string) => void;
    onRemove: (id: number, checked: boolean) => void;
};

export const TodoItem = (props: Props) => {
    return (
        <li>
        <input
            type="checkbox"
            disabled={props.todo.removed}
            checked={props.todo.checked}
            onChange={() => props.onCheck(props.todo.id, props.todo.checked)}
        />
        <input
            type="text"
            disabled={props.todo.checked || props.todo.removed}
            value={props.todo.value}
            onChange={(e) => props.onEdit(props.todo.id, e.target.value)}
        />
        <button onClick={() => props.onRemove(props.todo.id, props.todo.removed)}>
            {props.todo.removed ? '復元' : '削除'}
        </button>
        </li>
    );
};