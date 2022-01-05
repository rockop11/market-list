import React, { useState, useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import Input from "./components/Input";
import ProductCard from "./components/ProductCard";
import "./index.css";

const App = () => {
  const [producto, setProducto] = useState({});
  const [lista, setLista] = useState([]);
  const [finalPrice, setFinalPrice] = useState(0);
  const [show, setShow] = useState(false);
  const [validationMsg, setValidationMsg] = useState(false);

  const inputNombreRef = useRef();
  const inputPrecioRef = useRef();

  const capturoInputNombreValue = (e) => {
    const nombre = e.target.value;
    setProducto({
      ...producto,
      nombre,
    });
  };

  const capturoInputPrecioValue = (e) => {
    const precio = parseFloat(e.target.value);
    let id = uuidv4();
    setProducto({
      ...producto,
      precio,
      id,
    });
  };

  const addProduct = (e) => {
    e.preventDefault();
    // console.log(producto.nombre)
    if (
      producto.length === 0 ||
      producto.precio === undefined ||
      producto.nombre === undefined
    ) {
      setValidationMsg(true);
      setLista(lista);
    } else {
      setLista([...lista, producto]);
      setFinalPrice(finalPrice + producto.precio);
      setValidationMsg(false);
    }
    setProducto("");
    inputNombreRef.current.value = "";
    inputPrecioRef.current.value = "";
    inputNombreRef.current.focus();
  };

  const deleteItem = (id) => {
    const newList = lista.filter((prod) => prod.id !== id);
    setLista(newList);
    const newPrice = newList.map((prod) => prod.precio);
    const finalNewPrice = newPrice.reduce((acc, item) => {
      return (acc = acc + item);
    }, 0);
    setFinalPrice(finalNewPrice);
  };

  const handleModalClose = () => {
    setShow(false);
  };

  const handleModalOpen = () => {
    setShow(true);
  };

  const yesAnswer = () => {
    setProducto({});
    setFinalPrice(0);
    setLista([]);
    setShow(false);
  };

  useEffect(() => {
    const dataList = localStorage.getItem("lista-productos");
    const dataPrice = localStorage.getItem("final-Price");
    if ((dataList, dataPrice)) {
      setLista(JSON.parse(dataList));
      setFinalPrice(JSON.parse(dataPrice));
    }
  }, []);

  useEffect(() => {
    setProducto("");
  }, [lista]);

  useEffect(() => {
    localStorage.setItem("lista-productos", JSON.stringify(lista));
    localStorage.setItem("final-Price", JSON.stringify(finalPrice));
  });

  return (
    <div className="container">
      <h1>Market List</h1>

      <form className="form">
        <Input
          type="text"
          placeholder="Producto"
          onChange={capturoInputNombreValue}
          className="input input-prod"
          inputRef={inputNombreRef}
        />
        <Input
          type="number"
          placeholder="Precio"
          onChange={capturoInputPrecioValue}
          className="input input-precio"
          inputRef={inputPrecioRef}
        />

        <button onClick={addProduct} className="add-button">
          <i className="bx bx-plus"></i>
        </button>
      </form>
      <div className="validation-msg">
        {validationMsg === true ? (
          <p className="error-msg">Debe ingresar un item</p>
        ) : (
          ""
        )}
      </div>
      <hr />
      <ul>
        {lista.map((item, i) => (
          <li key={i}>
            <ProductCard
              lista={lista}
              item={item}
              i={i}
              deleteItem={deleteItem}
            />
          </li>
        ))}
      </ul>
      <hr />
      <div className="total-container">
        {lista.length >= 1 ? (
          <button
            className="button"
            onClick={handleModalOpen}
            // eslint-disable-next-line react/jsx-no-duplicate-props
            className="delete-list"
          >
            Borrar Lista
          </button>
        ) : (
          ""
        )}

        <h3 className="total">Total: ${finalPrice}</h3>
      </div>

      <div hidden={!show}>
        <div className="modal-background">
          <div className="modal-card">
            <i className="bx bx-x" onClick={handleModalClose}></i>
            <h3 className="modal-title">Desea borrar la lista?</h3>
            <div className="button-container">
              <button
                type="button"
                onClick={yesAnswer}
                className="modal-button ok-answer"
              >
                SI
              </button>
              <button
                type="button"
                onClick={handleModalClose}
                className="modal-button no-answer"
              >
                NO
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;


//chequear los mediaqueries a partir de tablet.