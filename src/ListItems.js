import ListItem from "./ListItem";

function ListItems(props) {

    return <>
        <span id="uncomplete">Hide completed tasks</span><input type="checkbox" onChange={props.onCompletedToggle}
                                                                className="toggle"/>
            <label> Sort By: </label>
            <select name="order" id="order" onChange={props.onOrderItems}>
                <option value="date">date</option>
                <option value="value">name</option>
                <option value="priority">priority</option>
            </select>

        <br/>
        <button className="order-priority" onClick={() => props.onOrderBy("priority")}>Order by priority</button>
        <button className="order-priority" onClick={() => props.onOrderBy("name")}>Order by name</button>
        <button className="order-priority" onClick={() => props.onOrderBy("time")}>Order by time</button>
        <ul>
            {props.data.map(i =>
                <ListItem item={i}
                          key={i.id}
                          onItemSelected={props.onItemSelected}
                          onToggleEditItem={props.onToggleEditItem}
                          onChangeCompletedItems={props.onChangeCompletedItems}
                          isCompleted={i.completed}
                          onGetListItemData={props.onGetListItemData}
                          onEditItem={props.onEditItem}
                          priority={i.priority}
                />
            )}

        </ul>
    </>

}

export default ListItems