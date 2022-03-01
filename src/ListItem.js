
export function ListItem(props) {
    const listItem = props.item;

    return <li onDoubleClick={props.onEditItem}><input type="checkbox"/>{listItem.item}</li>

}