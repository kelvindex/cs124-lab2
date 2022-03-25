import { FaEdit } from "react-icons/fa";

function ListItem(props) {
    const listItem = props.item;

    return <li onDoubleClick={props.onEditItem}>
        <input type="checkbox"
               id={listItem.id}
               onChange={() => props.onChangeCompletedItems(listItem)}
               checked={listItem.completed}/> <label htmlFor={listItem.id} className={"item-value"}>{"!".repeat(props.priority)} {listItem.value}</label>
        {/*<input type="text" className="listItemValue"  onChange={e => props.onEditItem(listItem.id, e.target.value, "value")}/>*/}
    {/*<button className="editButton" onClick={}><FaEdit color="#86C232"/></button>*/}
    </li>

}

export default ListItem