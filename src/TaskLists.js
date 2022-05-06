import {FaPlus, FaWindowClose} from "react-icons/fa";


function TaskLists(props) {

    if (props.loading) {
        return <div className="load">"loading..."</div>;
    }

    if (props.error) {
        console.log(props.error);
        return <div>there's been an error: {props.error.message}</div>
    }

    return <div className="navbar">
        <button className="close-sidebar-button" onClick={props.onCloseSideBar} aria-label={"Close Task List"}><FaWindowClose/></button>
        <h3>Task Lists</h3>
        <button className="add-list-button" onClick={props.onAddListPopUp}><FaPlus style={{verticalAlign: 'text-top'}}/> New list</button>
        <ul className="lists-menu">
            {props.lists.map(l =>
            <li key={l.id}>
                <button className="taskListButton"
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