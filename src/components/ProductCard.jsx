import React from "react";

const ProductCard = ({ item, i, deleteItem }) => {
  return (
    <div className="product-info">
      <p className="number">{i + 1}</p>
      <p className="name">{item.nombre}</p>
      <p className="price">$ {item.precio}</p>

      <button
        type="submit"
        onClick={() => deleteItem(item.id)}
        className="delete-item"
      >
        <i className="bx bxs-trash"></i>
      </button>
    </div>
  );
};

export default ProductCard;
