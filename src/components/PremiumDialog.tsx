"use client";
import usePremiumModal from "@/store/premium-modal-store";
import { Dialog, DialogContent } from "./ui/dialog";

export default function PremiumDialog() {
  const { isOpen, setOpen } = usePremiumModal();

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        setOpen(open);
      }}
    >
      <DialogContent className="sm:max-w-[425px] md:max-w-[600px] lg:max-w-[800px] bg-dark-100 text-white p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {[
            {
              title: "Pro",
              price: "$19.99/mo",
              features: [
                "10 documents",
                "15 members per document",
                "Advanced features",
              ],
              buttonText: "Upgrade to Pro",
              paymentLink: "https://buy.stripe.com/test_dR63cU6VNefLbXa7ss",
            },
            {
              title: "Professional",
              price: "$199/mo",
              features: [
                "Unlimited documents",
                "Unlimited members",
                "Premium support",
              ],
              buttonText: "Upgrade to Professional",
              paymentLink: "https://buy.stripe.com/test_aEU8xe4NFgnTf9m9AB",
            },
          ].map((plan, index) => (
            <div
              key={index}
              className="bg-dark-200 rounded-lg p-6 flex flex-col justify-between"
            >
              <div>
                <h3 className="text-2xl font-bold mb-4">{plan.title}</h3>
                <p className="text-3xl font-bold mb-6">{plan.price}</p>
                <ul className="space-y-2 mb-6">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center">
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
              </div>
              <a href={plan.paymentLink} target="_blank" className="w-full">
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 transition duration-300 rounded-lg">
                  {plan.buttonText}
                </button>
              </a>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
