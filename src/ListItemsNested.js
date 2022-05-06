import ListItem from "./ListItem";

function ListItemsNested(props) {

    return <ul className="list-items">
        {props.data.map(i =>
            <ListItem item={i}
                      key={i.id}
                      onToggleEditItem={props.onToggleEditItem}
                      onChangeCompletedItems={props.onChangeCompletedItems}
                      isCompleted={i.completed}
                      onGetListItemData={props.onGetListItemData}
                      onEditItem={props.onEditItem}
                      priority={i.priority}
            />
        )}
    </ul>
}

export default ListItemsNested;