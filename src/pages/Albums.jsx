import { useEffect, useMemo, useState, useContext } from "react";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import { LiaEyeSolid } from "react-icons/lia";
import { Link, useNavigate, useSearchParams } from "react-router";

import { getAlbums, getUsers } from "../api/PlaceholderApi";
import PathContext from "../context/PathContext";
import Loading from "../components/Loading";

function Albums() {
  const { setPathName } = useContext(PathContext);

  const [isLoading, setIsLoading] = useState(true);

  const [albums, setAlbums] = useState([]);
  const [users, setUsers] = useState([]);

  const [totalPage, setTotalPage] = useState(1);

  const [searchParams, setSearchParams] = useSearchParams();
  const pageSize = Number(searchParams.get("pageSize"));
  const currentPage = Number(searchParams.get("currentPage"));

  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Albums";
  }, []);

  useEffect(() => {
    if (pageSize && !currentPage) {
      navigate(`/albums?pageSize=${pageSize}&currentPage=1`);
    }

    if (!pageSize && currentPage) {
      navigate(`/albums?pageSize=10&currentPage=${currentPage}`);
    }

    if (!pageSize || !currentPage) {
      navigate("/albums?pageSize=10&currentPage=1");
    }
  }, [searchParams]);

  useEffect(() => {
    const res = getAlbums();

    res
      .then((data) => {
        setAlbums(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    const res = getUsers();

    res
      .then((data) => {
        setUsers(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    if (albums.length > 0 && pageSize) {
      setTotalPage(Math.ceil(albums.length / pageSize));
    }
  }, [albums]);

  // useEffect(() => {
  //   if (currentPage > totalPage || currentPage < 1) {
  //     navigate(`/albums?pageSize=${pageSize || 10}&currentPage=1`);
  //   }
  // }, [searchParams, totalPage]);

  const filteredAlbums = useMemo(() => {
    if (albums.length > 0 && pageSize) {
      setTotalPage(Math.ceil(albums.length / pageSize));
    }

    if (pageSize && currentPage) {
      return albums.slice((currentPage - 1) * pageSize, currentPage * pageSize);
    }
    return albums;
  }, [searchParams, albums]);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          {filteredAlbums.length > 0 ? (
            <div className="table-responsive mb-4 bg-white shadow rounded-4">
              <table className="table table-hover m-0">
                <thead>
                  <tr>
                    <th className="p-4">ID</th>
                    <th className="p-4">Title</th>
                    <th className="p-4">User</th>
                    <th className="p-4">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAlbums.map((album) => (
                    <tr key={album.id}>
                      <td className="p-4" style={{ transition: "all 0.5s" }}>
                        {album.id}
                      </td>
                      <td className="p-4" style={{ transition: "all 0.5s" }}>
                        {album.title}
                      </td>
                      <td className="p-4" style={{ transition: "all 0.5s" }}>
                        <div className="d-flex gap-2 align-items-center">
                          <img
                            src={`https://ui-avatars.com/api/?background=random&circle=true&name=${
                              users.find((user) => user.id === album.userId)
                                ?.name
                            }`}
                            className="rounded-circle"
                            alt={`${album.id}`}
                            width={40}
                          />
                          <Link
                            to={`/users/${album.userId}`}
                            className="text-decoration-none"
                            onClick={() => setPathName("users")}
                          >
                            {
                              users.find((user) => user.id === album.userId)
                                ?.name
                            }
                          </Link>
                        </div>
                      </td>
                      <td className="p-4" style={{ transition: "all 0.5s" }}>
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
          ) : (
            <p className="fs-1 fw-bold text-center">
              No data at page {currentPage}
            </p>
          )}
          <div className="d-flex gap-1 justify-content-center justify-content-md-end flex-wrap">
            <button
              className="btn btn-outline-secondary"
              onClick={() =>
                navigate(
                  `/albums?pageSize=${pageSize}&currentPage=${currentPage - 1}`
                )
              }
              disabled={currentPage == 1}
            >
              <GrFormPrevious />
            </button>
            <div className="d-none d-md-block">
              {totalPage > 1 &&
                Array.from({ length: totalPage }, (_, index) => index + 1).map(
                  (page) => (
                    <button
                      className={`btn btn-outline-secondary ${
                        currentPage == page && "active"
                      }`}
                      key={page}
                      onClick={() =>
                        navigate(
                          `/albums?pageSize=${pageSize}&currentPage=${page}`
                        )
                      }
                    >
                      {page}
                    </button>
                  )
                )}
            </div>
            <button
              className="btn btn-outline-secondary"
              onClick={() =>
                navigate(
                  `/albums?pageSize=${pageSize}&currentPage=${currentPage + 1}`
                )
              }
              disabled={currentPage == totalPage}
            >
              <GrFormNext />
            </button>

            <select
              className="form-select"
              style={{ maxWidth: "150px" }}
              defaultValue={pageSize}
              onChange={(e) =>
                setSearchParams({ pageSize: e.target.value, currentPage: 1 })
              }
            >
              <option value="10">10 / page</option>
              <option value="20">20 / page</option>
              <option value="50">50 / page</option>
              <option value="100">100 / page</option>
            </select>
          </div>
          <p className="text-center mt-2 d-md-none">
            Page {currentPage} / {totalPage}
          </p>
        </>
      )}
    </>
  );
}

export default Albums;
