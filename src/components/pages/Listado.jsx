import React from "react";
import { Link } from "react-router-dom";
import { Global } from "../../helpers/Global";
import { Peticion } from "../../helpers/Peticion";

export const Listado = ({ articulos, setArticulos }) => {
  const eliminar = async (id) => {
    let { datos } = await Peticion(Global.url + "articulo/" + id, "DELETE");

    if (datos.status === "sucsess") {
      let articulosActualizados = articulos.filter(
        (articulo) => articulo._id !== id
      );
      setArticulos(articulosActualizados);
    }
  };

  return articulos.map((articulo) => {
    return (
      <article key={articulo._id} className="articulo-item">
        <div className="mascara">
          {articulo.imagen != "default.png" && (
            <img src={Global.url + "imagen/" + articulo.imagen} />
          )}

          {articulo.imagen == "default.png" && (
            <img src="https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png" />
          )}
        </div>
        <div className="datos">
          <h3 className="title">
            <Link to={"/articulo/" + articulo._id}>{articulo.titulo}</Link>
          </h3>
          <p className="description">{articulo.contenido}</p>

          <Link to={"/editar/" + articulo._id} className="edit">
            Editar
          </Link>
          <button
            className="delete"
            onClick={() => {
              eliminar(articulo._id);
            }}
          >
            Borrar
          </button>
        </div>
      </article>
    );
  });
};

//import React from "react";
/* import { Global } from "../../helpers/Global";
import { Peticion } from "../../helpers/Peticion";

export const Listado = ({ articulos, setArticulos }) => {
  const eliminarArticulo = async (id) => {
    try {
      let { datos } = await Peticion(Global.url + "articulo/" + id, "DELETE");
      console.log(datos);
      // console.log(datos.status);
      if (datos.status === "sucsess") {
        let articulosActualizados = articulos.filter(
          (articulo) => articulo._id !== id
        );
        setArticulos(articulosActualizados);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return articulos.map((articulo) => (
    <article key={articulo._id} className="articulo-item">
      <div className="mascara">
        <img
          src={
            articulo.imagen !== "default.png"
              ? Global.url + "imagen/" + articulo.imagen
              : "https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png"
          }
        />
      </div>
      <div className="datos">
        <h3 className="title">{articulo.titulo}</h3>
        <p className="description">{articulo.contenido}</p>

        <button className="edit">Editar</button>
        <button
          className="delete"
          onClick={() => eliminarArticulo(articulo._id)}
        >
          Borrar
        </button>
      </div>
    </article>
  ));
}; */
