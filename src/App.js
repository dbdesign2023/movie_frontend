import './App.css';
import Header from './components/Header';
import { BrowserRouter } from 'react-router-dom';
import Router from './pages';
import Footer from './components/Footer';
import { ContextProvider } from './services/AuthContext';
import './assets/styles.css';


function App() {
  return (
    <ContextProvider>
      <BrowserRouter basename={process.env.PUBLIC_URL}>
      <div className='App'>
        <Header />
        <div className='container-sm' style={{ minHeight: '100vh' }}>
          <Router />
        </div>
        <Footer />
      </div>
      </BrowserRouter>
    </ContextProvider>
  );
}

export default App;
