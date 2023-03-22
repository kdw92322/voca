import * as ReactDOMClient from 'react-dom/client';
import LoginPage from './login/LoginPage';

const container = document.getElementById('root');
const root = ReactDOMClient.createRoot(container);

root.render(<LoginPage />);
