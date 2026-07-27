'use client';

import { useState } from 'react';
import { Send, CheckCircle2 } from 'lucide-react';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || '';

/** Contact form → POST /submit_contact.php. Degrades gracefully if API is down. */
export default function ContactForm({ source = 'contact' }: { source?: string }) {
  const [status, setStatus] = useState<'idle' | 'sending' | 'ok' | 'error'>('idle');
  const [msg, setMsg] = useState('');

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const payload = Object.fromEntries(form.entries());
    payload.source_page = source;
    setStatus('sending');
    try {
      const res = await fetch(`${API_BASE}/submit_contact.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (!res.ok || !json.success) throw new Error(json.message || 'Failed');
      setStatus('ok');
      setMsg(json.data?.message || 'Thank you — your message has been received.');
    } catch {
      setStatus('error');
      setMsg('Sorry, we could not send your message right now. Please email info@paradeepparivahan.com.');
    }
  }

  if (status === 'ok') {
    return (
      <div className="flex flex-col items-center gap-3 rounded-2xl border border-accent-500/40 bg-accent-500/10 p-10 text-center">
        <CheckCircle2 className="h-10 w-10 text-accent-400" aria-hidden />
        <p className="text-lg font-medium text-white">{msg}</p>
      </div>
    );
  }

  const field = 'w-full rounded-lg border border-white/15 bg-ink-800 px-4 py-3 text-white placeholder:text-slate-500 focus:border-accent-400';

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <input name="name" required placeholder="Your name" className={field} aria-label="Your name" />
        <input name="email" type="email" placeholder="Email" className={field} aria-label="Email" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <input name="phone" placeholder="Phone" className={field} aria-label="Phone" />
        <input name="subject" placeholder="Subject" className={field} aria-label="Subject" />
      </div>
      <textarea name="message" required rows={5} placeholder="Your message" className={field} aria-label="Your message" />
      {status === 'error' && <p className="text-sm text-red-400">{msg}</p>}
      <button
        type="submit"
        disabled={status === 'sending'}
        className="inline-flex items-center gap-2 rounded-full bg-accent-400 px-7 py-3.5 font-semibold text-ink-950 transition hover:bg-accent-300 disabled:opacity-60"
      >
        {status === 'sending' ? 'Sending…' : 'Send message'}
        <Send className="h-4 w-4" aria-hidden />
      </button>
    </form>
  );
}
