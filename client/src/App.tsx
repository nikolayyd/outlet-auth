import './styles/App.css';
import { Form } from './components/Form';
import { Navigation } from './components/Navigation';
import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './routes/Routes';

function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
