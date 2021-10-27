

const DeleteButton = ({children, clickHandler, id }) => {

    const handleDelete = () => {
        if (window.confirm('you sure?')) {
            clickHandler(id)
        }
    }

    return(
        <button onClick={handleDelete}> { children }</button>
    )
}

export default DeleteButton