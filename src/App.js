import './App.css';
import Header from './components/Header';
import Router from './pages';
import Footer from './components/Footer';
import { ContextProvider } from './services/AuthContext';

function App() {
  return (
    <ContextProvider>
      <div className='App'>
        <Header />
        <div style={{ minHeight: '100vh' }}>
          <Router />
        </div>
        <Footer />
      </div>
    </ContextProvider>
  );
}

export default App;
