const ProductCard = ({ product }) => {
  return (
    <div className="card">
      <img src={product.thumbnail} alt={product.title} />
      <h3>{product.title}</h3>
      <p>{product.description}</p>
      <strong>${product.price}</strong>
    </div>
  );
};

export default ProductCard;