import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, ArrowLeft } from 'lucide-react';
import { Button } from '@components/ui/Button';
import { ROUTES } from '@constants/routes.constants';

export default function NotFoundPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-6 dark:bg-gray-900">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <p className="text-8xl font-black text-indigo-600 dark:text-indigo-400">404</p>
        <h1 className="mt-4 text-3xl font-bold text-gray-900 dark:text-gray-100">Page not found</h1>
        <p className="mt-2 text-gray-500 dark:text-gray-400">
          Sorry, we couldn't find the page you're looking for.
        </p>
        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Button
            onClick={() => window.history.back()}
            variant="outline"
            leftIcon={<ArrowLeft size={16} />}
          >
            Go back
          </Button>
          <Link to={ROUTES.DASHBOARD}>
            <Button leftIcon={<Home size={16} />}>Back to dashboard</Button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
