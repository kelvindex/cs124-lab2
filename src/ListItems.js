import ListItem from "./ListItem";

function ListItems(props) {

    return <>
        <span id="uncomplete">Hide completed tasks</span><input type="checkbox" onChange={props.onCompletedToggle}
                                                                className="toggle"/>

        <br/>
        <button className="order-priority" onClick={props.onOrderByPriority}>Order by priority</button>
        <ul>
            {props.data.map(i =>
                <ListItem item={i}
                          key={i.id}
                          onItemSelected={props.onItemSelected}
                          isCompleted={i.completed}
                          onEditItem={props.onEditItem}
                          priority={i.priority}
                />
            )}

        </ul>
    </>

}

export default ListItems