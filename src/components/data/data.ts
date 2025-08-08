import { CreditCard, Smartphone } from "lucide-react";
const paymentMethods = [
  {
    id: "momo" as string,
    name: "MoMo",
    description: "Payment via MoMo e-wallet",
    icon: Smartphone,
    color: "text-[#d82d8b]",
    bgColor: "bg-[#FBE9F3]",
    borderColor: "border-[#F0AFD4]",
  },
  {
    id: "vnpay" as string,
    name: "VNPay",
    description: "Payment via VNPay gateway",
    icon: CreditCard,
    color: "text-[#1e40af]",
    bgColor: "bg-[#E7ECF7]",
    borderColor: "border-[#A8B9E2]",
  },
];

export default { paymentMethods };
