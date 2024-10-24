import React from "react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

const plans = [
  {
    title: "Basic",
    price: "Free",
    features: [
      "3 documents",
      "5 members per document",
      "Real-time collaboration",
    ],
    buttonText: "Free",
    paymentLink: "",
  },
  {
    title: "Pro",
    price: "$19.99/mo",
    features: ["10 documents", "15 members per document", "Advanced features"],
    buttonText: "Upgrade to Pro",
    paymentLink: "https://buy.stripe.com/test_dR63cU6VNefLbXa7ss",
  },
  {
    title: "Professional",
    price: "$199/mo",
    features: ["Unlimited documents", "Unlimited members", "Premium support"],
    buttonText: "Upgrade to Professional",
    paymentLink: "https://buy.stripe.com/test_aEU8xe4NFgnTf9m9AB",
  },
];

type PaymentPros = {
  title: string;
  price: string;
  features: string[];
  buttonText: string;
  paymentLink: string;
};

const PricingCard = ({
  title,
  price,
  features,
  buttonText,
  paymentLink,
}: PaymentPros) => (
  <div className="flex flex-col p-6 bg-gray-800 rounded-lg shadow-lg transition-transform duration-300 hover:scale-105 antialiased dark:bg-black dark:bg-grid-white/[0.05] border-neutral-200 dark:border-slate-800 border">
    <h3 className="text-2xl font-bold text-white mb-4">{title}</h3>
    <p className="text-4xl font-bold text-white mb-6">{price}</p>
    <ul className="mb-8 space-y-2">
      {features.map((feature, index) => (
        <li key={index} className="flex items-center text-gray-300">
          <svg
            className="w-4 h-4 mr-2 text-green-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            ></path>
          </svg>
          {feature}
        </li>
      ))}
    </ul>
    <Link href={paymentLink} className="block" target="_blank">
      <Button
        disabled={title === "Basic"}
        className={cn(
          "mt-auto bg-gradient-to-r from-indigo-800 via-blue-800 to-transparent  outline-none  dark:border-blue-900/70 border-transparent text-white text-sm shadow-sm ",
          title === "Basic"
            ? "transition-none"
            : "hover:scale-105  transition duration-300 ease-in-out hover:opacity-80"
        )}
      >
        {buttonText}
      </Button>
    </Link>
  </div>
);

const Pricing = () => {
  return (
    <section className="py-20 bg-gray-900 dark:bg-black" id="pricing">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-blue-300 mb-12">
          Choose Your Plan
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <PricingCard key={index} {...plan} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
