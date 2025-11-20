import { Link } from "react-router-dom";

export const NotFoundPage = () => {
  return (
    <div className="h-[calc(100vh-200px)] w-full flex flex-col items-center justify-center space-y-6">
      <h1 className="text-4xl font-bold text-red-600">404 - Page Not Found</h1>
      <Link to="/" className="text-blue-500 underline">
        Go back to Home
      </Link>
    </div>
  );
};
