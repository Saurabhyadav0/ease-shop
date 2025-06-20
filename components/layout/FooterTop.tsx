import { MapPin, Phone } from "lucide-react";
import React from "react";

interface Props {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
}

const data: Props[] = [
  {
    title: "Visit Us",
    subtitle: "Noida, Uttar Pradesh, India",
    icon: (
      <MapPin className="text-gray-600 dark:text-gray-400 group-hover:text-darkColor dark:group-hover:text-lightColor transition-colors" />
    ),
  },
  {
    title: "Call Us",
    subtitle: "+91 8528797606",
    icon: (
      <Phone className="text-gray-600 dark:text-gray-400 group-hover:text-darkColor dark:group-hover:text-lightColor transition-colors" />
    ),
  },
  {
    title: "Working Hours",
    subtitle: "Mon - Sat: 10:00 AM - 7:00 PM",
    icon: (
      <MapPin className="text-gray-600 dark:text-gray-400 group-hover:text-darkColor dark:group-hover:text-lightColor transition-colors" />
    ),
  },
  {
    title: "Email Us",
    subtitle: "shopeease@gmail.com",
    icon: (
      <MapPin className="text-gray-600 dark:text-gray-400 group-hover:text-darkColor dark:group-hover:text-lightColor transition-colors" />
    ),
  },
];

const FooterTop = () => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 border-b border-gray-300 dark:border-gray-700">
      {data.map((item, index) => (
        <ContactItem
          key={index}
          icon={item.icon}
          title={item.title}
          subtitle={item.subtitle}
        />
      ))}
    </div>
  );
};

const ContactItem = ({ icon, title, subtitle }: Props) => {
  return (
    <div className="flex items-center gap-3 group hover:bg-gray-50 dark:hover:bg-gray-800 p-4 transition-colors rounded-md">
      {icon}
      <div>
        <h3 className="font-semibold text-gray-900 dark:text-gray-100 group-hover:text-darkColor dark:group-hover:text-lightColor transition-colors">
          {title}
        </h3>
        <p className="text-gray-600 dark:text-gray-400 text-sm mt-1 group-hover:text-gray-900 dark:group-hover:text-gray-200 transition-colors">
          {subtitle}
        </p>
      </div>
    </div>
  );
};

export default FooterTop;
