function DeleteCompletedAlert(props) {

    return <div className="backdrop">
        <div className="modal">
            <div className={"modal-content"}>
            {props.children}
            <br/><br/>
            <div className="alert-buttons">
                <button className={"delete-alert-button alert-cancel"} type={"button"}
                        onClick={props.onClose}>
                    Do not delete
                </button>
                <button className={"delete-alert-button alert-ok"} type={"button"}
                        onClick={props.onDelete}>
                    Delete items
                </button>
        </div>
            </div>
        </div>
    </div>
}

export default DeleteCompletedAlert;