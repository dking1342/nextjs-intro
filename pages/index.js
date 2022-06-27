import Link from 'next/link'
import dbConnect from '../lib/dbConnect'
import Todo from "../models/Todo";

/* Retrieves pet(s) data from mongodb database */
export async function getServerSideProps() {
  try {
    await dbConnect()
  
    const result = await Todo.find({});
    const todos = result.map((doc) => {
      const todo = doc.toObject()
      todo._id = todo._id.toString()
      todo.createdAt = Math.floor(todo.createdAt / 1000);
      todo.updatedAt = Math.floor(todo.updatedAt / 1000);
      return todo
    })
    console.log(todos)
  
    return { props: { todos }}
    
  } catch (error) {
    return { props: { error }}    
  }
}


const Index = ({ todos }) => (
  <>
    <div>
      { JSON.stringify(todos)}
    </div>
    {/* {pets.map((pet) => (
      <div key={pet._id}>
        <div className="card">
          <img src={pet.image_url} />
          <h5 className="pet-name">{pet.name}</h5>
          <div className="main-content">
            <p className="pet-name">{pet.name}</p>
            <p className="owner">Owner: {pet.owner_name}</p>

            <div className="likes info">
              <p className="label">Likes</p>
              <ul>
                {pet.likes.map((data, index) => (
                  <li key={index}>{data} </li>
                ))}
              </ul>
            </div>
            <div className="dislikes info">
              <p className="label">Dislikes</p>
              <ul>
                {pet.dislikes.map((data, index) => (
                  <li key={index}>{data} </li>
                ))}
              </ul>
            </div>

            <div className="btn-container">
              <Link href="/[id]/edit" as={`/${pet._id}/edit`}>
                <button className="btn edit">Edit</button>
              </Link>
              <Link href="/[id]" as={`/${pet._id}`}>
                <button className="btn view">View</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    ))} */}
  </>
)


export default Index
