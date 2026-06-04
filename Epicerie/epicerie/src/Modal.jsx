import { useState } from "react";
// import "./Modal.css";

function Modal({ isOpen, onClose, onAddProduct }) {
  const [formData, setFormData] = useState({
    name: "",
    category: "Fruits et légumes",
    price: "",
    stock: "",
    tva: "5.5",
    unit: "pièce",
  });

  const categories = [
    "Fruits et légumes",
    "Produits laitiers",
    "Boulangerie",
    "Boissons",
    "Épicerie salée",
    "Épicerie sucrée",
    "Surgelés",
    "Viandes",
    "Poissons et fruits de mer",
    "Snacks",
    "Hygiène",
    "Entretien",
  ];

  const units = ["pièce", "kg", "g", "L", "mL", "pack"];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.price || !formData.stock || !formData.tva) {
      alert("Veuillez remplir tous les champs");
      return;
    }

    onAddProduct({
      name: formData.name,
      category: formData.category,
      price: parseFloat(formData.price),
      stock: parseInt(formData.stock),
      tva: parseFloat(formData.tva),
      unit: formData.unit,
    });

    setFormData({
      name: "",
      category: "Fruits et légumes",
      price: "",
      stock: "",
      tva: "5.5",
      unit: "pièce",
    });
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Ajouter un nouveau produit</h2>
          <button className="close-btn" onClick={onClose}>
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label htmlFor="name">Nom du produit *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Ex: Lait 1L"
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="category">Catégorie *</label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                required
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="unit">Unité *</label>
              <select
                id="unit"
                name="unit"
                value={formData.unit}
                onChange={handleInputChange}
                required
              >
                {units.map((unit) => (
                  <option key={unit} value={unit}>
                    {unit}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="price">Prix HT ($) *</label>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                placeholder="0.00"
                step="0.01"
                min="0"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="tva">TVA (%) *</label>
              <input
                type="number"
                id="tva"
                name="tva"
                value={formData.tva}
                onChange={handleInputChange}
                placeholder="5.5"
                step="0.1"
                min="0"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="stock">Stock *</label>
              <input
                type="number"
                id="stock"
                name="stock"
                value={formData.stock}
                onChange={handleInputChange}
                placeholder="0"
                step="1"
                min="0"
                required
              />
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn-cancel" onClick={onClose}>
              Annuler
            </button>
            <button type="submit" className="btn-submit">
              Ajouter le produit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Modal;
