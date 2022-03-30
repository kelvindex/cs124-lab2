function ListItem(props) {
    const listItem = props.item;

    return <li onDoubleClick={props.onEditItem}>
        <input type="checkbox"
               onChange={() => props.onItemSelected(listItem)}
               checked={props.isCompleted}/>
        <input type="text" className="listItemValue" value={listItem.value} onChange={e => props.onEditItem(listItem.id, e.target.value, "value")}/>
            <label className="radio-inline">
                <input type="radio" name={"optradio " + listItem.id} onChange={() => props.onEditItem(listItem.id, 1, "priority")} checked={listItem.priority===1}/>1
            </label>
            <label className="radio-inline">
                <input type="radio" name={"optradio " + listItem.id} onChange={() => props.onEditItem(listItem.id, 2, "priority")} checked={listItem.priority===2}/>2
            </label>
            <label className="radio-inline">
                <input type="radio" name={"optradio " + listItem.id} onChange={() => props.onEditItem(listItem.id, 3, "priority")} checked={listItem.priority===3}/>3
            </label>
    </li>

}

export default ListItem