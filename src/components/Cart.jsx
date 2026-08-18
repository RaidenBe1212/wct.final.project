import './Cart.css'

// Cart is still "controlled" by App (App owns the data), but now it also
// receives an onCheckout function and an orderStatus so it can show a
// real confirmation after placing an order, instead of just being a
// static list.
function Cart({ items, isOpen, onClose, onIncrease, onDecrease, onRemove, onCheckout, orderStatus }) {
  const total = items.reduce((sum, item) => sum + item.price * item.qty, 0)

  return (
    <>
      {isOpen && <div className="cart-overlay" onClick={onClose} />}

      <aside className={isOpen ? 'cart-drawer cart-drawer--open' : 'cart-drawer'}>
        <div className="cart-drawer__header">
          <h2>Your cart</h2>
          <button type="button" className="cart-drawer__close" onClick={onClose} aria-label="Close cart">
            &times;
          </button>
        </div>

        {/* Three possible views: order just placed, cart is empty, or
            cart has items. Only one of these is ever shown at a time. */}
        {orderStatus === 'success' ? (
          <div className="cart-drawer__confirmation">
            <p className="cart-drawer__confirmation-title">Order placed!</p>
            <p>
              Thanks — your order has been sent to the counter. This is a demo
              order, saved for real in the database, as if a customer had
              just placed it.
            </p>
            <button type="button" onClick={onClose}>
              Close
            </button>
          </div>
        ) : items.length === 0 ? (
          <p className="cart-drawer__empty">
            Nothing here yet — add a coffee from the menu to get started.
          </p>
        ) : (
          <>
            <ul className="cart-drawer__list">
              {items.map((item) => (
                <li key={item.id} className="cart-line">
                  <div className="cart-line__info">
                    <span className="cart-line__name">{item.name}</span>
                    <span className="cart-line__price">${item.price.toFixed(2)}</span>
                  </div>

                  <div className="cart-line__controls">
                    <button type="button" onClick={() => onDecrease(item.id)} aria-label={`Decrease ${item.name} quantity`}>
                      &minus;
                    </button>
                    <span>{item.qty}</span>
                    <button type="button" onClick={() => onIncrease(item.id)} aria-label={`Increase ${item.name} quantity`}>
                      +
                    </button>
                    <button
                      type="button"
                      className="cart-line__remove"
                      onClick={() => onRemove(item.id)}
                      aria-label={`Remove ${item.name} from cart`}
                    >
                      Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            <div className="cart-drawer__total">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>

            {orderStatus === 'error' && (
              <p className="cart-drawer__error">
                Something went wrong placing the order — please try again.
              </p>
            )}

            <button
              type="button"
              className="cart-drawer__checkout"
              onClick={onCheckout}
              disabled={orderStatus === 'placing'}
            >
              {orderStatus === 'placing' ? 'Placing order…' : 'Checkout'}
            </button>
          </>
        )}
      </aside>
    </>
  )
}

export default Cart
