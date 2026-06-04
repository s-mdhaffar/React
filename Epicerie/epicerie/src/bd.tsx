export type Category =
  | "Fruits et légumes"
  | "Produits laitiers"
  | "Boulangerie"
  | "Boissons"
  | "Épicerie salée"
  | "Épicerie sucrée"
  | "Surgelés"
  | "Viandes"
  | "Poissons et fruits de mer"
  | "Snacks"
  | "Hygiène"
  | "Entretien";

export type Unit = "pièce" | "kg" | "g" | "L" | "mL" | "pack";

export interface Product {
  id: number;
  name: string;
  category: Category;
  price: number;
  stock: number;
  unit: Unit;
  tva: number;
}

export const products: Product[] = [
  {
    id: 1,
    name: "Lait 1L",
    category: "Produits laitiers",
    price: 1.2,
    stock: 20,
    unit: "L",
    tva: 5.5,
  },
  {
    id: 2,
    name: "Pain",
    category: "Boulangerie",
    price: 0.9,
    stock: 15,
    unit: "pièce",
    tva: 5.5,
  },
  {
    id: 3,
    name: "Pommes",
    category: "Fruits et légumes",
    price: 2.5,
    stock: 30,
    unit: "kg",
    tva: 5.5,
  },
  {
    id: 4,
    name: "Riz 1kg",
    category: "Épicerie salée",
    price: 3.4,
    stock: 12,
    unit: "kg",
    tva: 5.5,
  },
];
