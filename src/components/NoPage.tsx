import { Link } from "react-router-dom";

const NoPage = () => {
  return (
    <div className="h-screen flex items-center justify-center bg-amber-100">
      <div className="text-center p-6 bg-white rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-6xl font-bold text-red-500 mb-4">404</h1>
        <p className="text-xl font-semibold text-gray-700 mb-6">Oops! Page not found.</p>
        <p className="text-gray-500 mb-8">
          The page you’re looking for doesn’t exist or has been moved.
        </p>
        <Link
          to="/"
          className="inline-block px-6 py-3 bg-purple-500 text-white text-lg font-medium rounded-md hover:bg-purple-600 transition duration-300"
        >
          Go Back to Homepage
        </Link>
      </div>
    </div>
  );
};

export default NoPage;