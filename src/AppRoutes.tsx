import { Link, Route, Routes } from 'react-router-dom';

function Home() {
  return (
    <main>
      <h2>Welcome to the homepage!</h2>
      <p>You can do this, I believe in you.</p>
    </main>
  );
}

function About() {
  return (
    <main>
      <h2>Who are we?</h2>
      <p>That feels like an existential question, dont you think?</p>
    </main>
  );
}

function AppRoutes() {
  return (
    <div className="App">
      <nav>
        <Link to="/">Home</Link> | <Link to="about">About</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="about" element={<About />} />
      </Routes>
    </div>
  );
}

export default AppRoutes;
