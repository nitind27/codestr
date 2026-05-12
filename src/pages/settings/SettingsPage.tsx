import { useState } from 'react';
import { Moon, Sun, Monitor, Bell, Shield, Globe } from 'lucide-react';
import { Card, CardDivider } from '@components/ui/Card';
import { Button } from '@components/ui/Button';
import { Tabs } from '@components/ui/Tabs';
import { Breadcrumbs } from '@components/navigation/Breadcrumbs';
import { useUIStore } from '@store/ui.store';
import { cn } from '@utils/cn';
import toast from 'react-hot-toast';

function ThemeOption({
  value,
  label,
  icon: Icon,
  current,
  onClick,
}: {
  value: string;
  label: string;
  icon: React.ElementType;
  current: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'flex flex-col items-center gap-2 rounded-xl border-2 p-4 transition-all',
        current === value
          ? 'border-indigo-600 bg-indigo-50 dark:border-indigo-400 dark:bg-indigo-900/20'
          : 'border-gray-200 hover:border-gray-300 dark:border-gray-700'
      )}
    >
      <Icon
        size={20}
        className={current === value ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-500'}
      />
      <span
        className={cn(
          'text-sm font-medium',
          current === value
            ? 'text-indigo-700 dark:text-indigo-400'
            : 'text-gray-600 dark:text-gray-400'
        )}
      >
        {label}
      </span>
    </button>
  );
}

function ToggleSetting({
  label,
  description,
  enabled,
  onChange,
}: {
  label: string;
  description: string;
  enabled: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div>
        <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{label}</p>
        <p className="text-xs text-gray-500 dark:text-gray-400">{description}</p>
      </div>
      <button
        role="switch"
        aria-checked={enabled}
        onClick={() => onChange(!enabled)}
        className={cn(
          'relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2',
          enabled ? 'bg-indigo-600' : 'bg-gray-200 dark:bg-gray-700'
        )}
      >
        <span
          className={cn(
            'pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow-lg transition-transform',
            enabled ? 'translate-x-5' : 'translate-x-0'
          )}
        />
      </button>
    </div>
  );
}

export default function SettingsPage() {
  const { theme, setTheme } = useUIStore();
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    weekly: true,
    security: true,
  });

  const tabs = [
    {
      id: 'appearance',
      label: 'Appearance',
      icon: <Monitor size={14} />,
      content: (
        <div className="space-y-6">
          <div>
            <h3 className="mb-3 text-sm font-semibold text-gray-900 dark:text-gray-100">Theme</h3>
            <div className="grid grid-cols-3 gap-3">
              <ThemeOption
                value="light"
                label="Light"
                icon={Sun}
                current={theme}
                onClick={() => setTheme('light')}
              />
              <ThemeOption
                value="dark"
                label="Dark"
                icon={Moon}
                current={theme}
                onClick={() => setTheme('dark')}
              />
              <ThemeOption
                value="system"
                label="System"
                icon={Monitor}
                current={theme}
                onClick={() => setTheme('system')}
              />
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'notifications',
      label: 'Notifications',
      icon: <Bell size={14} />,
      content: (
        <div className="space-y-4">
          <ToggleSetting
            label="Email notifications"
            description="Receive updates via email"
            enabled={notifications.email}
            onChange={(v) => setNotifications((n) => ({ ...n, email: v }))}
          />
          <ToggleSetting
            label="Push notifications"
            description="Receive browser push notifications"
            enabled={notifications.push}
            onChange={(v) => setNotifications((n) => ({ ...n, push: v }))}
          />
          <ToggleSetting
            label="Weekly digest"
            description="Get a weekly summary of activity"
            enabled={notifications.weekly}
            onChange={(v) => setNotifications((n) => ({ ...n, weekly: v }))}
          />
          <ToggleSetting
            label="Security alerts"
            description="Get notified about security events"
            enabled={notifications.security}
            onChange={(v) => setNotifications((n) => ({ ...n, security: v }))}
          />
        </div>
      ),
    },
    {
      id: 'security',
      label: 'Security',
      icon: <Shield size={14} />,
      content: (
        <div className="space-y-4">
          <div className="rounded-lg bg-amber-50 p-4 text-sm text-amber-700 dark:bg-amber-900/20 dark:text-amber-400">
            Two-factor authentication is not enabled. Enable it to secure your account.
          </div>
          <Button variant="outline">Enable 2FA</Button>
          <CardDivider />
          <div>
            <h3 className="mb-2 text-sm font-semibold text-gray-900 dark:text-gray-100">
              Active Sessions
            </h3>
            <div className="space-y-2">
              {[
                { device: 'Chrome on macOS', location: 'New York, US', current: true },
                { device: 'Safari on iPhone', location: 'New York, US', current: false },
              ].map((session, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between rounded-lg border border-gray-200 p-3 dark:border-gray-700"
                >
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      {session.device}
                    </p>
                    <p className="text-xs text-gray-500">{session.location}</p>
                  </div>
                  {session.current ? (
                    <span className="text-xs font-medium text-emerald-600">Current</span>
                  ) : (
                    <Button variant="ghost" size="xs" className="text-red-500">
                      Revoke
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'language',
      label: 'Language',
      icon: <Globe size={14} />,
      content: (
        <div className="space-y-4">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Choose your preferred language and regional settings.
          </p>
          <div className="grid grid-cols-2 gap-3">
            {['English (US)', 'Spanish', 'French', 'German', 'Japanese', 'Portuguese'].map(
              (lang) => (
                <button
                  key={lang}
                  className={cn(
                    'rounded-lg border px-4 py-2.5 text-left text-sm transition-colors',
                    lang === 'English (US)'
                      ? 'border-indigo-600 bg-indigo-50 text-indigo-700 dark:border-indigo-400 dark:bg-indigo-900/20 dark:text-indigo-400'
                      : 'border-gray-200 text-gray-700 hover:border-gray-300 dark:border-gray-700 dark:text-gray-300'
                  )}
                >
                  {lang}
                </button>
              )
            )}
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <Breadcrumbs items={[{ label: 'Settings' }]} />

      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Settings</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Manage your account preferences and configuration
        </p>
      </div>

      <Card>
        <Tabs tabs={tabs} variant="underline" />
        <div className="mt-6 flex justify-end gap-3 border-t border-gray-200 pt-4 dark:border-gray-700">
          <Button variant="outline">Reset to defaults</Button>
          <Button onClick={() => toast.success('Settings saved!')}>Save changes</Button>
        </div>
      </Card>
    </div>
  );
}
