import { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './Contact.scss';
import SectionHeading from '../SectionHeading/SectionHeading';
import { Icon } from '@iconify/react';
import SocialLinks from '../SocialLinks/SocialLinks';

const Contact = ({ data, socialData }) => {
  const { title, text, subTitle } = data;

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
    type: '', // 'st-success' or 'st-error'
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

    const botToken = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
    const chatId = import.meta.env.VITE_TELEGRAM_CHAT_ID;

    if (!botToken || !chatId || botToken === 'your_bot_token_here') {
      setAlert({
        show: true,
        message: 'Lỗi: Chưa cấu hình Token hoặc Chat ID trong .env',
        type: 'st-error',
      });
      setLoading(false);
      return;
    }

    const message = `
📩 *Tin nhắn mới từ Website*
👤 *Tên:* ${formData.name}
📧 *Email:* ${formData.email}
📝 *Chủ đề:* ${formData.subject}
💬 *Lời nhắn:* ${formData.msg}
    `;

    try {
      const response = await fetch(
        `https://api.telegram.org/bot${botToken}/sendMessage`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            chat_id: chatId,
            text: message,
            parse_mode: 'Markdown',
          }),
        }
      );

      if (response.ok) {
        setAlert({
          show: true,
          message: 'Cảm ơn! Tin nhắn của bạn đã được gửi thành công.',
          type: 'st-success',
        });
        setFormData({ name: '', email: '', subject: '', msg: '' });
        setTimeout(() => setAlert({ show: false, message: '', type: '' }), 5000);
      } else {
        throw new Error('Gửi tin nhắn thất bại.');
      }
    } catch (error) {
      setAlert({
        show: true,
        message: 'Đã xảy ra lỗi khi gửi tin nhắn. Vui lòng thử lại sau.',
        type: 'st-error',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="st-dark-bg">
      <div className="st-height-b100 st-height-lg-b80"></div>
      <SectionHeading title="Liên hệ" />
      <div className="container" data-aos="fade-up" data-aos-duration="800" data-aos-delay="500">
        <div className="row d-flex">
          <div className="col-lg-6">
            <h3 className="st-contact-title">Gửi lời chào</h3>
            <div id="st-alert" className={alert.show ? alert.type : ''} style={{ display: alert.show ? 'block' : 'none' }}>
              {alert.message}
            </div>
            <form onSubmit={handleSubmit} className="st-contact-form" id="contact-form">
              <div className="st-form-field">
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Tên của bạn"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="st-form-field">
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Email của bạn"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="st-form-field">
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  placeholder="Chủ đề"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="st-form-field">
                <textarea
                  cols="30"
                  rows="10"
                  id="msg"
                  name="msg"
                  placeholder="Lời nhắn"
                  value={formData.msg}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>
              <button
                className={`st-btn st-style1 st-color1 ${loading ? 'st-loading' : ''}`}
                type="submit"
                id="submit"
                name="submit"
                disabled={loading}
              >
                {loading ? 'Đang gửi...' : 'Gửi tin nhắn'}
              </button>
            </form>
            <div className="st-height-b0 st-height-lg-b30"></div>
          </div>
          <div className="col-lg-6">
            <div className="st-height-b0 st-height-lg-b40"></div>
            <h3 className="st-contact-title">{title}</h3>
            <div className="st-contact-text">{text}</div>
            <div className="st-contact-info-wrap">
              <div className="st-single-contact-info">
                <div className="st-icon-wrap">
                  <Icon icon="fa-regular:envelope" />
                </div>
                <div className="st-single-info-details">
                  <h4>Email</h4>
                  <Link to="mailto:dotrongtan113@gmail.com">dotrongtan113@gmail.com</Link>
                </div>
              </div>
              <div className="st-single-contact-info">
                <div className="st-icon-wrap">
                  <Icon icon="fa-solid:phone-alt" />
                </div>
                <div className="st-single-info-details">
                  <h4>Điện thoại</h4>
                  <span>0969846563</span>
                </div>
              </div>
              <div className="st-single-contact-info">
                <div className="st-icon-wrap">
                  <Icon icon="mdi:location" />
                </div>
                <div className="st-single-info-details">
                  <h4>Địa chỉ</h4>
                  <span>Hà Nội, Việt Nam</span>
                </div>
              </div>
              <div className="st-social-info">
                <div className="st-social-text">{subTitle}</div>
                <SocialLinks data={socialData} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="st-height-b100 st-height-lg-b80"></div>
    </section>
  );
};

Contact.propTypes = {
  data: PropTypes.object,
  socialData: PropTypes.array,
};

export default Contact;
