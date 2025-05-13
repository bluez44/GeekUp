import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";

import { getUsers } from "../api/PlaceholderApi";

function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const res = getUsers();

    res
      .then((data) => {
        console.log(data);
        setUsers(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Avatar</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Website</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users &&
            users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>{user.website}</td>
                <td>Show</td>
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  );
}

export default Users;
