import './App.css';
import Header from './components/Header';
import Router from './pages';
import Footer from './components/Footer';
import { ContextProvider } from './services/AuthContext';
import './assets/styles.css';


function App() {
  return (
    <ContextProvider>
      <div className='App'>
        <Header />
        <div className='container-sm' style={{ minHeight: '100vh' }}>
          <Router />
        </div>
        <Footer />
      </div>
    </ContextProvider>
  );
}

export default App;
