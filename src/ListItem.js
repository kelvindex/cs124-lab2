import {useState} from "react";

export function ListItem(props) {
    const listItem = props.item;
    const [check, setCheck] = useState(false);

    function handleCheckBox() {

    }

    return <li onDoubleClick={props.onEditItem}>
        <input type="checkbox"
               onChange={(e) => (e.target.checked ? props.onItemCompleted : props.onItemNotCompleted)(listItem)}/>
        {listItem.value}</li>

}