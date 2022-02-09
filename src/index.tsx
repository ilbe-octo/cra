import { StrictMode, lazy, Suspense } from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import { initAuthClient } from './keycloakHelper';

const App = lazy(() => import('./App'));

const render = () => {
  ReactDOM.render(
    <StrictMode>
      <Suspense fallback={null}>
        <App />
      </Suspense>
    </StrictMode>,
    document.getElementById('root')
  );
};

initAuthClient({ onInit: render });

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
