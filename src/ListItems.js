import ListItem from "./ListItem";

function ListItems(props) {

    return <>
        <label htmlFor="completed-toggle" id="uncomplete">Hide completed tasks</label><input type="checkbox" id="completed-toggle" onChange={props.onCompletedToggle}
                                                                className="toggle"/>

        <br/>
        <div className="priority-buttons">
            <button className="order-priority" onClick={() => props.onOrderBy("priority")}>Order by priority</button>
            <button className="order-priority" onClick={() => props.onOrderBy("name")}>Order by name</button>
            <button className="order-priority" onClick={() => props.onOrderBy("time")}>Order by time</button>
        </div>
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