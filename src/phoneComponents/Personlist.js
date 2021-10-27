import DeleteButton from "./DeleteButton.js"

const Personlist = ({ sending: { filter, persons, deleteHandler } }) => {
  console.log(persons)
  return (
    <ul>
      {!filter &&
        persons.map((each) => {
          return (
            <li key={each.id}>
              {each.name} {each.number} <DeleteButton children="delete" clickHandler={deleteHandler} id={each.id} />
            </li>
          )
        })}

      {filter &&
        persons
          .filter((each) => {
            if (each.name.toLowerCase().includes(filter.toLowerCase())) return true
          })
          .map((each) => {
            return (
              <li key={each.id}>
                {each.name} {each.number} <DeleteButton children="delete" clickHandler={deleteHandler} id={each.id} />
              </li>
            )
          })}
    </ul>
  )
}

export default Personlist
