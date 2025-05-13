import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { IoMdArrowRoundBack } from "react-icons/io";
import { LiaEyeSolid } from "react-icons/lia";
import { Table } from "react-bootstrap";

import { getAlbumsByUserId, getUsersById } from "../api/PlaceholderApi";
import Loading from "../components/Loading";

function UserDetail() {
  const { id } = useParams();
  const [user, setUser] = useState({});
  const [albums, setAlbums] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const res = getUsersById(id);

    res
      .then((data) => {
        // console.log(data);
        setUser(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    const res = getAlbumsByUserId(id);

    res
      .then((data) => {
        // console.log(data);
        setAlbums(data);
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
        <>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to={"/users"}>Users</Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Show
              </li>
            </ol>
          </nav>
          <div className="d-flex gap-3 mb-4">
            <button
              className="btn btn-outline-secondary"
              onClick={() => history.back()}
            >
              <IoMdArrowRoundBack size={24} />
            </button>
            <p className="fs-4 fw-bold m-0">Show User</p>
          </div>
          <div className="p-3 bg-white rounded-3 shadow">
            <div className="py-3 px-5 rounded-3 border">
              <div className="d-flex gap-3 justify-content-start">
                <div>
                  <img
                    src={`https://ui-avatars.com/api/?background=random&circle=true&name=${user.name}`}
                    alt="avatar"
                    className="rounded-circle"
                  />
                </div>
                <div className="d-flex flex-column">
                  <Link
                    to={`/users/${user.id}`}
                    className="fs-4 fw-bold mb-1 text-decoration-none"
                    onClick={() => setPathName("users")}
                  >
                    {user.name}
                  </Link>
                  <a
                    href={`mailto:${user.email}`}
                    className="text-decoration-none"
                  >
                    {user.email}
                  </a>
                </div>
              </div>
              <hr />
              <h2>Albums</h2>
              <table className="table table-hover m-0">
                <thead>
                  <tr>
                    <th className="p-4">ID</th>
                    <th className="p-4">Title</th>
                    <th className="p-4">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {albums.map((album) => (
                    <tr key={album.id}>
                      <td className="p-4">{album.id}</td>
                      <td className="p-4">{album.title}</td>
                      <td className="p-4">
                        <button
                          className="btn btn-outline-secondary d-flex align-items-center gap-2"
                          onClick={() => navigate(`/albums/${album.id}`)}
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
          </div>
        </>
      )}
    </>
  );
}

export default UserDetail;
