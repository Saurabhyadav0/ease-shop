"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import useCartStore from '@/store/useCartStore';
import { useRouter } from 'next/navigation';

const CheckoutForm: React.FC = () => {
  const { clearCart, totalItems } = useCartStore();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    postalCode: '',
    country: 'United States',
    cardNumber: '',
    cardExpiry: '',
    cardCvc: '',
  });

  const inputClassName = "w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-shop-primary/30 dark:bg-gray-800 dark:border-gray-600 dark:text-white";
  const labelClassName = "block text-sm font-medium mb-1 dark:text-gray-300";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    if (name === 'cardNumber') {
      const formatted = value.replace(/\s/g, '').replace(/\D/g, '').slice(0, 16);
      const groups: string[] = [];
      for (let i = 0; i < formatted.length; i += 4) {
        groups.push(formatted.slice(i, i + 4));
      }
      setFormData({ ...formData, [name]: groups.join(' ') });
      return;
    }

    if (name === 'cardExpiry') {
      const formatted = value.replace(/\s/g, '').replace(/\D/g, '').slice(0, 4);
      if (formatted.length > 2) {
        setFormData({ ...formData, [name]: `${formatted.slice(0, 2)}/${formatted.slice(2)}` });
      } else {
        setFormData({ ...formData, [name]: formatted });
      }
      return;
    }

    if (name === 'cardCvc') {
      setFormData({ ...formData, [name]: value.replace(/\D/g, '').slice(0, 3) });
      return;
    }

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const required = ['firstName', 'lastName', 'email', 'address', 'city', 'postalCode', 'country', 'cardNumber', 'cardExpiry', 'cardCvc'];
    const missing = required.filter(field => !formData[field as keyof typeof formData]);

    if (missing.length > 0) {
      toast.error(`Please fill in all required fields`);
      return;
    }

    if (totalItems() === 0) {
      toast.error('Your cart is empty');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      // Log the form data to the console
      console.log('Form Data Submitted:', formData);

      clearCart();
      setIsSubmitting(false);
      toast.success('Order placed successfully!');
      router.push('/');
    }, 1500);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white dark:bg-gray-900 rounded-lg border dark:border-gray-700 p-6">
        <h2 className="text-lg font-bold mb-4 dark:text-white">Contact Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className={labelClassName}>First Name</label>
            <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} className={inputClassName} required />
          </div>
          <div>
            <label className={labelClassName}>Last Name</label>
            <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} className={inputClassName} required />
          </div>
          <div className="md:col-span-2">
            <label className={labelClassName}>Email Address</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} className={inputClassName} required />
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-lg border dark:border-gray-700 p-6">
        <h2 className="text-lg font-bold mb-4 dark:text-white">Shipping Address</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className={labelClassName}>Street Address</label>
            <input type="text" name="address" value={formData.address} onChange={handleChange} className={inputClassName} required />
          </div>
          <div>
            <label className={labelClassName}>City</label>
            <input type="text" name="city" value={formData.city} onChange={handleChange} className={inputClassName} required />
          </div>
          <div>
            <label className={labelClassName}>Postal Code</label>
            <input type="text" name="postalCode" value={formData.postalCode} onChange={handleChange} className={inputClassName} required />
          </div>
          <div className="md:col-span-2">
            <label className={labelClassName}>Country</label>
            <select name="country" value={formData.country} onChange={handleChange} className={inputClassName} required>
              <option value="United States">United States</option>
              <option value="Canada">Canada</option>
              <option value="United Kingdom">United Kingdom</option>
              <option value="Australia">Australia</option>
              <option value="Germany">Germany</option>
              <option value="France">France</option>
            </select>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-lg border dark:border-gray-700 p-6">
        <h2 className="text-lg font-bold mb-4 dark:text-white">Payment Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className={labelClassName}>Card Number</label>
            <input type="text" name="cardNumber" value={formData.cardNumber} onChange={handleChange} placeholder="1234 5678 9012 3456" className={inputClassName} required />
          </div>
          <div>
            <label className={labelClassName}>Expiry Date</label>
            <input type="text" name="cardExpiry" value={formData.cardExpiry} onChange={handleChange} placeholder="MM/YY" className={inputClassName} required />
          </div>
          <div>
            <label className={labelClassName}>CVC</label>
            <input type="text" name="cardCvc" value={formData.cardCvc} onChange={handleChange} placeholder="123" className={inputClassName} required />
          </div>
        </div>
      </div>

      <Button 
        type="submit"
        className="w-full py-6 text-lg bg-shop-primary hover:bg-shop-primary/90"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Processing..." : "Place Order"}
      </Button>
    </form>
  );
};

export default CheckoutForm;
