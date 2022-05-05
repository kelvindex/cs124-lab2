function EditPopUp(props) {
    const data = props.listItemData.split(" ");
    const id = data[0];
    const value = data[1];
    const priority = data[2];

    return <div className="backdrop">
        <div className="modal">
            <div className={"modal-content"}>

                {props.children}
                <br/>
                <label id="addItem">
                    <input type="text" className="inputItem" defaultValue={value} onClick={(e) => e.stopPropagation()}
                           onChange={(e) => {
                               props.onFinishEdit(id, e.target.value, "value")
                           }}/>
                </label>
                <br/> <br/>

                <p> Priority: &nbsp;
                    <select id="select-priority" defaultValue={priority} aria-label={"select Priority"}
                            onChange={e => props.onEditPriority(id, parseInt(e.target.value), "priority")}>
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
    </div>
}

export default EditPopUp;