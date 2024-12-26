import { useEffect } from "react";
import { useState } from "react";

export default function Home() {
  const [listUsers, setListUsers] = useState(() => {
    const storedUsers = localStorage.getItem("users");
    return JSON.parse(storedUsers) || [];
  });
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  function addUser(user) {
    setListUsers((prevList) => [...prevList, user]);
  }

  function handleSubmit(e) {
    e.preventDefault();
    const id = crypto.randomUUID();
    const user = { id, name, email };
    addUser(user);
  }

  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(listUsers));
  }, [listUsers]);

  return (
    <div className="m-5 p-2">
      <h1 className="text-white">List of users:</h1>
      <ul className="text-white">
        {listUsers.map((user) => (
          <li key={user.id}>
            {user.name} - {user.email}
          </li>
        ))}
      </ul>
      <form action="" className="flex flex-col w-1/4" onSubmit={handleSubmit}>
        <input
          type="text"
          className="my-8"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          className="mb-8"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit" className="text-white">
          Submit
        </button>
      </form>
    </div>
  );
}
