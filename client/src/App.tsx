import './styles/App.css';
import { Navigation } from './components/Navigation';
import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './routes/Routes';
import { AuthProvider } from './context/AuthProvider';
import { LoadingProvider } from './context/LoadingProvider';
import { LoadSpinner } from './components/LoadSpinner';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <LoadingProvider>
          <LoadSpinner />
          <Navigation />
          <AppRoutes />
        </LoadingProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
