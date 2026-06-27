import { useState } from 'react';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import { sendContactMessage } from '../../services/contactService';

const Contact = ({ data }) => {
  const { title, text } = data;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    msg: '',
  });

  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({
    show: false,
    message: '',
    type: '', // 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' or 'bg-red-500/10 text-red-400 border-red-500/20'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setAlert({ show: false, message: '', type: '' });

    try {
      await sendContactMessage(formData);
      setAlert({
        show: true,
        message: 'Cảm ơn! Tin nhắn của bạn đã được gửi thành công.',
        type: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
      });
      setFormData({ name: '', email: '', subject: '', msg: '' });
      setTimeout(() => setAlert({ show: false, message: '', type: '' }), 5000);
    } catch (error) {
      setAlert({
        show: true,
        message: error instanceof Error ? error.message : 'Đã xảy ra lỗi khi gửi tin nhắn. Vui lòng thử lại sau.',
        type: 'bg-red-500/10 text-red-400 border-red-500/20',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="relative py-24 bg-transparent overflow-hidden z-10">
      {/* Background Glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute w-[500px] h-[500px] rounded-full bg-primary/5 blur-[120px] top-[20%] left-[-10%]"></div>
        <div className="absolute w-[500px] h-[500px] rounded-full bg-accent-purple/5 blur-[120px] bottom-[20%] right-[-10%]"></div>
      </div>

      <div className="max-w-container-max mx-auto w-full px-6 relative z-10">
        <div className="mb-16 text-center lg:text-left">
          <h2 className="font-headline-lg-mobile text-headline-lg-mobile md:font-headline-lg md:text-headline-lg text-text-primary tracking-tight mb-4">
            Liên Hệ
          </h2>
          <p className="font-body-lg text-body-lg text-text-secondary max-w-2xl">
            Hãy bắt đầu cuộc hội thoại. Dù là một yêu cầu kỹ thuật, cơ hội hợp tác, hay tư vấn xây dựng hệ thống, tôi luôn sẵn sàng lắng nghe.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Contact Form Card */}
          <div className="lg:col-span-8 glass-card rounded-2xl p-8 md:p-12 border border-white/5 bg-surface/30 backdrop-blur-xl hover:-translate-y-1 transition-all duration-500 hover:shadow-[0_20px_40px_rgba(77,142,255,0.05)] relative group">
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-accent-purple to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            {alert.show && (
              <div className={`mb-6 p-4 rounded-xl border text-sm font-semibold flex items-center gap-2 ${alert.type}`}>
                <Icon icon={alert.type.includes('emerald') ? 'material-symbols:check-circle-outline-rounded' : 'material-symbols:error-outline-rounded'} className="text-xl shrink-0" />
                {alert.message}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="font-mono-label text-mono-label text-text-secondary uppercase tracking-widest" htmlFor="name">Họ và tên</label>
                  <input 
                    className="w-full bg-surface-variant/20 hover:bg-surface-variant/35 text-text-primary placeholder:text-outline-variant/60 rounded-xl px-4 py-3 font-body-base text-body-base border border-white/5 focus:border-primary/50 focus:outline-none transition-colors"
                    id="name" 
                    name="name"
                    placeholder="Nhập họ và tên của bạn" 
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="font-mono-label text-mono-label text-text-secondary uppercase tracking-widest" htmlFor="email">Email</label>
                  <input 
                    className="w-full bg-surface-variant/20 hover:bg-surface-variant/35 text-text-primary placeholder:text-outline-variant/60 rounded-xl px-4 py-3 font-body-base text-body-base border border-white/5 focus:border-primary/50 focus:outline-none transition-colors"
                    id="email" 
                    name="email"
                    placeholder="Nhập email của bạn" 
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="font-mono-label text-mono-label text-text-secondary uppercase tracking-widest" htmlFor="subject">Chủ đề</label>
                <input 
                  className="w-full bg-surface-variant/20 hover:bg-surface-variant/35 text-text-primary placeholder:text-outline-variant/60 rounded-xl px-4 py-3 font-body-base text-body-base border border-white/5 focus:border-primary/50 focus:outline-none transition-colors"
                  id="subject" 
                  name="subject"
                  placeholder="Tiêu đề lời nhắn..." 
                  type="text"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="font-mono-label text-mono-label text-text-secondary uppercase tracking-widest" htmlFor="msg">Lời nhắn</label>
                <textarea 
                  className="w-full bg-surface-variant/20 hover:bg-surface-variant/35 text-text-primary placeholder:text-outline-variant/60 rounded-xl px-4 py-3 font-body-base text-body-base border border-white/5 focus:border-primary/50 focus:outline-none transition-colors resize-none"
                  id="msg" 
                  name="msg"
                  placeholder="Chi tiết yêu cầu của bạn..." 
                  rows={5}
                  value={formData.msg}
                  onChange={handleChange}
                  required
                />
              </div>
              <button 
                className="w-full md:w-auto px-8 py-3.5 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 rounded-full font-label-caps text-label-caps text-text-primary uppercase tracking-widest transition-all duration-300 hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:scale-102 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                type="submit"
                disabled={loading}
              >
                Gửi tin nhắn
                <span className="material-symbols-outlined text-[18px]">send</span>
              </button>
            </form>
          </div>

          {/* Contact Info Sidebar */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <div className="glass-card rounded-2xl p-8 border border-white/5 bg-surface/30 backdrop-blur-xl relative group">
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-accent-purple to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <h3 className="font-headline-md text-headline-md text-text-primary mb-6">{title}</h3>
              <p className="font-body-base text-body-base text-text-secondary leading-relaxed mb-6">{text}</p>
              
              <div className="space-y-6">
                <a className="flex items-center gap-4 group hover:text-primary transition-colors" href="mailto:dotrongtan113@gmail.com">
                  <div className="w-12 h-12 rounded-full bg-surface-variant/35 flex items-center justify-center group-hover:bg-surface-bright transition-colors text-text-secondary group-hover:text-primary">
                    <span className="material-symbols-outlined text-xl">mail</span>
                  </div>
                  <div>
                    <p className="font-mono-label text-mono-label text-text-secondary uppercase tracking-widest mb-0.5">Email</p>
                    <p className="font-body-base text-body-base text-text-primary font-semibold">dotrongtan113@gmail.com</p>
                  </div>
                </a>
                
                <div className="h-px w-full bg-border-slate/50"></div>
                
                <a className="flex items-center gap-4 group hover:text-primary transition-colors" href="https://github.com/TanKmt113" target="_blank" rel="noopener noreferrer">
                  <div className="w-12 h-12 rounded-full bg-surface-variant/35 flex items-center justify-center group-hover:bg-surface-bright transition-colors text-text-secondary group-hover:text-primary">
                    <Icon icon="mdi:github" className="text-xl" />
                  </div>
                  <div>
                    <p className="font-mono-label text-mono-label text-text-secondary uppercase tracking-widest mb-0.5">GitHub</p>
                    <p className="font-body-base text-body-base text-text-primary font-semibold">@TanKmt113</p>
                  </div>
                </a>
                
                <div className="h-px w-full bg-border-slate/50"></div>
                
                <a className="flex items-center gap-4 group hover:text-primary transition-colors" href="https://www.linkedin.com/in/tan-do-0a754a3b8/" target="_blank" rel="noopener noreferrer">
                  <div className="w-12 h-12 rounded-full bg-surface-variant/35 flex items-center justify-center group-hover:bg-surface-bright transition-colors text-text-secondary group-hover:text-primary">
                    <Icon icon="mdi:linkedin" className="text-xl" />
                  </div>
                  <div>
                    <p className="font-mono-label text-mono-label text-text-secondary uppercase tracking-widest mb-0.5">LinkedIn</p>
                    <p className="font-body-base text-body-base text-text-primary font-semibold">/in/tan-do</p>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

Contact.propTypes = {
  data: PropTypes.object,
};

export default Contact;
