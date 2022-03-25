import { FaEdit } from "react-icons/fa";

function ListItem(props) {
    const listItem = props.item;

    function handleOnToggleEditItem() {
        props.onToggleEditItem()
        props.onGetListItemData(listItem.id.concat(" ".concat(listItem.value)));

    }

    return <li onDoubleClick={props.onEditItem}>
        <input type="checkbox"
               id={listItem.id}
               onChange={() => props.onChangeCompletedItems(listItem)}
               checked={listItem.completed}/> <label htmlFor={listItem.id} className={"item-value"}>{"!".repeat(props.priority)} {listItem.value}</label>
    <button className="edit-button" onClick={handleOnToggleEditItem}><FaEdit color="#86C232"/></button>
    </li>

}

export default ListItem