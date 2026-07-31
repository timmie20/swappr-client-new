export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface FaqCategory {
  id: string;
  title: string;
  items: FaqItem[];
}

export const FAQ_CATEGORIES: FaqCategory[] = [
  {
    id: "buying",
    title: "Buying",
    items: [
      {
        id: "buying-1",
        question: "Do I need an account to buy on Swappr?",
        answer:
          "You'll need an account to complete checkout and track your order.",
      },
      {
        id: "buying-2",
        question: "How do I know a listing is accurate?",
        answer:
          "Every vendor goes through verification before they can list, and listings follow a standard format for condition, specs, and price.",
      },
      {
        id: "buying-3",
        question: "Can I negotiate the price on a listing?",
        answer: "No — prices on Swappr are fixed and non-negotiable.",
      },
      {
        id: "buying-4",
        question: "What condition grades does Swappr use?",
        answer:
          "Every listing carries one of three condition grades: New, UK Used (previously owned, imported), and Eco-Friendly (Nigerian used).",
      },
    ],
  },
  {
    id: "swapping",
    title: "Swapping",
    items: [
      {
        id: "swapping-1",
        question: 'What does "swap" mean on Swappr?',
        answer:
          "It means offering your own device — sometimes with cash added — in exchange for an eligible vendor listing, instead of paying the full price.",
      },
      {
        id: "swapping-2",
        question: "Can I swap on any listing?",
        answer: "Only listings a vendor has marked as open to swaps.",
      },
      {
        id: "swapping-3",
        question: "What happens if a vendor rejects my swap request?",
        answer:
          "You can adjust your offer or choose to buy the listing outright instead.",
      },
    ],
  },
  {
    id: "vendors",
    title: "Vendors",
    items: [
      {
        id: "vendors-1",
        question: "Who can become a vendor on Swappr?",
        answer:
          "Anyone with a registered business (CAC) who completes identity verification.",
      },
      {
        id: "vendors-2",
        question: "Can I sell without a registered business?",
        answer:
          "Not currently — CAC business registration is required for every vendor.",
      },
      {
        id: "vendors-3",
        question: "How long does vendor approval take?",
        answer:
          "Approval is immediate once your profile and verification are complete — there's no separate manual review wait.",
      },
      {
        id: "vendors-4",
        question: "What does the vendor dashboard show me?",
        answer:
          "Orders needing your attention, this month's orders and revenue, and which listings are active or out of stock.",
      },
      {
        id: "vendors-5",
        question: "How and when do I get paid as a vendor?",
        answer: "Payouts are processed automatically once an order completes.",
      },
      {
        id: "vendors-6",
        question: "Can I offer delivery and pickup both?",
        answer:
          "Vendors choose and manage their own delivery and pickup options per order.",
      },
    ],
  },
  {
    id: "payments",
    title: "Payments",
    items: [
      {
        id: "payments-1",
        question: "What payment methods does Swappr accept?",
        answer: "Card, bank transfer, and USSD, powered by Paystack.",
      },
      {
        id: "payments-2",
        question: "Is my payment information secure at checkout?",
        answer:
          "Payments are processed through Paystack; Swappr does not store your card details directly.",
      },
    ],
  },
  {
    id: "orders",
    title: "Orders & Fulfillment",
    items: [
      {
        id: "orders-1",
        question: "What happens after I place an order?",
        answer:
          "You'll get confirmation, and the vendor will arrange delivery or provide pickup details.",
      },
      {
        id: "orders-2",
        question: "How do I track my order?",
        answer:
          "The vendor provides a tracking number for delivery or a pickup code for pickup orders.",
      },
      {
        id: "orders-3",
        question: "Can I cancel an order after placing it?",
        answer:
          "Yes, if you haven't paid yet — you can cancel anytime, for any reason. Once an order is paid and the vendor has confirmed it, you can no longer cancel it yourself. A vendor can still cancel a paid order at their own discretion; if that happens, the reason is shown in your order details and sent to you by email, and Swappr will follow up about a full refund.",
      },
      {
        id: "orders-4",
        question: "What if my order never arrives?",
        answer:
          "Contact Swappr support at support@swappr.com.ng and our team can help mediate and sort out next steps.",
      },
    ],
  },
  {
    id: "returns",
    title: "Returns & Disputes",
    items: [
      {
        id: "returns-1",
        question: "Can I return a device I bought on Swappr?",
        answer:
          "Return policies are set by each vendor individually — check the listing or contact the vendor directly.",
      },
      {
        id: "returns-2",
        question: "What if the device doesn't match the listing?",
        answer:
          "Contact Swappr support at support@swappr.com.ng — our team can step in to mediate.",
      },
      {
        id: "returns-3",
        question: "Does Swappr offer a buyer guarantee?",
        answer:
          "There's no blanket guarantee on every purchase, but two protections are built in: if a vendor cancels a paid order, Swappr follows up about a full refund, and if there's a dispute — like a device not matching its listing — you can reach Swappr support for mediation.",
      },
      {
        id: "returns-4",
        question: "How do I contact a vendor about an issue with my order?",
        answer:
          "The vendor's email and/or store phone number is included in your order details.",
      },
    ],
  },
  {
    id: "accounts",
    title: "Accounts",
    items: [
      {
        id: "accounts-1",
        question: "Do I need separate accounts to buy and to sell?",
        answer: "Yes — buyer and vendor accounts are separate.",
      },
    ],
  },
  {
    id: "trust",
    title: "Trust & Security",
    items: [
      {
        id: "trust-1",
        question: "How does Swappr verify vendors?",
        answer:
          "Through business registration (CAC) and identity verification before a vendor can list anything.",
      },
      {
        id: "trust-2",
        question: "Is my personal information safe with Swappr?",
        answer:
          "Yes — all data collected from the point of account creation is stored securely with Swappr.",
      },
      {
        id: "trust-3",
        question: "What stops someone from creating a fake vendor account?",
        answer:
          "Every vendor must pass business and identity verification — there's no path to listing products without it.",
      },
    ],
  },
];
