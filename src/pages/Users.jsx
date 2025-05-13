import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { LiaEyeSolid } from "react-icons/lia";

import { getUsers } from "../api/PlaceholderApi";
import { useNavigate } from "react-router";
import Loading from "../components/Loading";

function Users() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    document.title = "Users";
  });

  useEffect(() => {
    const res = getUsers();

    res
      .then((data) => {
        // console.log(data);
        setUsers(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="table-responsive mb-4 bg-white shadow rounded-4">
          <table className="table table-hover m-0">
            <thead>
              <tr>
                <th className="p-4">ID</th>
                <th className="p-4">Avatar</th>
                <th className="p-4">Name</th>
                <th className="p-4">Email</th>
                <th className="p-4">Phone</th>
                <th className="p-4">Website</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users &&
                users.map((user) => (
                  <tr key={user.id}>
                    <td className="p-4">{user.id}</td>
                    <td className="p-4">
                      <img
                        src={`https://ui-avatars.com/api/?background=random&circle=true&name=${user.name}`}
                        alt="avatar"
                        className="rounded-circle"
                        width={40}
                      />
                    </td>
                    <td className="p-4">{user.name}</td>
                    <td className="p-4">
                      <a
                        className="text-decoration-none"
                        href={`mailto:${user.email}`}
                      >
                        {user.email}
                      </a>
                    </td>
                    <td className="p-4">
                      <a
                        className="text-decoration-none"
                        href={`tel:{user.phone`}
                      >
                        {user.phone}
                      </a>
                    </td>
                    <td className="p-4">
                      <a
                        className="text-decoration-none"
                        href={`https://${user.website}`}
                        target="_blank"
                      >
                        {user.website}
                      </a>
                    </td>
                    <td className="p-4">
                      <button
                        className="btn btn-outline-secondary d-flex align-items-center gap-2"
                        onClick={() => navigate(`/users/${user.id}`)}
                      >
                        <LiaEyeSolid size={20} />
                        Show
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}

export default Users;
