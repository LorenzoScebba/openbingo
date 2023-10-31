import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";

console.log(
  "\x1b[31mMade\x1b[0m \x1b[33mwith\x1b[0m \x1b[34mlove,\x1b[0m \x1b[32mcoffee\x1b[0m \x1b[35mand\x1b[0m \x1b[36msome\x1b[0m \x1b[31mshitty\x1b[0m \x1b[33mideas\x1b[0m",
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
