import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <h1 className="text-7xl font-bold text-gray-200 mb-4">404</h1>

      <p className="text-lg text-gray-400 mb-6">
        Oops! The page you’re looking for doesn’t exist.
      </p>

      <Link
        to="/"
        className="
          px-6
          py-2
          rounded-lg
          bg-blue-600
          text-white
          font-medium
          hover:bg-blue-500
          transition
        "
      >
        ← Back to Home
      </Link>
    </div>
  );
};

export default NotFound;
