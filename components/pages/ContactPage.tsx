// import React, { useState } from 'react';
// import { StoreSettings } from '../../types';
// import EnvelopeIcon from '../icons/EnvelopeIcon';
// import WhatsAppIcon from '../icons/WhatsAppIcon';
// import InputField from '../shared/InputField';

// interface ContactPageProps {
//   storeSettings: StoreSettings;
// }

// const ContactPage: React.FC<ContactPageProps> = ({ storeSettings }) => {
//   const [formData, setFormData] = useState({ name: '', email: '', message: '' });
//   const [formStatus, setFormStatus] = useState<{ type: 'success' | 'error' | 'idle', message: string }>({ type: 'idle', message: '' });

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
//   };

//   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setFormStatus({ type: 'idle', message: '' });
//     if (!formData.name || !formData.email || !formData.message) {
//         setFormStatus({ type: 'error', message: 'All fields are required.'});
//         return;
//     }

//     if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
//         setFormStatus({ type: 'error', message: 'Please enter a valid email.'});
//         return;
//     }

//     console.log('Contact form submitted:', formData);
//     setFormStatus({ type: 'success', message: 'Thank you for your message! We will get back to you soon.'});
//     setFormData({ name: '', email: '', message: '' });
//   };

//   const whatsappNumber = storeSettings.supportPhone.replace(/\D/g, '');

//   return (
//     <div className="bg-zaina-sky-blue-light min-h-screen py-12 md:py-16 font-body-jost">
//       <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//         <header className="text-center mb-12 md:mb-16">
//           <h1 className="text-4xl md:text-5xl font-heading-playfair font-bold text-zaina-text-primary mb-3">
//             Get In Touch
//           </h1>
//           <p className="text-lg text-zaina-slate-gray max-w-2xl mx-auto">
//             We'd love to hear from you! Whether you have a question about our products, an order, or just want to share your Zaina story.
//           </p>
//         </header>

//         <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-start">

//           <div className="bg-zaina-white p-6 md:p-8 rounded-lg shadow-xl">
//             <h2 className="text-2xl font-heading-cormorant font-semibold text-zaina-text-primary mb-6">Send Us a Message</h2>
//             <form onSubmit={handleSubmit} className="space-y-5">
//               <InputField
//                 label="Your Name"
//                 type="text"
//                 name="name"
//                 value={formData.name}
//                 onChange={handleChange}
//                 placeholder="e.g., Aanya Sharma"
//                 required
//               />
//               <InputField
//                 label="Your Email"
//                 type="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 placeholder="e.g., aanya@example.com"
//                 required
//               />
//               <div>
//                 <label htmlFor="message" className="block text-sm font-medium text-zaina-text-primary mb-1">Your Message {<span className="text-zaina-deep-red-accent">*</span>}</label>
//                 <textarea
//                   id="message"
//                   name="message"
//                   value={formData.message}
//                   onChange={handleChange}
//                   rows={5}
//                   placeholder="Tell us how we can help..."
//                   className="w-full px-3 py-2 border border-zaina-neutral-medium rounded-md shadow-sm focus:ring-zaina-primary focus:border-zaina-primary text-sm text-zaina-text-primary placeholder-zaina-slate-gray"
//                   required
//                 ></textarea>
//               </div>
//               <button
//                 type="submit"
//                 className="w-full bg-zaina-primary text-zaina-white font-semibold py-3 px-6 rounded-md hover:opacity-90 transition duration-300 text-lg"
//               >
//                 Send Message
//               </button>
//               {formStatus.message && (
//                 <p className={`text-sm mt-3 ${formStatus.type === 'success' ? 'text-green-600' : 'text-zaina-deep-red-accent'}`}>
//                   {formStatus.message}
//                 </p>
//               )}
//             </form>
//           </div>

//           <div className="space-y-8">
//             <div className="bg-zaina-white p-6 md:p-8 rounded-lg shadow-xl">
//               <h2 className="text-2xl font-heading-cormorant font-semibold text-zaina-text-primary mb-4">Support Channels</h2>
//               <div className="space-y-4">
//                 <a href={`mailto:${storeSettings.supportEmail}`} className="flex items-center text-zaina-text-primary hover:text-zaina-primary transition-colors group">
//                   <EnvelopeIcon className="w-5 h-5 mr-3 text-zaina-primary group-hover:text-zaina-cta-peach" />
//                   <span>{storeSettings.supportEmail}</span>
//                 </a>
//                 <a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noopener noreferrer" className="flex items-center text-zaina-text-primary hover:text-zaina-primary transition-colors group">
//                   <WhatsAppIcon className="w-5 h-5 mr-3 text-zaina-primary group-hover:text-zaina-cta-peach" />
//                   <span>Chat with us on WhatsApp</span>
//                 </a>
//               </div>
//               <p className="text-sm text-zaina-slate-gray mt-4">
//                 Our support team is available Mon - Sat, 10 AM - 6 PM IST.
//               </p>
//             </div>

//             <div className="bg-zaina-white p-6 md:p-8 rounded-lg shadow-xl">
//                  <h2 className="text-2xl font-heading-cormorant font-semibold text-zaina-text-primary mb-4">Visit Our Store (By Appointment)</h2>
//                 <p className="text-zaina-slate-gray mb-3">123 Elegance Avenue, Fashion City, India</p>
//                 <div className="aspect-w-16 aspect-h-9 bg-zaina-neutral-medium rounded-md flex items-center justify-center text-zaina-slate-gray">
//                     Google Map Placeholder (Embed iframe here if needed)
//                 </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ContactPage;

"use client";

import React from "react";
import InstagramBanner from "../InstagramBanner";

type StoreSettings = {
  supportEmail: string;
  supportPhone: string;
  addressLine?: string;
};

function useContactForm() {
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    message: "",
  });
  const [formStatus, setFormStatus] = React.useState<{
    type: "success" | "error" | "idle";
    message: string;
  }>({ type: "idle", message: "" });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus({ type: "idle", message: "" });
    if (!formData.name || !formData.email || !formData.message) {
      setFormStatus({ type: "error", message: "All fields are required." });
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setFormStatus({ type: "error", message: "Please enter a valid email." });
      return;
    }
    console.log("Contact form submitted:", formData);
    setFormStatus({
      type: "success",
      message: "Thank you for your message! We will get back to you soon.",
    });
    setFormData({ name: "", email: "", message: "" });
  };

  return { formData, formStatus, handleChange, handleSubmit };
}

export default function ContactPage({
  storeSettings = {
    supportEmail: "info@zainacollection.com",
    supportPhone: "+919579888992",
    addressLine: "Nagpur Maharastra, India",
  },
}: {
  storeSettings?: StoreSettings;
}) {
  const { formData, formStatus, handleChange, handleSubmit } = useContactForm();
  const whatsappNumber = "+919579888992".replace(/\D/g, "");

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Banner */}
      <section className="relative">
        <img
          src="/banner-contact.png"
          alt="Contact banner"
          className="h-[360px] w-full object-cover md:h-[520px]"
        />
        <div className="absolute inset-0 bg-black/45" />
        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-4 md:px-8">
            <div className="max-w-3xl text-white">
              <h1 className="text-4xl md:text-6xl font-serif font-semibold text-balance">
                Get In Touch
              </h1>
              <p className="mt-4 text-base md:text-lg leading-relaxed text-white/90">
                We&apos;d love to hear from you! Whether you have a question
                about our products, an order, or just want to share your Zaina
                story.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Card */}
      <section className="container mx-auto px-4 md:px-8 mt-6 md:-mt-16 lg:-mt-20 relative z-10 pb-12 md:pb-16">
        <div className="rounded-2xl bg-white shadow-[0_20px_80px_-20px_rgba(0,0,0,0.45)] ring-1 ring-black/5">
          <div className="grid gap-0 md:grid-cols-2">
            {/* Left blue panel */}
            <aside className="rounded-t-2xl bg-blue-700 p-6 text-white md:rounded-l-2xl md:rounded-tr-none md:p-8">
              <h2 className="text-2xl font-semibold">Contact Information</h2>
              <p className="mt-1 text-white/85">You can reach us anytime!</p>

              <div className="mt-6 space-y-4">
                <a
                  href={`mailto:${storeSettings.supportEmail}`}
                  className="block text-white hover:opacity-90"
                >
                  {storeSettings.supportEmail || "info@zainacollection.com"}
                </a>
                <a
                  href={`https://wa.me/${whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-white hover:opacity-90"
                >
                  Chat with us on WhatsApp
                </a>
              </div>

              <div className="mt-8">
                <h3 className="text-lg font-medium">
                  Visit Our Store (By Appointment)
                </h3>
                <p className="mt-1 text-white/85">
                  {storeSettings.addressLine || "Nagpur, Maharastra India "}
                </p>
                <div className="mt-4 h-40 w-full rounded-md bg-white/10 text-center text-white/80 overflow-hidden">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3721.5807724427353!2d79.088154!3d21.1458009!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bd4c0b1d1d1d1d%3A0x123456789abcdef!2sNagpur%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1692000000000!5m2!1sen!2sin"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen={false}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </div>
            </aside>

            {/* Right form */}
            <div className="p-6 md:p-8">
              <form
                onSubmit={handleSubmit}
                className="grid gap-5 md:grid-cols-2"
              >
                <div className="md:col-span-1">
                  <label
                    htmlFor="name"
                    className="mb-1 block text-sm font-medium text-neutral-900"
                  >
                    Name<span className="text-red-600"> *</span>
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g., Aanya Sharma"
                    className="block w-full rounded-md border border-neutral-300 px-3 py-2 text-sm text-neutral-900 placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-blue-600"
                    required
                  />
                </div>

                <div className="md:col-span-1">
                  <label
                    htmlFor="email"
                    className="mb-1 block text-sm font-medium text-neutral-900"
                  >
                    Email<span className="text-red-600"> *</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="e.g., aanya@example.com"
                    className="block w-full rounded-md border border-neutral-300 px-3 py-2 text-sm text-neutral-900 placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-blue-600"
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <label
                    htmlFor="message"
                    className="mb-1 block text-sm font-medium text-neutral-900"
                  >
                    Your Message<span className="text-red-600"> *</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Write here…"
                    className="block w-full rounded-md border border-neutral-300 px-3 py-2 text-sm text-neutral-900 placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-blue-600"
                    required
                  />
                </div>

                <div className="flex items-center justify-end md:col-span-2">
                  <button
                    type="submit"
                    className="inline-flex items-center rounded-md bg-blue-700 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
                  >
                    Send Message
                  </button>
                </div>

                {formStatus.message && (
                  <p
                    className={`md:col-span-2 text-sm ${
                      formStatus.type === "success"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {formStatus.message}
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Instagram section on white background as requested */}
      <InstagramBanner />
    </main>
  );
}
