function AddPopUp(props) {


    return <div className="backdrop">
        <div className="add-modal">
            {props.children}
            <br/>
            <label id="addItem">
                <input type="text" className="inputItem" placeholder="Add item"
                       onKeyPress={(e) => {props.onAddItem(e.key, e.target.value, props.priority); if (e.key === 'Enter') {e.target.value = ""}}}/>
            </label>
            <br/> <br/>
            {/*<input type="text" className="listItemValue"  onChange={e => props.onEditItem(listItem.id, e.target.value, "value")}/>*/}
            {/*<button className="editButton" onClick={}><FaEdit color="#86C232"/></button>*/}
            <p> Priority: &nbsp;
                <select id="select-priority" onChange={e => props.onSetPriority(parseInt(e.target.value))}>
                    <option value={0}>None</option>
                    <option value={1}>Low</option>
                    <option value={2}>High</option>
                </select>
            </p>
            <div className="add-popup-buttons">
                <button className={"alert-button alert-ok"} type={"button"}
                        onClick={props.onClose}>
                    Close
                </button>
            </div>
        </div>
    </div>
}

export default AddPopUp;