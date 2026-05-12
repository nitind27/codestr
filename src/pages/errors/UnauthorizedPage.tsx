import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShieldOff, Home } from 'lucide-react';
import { Button } from '@components/ui/Button';
import { ROUTES } from '@constants/routes.constants';

export default function UnauthorizedPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-6 dark:bg-gray-900">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30">
          <ShieldOff size={36} className="text-red-600 dark:text-red-400" />
        </div>
        <p className="text-6xl font-black text-red-500">401</p>
        <h1 className="mt-4 text-3xl font-bold text-gray-900 dark:text-gray-100">Access denied</h1>
        <p className="mt-2 text-gray-500 dark:text-gray-400">
          You don't have permission to access this page.
        </p>
        <div className="mt-8">
          <Link to={ROUTES.DASHBOARD}>
            <Button leftIcon={<Home size={16} />}>Back to dashboard</Button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
