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
        <Router />
        <Footer />
      </div>
    </ContextProvider>
  );
}

export default App;
