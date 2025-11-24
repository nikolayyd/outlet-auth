import './styles/App.css';
import { Navigation } from './components/Navigation';
import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './routes/Routes';
import { AuthProvider } from './context/AuthProvirder';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navigation />
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
