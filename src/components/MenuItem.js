const MenuItem = ({ item }) => {
  return (
    <div className="menu-item">
      <div className="menu-item-image" />
      <div className="menu-item-details">
        <h4 menu-item-name>{item.name}</h4>
        <p className="menu-item-desc">{item.description}</p>
        <span className="menu-item-price">KES {item.price}</span>
      </div>
      <div>
        <button
          className="btn btn--primary"
          onClick={() => alert(`Added "${item.name}" to cart!!`)}
          >
            + Add
        </button>
      </div>
    </div>
  );
};

export default MenuItem;
