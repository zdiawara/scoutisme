// resources/js/app.jsx

import "./bootstrap"; // Si vous avez des dépendances globales comme Axios
import { createRoot } from "react-dom/client";
import App from "./App"; // Importez votre composant racine App

// Assurez-vous que l'élément avec l'ID 'app' existe dans votre Blade
const appElement = document.getElementById("app");

if (appElement) {
  const root = createRoot(appElement);
  root.render(<App />);
} else {
  console.error("L'élément avec l'ID 'app' n'a pas été trouvé dans le DOM.");
}
