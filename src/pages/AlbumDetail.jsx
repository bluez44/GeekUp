import { useEffect, useState, useContext } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { Link, useParams } from "react-router";
import {
  getAlbumsById,
  getPhotosByAlbumId,
  getUsersById,
} from "../api/PlaceholderApi";
import PathContext from "../context/PathContext";
import Loading from "../components/Loading";

function AlbumDetail() {
  const { setPathName } = useContext(PathContext);
  const { id } = useParams();
  const [album, setAlbum] = useState({});
  const [user, setUser] = useState({});
  const [photos, setPhotos] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  useEffect(() => {
    document.title = `#${id} Albums Detail`;
  }, []);

  useEffect(() => {
    const res = getAlbumsById(id);

    res
      .then((data) => {
        // console.log(data);
        setAlbum(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    if (album.userId) {
      const res = getUsersById(album.userId);

      res
        .then((data) => {
          //   console.log(data);
          setUser(data);
          setIsLoading(false);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [album]);

  useEffect(() => {
    if (album.id) {
      const res = getPhotosByAlbumId(album.id);

      res
        .then((data) => {
          // console.log(data);
          setPhotos(data);
          setIsLoading(false);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [album]);

  return (
    <>
      {!isLoading ? (
        <>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to={"/albums"}>Albums</Link>
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
            <p className="fs-4 fw-bold m-0">Show Album</p>
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
              <h2>{album.title}</h2>
              <div className="row">
                {photos.map((photo) => (
                  <div
                    className="col col-12 col-sm-6 col-md-4 col-lg-3 btn btn-outline-light text-black"
                    key={photo.id}
                    onClick={() => setSelectedPhoto(photo)}
                  >
                    <img
                      src={photo.thumbnailUrl}
                      alt={photo.title}
                      key={photo.id}
                      className="me-3"
                      style={{ cursor: "pointer" }}
                    />
                  </div>
                ))}
              </div>

              {selectedPhoto && (
                <div
                  className="overlay text-white"
                  onClick={() => setSelectedPhoto(null)}
                  style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    backgroundColor: "rgba(0, 0, 0, 0.8)",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    zIndex: 9999,
                  }}
                >
                  <img
                    src={selectedPhoto.url}
                    alt={selectedPhoto.title}
                    style={{ maxWidth: "90%", maxHeight: "90%" }}
                  />
                </div>
              )}
            </div>
          </div>
        </>
      ) : (
        <Loading />
      )}
    </>
  );
}

export default AlbumDetail;
