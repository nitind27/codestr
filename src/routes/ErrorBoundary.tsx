import { Component, type ErrorInfo, type ReactNode } from 'react';
import { Button } from '@components/ui/Button';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('ErrorBoundary caught:', error, info);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;

      return (
        <div className="flex min-h-screen flex-col items-center justify-center gap-4 p-8 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-100 text-red-600">
            <span className="text-2xl">⚠</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Something went wrong
          </h1>
          <p className="max-w-md text-gray-500 dark:text-gray-400">
            {this.state.error?.message || 'An unexpected error occurred.'}
          </p>
          <Button onClick={() => window.location.reload()}>Reload page</Button>
        </div>
      );
    }

    return this.props.children;
  }
}
