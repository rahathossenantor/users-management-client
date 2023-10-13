import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    (async () => {
      const res = await fetch("http://localhost:5000/users");
      const data = await res.json();
      setUsers(data);
    })();
  }, []);

  const handleRegister = event => {
    event.preventDefault();

    const formData = event.target;
    const name = formData.name.value;
    const email = formData.email.value;
    const user = {name, email};

    fetch("http://localhost:5000/users", {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(user)
    })
    .then(res => res.json())
    .then(data => {
      formData.reset();
      setUsers([...users, data]);
    })
    .catch(err => console.error(err));
  }

  return (
    <>
      <div>
        <h3>User registration form</h3>
        <form onSubmit={handleRegister}>
          <div>
            <label>Full Name:</label>
            <input name="name" type="text" />
          </div>
          <div>
            <label>Email:</label>
            <input name="email" type="email" />
          </div>
          <button>Submit</button>
        </form>
      </div>

      <div>
        <ol>
          {
            users.map(user => <li key={user.id}>{user.name}</li>)
          }
        </ol>
      </div>
    </>
  );
}

export default App;
