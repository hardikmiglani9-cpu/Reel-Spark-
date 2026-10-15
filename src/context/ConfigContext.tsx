import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialSiteConfig, SiteConfig } from '../data/siteConfig';

interface ConfigContextType {
  config: SiteConfig;
  loading: boolean;
  refreshConfig: () => Promise<void>;
  updateConfigOnServer: (newConfig: SiteConfig, token: string) => Promise<{ success: boolean; error?: string }>;
  getWhatsAppUrl: (customMessage?: string) => string;
}

const ConfigContext = createContext<ConfigContextType | undefined>(undefined);

export const ConfigProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [config, setConfig] = useState<SiteConfig>(initialSiteConfig);
  const [loading, setLoading] = useState(true);

  const fetchConfig = async () => {
    try {
      const res = await fetch('/api/config');
      if (res.ok) {
        const data = await res.json();
        if (data.success && data.config) {
          setConfig(data.config);
        }
      }
    } catch {
      // Fallback to static initialSiteConfig if server is not reachable
      setConfig(initialSiteConfig);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConfig();
  }, []);

  const getWhatsAppUrl = (customMessage?: string) => {
    const rawNumber = config.brand.whatsappNumber.replace(/[^0-9]/g, '');
    const message = customMessage || config.hero.defaultWhatsappMessage;
    return `https://wa.me/${rawNumber}?text=${encodeURIComponent(message)}`;
  };

  const updateConfigOnServer = async (newConfig: SiteConfig, token: string) => {
    try {
      const res = await fetch('/api/admin/config', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newConfig),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setConfig(newConfig);
        return { success: true };
      }
      return { success: false, error: data.error || 'Failed to update configuration' };
    } catch (err: any) {
      return { success: false, error: err.message || 'Network error updating configuration' };
    }
  };

  return (
    <ConfigContext.Provider
      value={{
        config,
        loading,
        refreshConfig: fetchConfig,
        updateConfigOnServer,
        getWhatsAppUrl,
      }}
    >
      {children}
    </ConfigContext.Provider>
  );
};

export function useConfig() {
  const context = useContext(ConfigContext);
  if (!context) {
    throw new Error('useConfig must be used within a ConfigProvider');
  }
  return context;
}
