function EditPopUp(props) {
    const data = props.listItemData.split(" ");
    const id = data[0];
    const value = data[1];

    return <div className="backdrop">
        <div className="add-modal">
            {props.children}
            <br/>
            <label id="addItem">
                <input type="text" className="inputItem" value={value} onChange={(e) =>
                {props.onFinishEdit(id, e.target.value, "value")}}/>
            </label>
            <br/> <br/>
            {/*<input type="text" className="listItemValue"  onChange={e => props.onEditItem(listItem.id, e.target.value, "value")}/>*/}
            {/*<button className="editButton" onClick={}><FaEdit color="#86C232"/></button>*/}
            <p> Priority: &nbsp;
                <select id="select-priority" onChange={e => props.onEditPriority(id,parseInt(e.target.value), "priority")}>
                    <option value={0}>None</option>
                    <option value={1}>Low</option>
                    <option value={2}>High</option>
                </select>
            </p>
            <div className="add-popup-buttons">

                <button className={"alert-button alert-cancel"} type={"submit"}
                        onClick={props.onClose}>
                    Ok
                </button>
                <button className={"alert-button alert-ok"} type={"button"}
                        onClick={props.onClose}>
                    Close
                </button>
            </div>
        </div>
    </div>
}

export default EditPopUp;