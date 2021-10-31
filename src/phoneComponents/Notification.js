
const Notification = ({message, whatkind}) => {
    if (message === null) return null;


    return(
        <div className={whatkind}>
            {message}
        </div>
    )
}

export default Notification