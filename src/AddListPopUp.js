function AddListPopUp(props) {
    return <div className="backdrop">
        <div className="add-modal">
            {props.children}
            <br/>
            <label id="addItem">
                <input type="text" className="inputItem" placeholder="New list title"
                       onKeyPress={(e) => {props.onAddList(e.key, e.target.value); if (e.key === 'Enter') {e.target.value = ""}}}/>
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