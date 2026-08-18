function MenuItem({
  id,
  name,
  category,
  origin,
  notes,
  price,
  imageUrl,
  onAdd,
}) {
  return (
    <article className="menu-item">
      {/* Only render the image element at all if imageUrl exists — a
          product with no photo yet just skips straight to the text,
          instead of showing a broken image icon. */}
      {imageUrl && (
        <div className="menu-item__image-wrap">
          <img src={imageUrl} alt={name} className="menu-item__image" />
        </div>
      )}

      <div className="menu-item__top">
        <h3>{name}</h3>
        <span className="menu-item__price">${price.toFixed(2)}</span>
      </div>
      <p className="menu-item__category">{category}</p>
      <p className="menu-item__origin">{origin}</p>
      <p className="menu-item__notes">{notes}</p>

      <div className="menu-item__bottom"></div>

      {/* Calling onAdd (passed down from App -> Menu -> MenuItem) with this
          item's own data is how a child component sends information back
          up to a parent in React — the reverse direction from props. */}
      <button
        type="button"
        className="menu-item__add"
        onClick={() => onAdd({ id, name, price })}
      >
        Add to cart
      </button>
    </article>
  );
}

export default MenuItem;
