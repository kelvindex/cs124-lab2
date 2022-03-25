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
                          onChangeCompletedItems={props.onChangeCompletedItems}
                          isCompleted={i.completed}
                          key={i.id}
                          onEditItem={props.onEditItem}
                          priority={i.priority}
                />
            )}

        </ul>
    </>

}

export default ListItems