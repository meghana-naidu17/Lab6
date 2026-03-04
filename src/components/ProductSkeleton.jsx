const ProductSkeleton = () => {
  return (
    <div className="grid">
      {[...Array(8)].map((_, index) => (
        <div key={index} className="card skeleton">
          <div className="image-placeholder" />
          <div className="text-placeholder" />
          <div className="text-placeholder short" />
        </div>
      ))}
    </div>
  );
};

export default ProductSkeleton;