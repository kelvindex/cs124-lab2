import { FaEdit } from "react-icons/fa";

function ListItem(props) {
    const listItem = props.item;

    return <li onDoubleClick={props.onEditItem}>
        <input type="checkbox"
               onChange={() => props.onChangeCompletedItems(listItem)}
               checked={listItem.completed}/>
        <span className="item-value">{listItem.value}</span>
        {/*<input type="text" className="listItemValue"  onChange={e => props.onEditItem(listItem.id, e.target.value, "value")}/>*/}
    {/*<button className="editButton" onClick={}><FaEdit color="#86C232"/></button>*/}
    </li>

}

export default ListItem