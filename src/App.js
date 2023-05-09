import './App.css';
import Router from './pages';
import { ContextProvider } from './services/AuthContext';

function App() {
  return (
    <ContextProvider>
      <div className='App'>
        <Router />
      </div>
    </ContextProvider>
  );
}

export default App;
