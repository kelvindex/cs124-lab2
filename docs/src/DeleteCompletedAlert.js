function DeleteCompletedAlert(props) {

    return <div className="backdrop">
        <div className="modal">
            {props.children}
            <br/><br/>
            <div className="alert-buttons">
                <button className={"alert-button alert-cancel"} type={"button"}
                        onClick={props.onClose}>
                    Do not delete
                </button>
                <button className={"alert-button alert-ok"} type={"button"}
                        onClick={props.onDelete}>
                    Delete items
                </button>
        </div>
        </div>
    </div>
}

export default DeleteCompletedAlert;