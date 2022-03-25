import ListItem from "./ListItem";

function ListItems(props) {

    return <>
        <span id="uncomplete">Hide completed tasks</span><input type="checkbox" onChange={props.onCompletedToggle}
                                                                className="toggle"/>

        <ul>
            {props.data.map(i =>
                <ListItem item={i}
                          onChangeCompletedItems={props.onChangeCompletedItems}
                          isCompleted={i.completed}
                          key={i.id}
                          onEditItem={props.onEditItem}
                          priority={props.priority}
                />
            )}

        </ul>
    </>

}

export default ListItems