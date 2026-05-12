import { Outlet, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { APP_NAME } from '@constants/app.constants';

export function AuthLayout() {
  return (
    <div className="flex min-h-screen">
      {/* Left panel — branding */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-between bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-800 p-12 text-white">
        <Link to="/" className="flex items-center gap-2 text-xl font-bold">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/20">
            <span className="text-sm font-black">E</span>
          </div>
          {APP_NAME}
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <blockquote className="space-y-4">
            <p className="text-2xl font-light leading-relaxed">
              "Build faster, ship smarter. The enterprise-grade React boilerplate that scales with
              your team."
            </p>
            <footer className="text-indigo-200">
              <p className="font-semibold">Enterprise Boilerplate</p>
              <p className="text-sm">Production-ready from day one</p>
            </footer>
          </blockquote>
        </motion.div>

        <div className="flex gap-6 text-sm text-indigo-200">
          <span>
            © {new Date().getFullYear()} {APP_NAME}
          </span>
          <a href="#" className="hover:text-white">
            Privacy
          </a>
          <a href="#" className="hover:text-white">
            Terms
          </a>
        </div>
      </div>

      {/* Right panel — form */}
      <div className="flex flex-1 flex-col items-center justify-center bg-white px-6 py-12 dark:bg-gray-900">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="mb-8 flex items-center gap-2 lg:hidden">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600">
              <span className="text-sm font-black text-white">E</span>
            </div>
            <span className="text-xl font-bold text-gray-900 dark:text-white">{APP_NAME}</span>
          </div>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
