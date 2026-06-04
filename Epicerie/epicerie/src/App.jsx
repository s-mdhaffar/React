import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import heroImg from "./assets/hero.png";
// import "./App.css";
import { products as initialProducts } from "./bd.tsx";
import Cart from "./Cart.jsx";
import Modal from "./Modal.jsx";

function App() {
  const [products, setProducts] = useState(initialProducts);
  const [cartItems, setCartItems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddToCart = (product) => {
    setCartItems((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: item.quantity + 1,
                subtotal: (item.quantity + 1) * item.price,
                total: (item.quantity + 1) * item.price * (1 + item.tva / 100),
              }
            : item,
        );
      } else {
        return [
          ...prevCart,
          {
            id: product.id,
            name: product.name,
            price: product.price,
            tva: product.tva,
            quantity: 1,
            subtotal: product.price,
            total: product.price * (1 + product.tva / 100),
          },
        ];
      }
    });
  };

  const handleCheckout = () => {
    // Vérifier qu'il y a des articles dans le panier
    if (cartItems.length === 0) {
      alert("Le panier est vide");
      return;
    }

    // Mettre à jour les stocks
    setProducts((prevProducts) => {
      return prevProducts.map((product) => {
        const cartItem = cartItems.find((item) => item.id === product.id);
        if (cartItem) {
          return {
            ...product,
            stock: product.stock - cartItem.quantity,
          };
        }
        return product;
      });
    });

    // Vider le panier
    setCartItems([]);
    alert("Vente validée ! Les stocks ont été mis à jour.");
  };

  const handleAddProduct = (newProduct) => {
    const newId = Math.max(...products.map((p) => p.id), 0) + 1;
    setProducts((prev) => [
      ...prev,
      {
        ...newProduct,
        id: newId,
      },
    ]);
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="App">
        <div className="hero">
          <img src={heroImg} alt="Hero" />
          <h1>Bienvenue à l'épicerie en ligne</h1>
        </div>

        <div className="products-header">
          <button
            className="btn-add-product"
            onClick={() => setIsModalOpen(true)}
          >
            + Ajouter un produit
          </button>
        </div>

        <div className="products">
          {products.map((product) => (
            <div key={product.id} className="product-card">
              {/* <img src={product.image} alt={product.name} /> */}
              <h2>{product.name}</h2>
              <p>{product.description}</p>
              <p>{product.stock} en stock</p>
              <p className="price">${product.price}</p>
              <button onClick={() => handleAddToCart(product)}>
                Ajouter au panier
              </button>
            </div>
          ))}
        </div>
        <Cart cartItems={cartItems} onCheckout={handleCheckout} />
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddProduct={handleAddProduct}
      />
    </>
  );
}

export default App;
