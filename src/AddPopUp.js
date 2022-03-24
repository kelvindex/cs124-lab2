function AddPopUp(props) {
    return <div className="backdrop">
        <div className="modal">
            {props.children}
            <br/>
            <label id="addItem">
                <input type="text" className="inputItem" placeholder="Add item"
                       onKeyPress={(e) => {props.onAddItem(e.key, e.target.value); if (e.key === 'Enter') {e.target.value = ""}}}/>
            </label>
            <br/> <br/>
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