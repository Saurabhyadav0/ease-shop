"use client";

import React from "react";

const faqs = [
  {
    question: "What is ShopEase?",
    answer: "ShopEase is an e-commerce platform offering the latest trends in fashion and accessories."
  },
  {
    question: "How can I track my order?",
    answer: "Once your order is shipped, you will receive an email with the tracking number."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept major credit cards, debit cards, and digital wallets."
  },
  {
    question: "Can I return a product?",
    answer: "Yes! We have a hassle-free return policy within 14 days of delivery."
  },
  {
    question: "How can I contact customer support?",
    answer: "You can reach us via our contact page or at support@shopease.com."
  }
];

const FaqPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8 text-center text-darkColor dark:text-white">
        Frequently Asked Questions
      </h1>

      <div className="space-y-6">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 transition-colors bg-white dark:bg-gray-800"
          >
            <h2 className="font-semibold text-lg text-darkColor dark:text-white mb-2">
              {faq.question}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-sm">{faq.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FaqPage;
