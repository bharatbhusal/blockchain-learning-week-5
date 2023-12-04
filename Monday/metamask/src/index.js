import { createRoot } from "react-dom/client";
import App from "./App";
import './index.css';

const containerDiv = document.getElementById("root");
const root = createRoot(containerDiv);
root.render(<App />)