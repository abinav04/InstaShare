import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import { BrowserRouter } from 'react-router'
import { SavePostHelper } from './context';

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <SavePostHelper>
      <App />
    </SavePostHelper>
  </BrowserRouter>
);
