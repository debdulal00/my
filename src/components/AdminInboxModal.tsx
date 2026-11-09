import React, { useState, useEffect } from 'react';
import {
  X,
  Lock,
  Mail,
  Trash2,
  CheckCircle,
  Eye,
  EyeOff,
  Search,
  RefreshCw,
  Copy,
  Check,
  ShieldCheck,
  AlertCircle,
  Clock,
} from 'lucide-react';
import { ContactMessage } from '../../server/inboxStore.ts';

interface AdminInboxModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminInboxModal: React.FC<AdminInboxModalProps> = ({ isOpen, onClose }) => {
  const [passcode, setPasscode] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [authError, setAuthError] = useState('');
  const [loading, setLoading] = useState(false);

  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);

  // Check existing token on open
  useEffect(() => {
    if (isOpen) {
      const storedToken = sessionStorage.getItem('ds_admin_token');
      if (storedToken) {
        verifyExistingSession(storedToken);
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  async function verifyExistingSession(t: string) {
    try {
      const res = await fetch('/api/admin/status', {
        headers: { Authorization: `Bearer ${t}` },
      });
      const data = await res.json();
      if (data.authenticated) {
        setToken(t);
        setIsAuthenticated(true);
        fetchMessages(t);
      } else {
        sessionStorage.removeItem('ds_admin_token');
      }
    } catch {
      sessionStorage.removeItem('ds_admin_token');
    }
  }

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setAuthError('');

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ passcode }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Invalid passcode');
      }

      setToken(data.token);
      sessionStorage.setItem('ds_admin_token', data.token);
      setIsAuthenticated(true);
      setPasscode('');
      fetchMessages(data.token);
    } catch (err: any) {
      setAuthError(err.message || 'Passcode incorrect');
    } finally {
      setLoading(false);
    }
  }

  async function fetchMessages(t?: string) {
    const activeToken = t || token;
    if (!activeToken) return;

    setLoading(true);
    try {
      const res = await fetch('/api/admin/messages', {
        headers: { Authorization: `Bearer ${activeToken}` },
      });
      const data = await res.json();
      if (res.ok) {
        setMessages(data.messages || []);
      }
    } catch (err) {
      console.error('Failed to retrieve messages:', err);
    } finally {
      setLoading(false);
    }
  }

  async function toggleReadStatus(id: string, currentRead: boolean) {
    if (!token) return;
    try {
      const res = await fetch(`/api/admin/messages/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ read: !currentRead }),
      });
      if (res.ok) {
        setMessages((prev) =>
          prev.map((m) => (m.id === id ? { ...m, read: !currentRead } : m))
        );
        if (selectedMessage?.id === id) {
          setSelectedMessage((prev) => (prev ? { ...prev, read: !currentRead } : null));
        }
      }
    } catch (err) {
      console.error('Failed to toggle read status:', err);
    }
  }

  async function deleteMessage(id: string) {
    if (!token || !confirm('Permanently remove this message from your vault?')) return;
    try {
      const res = await fetch(`/api/admin/messages/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        setMessages((prev) => prev.filter((m) => m.id !== id));
        if (selectedMessage?.id === id) {
          setSelectedMessage(null);
        }
      }
    } catch (err) {
      console.error('Failed to delete message:', err);
    }
  }

  function copyToClipboard(text: string, id: string) {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  }

  const filteredMessages = messages.filter((m) => {
    const q = searchQuery.toLowerCase();
    return (
      m.name.toLowerCase().includes(q) ||
      m.email.toLowerCase().includes(q) ||
      m.subject.toLowerCase().includes(q) ||
      m.message.toLowerCase().includes(q)
    );
  });

  const unreadCount = messages.filter((m) => !m.read).length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl max-h-[92vh] flex flex-col rounded-3xl bg-white dark:bg-[#08090D] border border-[#DCE3EF] dark:border-[rgba(148,163,184,0.22)] shadow-2xl overflow-hidden">
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#DCE3EF] dark:border-[rgba(148,163,184,0.18)] bg-slate-50 dark:bg-[#10131B]">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-slate-100 dark:bg-[#141722] border border-[#DCE3EF] dark:border-[#262B38] text-[#365FF5] dark:text-[#557CFF]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-[#111827] dark:text-white">
                  Private Inquiries Vault
                </h3>
                {isAuthenticated && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-[#365FF5]/10 dark:bg-[#557CFF]/15 text-[#365FF5] dark:text-[#557CFF] border border-[#365FF5]/20 dark:border-[#557CFF]/30">
                    {messages.length} Messages ({unreadCount} unread)
                  </span>
                )}
              </div>
              <p className="text-[11px] text-[#64748B] dark:text-slate-400 font-mono">
                Encrypted Owner Access · Debdulal Sahoo
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isAuthenticated && (
              <button
                onClick={() => fetchMessages()}
                title="Refresh messages"
                className="p-2 rounded-lg text-[#64748B] dark:text-slate-300 hover:text-[#111827] dark:hover:text-white hover:bg-slate-200 dark:hover:bg-[#141722] transition-colors"
              >
                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              </button>
            )}

            <button
              onClick={onClose}
              aria-label="Close admin vault"
              className="p-2 rounded-lg text-[#64748B] dark:text-slate-400 hover:text-[#111827] dark:hover:text-white hover:bg-slate-200 dark:hover:bg-[#141722] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Content */}
        {!isAuthenticated ? (
          /* Authentication Screen */
          <div className="p-8 sm:p-12 flex flex-col items-center justify-center max-w-md mx-auto text-center">
            <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-[#141722] border border-[#DCE3EF] dark:border-[#262B38] flex items-center justify-center text-[#365FF5] dark:text-[#557CFF] mb-4">
              <Lock className="w-6 h-6" />
            </div>

            <h4 className="text-xl font-bold text-[#111827] dark:text-white mb-2">
              Owner Passcode Required
            </h4>
            <p className="text-xs text-[#64748B] dark:text-slate-400 mb-6 leading-relaxed">
              Enter your master passcode to access private client inquiries, lead submissions, and recruiter notes.
            </p>

            {authError && (
              <div className="w-full mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{authError}</span>
              </div>
            )}

            <form onSubmit={handleLogin} className="w-full space-y-4">
              <div>
                <input
                  type="password"
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  placeholder="Enter passcode (default: debdulal2027)"
                  required
                  className="w-full px-4 py-3 rounded-xl bg-[#141722] border border-[#262B38] text-white text-sm focus:outline-none focus:border-[#4F8CFF] text-center"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl text-xs font-semibold text-white bg-[#4F8CFF] hover:bg-[#3B7BF2] shadow-sm transition-all"
              >
                {loading ? 'Authenticating...' : 'Unlock Inbox Vault'}
              </button>
            </form>

            <span className="mt-4 text-[10px] text-slate-500 font-mono">
              Passcode can be customized anytime via ADMIN_PASSCODE environment variable.
            </span>
          </div>
        ) : (
          /* Admin Inbox Dashboard */
          <div className="flex-1 flex flex-col md:flex-row overflow-hidden min-h-[480px]">
            {/* Left: Message List */}
            <div className="w-full md:w-5/12 border-r border-[#DCE3EF] dark:border-[#262B38] flex flex-col bg-slate-50 dark:bg-[#0A0D14]">
              {/* Search input */}
              <div className="p-3 border-b border-[#DCE3EF] dark:border-[#262B38] bg-white dark:bg-[#10131B]">
                <div className="relative">
                  <Search className="w-3.5 h-3.5 text-[#64748B] dark:text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search messages..."
                    className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-slate-100 dark:bg-[#141722] border border-[#DCE3EF] dark:border-[#262B38] text-xs text-[#111827] dark:text-white placeholder-[#64748B] dark:placeholder-slate-500 focus:outline-none focus:border-[#365FF5] dark:focus:border-[#557CFF]"
                  />
                </div>
              </div>

              {/* Messages list */}
              <div className="flex-1 overflow-y-auto divide-y divide-[#DCE3EF] dark:divide-[#262B38]/60">
                {filteredMessages.length === 0 ? (
                  <div className="p-8 text-center text-xs text-[#64748B] dark:text-slate-500">
                    No messages matching your search query.
                  </div>
                ) : (
                  filteredMessages.map((msg) => (
                    <div
                      key={msg.id}
                      onClick={() => {
                        setSelectedMessage(msg);
                        if (!msg.read) toggleReadStatus(msg.id, false);
                      }}
                      className={`p-4 cursor-pointer transition-colors text-left ${
                        selectedMessage?.id === msg.id
                          ? 'bg-slate-200/70 dark:bg-[#141722] border-l-2 border-[#365FF5] dark:border-[#557CFF]'
                          : 'hover:bg-slate-200/40 dark:hover:bg-[#141722]/50'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-1 mb-1">
                        <span className="text-xs font-semibold text-[#111827] dark:text-white truncate">
                          {msg.name}
                        </span>
                        <span className="text-[10px] text-[#64748B] dark:text-slate-500 font-mono whitespace-nowrap">
                          {new Date(msg.createdAt).toLocaleDateString([], {
                            month: 'short',
                            day: 'numeric',
                          })}
                        </span>
                      </div>

                      <h5 className="text-xs font-medium text-[#475569] dark:text-slate-300 truncate mb-1">
                        {msg.subject}
                      </h5>

                      <p className="text-[11px] text-[#64748B] dark:text-slate-400 line-clamp-2">
                        {msg.message}
                      </p>

                      <div className="mt-2 flex items-center justify-between">
                        {!msg.read ? (
                          <span className="text-[10px] font-mono text-[#365FF5] dark:text-[#557CFF] font-semibold">
                            ● New Inquiry
                          </span>
                        ) : (
                          <span className="text-[10px] text-slate-400 dark:text-slate-600 font-mono">
                            Read
                          </span>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Right: Selected Message Reader Pane */}
            <div className="w-full md:w-7/12 flex-1 flex flex-col bg-white dark:bg-[#08090D] overflow-y-auto p-6 text-left">
              {selectedMessage ? (
                <div className="space-y-6">
                  {/* Actions Bar */}
                  <div className="flex items-center justify-between pb-4 border-b border-[#262B38]">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => toggleReadStatus(selectedMessage.id, selectedMessage.read)}
                        className="px-3 py-1.5 rounded-lg text-xs font-medium bg-[#141722] hover:bg-[#1A1F2E] text-slate-300 border border-[#262B38] flex items-center gap-1.5"
                      >
                        {selectedMessage.read ? (
                          <>
                            <EyeOff className="w-3.5 h-3.5" />
                            <span>Mark as Unread</span>
                          </>
                        ) : (
                          <>
                            <Eye className="w-3.5 h-3.5" />
                            <span>Mark as Read</span>
                          </>
                        )}
                      </button>

                      <button
                        onClick={() => copyToClipboard(selectedMessage.email, selectedMessage.id)}
                        className="px-3 py-1.5 rounded-lg text-xs font-medium bg-[#141722] hover:bg-[#1A1F2E] text-slate-300 border border-[#262B38] flex items-center gap-1.5"
                      >
                        {copiedId === selectedMessage.id ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                            <span className="text-emerald-400">Copied Email</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copy Email</span>
                          </>
                        )}
                      </button>
                    </div>

                    <button
                      onClick={() => deleteMessage(selectedMessage.id)}
                      title="Delete message"
                      className="p-2 rounded-lg text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Message Meta */}
                  <div>
                    <h3 className="text-lg font-bold text-white mb-2">
                      {selectedMessage.subject}
                    </h3>
                    <div className="p-4 rounded-xl bg-[#10131B] border border-[#262B38] space-y-1.5 text-xs text-slate-400">
                      <div className="flex items-center justify-between">
                        <div>
                          From: <strong className="text-white">{selectedMessage.name}</strong> ({selectedMessage.email})
                        </div>
                        <div className="flex items-center gap-1 text-[11px] font-mono text-slate-500">
                          <Clock className="w-3 h-3" />
                          <span>{new Date(selectedMessage.createdAt).toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 rounded-2xl bg-[#10131B] border border-[#262B38] text-sm text-slate-200 whitespace-pre-wrap leading-relaxed">
                    {selectedMessage.message}
                  </div>

                  {/* Quick Reply Button */}
                  <div>
                    <a
                      href={`mailto:${selectedMessage.email}?subject=Re: ${encodeURIComponent(
                        selectedMessage.subject
                      )}`}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold text-white bg-[#4F8CFF] hover:bg-[#3B7BF2]"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      <span>Reply via Email Client</span>
                    </a>
                  </div>
                </div>
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center text-center p-8 text-slate-500">
                  <Mail className="w-8 h-8 text-slate-600 mb-2" />
                  <p className="text-xs">Select any inquiry from the left to read full details.</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
