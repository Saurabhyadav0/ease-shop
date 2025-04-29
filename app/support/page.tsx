"use client";

import { useState } from 'react';
import { Button } from "@/components/ui/button";

const SupportPage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // Here you can add logic to send the form data to a backend or email service
    console.log('Form Data Submitted: ', formData);
  };

  return (
    <div className="space-y-12 py-12">
      <h1 className="text-3xl font-bold text-center text-gray-900 dark:text-white">
        Support & Help Center
      </h1>

      {/* FAQ Section */}
      <section className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white">How do I track my order?</h3>
            <p className="text-gray-600 dark:text-gray-400">
              You can track your order by visiting the &quot;Order History&quot; section in your account and clicking on the &quot;Track Order&quot; button.
            </p>
          </div>
          <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white">What is the return policy?</h3>
            <p className="text-gray-600 dark:text-gray-400">
              We offer a 30-day return policy. Items must be unused and in original packaging to qualify for a refund.
            </p>
          </div>
          <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white">How do I contact customer support?</h3>
            <p className="text-gray-600 dark:text-gray-400">
              You can reach our customer support team via the contact form below or through our support email: support@shopease.com.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Contact Us</h2>
        {submitted ? (
          <div className="text-center text-green-600">
            <h3 className="text-xl font-semibold">Thank you for contacting us!</h3>
            <p>We will get back to you shortly.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-gray-700 dark:text-gray-200">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full mt-2 p-3 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-shop-primary"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-gray-700 dark:text-gray-200">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full mt-2 p-3 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-shop-primary"
                required
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-gray-700 dark:text-gray-200">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                className="w-full mt-2 p-3 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-shop-primary"
                rows={4}
                required
              ></textarea>
            </div>
            <div>
              <Button type="submit" className="bg-shop-primary hover:bg-shop-primary/90 text-white w-full">
                Submit
              </Button>
            </div>
          </form>
        )}
      </section>
    </div>
  );
};

export default SupportPage;
