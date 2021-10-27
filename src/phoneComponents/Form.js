const Form = ({ sending: { submitHandler, newName, inputHandler, inputHandler2, newPhone } }) => {
  return (
    <form onSubmit={submitHandler}>
      <div>
        name: <input value={newName} onChange={inputHandler} required />
      </div>
      <div>
        phone: <input value={newPhone} onChange={inputHandler2} required />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

export default Form
