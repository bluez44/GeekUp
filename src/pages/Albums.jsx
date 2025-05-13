import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";

import { getAlbums } from "../api/PlaceholderApi";

function Albums() {
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    const res = getAlbums();

    res
      .then((data) => {
        console.log(data);

        setAlbums(data);
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
            <th>Title</th>
            <th>User</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {albums &&
            albums.map((album) => (
              <tr key={album.id}>
                <td>{album.id}</td>
                <td>{album.title}</td>
                <td>{album.userId}</td>
                <td>Show</td>
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  );
}

export default Albums;
