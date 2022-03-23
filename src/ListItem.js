function ListItem(props) {
    const listItem = props.item;

    return <li onDoubleClick={props.onEditItem}>
        <input type="checkbox"
               onChange={() => props.onChangeCompletedItems(listItem)}
               checked={listItem.completed}/>
        <input type="text" className="listItemValue" value={listItem.value} onChange={e => props.onEditItem(listItem.id, e.target.value, "value")}/>
    </li>

}

export default ListItem