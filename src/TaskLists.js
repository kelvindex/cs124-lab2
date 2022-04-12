import {FaPlus, FaTrashAlt, FaWindowClose} from "react-icons/fa";
import AddListPopUp from "./AddListPopUp";
import DeleteListPopUp from "./DeleteListPopUp";


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
        <ul className="lists-menu" role="radiogroup" tabIndex="0">
            {props.lists.map(l =>
            <li key={l.id}>
                <input type="radio"
                       role="radio"
                       aria-checked={props.currentListId === l.id}
                       checked={props.currentListId === l.id}
                       id={l.id}
                       name="taskList"
                       value={l.id}
                       onChange={() => props.onChangeCurrentList(l.id, l.title)}/>
                <label htmlFor={l.id}> {l.title}</label>

            </li>)}
        </ul>

        {props.addListPopUp && <AddListPopUp onAddNewList={props.onAddNewList} onClose={props.onAddListPopUp}>
            <h4>New List</h4></AddListPopUp>}
    </div>
}


export default TaskLists