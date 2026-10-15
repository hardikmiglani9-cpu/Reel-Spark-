import React, { useState, useEffect } from 'react';
import { 
  Lock, 
  LogOut, 
  Save, 
  CheckCircle2, 
  AlertCircle, 
  MessageSquare, 
  Tag, 
  FolderPlus, 
  HelpCircle, 
  Settings, 
  Eye, 
  RefreshCw, 
  ExternalLink 
} from 'lucide-react';
import { useConfig } from '../context/ConfigContext';
import { SiteConfig, PriceItem, PortfolioItem, FAQItem } from '../data/siteConfig';

interface StoredEnquiry {
  id: string;
  name: string;
  businessName?: string;
  phone: string;
  email?: string;
  service: string;
  budgetRange: string;
  description: string;
  referenceLink?: string;
  createdAt: string;
  status: 'new' | 'contacted' | 'in_progress' | 'completed' | 'archived';
  notes?: string;
}

export const AdminPage: React.FC = () => {
  const { config, refreshConfig, updateConfigOnServer } = useConfig();
  const [token, setToken] = useState<string | null>(() => sessionStorage.getItem('reelspark_admin_token'));
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState<string | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Active dashboard tab
  const [activeTab, setActiveTab] = useState<'enquiries' | 'pricing' | 'portfolio' | 'faqs' | 'settings'>('enquiries');

  // Enquiries list
  const [enquiries, setEnquiries] = useState<StoredEnquiry[]>([]);
  const [enquiryFilter, setEnquiryFilter] = useState<string>('all');
  const [loadingEnquiries, setLoadingEnquiries] = useState(false);

  // Editable config state
  const [editableConfig, setEditableConfig] = useState<SiteConfig>(config);
  const [saveStatus, setSaveStatus] = useState<{ message: string; isError?: boolean } | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    setEditableConfig(config);
  }, [config]);

  // Fetch enquiries if authenticated
  const fetchEnquiries = async (authToken: string) => {
    setLoadingEnquiries(true);
    try {
      const res = await fetch('/api/admin/enquiries', {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      if (res.ok) {
        const data = await res.json();
        if (data.success) {
          setEnquiries(data.enquiries);
        }
      } else if (res.status === 401 || res.status === 403) {
        handleLogout();
      }
    } catch (err) {
      console.error('Failed to load enquiries', err);
    } finally {
      setLoadingEnquiries(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchEnquiries(token);
    }
  }, [token]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);
    setIsLoggingIn(true);

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: passwordInput }),
      });

      const data = await res.json();
      if (res.ok && data.success && data.token) {
        sessionStorage.setItem('reelspark_admin_token', data.token);
        setToken(data.token);
        setPasswordInput('');
      } else {
        setLoginError(data.error || 'Invalid password. Access denied.');
      }
    } catch {
      setLoginError('Server connection error. Please ensure server is running.');
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    if (token) {
      try {
        await fetch('/api/admin/logout', {
          method: 'POST',
          headers: { Authorization: `Bearer ${token}` },
        });
      } catch (e) {
        // Ignore logout network error
      }
    }
    sessionStorage.removeItem('reelspark_admin_token');
    setToken(null);
  };

  const updateEnquiryStatus = async (id: string, newStatus: string) => {
    if (!token) return;
    try {
      const res = await fetch(`/api/admin/enquiries/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (res.ok) {
        setEnquiries((prev) =>
          prev.map((e) => (e.id === id ? { ...e, status: newStatus as any } : e))
        );
      }
    } catch (err) {
      console.error('Failed to update enquiry status', err);
    }
  };

  const handleSaveAllConfig = async () => {
    if (!token) return;
    setIsSaving(true);
    setSaveStatus(null);

    const result = await updateConfigOnServer(editableConfig, token);
    if (result.success) {
      setSaveStatus({ message: 'All changes saved and published to the live website!' });
      refreshConfig();
    } else {
      setSaveStatus({ message: result.error || 'Failed to save changes', isError: true });
    }
    setIsSaving(false);
  };

  // If not logged in, show secure login form
  if (!token) {
    return (
      <div className="py-20 max-w-md mx-auto px-4">
        <div className="p-8 rounded-3xl border border-zinc-800 bg-[#0e0e14] shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-purple-900/30 border border-purple-700/40 text-purple-400 flex items-center justify-center mx-auto">
              <Lock className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-bold font-display text-white">
              Reel Spark Admin Portal
            </h1>
            <p className="text-xs text-zinc-400">
              Authorized personnel only. Manage project enquiries, live pricing, and portfolio items.
            </p>
          </div>

          {loginError && (
            <div className="p-3.5 rounded-xl border border-rose-800/60 bg-rose-950/40 text-xs text-rose-200 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-zinc-300">
                Admin Access Password
              </label>
              <input
                type="password"
                required
                placeholder="Enter admin password..."
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-700 text-white placeholder-zinc-500 text-xs focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500"
              />
              <p className="text-[11px] text-zinc-400">
                Default credentials configured via server environment: <code className="text-zinc-300 font-mono">reelspark2026</code>
              </p>
            </div>

            <button
              type="submit"
              disabled={isLoggingIn}
              className="w-full py-3 px-4 rounded-xl text-xs font-semibold uppercase tracking-wider text-white bg-purple-600 hover:bg-purple-500 disabled:opacity-60 transition-colors shadow-lg shadow-purple-600/20"
            >
              {isLoggingIn ? 'Authenticating...' : 'Sign In to Dashboard'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Filtered enquiries
  const displayedEnquiries = enquiryFilter === 'all'
    ? enquiries
    : enquiries.filter((e) => e.status === enquiryFilter);

  return (
    <div className="py-10 space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Top Admin Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-mono text-purple-400 font-semibold uppercase tracking-wider">
            <Lock className="w-3.5 h-3.5" />
            <span>Admin Control Center</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold font-display text-white mt-1">
            Reel Spark Content & Operations
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleSaveAllConfig}
            disabled={isSaving}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-purple-600 hover:bg-purple-500 rounded-xl transition-colors shadow-md disabled:opacity-60"
          >
            <Save className="w-4 h-4" />
            <span>{isSaving ? 'Publishing...' : 'Save & Publish Live'}</span>
          </button>

          <button
            type="button"
            onClick={handleLogout}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-zinc-300 hover:text-white bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded-xl transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Save Notification */}
      {saveStatus && (
        <div
          className={`p-4 rounded-xl border text-xs flex items-center justify-between ${
            saveStatus.isError
              ? 'border-rose-800/60 bg-rose-950/40 text-rose-200'
              : 'border-emerald-600/60 bg-emerald-950/40 text-emerald-200'
          }`}
        >
          <div className="flex items-center gap-2">
            {saveStatus.isError ? (
              <AlertCircle className="w-4 h-4 text-rose-400" />
            ) : (
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            )}
            <span>{saveStatus.message}</span>
          </div>
          <button
            onClick={() => setSaveStatus(null)}
            className="text-xs underline hover:text-white"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Tabs navigation */}
      <div className="flex items-center gap-2 border-b border-zinc-800 overflow-x-auto pb-2 scrollbar-none">
        {[
          { id: 'enquiries', label: `Customer Enquiries (${enquiries.length})`, icon: MessageSquare },
          { id: 'pricing', label: 'Pricing Configuration', icon: Tag },
          { id: 'portfolio', label: 'Portfolio Items', icon: FolderPlus },
          { id: 'faqs', label: 'FAQ Management', icon: HelpCircle },
          { id: 'settings', label: 'Brand & Contact Info', icon: Settings },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 text-xs font-medium rounded-xl whitespace-nowrap transition-colors ${
                isActive
                  ? 'bg-purple-600 text-white font-semibold shadow-sm'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: Enquiries */}
      {activeTab === 'enquiries' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <h2 className="text-lg font-bold font-display text-white">
                Customer Inquiries Queue
              </h2>
              <p className="text-xs text-zinc-400">
                Inquiries submitted through the website contact form are saved directly to the database.
              </p>
            </div>

            <div className="flex items-center gap-2">
              {['all', 'new', 'contacted', 'in_progress', 'completed'].map((status) => (
                <button
                  key={status}
                  onClick={() => setEnquiryFilter(status)}
                  className={`px-3 py-1.5 text-xs rounded-lg uppercase tracking-wider font-mono transition-colors ${
                    enquiryFilter === status
                      ? 'bg-zinc-800 text-white font-bold border border-zinc-700'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  {status.replace('_', ' ')}
                </button>
              ))}

              <button
                type="button"
                onClick={() => token && fetchEnquiries(token)}
                className="p-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white"
                title="Refresh enquiries"
              >
                <RefreshCw className={`w-4 h-4 ${loadingEnquiries ? 'animate-spin' : ''}`} />
              </button>
            </div>
          </div>

          {displayedEnquiries.length === 0 ? (
            <div className="text-center py-16 border border-zinc-800 rounded-2xl bg-zinc-900/40 p-8 space-y-2">
              <p className="text-sm font-semibold text-white">No inquiries found in this view</p>
              <p className="text-xs text-zinc-400">New submissions from visitors will appear here instantly.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {displayedEnquiries.map((enq) => {
                const waReplyMessage = `Hello ${enq.name}, thank you for reaching out to Reel Spark regarding ${enq.service}! We have reviewed your brief: "${enq.description}". Let's discuss turnaround and confirm your order.`;
                const replyUrl = `https://wa.me/${enq.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(waReplyMessage)}`;

                return (
                  <div
                    key={enq.id}
                    className="p-6 rounded-2xl border border-zinc-800 bg-[#0c0c10] space-y-4 hover:border-zinc-700 transition-colors"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-800/80 pb-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-white font-display">
                            {enq.name}
                          </span>
                          {enq.businessName && (
                            <span className="text-xs text-zinc-400">({enq.businessName})</span>
                          )}
                        </div>
                        <div className="text-xs text-zinc-400 mt-0.5 font-mono">
                          Submitted: {new Date(enq.createdAt).toLocaleString()} · ID: {enq.id}
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <select
                          value={enq.status}
                          onChange={(e) => updateEnquiryStatus(enq.id, e.target.value)}
                          className="px-2.5 py-1 rounded-lg bg-zinc-900 border border-zinc-700 text-xs text-zinc-200 font-mono focus:outline-none"
                        >
                          <option value="new">New</option>
                          <option value="contacted">Contacted</option>
                          <option value="in_progress">In Progress</option>
                          <option value="completed">Completed</option>
                          <option value="archived">Archived</option>
                        </select>

                        <a
                          href={replyUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-500 rounded-lg transition-colors whitespace-nowrap"
                        >
                          <span>Reply on WhatsApp</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                      <div>
                        <span className="text-zinc-400 block">WhatsApp Phone:</span>
                        <span className="font-mono text-zinc-200 font-semibold">{enq.phone}</span>
                      </div>
                      <div>
                        <span className="text-zinc-400 block">Service Requested:</span>
                        <span className="text-purple-300 font-semibold">{enq.service}</span>
                      </div>
                      <div>
                        <span className="text-zinc-400 block">Budget Range:</span>
                        <span className="text-zinc-200">{enq.budgetRange}</span>
                      </div>
                    </div>

                    <div className="p-3.5 rounded-xl bg-zinc-950/60 border border-zinc-800 text-xs text-zinc-300 leading-relaxed">
                      <div className="text-zinc-400 font-medium mb-1">Project Requirements / Brief:</div>
                      {enq.description}
                      {enq.referenceLink && (
                        <div className="mt-2 pt-2 border-t border-zinc-800 text-[11px]">
                          <span className="text-zinc-400">Reference: </span>
                          <a
                            href={enq.referenceLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-purple-400 underline"
                          >
                            {enq.referenceLink}
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* TAB 2: Pricing Manager */}
      {activeTab === 'pricing' && (
        <div className="space-y-8">
          <div className="space-y-1">
            <h2 className="text-lg font-bold font-display text-white">
              Central Price Configuration
            </h2>
            <p className="text-xs text-zinc-400">
              Update starting prices, durations, or descriptions. Click "Save & Publish Live" to apply immediately across the entire website.
            </p>
          </div>

          {/* Wedding Pricing */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-rose-400 font-mono">
              Wedding Function Reels Pricing
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {editableConfig.weddingPricing.map((item, idx) => (
                <div key={item.id} className="p-4 rounded-xl border border-zinc-800 bg-[#0d0d12] space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white">{item.name}</span>
                    <span className="text-[11px] font-mono text-zinc-400">{item.id}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[11px] text-zinc-400 block">Numeric Price (₹)</label>
                      <input
                        type="number"
                        value={item.price}
                        onChange={(e) => {
                          const val = parseInt(e.target.value, 10) || 0;
                          const updated = [...editableConfig.weddingPricing];
                          updated[idx] = { ...updated[idx], price: val };
                          setEditableConfig({ ...editableConfig, weddingPricing: updated });
                        }}
                        className="w-full px-2.5 py-1.5 rounded-lg bg-zinc-900 border border-zinc-700 text-xs text-white font-mono"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] text-zinc-400 block">Price Display</label>
                      <input
                        type="text"
                        value={item.priceDisplay}
                        onChange={(e) => {
                          const updated = [...editableConfig.weddingPricing];
                          updated[idx] = { ...updated[idx], priceDisplay: e.target.value };
                          setEditableConfig({ ...editableConfig, weddingPricing: updated });
                        }}
                        className="w-full px-2.5 py-1.5 rounded-lg bg-zinc-900 border border-zinc-700 text-xs text-white font-mono"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-[11px] text-zinc-400 block">Duration Label</label>
                    <input
                      type="text"
                      value={item.duration || ''}
                      onChange={(e) => {
                        const updated = [...editableConfig.weddingPricing];
                        updated[idx] = { ...updated[idx], duration: e.target.value };
                        setEditableConfig({ ...editableConfig, weddingPricing: updated });
                      }}
                      className="w-full px-2.5 py-1.5 rounded-lg bg-zinc-900 border border-zinc-700 text-xs text-white"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Creative Pricing */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-cyan-400 font-mono">
              Commercial & Creative Services Pricing
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {editableConfig.creativePricing.map((item, idx) => (
                <div key={item.id} className="p-4 rounded-xl border border-zinc-800 bg-[#0d0d12] space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white">{item.name}</span>
                    <span className="text-[11px] font-mono text-zinc-400">{item.id}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[11px] text-zinc-400 block">Numeric Price (₹)</label>
                      <input
                        type="number"
                        value={item.price}
                        onChange={(e) => {
                          const val = parseInt(e.target.value, 10) || 0;
                          const updated = [...editableConfig.creativePricing];
                          updated[idx] = { ...updated[idx], price: val };
                          setEditableConfig({ ...editableConfig, creativePricing: updated });
                        }}
                        className="w-full px-2.5 py-1.5 rounded-lg bg-zinc-900 border border-zinc-700 text-xs text-white font-mono"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] text-zinc-400 block">Price Display</label>
                      <input
                        type="text"
                        value={item.priceDisplay}
                        onChange={(e) => {
                          const updated = [...editableConfig.creativePricing];
                          updated[idx] = { ...updated[idx], priceDisplay: e.target.value };
                          setEditableConfig({ ...editableConfig, creativePricing: updated });
                        }}
                        className="w-full px-2.5 py-1.5 rounded-lg bg-zinc-900 border border-zinc-700 text-xs text-white font-mono"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-[11px] text-zinc-400 block">Duration / Deliverable Notes</label>
                    <input
                      type="text"
                      value={item.duration || ''}
                      onChange={(e) => {
                        const updated = [...editableConfig.creativePricing];
                        updated[idx] = { ...updated[idx], duration: e.target.value };
                        setEditableConfig({ ...editableConfig, creativePricing: updated });
                      }}
                      className="w-full px-2.5 py-1.5 rounded-lg bg-zinc-900 border border-zinc-700 text-xs text-white"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: Portfolio Manager */}
      {activeTab === 'portfolio' && (
        <div className="space-y-6">
          <div className="space-y-1">
            <h2 className="text-lg font-bold font-display text-white">
              Portfolio Projects Manager
            </h2>
            <p className="text-xs text-zinc-400">
              Easily replace project image paths or descriptions to showcase real customer projects once approved.
            </p>
          </div>

          <div className="space-y-4">
            {editableConfig.portfolio.map((item, idx) => (
              <div key={item.id} className="p-4 rounded-xl border border-zinc-800 bg-[#0d0d12] space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white">{item.title}</span>
                  <span className="text-[11px] font-mono text-purple-400">{item.category}</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] text-zinc-400 block">Project Title</label>
                    <input
                      type="text"
                      value={item.title}
                      onChange={(e) => {
                        const updated = [...editableConfig.portfolio];
                        updated[idx] = { ...updated[idx], title: e.target.value };
                        setEditableConfig({ ...editableConfig, portfolio: updated });
                      }}
                      className="w-full px-2.5 py-1.5 rounded-lg bg-zinc-900 border border-zinc-700 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-zinc-400 block">Image Path or URL</label>
                    <input
                      type="text"
                      value={item.image}
                      onChange={(e) => {
                        const updated = [...editableConfig.portfolio];
                        updated[idx] = { ...updated[idx], image: e.target.value };
                        setEditableConfig({ ...editableConfig, portfolio: updated });
                      }}
                      className="w-full px-2.5 py-1.5 rounded-lg bg-zinc-900 border border-zinc-700 text-xs text-white font-mono"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-[11px] text-zinc-400 block">Description</label>
                  <textarea
                    rows={2}
                    value={item.description}
                    onChange={(e) => {
                      const updated = [...editableConfig.portfolio];
                      updated[idx] = { ...updated[idx], description: e.target.value };
                      setEditableConfig({ ...editableConfig, portfolio: updated });
                    }}
                    className="w-full px-2.5 py-1.5 rounded-lg bg-zinc-900 border border-zinc-700 text-xs text-white resize-y"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: FAQs */}
      {activeTab === 'faqs' && (
        <div className="space-y-6">
          <div className="space-y-1">
            <h2 className="text-lg font-bold font-display text-white">
              FAQ Editor
            </h2>
            <p className="text-xs text-zinc-400">
              Manage client-facing frequently asked questions and policy clarifications.
            </p>
          </div>

          <div className="space-y-4">
            {editableConfig.faqs.map((faq, idx) => (
              <div key={faq.id} className="p-4 rounded-xl border border-zinc-800 bg-[#0d0d12] space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-purple-400">FAQ #{idx + 1}</span>
                  <span className="text-[11px] text-zinc-400">{faq.category}</span>
                </div>
                <div>
                  <label className="text-[11px] text-zinc-400 block">Question</label>
                  <input
                    type="text"
                    value={faq.question}
                    onChange={(e) => {
                      const updated = [...editableConfig.faqs];
                      updated[idx] = { ...updated[idx], question: e.target.value };
                      setEditableConfig({ ...editableConfig, faqs: updated });
                    }}
                    className="w-full px-2.5 py-1.5 rounded-lg bg-zinc-900 border border-zinc-700 text-xs text-white font-semibold"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-zinc-400 block">Answer</label>
                  <textarea
                    rows={3}
                    value={faq.answer}
                    onChange={(e) => {
                      const updated = [...editableConfig.faqs];
                      updated[idx] = { ...updated[idx], answer: e.target.value };
                      setEditableConfig({ ...editableConfig, faqs: updated });
                    }}
                    className="w-full px-2.5 py-1.5 rounded-lg bg-zinc-900 border border-zinc-700 text-xs text-white leading-relaxed resize-y"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: Brand & Contact Settings */}
      {activeTab === 'settings' && (
        <div className="space-y-6 max-w-2xl">
          <div className="space-y-1">
            <h2 className="text-lg font-bold font-display text-white">
              Brand & Contact Settings
            </h2>
            <p className="text-xs text-zinc-400">
              Verify and update contact channels, Instagram handles, and core taglines.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-zinc-800 bg-[#0d0d12] space-y-4">
            <div>
              <label className="text-xs font-medium text-zinc-300 block">Brand Name</label>
              <input
                type="text"
                value={editableConfig.brand.name}
                onChange={(e) =>
                  setEditableConfig({
                    ...editableConfig,
                    brand: { ...editableConfig.brand, name: e.target.value },
                  })
                }
                className="w-full mt-1 px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-700 text-xs text-white"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-medium text-zinc-300 block">WhatsApp Number (URL format)</label>
                <input
                  type="text"
                  value={editableConfig.brand.whatsappNumber}
                  onChange={(e) =>
                    setEditableConfig({
                      ...editableConfig,
                      brand: { ...editableConfig.brand, whatsappNumber: e.target.value },
                    })
                  }
                  className="w-full mt-1 px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-700 text-xs text-white font-mono"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-zinc-300 block">WhatsApp Display Format</label>
                <input
                  type="text"
                  value={editableConfig.brand.whatsappDisplay}
                  onChange={(e) =>
                    setEditableConfig({
                      ...editableConfig,
                      brand: { ...editableConfig.brand, whatsappDisplay: e.target.value },
                    })
                  }
                  className="w-full mt-1 px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-700 text-xs text-white font-mono"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-medium text-zinc-300 block">Instagram Handle</label>
                <input
                  type="text"
                  value={editableConfig.brand.instagramHandle}
                  onChange={(e) =>
                    setEditableConfig({
                      ...editableConfig,
                      brand: { ...editableConfig.brand, instagramHandle: e.target.value },
                    })
                  }
                  className="w-full mt-1 px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-700 text-xs text-white font-mono"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-zinc-300 block">Instagram URL</label>
                <input
                  type="text"
                  value={editableConfig.brand.instagramUrl}
                  onChange={(e) =>
                    setEditableConfig({
                      ...editableConfig,
                      brand: { ...editableConfig.brand, instagramUrl: e.target.value },
                    })
                  }
                  className="w-full mt-1 px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-700 text-xs text-white font-mono"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-medium text-zinc-300 block">Main Tagline</label>
              <input
                type="text"
                value={editableConfig.brand.mainTagline}
                onChange={(e) =>
                  setEditableConfig({
                    ...editableConfig,
                    brand: { ...editableConfig.brand, mainTagline: e.target.value },
                  })
                }
                className="w-full mt-1 px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-700 text-xs text-white"
              />
            </div>

            <div>
              <label className="text-xs font-medium text-zinc-300 block">Supporting Tagline</label>
              <input
                type="text"
                value={editableConfig.brand.supportingTagline}
                onChange={(e) =>
                  setEditableConfig({
                    ...editableConfig,
                    brand: { ...editableConfig.brand, supportingTagline: e.target.value },
                  })
                }
                className="w-full mt-1 px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-700 text-xs text-white"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
