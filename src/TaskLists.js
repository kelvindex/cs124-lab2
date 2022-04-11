import {FaPlus} from "react-icons/fa";
import {useState} from "react";
import AddListPopUp from "./AddListPopUp";


function TaskLists(props) {

    if (props.loading) {
        return <div className="load">"loading..."</div>;
    }

    if (props.error) {
        console.log(props.error);
        return "there's been an error"
    }

    return <>
        <ul className="lists-menu">
            {props.lists.map(l =>
            <li>
                <input type={"radio"} id={l.id} onClick={props.onChangeCurrentList(l.id)}/> <label htmlFor={l.id}>{l.title}</label>
            </li>)}

        </ul>
        <button className="add-button" onClick={props.onAddListPopUp}><FaPlus/> New list</button>
        {props.addListPopUp && <AddListPopUp onAddNewList={props.onAddNewList} onClose={props.onAddListPopUp}>
            <h4>New List</h4></AddListPopUp>}
    </>
}


export default TaskLists