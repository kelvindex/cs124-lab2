import {FaPlus, FaTrashAlt, FaWindowClose} from "react-icons/fa";
import AddListPopUp from "./AddListPopUp";


function TaskLists(props) {

    if (props.loading) {
        return <div className="load">"loading..."</div>;
    }

    if (props.error) {
        console.log(props.error);
        return "there's been an error"
    }

    return <div className="navbar">
        <button className="close-sidebar-button" onClick={props.onCloseSideBar} aria-label={"Close Task List"}><FaWindowClose/></button>
        <h3>Task Lists</h3>
        <button className="add-list-button" onClick={props.onAddListPopUp}><FaPlus/> New list</button>
        <ul className="lists-menu">
            {props.lists.map(l =>
            <li key={l.id}>
                <button className="taskListButton"
                       checked={props.currentListId === l.id}
                       id={l.id}
                       name="taskList"
                       value={l.id}
                       onClick={() => props.onChangeCurrentList(l.id, l.title)}/>
                <label htmlFor={l.id}> {l.title}</label>

            </li>)}
        </ul>
    </div>
}


export default TaskLists