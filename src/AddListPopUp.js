function AddListPopUp(props) {
    return <div className="backdrop" onClick={props.onClose}>
        <div className="add-modal">
            {props.children}
            <br/>
            <label id="addItem">
                <input type="text" className="inputItem" placeholder="New list title" onClick={(e) => e.stopPropagation()}
                       onKeyPress={(e) => {props.onAddNewList(e.key, e.target.value); if (e.key === 'Enter') {e.target.value = ""}}}/>
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

export default AddListPopUp