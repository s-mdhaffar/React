// import "./Cart.css";

function Cart({ cartItems, onCheckout }) {
  const totalHT = cartItems.reduce((sum, item) => sum + item.subtotal, 0);
  const totalTTC = cartItems.reduce((sum, item) => sum + item.total, 0);
  const totalTVA = totalTTC - totalHT;

  return (
    <div className="cart-container">
      <h2>Mon Panier</h2>
      {cartItems.length === 0 ? (
        <p className="empty-cart">Votre panier est vide</p>
      ) : (
        <>
          <table className="cart-table">
            <thead>
              <tr>
                <th>Produit</th>
                <th>Prix HT</th>
                <th>TVA</th>
                <th>Quantité</th>
                <th>Total HT</th>
                <th>Total TTC</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item.id}>
                  <td className="product-name">{item.name}</td>
                  <td>${item.price.toFixed(2)}</td>
                  <td>{item.tva.toFixed(1)}%</td>
                  <td>{item.quantity}</td>
                  <td>${item.subtotal.toFixed(2)}</td>
                  <td>${item.total.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="cart-summary">
            <div className="summary-row">
              <span>Total HT :</span>
              <span>${totalHT.toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Total TVA :</span>
              <span>${totalTVA.toFixed(2)}</span>
            </div>
            <div className="summary-row total-ttc">
              <span>Total TTC :</span>
              <span>${totalTTC.toFixed(2)}</span>
            </div>
          </div>
          <div className="cart-actions">
            <button className="btn-checkout" onClick={onCheckout}>
              Payer
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
