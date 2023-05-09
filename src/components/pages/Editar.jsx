import React from "react";
import { useState } from "react";
import { useForm } from "../../hooks/useForm";
import { Peticion } from "../../helpers/Peticion";
import { Global } from "../../helpers/Global";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

export const Editar = () => {
  const { formulario, enviado, cambiado } = useForm({});
  const [resultado, setResultado] = useState("no_enviado");
  const [articulo, setArticulo] = useState({});
  const params = useParams();

  useEffect(() => {
    conseguirArticulo();
  }, []);

  const conseguirArticulo = async () => {
    const { datos } = await Peticion(
      Global.url + "articulo/" + params.id,
      "GET"
    );

    if (datos.status === "success") {
      setArticulo(datos.articulo);
    }
  };

  const editarArticulo = async (e) => {
    e.preventDefault();

    //Recoger datos formulario
    let nuevoArticulo = formulario;

    //Guardar articulo en el backend
    const { datos } = await Peticion(
      Global.url + "articulo/" + params.id,
      "PUT",
      nuevoArticulo
    );
    console.log(datos.status);
    if (datos.status === "sucsess") {
      setResultado("guardado");
    } else {
      setResultado("error");
    }

    //Subir imagen
    const fileInput = document.querySelector("#file");

    if (datos.status === "sucsess" && fileInput.files[0]) {
      setResultado("guardado");

      const formData = new FormData();
      formData.append("file0", fileInput.files[0]);

      const subida = await Peticion(
        Global.url + "subir-imagen/" + datos.articulo._id,
        "POST",
        formData,
        true
      );
      console.log(subida.datos.status);
      if (subida.datos.status === "sucsess") {
        setResultado("guardado");
      } else {
        setResultado("error");
      }
    }
    //console.log(resultado);
  };

  return (
    <div className="jumbo">
      <h1>Editar articulo</h1>
      <p>Formulario para editar {articulo.titulo}</p>
      {/* <pre>{JSON.stringify(formulario)}</pre> */}

      <strong>
        {resultado == "error"
          ? "Los datos proporcionados son incorrectos "
          : ""}
      </strong>

      <strong>
        {resultado == "guardado" ? "Articulo guardado con exito !!" : ""}
      </strong>

      {/* montar formulario*/}

      <form className="formulario" onSubmit={editarArticulo}>
        <div className="form-group">
          <label htmlFor="titulo">Titulo</label>
          <input
            type="text"
            name="titulo"
            onChange={cambiado}
            defaultValue={articulo.titulo}
          />
        </div>

        <div className="form-group">
          <label htmlFor="contenido">Contenido</label>
          <textarea
            type="text"
            name="contenido"
            onChange={cambiado}
            defaultValue={articulo.contenido}
          />
        </div>

        <div className="form-group">
          <label htmlFor="file0">Imagen</label>
          <div className="mascara">
            {articulo.imagen != "default.png" && (
              <img src={Global.url + "imagen/" + articulo.imagen} />
            )}

            {articulo.imagen == "default.png" && (
              <img src="https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png" />
            )}
          </div>
          <input type="file" name="file0" id="file" />
        </div>

        <input type="submit" value="Guardar" className="btn btn-success" />
      </form>
    </div>
  );
};
