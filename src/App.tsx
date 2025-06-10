import React, { useState, useEffect } from 'react';
import {
  Phone,
  Mail,
  Building2,
  Instagram,
  Download,
  Globe,
  User,
  MapPin,
  Copy,
  Check,
  Facebook,
  Linkedin
} from 'lucide-react';
import { contactInfo, labels } from './config/content';

const BusinessCard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'personal' | 'company'>('personal');
  const [copied, setCopied] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(field);
      setTimeout(() => setCopied(null), 2000);
    });
  };

  const saveContact = (e: React.MouseEvent) => {
    e.stopPropagation();
    const primaryWebsite = contactInfo.websites[0]?.url || '';
    const primarySocial = contactInfo.socials[0]?.url || '';
    
    const vCard = `BEGIN:VCARD
VERSION:4.0
FN:${contactInfo.name}
N:${contactInfo.name.split(' ').reverse().join(';')};;;
TITLE:${contactInfo.role}
TEL;TYPE=CELL:${contactInfo.phone.replace(/\s/g, '')}
TEL;TYPE=WORK:${contactInfo.mainOffice.replace(/\s/g, '')}
TEL;TYPE=WORK:${contactInfo.customerService.replace(/\s/g, '')}
EMAIL;TYPE=WORK:${contactInfo.email}
${primaryWebsite ? `URL;TYPE=WORK:https://${primaryWebsite}` : ''}
ORG:${contactInfo.company}
ADR;TYPE=WORK:;;Al Ghubrah South;Muscat;Muscat;130;Oman
PHOTO;VALUE=URL:
${primarySocial ? `SOCIALPROFILE;TYPE=instagram:${primarySocial}` : ''}
REV:${new Date().toISOString()}
END:VCARD`;

    const blob = new Blob([vCard], { type: 'text/vcard' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${contactInfo.name} - ${contactInfo.company}.vcf`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-[#141414] flex flex-col items-center justify-center p-4 relative">
      {/* Background Logo */}
      <div 
        className="absolute inset-0 bg-no-repeat bg-center bg-contain opacity-50 pointer-events-none"
        style={{
          backgroundImage: "url('/Logo Outline (BG) Vertical1.png')",
          backgroundSize: 'contain',
        }}
      ></div>
      
      <div className={`w-full max-w-md mx-auto transition-opacity duration-700 relative z-10 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
        <div className="bg-[##333333] backdrop-blur-sm rounded-xl shadow-2xl overflow-hidden border border-white/10 transform-gpu hover:shadow-aurora">
          {/* Card header with tabs */}
          <div className="relative bg-[#F9AA79] p-5">
            <div className="absolute top-0 right-0 left-0 h-1/2 bg-white/5"></div>
            <div className="absolute bottom-0 left-0 w-full h-6 bg-waves bg-repeat-x bg-contain opacity-20"></div>
            <div className="flex justify-center relative">
              <div className="bg-white/20 backdrop-blur-md rounded-full p-1 flex items-center shadow-inner flex-wrap justify-center sm:flex-nowrap">
                <button
                  onClick={() => setActiveTab('personal')}
                  className={`relative px-4 sm:px-6 py-2 rounded-full transition-all duration-300 text-sm sm:text-base ${
                    activeTab === 'personal'
                      ? 'bg-white text-[#F9AA79] font-medium shadow-md scale-105'
                      : 'text-white hover:bg-white/10'
                  }`}
                >
                  <div className="flex items-center gap-1 sm:gap-2">
                    <User className={`w-4 h-4 ${activeTab === 'personal' ? 'animate-pulse-subtle' : ''}`} />
                    <span>{labels.personal}</span>
                  </div>
                </button>
                <button
                  onClick={() => setActiveTab('company')}
                  className={`relative px-4 sm:px-6 py-2 rounded-full transition-all duration-300 text-sm sm:text-base ${
                    activeTab === 'company'
                      ? 'bg-white text-[#F9AA79] font-medium shadow-md scale-105'
                      : 'text-white hover:bg-white/10'
                  }`}
                >
                  <div className="flex items-center gap-1 sm:gap-2">
                    <Building2 className={`w-4 h-4 ${activeTab === 'company' ? 'animate-pulse-subtle' : ''}`} />
                    <span>{labels.company}</span>
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* Content Area */}
          <div className="relative overflow-hidden pb-6" style={{ minHeight: "700px" }}>
            {/* Personal Tab */}
            <div
              className={`absolute inset-0 w-full transition-transform duration-500 ease-out ${
                activeTab === 'personal' ? 'translate-x-0' : 'translate-x-full'
              }`}
            >
              <div className="bg-[##333333] p-6 min-h-full">
                {/* Profile section */}
                <div className="flex flex-col items-center mb-8">
                  <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-gradient-to-br from-[#F9AA79] via-[#F9AA79] to-[#F9AA79] flex items-center justify-center shadow-lg mb-5 pulse-border p-1">
                    <div className="w-full h-full rounded-full bg-white overflow-hidden">
                      <img 
                        src="Profile.png" 
                        alt={`${contactInfo.name} Profile`}
                        className="w-full h-full object-cover scale-120"
                      />
                    </div>
                  </div>
                  
                  <h1 className="text-xl sm:text-2xl font-bold text-[#F9AA79] mb-1 text-center">
                    {contactInfo.name}
                  </h1>
                  <div className="h-0.5 w-1/2 mx-auto bg-gradient-to-r from-transparent via-[#F9AA79]/50 to-transparent mb-2"></div>
                  <p className="text-sm uppercase tracking-widest font-medium text-[#F9AA79]">
                    {contactInfo.role}
                  </p>
                </div>
                
                {/* Contact info */}
                <div className="space-y-5 mb-8">
                  <div className="group contact-item">
                    <div className="flex justify-between items-center mb-1">
                      <p className="text-xs text-gray-300 uppercase tracking-wider">{labels.directLine}</p>
                      <button 
                        onClick={() => copyToClipboard(contactInfo.phone, 'phone')}
                        className="text-gray-300 hover:text-[#F9AA79] transition-colors"
                      >
                        {copied === 'phone' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                      </button>
                    </div>
                    <a
                      href={`tel:${contactInfo.phone}`}
                      className="text-white group-hover:text-[#F9AA79] transition-colors flex items-center gap-2"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="p-2 rounded-full bg-[#F9AA79]/10 group-hover:bg-[#F9AA79]/20 transition-colors">
                        <Phone className="w-4 h-4 text-[#F9AA79]" />
                      </div>
                      <span className="text-xs sm:text-sm font-medium">{contactInfo.phone}</span>
                    </a>
                  </div>
                  
                  <div className="group contact-item">
                    <div className="flex justify-between items-center mb-1">
                      <p className="text-xs text-gray-300 uppercase tracking-wider">{labels.workEmail}</p>
                      <button 
                        onClick={() => copyToClipboard(contactInfo.email, 'email')}
                        className="text-gray-300 hover:text-[#F9AA79] transition-colors"
                      >
                        {copied === 'email' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                      </button>
                    </div>
                    <a
                      href={`mailto:${contactInfo.email}`}
                      className="text-white group-hover:text-[#F9AA79] transition-colors flex items-center gap-2"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="p-2 rounded-full bg-[#F9AA79]/10 group-hover:bg-[#F9AA79]/20 transition-colors">
                        <Mail className="w-4 h-4 text-[#F9AA79]" />
                      </div>
                      <span className="text-xs sm:text-sm font-medium break-all">{contactInfo.email}</span>
                    </a>
                  </div>
                  
                  {/* Dynamic Websites */}
                  {contactInfo.websites.map((website, index) => (
                    <div key={index} className="group contact-item">
                      <div className="flex justify-between items-center mb-1">
                        <p className="text-xs text-gray-300 uppercase tracking-wider">{labels.website}</p>
                        <button 
                          onClick={() => copyToClipboard(website.url, `website-${index}`)}
                          className="text-gray-300 hover:text-[#F9AA79] transition-colors"
                        >
                          {copied === `website-${index}` ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                        </button>
                      </div>
                      <a
                        href={`https://${website.url}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white group-hover:text-[#F9AA79] transition-colors flex items-center gap-2"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="p-2 rounded-full bg-[#F9AA79]/10 group-hover:bg-[#F9AA79]/20 transition-colors">
                          <website.icon className="w-4 h-4 text-[#F9AA79]" />
                        </div>
                        <span className="text-xs sm:text-sm font-medium">{website.url}</span>
                      </a>
                    </div>
                  ))}
                </div>
                
                {/* Save contact button */}
                <button
                  onClick={saveContact}
                  className="w-full bg-[#F9AA79] text-white py-3 rounded-lg shadow-lg transition-all duration-300 flex items-center justify-center space-x-2 relative overflow-hidden group hover:shadow-glow"
                >
                  <span className="absolute inset-0 w-full h-full bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  <Download className="w-4 h-4 relative z-10" />
                  <span className="relative z-10 font-medium tracking-wide">{labels.saveContact}</span>
                </button>
              </div>
            </div>
            
            {/* Company Tab */}
            <div
              className={`absolute inset-0 w-full transition-transform duration-500 ease-out ${
                activeTab === 'company' ? 'translate-x-0' : '-translate-x-full'
              }`}
            >
              <div className="bg-[##333333] p-6 min-h-full">
                {/* Company Logo */}
                <div className="flex flex-col items-center mb-8">
                  <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-br from-[#F9AA79] via-[#F9AA79] to-[#F9AA79] flex items-center justify-center shadow-lg mb-5 p-1">
                    <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden">
                      <img 
                        src="/Clogo.jpg" 
                        alt={`${contactInfo.company} Logo`}
                        className="w-40 h-40 sm:w-60 sm:h-60 object-contain"
                      />
                    </div>
                  </div>
                  
                  <h2 className="text-xl sm:text-2xl font-bold text-center text-[#F9AA79] mb-1">
                    {contactInfo.company}
                  </h2>
                  <div className="h-0.5 w-1/2 mx-auto bg-gradient-to-r from-transparent via-[#F9AA79]/50 to-transparent mb-3"></div>
                  <div className="flex items-center space-x-1 text-gray-300 mb-1">
                    <a
                      href="https://maps.app.goo.gl/1vgZ9KmKYFizdYbQ9"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-1 text-gray-300 hover:text-[#F9AA79] transition-colors"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <MapPin className="w-3 h-3" />
                      <span className="text-xs">{contactInfo.location}</span>
                    </a>
                  </div>
                </div>
                
                {/* Company Contact Info */}
                <div className="space-y-5 mb-6">
                  <div className="group contact-item">
                    <div className="flex justify-between items-center mb-1">
                      <p className="text-xs text-gray-300 uppercase tracking-wider">{labels.mainOffice}</p>
                      <button 
                        onClick={() => copyToClipboard(contactInfo.mainOffice, 'mainOffice')}
                        className="text-gray-300 hover:text-[#F9AA79] transition-colors"
                      >
                        {copied === 'mainOffice' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                      </button>
                    </div>
                    <a
                      href={`tel:${contactInfo.mainOffice}`}
                      className="text-white group-hover:text-[#F9AA79] transition-colors flex items-center gap-2"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="p-2 rounded-full bg-[#F9AA79]/10 group-hover:bg-[#F9AA79]/20 transition-colors">
                        <Phone className="w-4 h-4 text-[#F9AA79]" />
                      </div>
                      <span className="text-xs sm:text-sm font-medium">{contactInfo.mainOffice}</span>
                    </a>
                  </div>
                  
                  <div className="group contact-item">
                    <div className="flex justify-between items-center mb-1">
                      <p className="text-xs text-gray-300 uppercase tracking-wider">{labels.customerService}</p>
                      <button 
                        onClick={() => copyToClipboard(contactInfo.customerService, 'customerService')}
                        className="text-gray-300 hover:text-[#F9AA79] transition-colors"
                      >
                        {copied === 'customerService' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                      </button>
                    </div>
                    <a
                      href={`tel:${contactInfo.customerService}`}
                      className="text-white group-hover:text-[#F9AA79] transition-colors flex items-center gap-2"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="p-2 rounded-full bg-[#F9AA79]/10 group-hover:bg-[#F9AA79]/20 transition-colors">
                        <Phone className="w-4 h-4 text-[#F9AA79]" />
                      </div>
                      <span className="text-xs sm:text-sm font-medium">{contactInfo.customerService}</span>
                    </a>
                  </div>
                </div>
                
                {/* Dynamic Social Media */}
                <div className="mb-8 bg-[#F9AA79] p-5 rounded-lg shadow-inner backdrop-blur-sm relative z-10">
                  <div className="text-center mb-3">
                    <div className="flex items-center justify-center mb-2">
                      <span className="w-12 h-px bg-gray-100"></span>
                      <span className="mx-3 text-xs font-medium text-gray-100 uppercase tracking-wider">{labels.followUs}</span>
                      <span className="w-12 h-px bg-gray-100"></span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {contactInfo.socials.map((social, index) => (
                      <a
                        key={index}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 text-white hover:text-[#F9AA79] transition-all group px-2 py-2 rounded-lg hover:bg-[#3a3a3a] hover:shadow-sm"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className={`p-2 rounded-full ${
                          social.platform === 'instagram' 
                            ? 'bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400' 
                            : social.platform === 'facebook'
                              ? 'bg-[#1877F2]'
                              : social.platform === 'linkedin'
                                ? 'bg-[#0077B5]'
                                : 'bg-[#F9AA79]'
                        } group-hover:shadow-md transition-shadow`}>
                          {social.platform === 'instagram' ? (
                            <Instagram className="w-4 h-4 text-white" />
                          ) : social.platform === 'facebook' ? (
                            <Facebook className="w-4 h-4 text-white" />
                          ) : social.platform === 'linkedin' ? (
                            <Linkedin className="w-4 h-4 text-white" />
                          ) : (
                            <social.icon className="w-4 h-4 text-white" />
                          )}
                        </div>
                        <span className="text-xs font-medium truncate">
                          {social.display}
                        </span>
                      </a>
                    ))}
                  </div>
                </div>
                
                {/* Save contact button */}
                <button
                  onClick={saveContact}
                  className="w-full bg-[#F9AA79] text-white py-3 rounded-lg shadow-lg transition-all duration-300 flex items-center justify-center space-x-2 relative overflow-hidden group hover:shadow-glow"
                >
                  <span className="absolute inset-0 w-full h-full bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  <Download className="w-4 h-4 relative z-10" />
                  <span className="relative z-10 font-medium tracking-wide">{labels.saveContact}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer with KrispX branding */}
      <div className="mt-8 text-center relative z-10">
        <a 
          href="https://www.krispx.org" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center gap-1 text-white text-sm"
        >
          <span>Click here to get your own</span>
          <img 
            src="/Logo.png" 
            alt="KrispX" 
            className="h-20 object-contain"
            style={{ marginTop: '-1px' }}
          />
        </a>
      </div>
    </div>
  );
};

export default BusinessCard;