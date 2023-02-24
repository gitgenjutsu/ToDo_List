import React, { useState, useRef } from 'react';
import TodoCreator from "./FormInput";
import TodoList from "./List";
import FormClear from './FormClear';
import { createMuiTheme } from "@material-ui/core/styles";
import uuid from 'react-uuid';


const theme = createMuiTheme({
    palette: {
        primary: { main: '#000000' },
    },
});

const Form = () => {

    const [newTodo, setNewTodo] = useState('');
    var todo_List = JSON.parse(localStorage.getItem("ToDO_List"));
    const [todos, setTodos] = useState(todo_List);
    const inputRef = useRef();
    const noteRef = useRef({});
    const [isInputEmpty, setInputEmpty] = useState(false)


    const handleSubmit = e => {
        e.preventDefault();
        addTodo(newTodo);
        clearInput();
        inputRef.current.focus();
    };

    const preventSubmit = e => {
        if (e.key === 'Enter') {
            e.preventDefault();
        }
    };
    const clearCompleted = () => {
        const newArr = todos.filter(function (item) {
            return !item.isCompleted
        });
        setTodos(newArr);
        localStorage.setItem("ToDO_List", JSON.stringify(newArr));
        if (todos.length) {
            setInputEmpty(false);
        } else {
            setInputEmpty(true);
        }
    }

    const addTodo = text => {
        const newTodoItem = {
            text,
            id: uuid(),
            isCompleted: false,
            isEditing: false,

        }
        if (text !== '') {
            const newTodos = [...todos, { ...newTodoItem }]
            setNewTodo('')
            setTodos(newTodos);
            localStorage.setItem("ToDO_List", JSON.stringify(newTodos));
        } else {
            setInputEmpty(true);
        }
    };

    const removeTodo = inx => {
        const newArr = [...todos];
        newArr.splice(inx, 1);
        setTodos(newArr)
        localStorage.setItem("ToDO_List", JSON.stringify(newArr));
    }

    const completeTodo = inx => {
        const newTodos = [...todos];
        newTodos[inx].isCompleted = !newTodos[inx].isCompleted;
        setTodos(newTodos);
        localStorage.setItem("ToDO_List", JSON.stringify(newTodos));
    };

    const editTodo = (e, inx) => {
        if(e.detail === 2){
        const newTodos = [...todos];
        newTodos[inx].isEditing = !newTodos[inx].isEditing;
        setTodos(newTodos);
        localStorage.setItem("ToDO_List", JSON.stringify(newTodos));
        }
    }

    const saveTodo = (inx) => {
        const newTodos = [...todos];
        newTodos[inx].isEditing = !newTodos[inx].isEditing;
        newTodos[inx].text = noteRef.current[inx].value;
        setTodos(newTodos);
        localStorage.setItem("ToDO_List", JSON.stringify(newTodos));
    }

    const clearInput = () => {
        setNewTodo('');
    }

    const setTodo = todo => {
        setInputEmpty(false);
        setNewTodo(todo);
    }

    return (
        <form onSubmit={handleSubmit} className="form">

            <TodoCreator
                theme={theme}
                todo={newTodo}
                setTodo={setTodo}
                clearInput={clearInput}
                inputRef={inputRef}
                isInputEmpty={isInputEmpty}
                preventSubmit={preventSubmit}
            />

            <TodoList
                theme={theme}
                todos={todos}
                completeTodo={completeTodo}
                editTodo={editTodo}
                deleteTodo={removeTodo}
                saveTodo={saveTodo}
                noteRef={noteRef}
                preventSubmit={preventSubmit}
            />

            <FormClear
                clearCompleted={clearCompleted}
            />
        </form>
    )
}

export default Form;