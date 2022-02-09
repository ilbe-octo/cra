import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './AppRoutes';

function App() {
  const [counter, setCounter] = React.useState(0);

  React.useEffect(() => {
    const int = setInterval(() => {
      setCounter(c => c + 1);
    }, 1000);

    return () => {
      clearInterval(int);
    };
  }, []);
  return (
    <div className="App">
      <p>{counter}</p>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </div>
  );
}

export default App;
