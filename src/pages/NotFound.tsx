import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { config } from '../config';

const NotFound = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect after 3 seconds
    const timer = setTimeout(() => {
      navigate(config.NOT_FOUND_REDIRECT);
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="text-lg mb-4">The page you're looking for doesn't exist.</p>
      <p className="text-gray-600">
        Redirecting to home page in 3 seconds...
      </p>
    </div>
  );
};

export default NotFound; 