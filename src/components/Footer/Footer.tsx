import { useState, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaTelegram, FaInstagram, FaGithub, FaLinkedin, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import '../../styles/animations.css';

const notify = () => toast.success("Message sent successfully!", {
  style: {
    backgroundColor: '#111',
    color: 'white',
  },
});

const InputField = ({ type, name, value, onChange, placeholder }: any) => (
  <input
    type={type}
    name={name}
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    className="w-full px-6 py-4 bg-white/5 border border-transparent rounded-xl text-base focus:outline-none transition-all duration-300 transform placeholder:text-gray-500 focus:shadow-[0_0_20px_0_rgba(56,189,248,0.5)] focus:border-sky-500/50 hover:border-sky-500/50"
    required
  />
);

const TextArea = ({ name, value, onChange, placeholder }: any) => (
  <textarea
    name={name}
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    rows={3}
    className="w-full px-6 py-4 bg-white/5 border border-transparent rounded-xl text-base focus:outline-none transition-all duration-300 transform placeholder:text-gray-500 focus:shadow-[0_0_20px_0_rgba(56,189,248,0.5)] focus:border-sky-500/50 hover:border-sky-500/50 resize-none"
    required
  />
);

const FooterLink = ({ to, text }: { to: string; text: string }) => (
  <Link to={to} className="text-gray-400 hover:text-white transition-all duration-300 transform hover:translate-x-1">
    {text}
  </Link>
);

const SocialLink = ({ href, icon }: { href: string; icon: React.ReactNode }) => (
  <a href={href} className="text-gray-400 hover:text-white transition-all duration-300 transform hover:scale-110" target="_blank" rel="noopener noreferrer">
    <span className="text-xl">{icon}</span>
  </a>
);

const ContactItem = ({ icon, text, href }: { icon: React.ReactNode; text: string; href: string }) => (
  <a href={href} className="flex items-center space-x-3 text-gray-400 hover:text-white transition-all duration-300 group transform hover:translate-x-1">
    <span className="text-xl group-hover:scale-110 transition-transform duration-300">{icon}</span>
    <span>{text}</span>
  </a>
);

export const Footer = () => {
  const location = useLocation();
  const [formData, setFormData] = useState<Record<string, string>>({
    name: '',
    email: '',
    message: ''
  });
  const [error, setError] = useState('');

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      const response = await fetch("https://formcarry.com/s/MzfIO4B22RO", {
        method: 'POST',
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (data.code === 200) {
        notify();
        setFormData({ name: '', email: '', message: '' });
      } else {
        setError(data.message);
        setTimeout(() => setError(''), 5000);
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Xatolik yuz berdi');
    }
  };

  if (['/signin', '/signup', '/restorepassword', '/reset-password'].includes(location.pathname)) {
    return null;
  }

  return (
    <footer className="backdrop-blur-md text-white/80 mt-[800px] z-40">
      <div className="container mx-auto px-6 py-8">
        <div className="max-w-3xl mx-auto grid gap-6 md:grid-cols-2 mb-16">
          <div className="space-y-5">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full">
                <img src="/logo.png" alt="GameVault Logo" />
              </div>
              <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">GameVault</h2>
            </div>
            <div className="grid grid-cols gap-4">
              <FooterLink to="/games" text="Games" />
              <FooterLink to="/about" text="Popular" />
              <FooterLink to="/faq" text="Coming Soon" />
            </div>
            <div className="flex space-x-4">
              <SocialLink href="https://t.me/Eshkhuvvatoff" icon={<FaTelegram />} />
              <SocialLink href="https://www.instagram.com/eshkhuvvatoff/" icon={<FaInstagram />} />
              <SocialLink href="https://github.com/Eshkhuvvatoff" icon={<FaGithub />} />
              <SocialLink href="#" icon={<FaLinkedin />} />
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">Get in Touch</h2>
            <div className="space-y-4">
              <ContactItem icon={<FaEnvelope />} text="Eshkhuvvatofff@gmail.com" href="mailto:Eshkhuvvatofff@gmail.com" />
              <ContactItem icon={<FaPhone />} text="+998 91 813 11 88" href="tel:+998918131188" />
              <ContactItem icon={<FaMapMarkerAlt />} text="Qarshi, Uzbekistan" href="#" />
            </div>
          </div>
        </div>

        <div className="max-w-3xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {['name', 'email'].map((field) => (
                <InputField
                  key={field}
                  type={field}
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  placeholder={`Your ${field}`}
                />
              ))}
            </div>
            <TextArea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Your comment"
            />
            {error && <div className="text-red-500 text-sm">{error}</div>}
            <button
              type="submit"
              className='cursor-pointer w-full mt-6 py-5 px-4 relative bg-gradient-to-r from-[#4f46e5] via-[#ec4899] to-[#8b5cf6] text-white rounded-lg font-medium hover:shadow-[0_0_25px_rgba(236,72,153,0.5)] transition-all duration-600 transform hover:scale-[1.02] active:scale-[0.98] animate-gradient'
            >
              Send Comment
            </button>
          </form>
        </div>

        <hr className="my-7 mb-6 mt-16 border-gray-800" />

        <div className="text-center text-sm text-gray-400 -mb-2">
          © {new Date().getFullYear()} GameVault. All rights reserved.
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </footer>
  );
};

export default Footer;