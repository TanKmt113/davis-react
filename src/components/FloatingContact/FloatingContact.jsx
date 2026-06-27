import { useMemo, useState } from 'react';
import { Icon } from '@iconify/react';
import { Link as ScrollLink } from 'react-scroll';
import { useFloatingContact } from '../../hooks/useFloatingContact';

const CHANNEL_META = {
  zalo: {
    label: 'Chat Zalo',
    className: 'bg-white text-[#0068ff] border-2 border-[#0068ff]/30 hover:scale-110',
    icon: 'simple-icons:zalo',
    getHref: (c) => c.zaloUrl,
  },
  facebook: {
    label: 'Facebook Messenger',
    className: 'bg-[#0084ff] text-white hover:scale-110',
    icon: 'fa6-brands:facebook-messenger',
    getHref: (c) => c.facebookUrl,
  },
  email: {
    label: 'Gửi Email',
    className: 'bg-orange-500 text-white hover:scale-110',
    icon: 'material-symbols:mail-outline',
    getHref: (c) => `mailto:${c.email}`,
  },
};

export default function FloatingContact() {
  const [open, setOpen] = useState(false);
  const { data: contact, loading } = useFloatingContact();

  const channels = useMemo(() => {
    const list = [];
    if (contact.showZalo) list.push({ id: 'zalo', ...CHANNEL_META.zalo, href: CHANNEL_META.zalo.getHref(contact) });
    if (contact.showFacebook) list.push({ id: 'facebook', ...CHANNEL_META.facebook, href: CHANNEL_META.facebook.getHref(contact) });
    if (contact.showEmail) list.push({ id: 'email', ...CHANNEL_META.email, href: CHANNEL_META.email.getHref(contact) });
    return list;
  }, [contact]);

  if (loading) return null;

  return (
    <div className="fixed bottom-6 right-4 sm:right-6 z-[100] flex flex-col items-end gap-3 pointer-events-none">
      {open && (
        <div className="pointer-events-auto w-[280px] sm:w-[300px] rounded-2xl border border-white/10 bg-surface/95 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.35)] p-4 animate-[fadeInUp_0.25s_ease-out]">
          <p className="text-sm font-semibold text-text-primary mb-1">{contact.panelTitle}</p>
          <p className="text-xs text-text-secondary mb-4">{contact.responseNote}</p>

          <div className="space-y-3">
            <a
              href={`tel:${contact.phone}`}
              className="flex items-center gap-3 rounded-xl px-3 py-2.5 bg-white/5 border border-white/10 hover:border-primary/40 transition-colors"
            >
              <span className="w-9 h-9 rounded-full bg-primary/15 flex items-center justify-center text-primary shrink-0">
                <Icon icon="material-symbols:call-outline" className="text-lg" />
              </span>
              <span>
                <span className="block text-[10px] uppercase tracking-wider text-text-secondary">Hotline</span>
                <span className="block text-sm font-semibold text-text-primary">{contact.phoneDisplay}</span>
              </span>
            </a>

            <a
              href={`mailto:${contact.email}`}
              className="flex items-center gap-3 rounded-xl px-3 py-2.5 bg-white/5 border border-white/10 hover:border-primary/40 transition-colors"
            >
              <span className="w-9 h-9 rounded-full bg-orange-500/15 flex items-center justify-center text-orange-400 shrink-0">
                <Icon icon="material-symbols:mail-outline" className="text-lg" />
              </span>
              <span className="min-w-0">
                <span className="block text-[10px] uppercase tracking-wider text-text-secondary">Email</span>
                <span className="block text-sm font-medium text-text-primary truncate">{contact.email}</span>
              </span>
            </a>

            <div className="flex items-center gap-3 rounded-xl px-3 py-2.5 bg-white/5 border border-white/10">
              <span className="w-9 h-9 rounded-full bg-emerald-500/15 flex items-center justify-center text-emerald-400 shrink-0">
                <Icon icon="material-symbols:schedule-outline" className="text-lg" />
              </span>
              <span>
                <span className="block text-[10px] uppercase tracking-wider text-text-secondary">Giờ hỗ trợ</span>
                <span className="block text-sm text-text-primary">{contact.workingHours}</span>
              </span>
            </div>
          </div>

          <ScrollLink
            to="contact"
            smooth
            duration={500}
            offset={-80}
            onClick={() => setOpen(false)}
            className="mt-4 block w-full text-center text-xs font-medium py-2.5 rounded-xl border border-primary/30 text-primary hover:bg-primary/10 cursor-pointer transition-colors"
          >
            {contact.ctaLabel}
          </ScrollLink>
        </div>
      )}

      <div className="pointer-events-auto flex flex-col items-center gap-3">
        {open &&
          channels.map((channel, index) => (
            <a
              key={channel.id}
              href={channel.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={channel.label}
              title={channel.label}
              className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 ${channel.className}`}
              style={{ animation: `fadeInUp 0.2s ease-out ${index * 0.05}s both` }}
            >
              <Icon icon={channel.icon} className="text-2xl" />
            </a>
          ))}

        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          aria-label={open ? 'Đóng liên hệ' : 'Mở liên hệ'}
          aria-expanded={open}
          className={`w-14 h-14 rounded-full flex items-center justify-center shadow-[0_8px_24px_rgba(249,115,22,0.45)] transition-all duration-300 hover:scale-105 ${
            open ? 'bg-orange-400 text-white' : 'bg-gradient-to-br from-orange-400 to-orange-500 text-white'
          }`}
        >
          <Icon
            icon={open ? 'material-symbols:close-rounded' : 'material-symbols:chat-outline'}
            className="text-2xl"
          />
        </button>
      </div>
    </div>
  );
}
