

const DeleteButton = ({children, clickHandler, id }) => {
    return(
        <button onClick={() => clickHandler(id)}> { children }</button>
    )
}

export default DeleteButton