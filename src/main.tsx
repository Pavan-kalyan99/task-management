// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { store } from './components/redux/slice/store'
import { Provider } from 'react-redux';

createRoot(document.getElementById('root')!).render(
  // <StrictMode>
    <BrowserRouter>
  <Provider store={store}>

    
    <App />
    </Provider>
    </BrowserRouter>
  // </StrictMode>
  ,
)
