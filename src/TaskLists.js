import {FaPlus} from "react-icons/fa";
import {useState} from "react";
import {doc, setDoc} from "firebase/firestore";
import AddListPopUp from "./AddListPopUp";
import {generateUniqueID} from "web-vitals/dist/modules/lib/generateUniqueID";


function TaskLists(props) {
    const [addListPopUp, setAddListPopUp] = useState(false);

    function handleAddListPopUp() {
        setAddListPopUp(!addListPopUp);
    }



    return <>
        <ul>
            {props.lists.map(l =>
            <li>
                <input type={"radio"}/> <label>{l.title}</label>
            </li>)}

        </ul>
        <button className="add-button" onClick={handleAddListPopUp}><FaPlus/> New list</button>
        {addListPopUp && <AddListPopUp onAddItem={props.onAddNewList} onClose={handleAddListPopUp}>
            <h4>New item</h4></AddListPopUp>}
        <br/><br/>
    </>
}


export default TaskLists