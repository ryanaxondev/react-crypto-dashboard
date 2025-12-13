import { Outlet, Link } from 'react-router-dom';

const Layout = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="p-4 border-b border-gray-700 flex gap-4">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
      </header>

      <main className="p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
