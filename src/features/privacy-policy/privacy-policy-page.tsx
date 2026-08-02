import type { ReactNode } from "react";

const SECTIONS: { heading: string; body: ReactNode }[] = [
  {
    heading: "1. Information We Collect",
    body: (
      <>
        <h3 className="text-tertiary mt-6 text-sm font-semibold">
          From consumers
        </h3>
        <ul className="mt-2 list-disc space-y-2 pl-5">
          <li>Name, email address, phone number</li>
          <li>
            Delivery/pickup preferences (delivery arrangements are managed
            directly by vendors, not by Swappr)
          </li>
          <li>Order and swap request history</li>
          <li>
            Payment is processed by Paystack; Swappr does not store your full
            card or bank account details
          </li>
          <li>
            Device and browser information, IP address, and usage data
            collected automatically when you use the site
          </li>
        </ul>

        <h3 className="text-tertiary mt-6 text-sm font-semibold">
          From vendors
        </h3>
        <ul className="mt-2 list-disc space-y-2 pl-5">
          <li>
            Business registration details (CAC), verified through our
            identity verification partner, Prembly
          </li>
          <li>
            Identity verification data (BVN/NIN) submitted for the purpose of
            verification only. <strong>We do not store your BVN or NIN.</strong>{" "}
            Only a sanitized verification result (pass/fail and limited
            supporting metadata) is retained.
          </li>
          <li>
            Bank account and payout details, used to process automated
            payouts through Paystack
          </li>
          <li>
            Product listings, pricing, and order fulfillment information
          </li>
        </ul>

        <h3 className="text-tertiary mt-6 text-sm font-semibold">
          If you sign in with Google
        </h3>
        <p className="mt-2">
          If you use Google Sign-In to create or access your Swappr account,
          we receive basic profile information from your Google account (name,
          email address) to create and authenticate your account. We do not
          request access to your Gmail, Google Drive, or other Google
          services, and we do not use your Google account information for
          advertising or any purpose unrelated to providing Swappr&apos;s
          services, consistent with Google&apos;s API Services User Data
          Policy, including its Limited Use requirements.
        </p>
      </>
    ),
  },
  {
    heading: "2. How We Use Your Information",
    body: (
      <>
        <p>We use the information we collect to:</p>
        <ul className="mt-2 list-disc space-y-2 pl-5">
          <li>Create and manage your account</li>
          <li>Process orders, swap requests, and payments</li>
          <li>
            Verify vendor identity and business legitimacy before allowing
            listings
          </li>
          <li>Process automated vendor payouts</li>
          <li>
            Send transactional communications (order updates, verification
            status, account notifications)
          </li>
          <li>Detect and prevent fraud</li>
          <li>Improve and maintain the platform</li>
          <li>Send marketing communications, where you have not opted out</li>
        </ul>
      </>
    ),
  },
  {
    heading: "3. Legal Basis for Processing",
    body: (
      <p>
        We process personal data on the basis of: your consent, the
        necessity of processing to perform our contract with you (e.g.
        facilitating a purchase), compliance with legal obligations
        (including identity verification requirements for vendors), and our
        legitimate interests in operating and securing the platform.
      </p>
    ),
  },
  {
    heading: "4. Who We Share Data With",
    body: (
      <>
        <p>
          We share limited data with the following service providers, solely
          to operate Swappr:
        </p>
        <ul className="mt-2 list-disc space-y-2 pl-5">
          <li>
            <strong>Prembly</strong> — identity and business (CAC)
            verification
          </li>
          <li>
            <strong>Paystack</strong> — payment processing and vendor payouts
          </li>
          <li>
            <strong>Cloudinary</strong> — hosting of product and profile
            images
          </li>
          <li>
            <strong>Resend</strong> — transactional email delivery
          </li>
          <li>
            <strong>Google</strong> — authentication, if you choose to sign in
            with Google
          </li>
        </ul>
        <p className="mt-4">
          We do not sell personal data to third parties. Vendors handling
          your order fulfillment (delivery/pickup) may receive the contact
          and delivery information necessary to complete that specific order.
        </p>
      </>
    ),
  },
  {
    heading: "5. Data Retention",
    body: (
      <p>
        We retain account and transaction data for as long as your account is
        active and as required to meet legal, accounting, or reporting
        obligations. BVN and NIN data submitted during vendor verification is
        not retained after the verification check completes.
      </p>
    ),
  },
  {
    heading: "6. Your Rights",
    body: (
      <p>
        Under the Nigeria Data Protection Act and applicable regulations, you
        have the right to: access the personal data we hold about you,
        request correction of inaccurate data, request deletion of your data
        (subject to legal retention requirements), object to or restrict
        certain processing, and request a copy of your data in a portable
        format. You may also lodge a complaint with the Nigeria Data
        Protection Commission (NDPC). To exercise these rights, contact us at{" "}
        <a
          href="mailto:support@swappr.com.ng"
          className="text-app-primary underline"
        >
          support@swappr.com.ng
        </a>
        .
      </p>
    ),
  },
  {
    heading: "7. Cookies",
    body: (
      <p>
        We use essential cookies to keep you signed in securely (via HttpOnly
        session cookies) and may use analytics cookies to understand how the
        site is used. You can control cookies through your browser settings.
      </p>
    ),
  },
  {
    heading: "8. Children's Privacy",
    body: (
      <p>
        Swappr is not directed at, and does not knowingly collect information
        from, individuals under 18 years of age.
      </p>
    ),
  },
  {
    heading: "9. Data Security",
    body: (
      <p>
        We use industry-standard measures to protect your data, including
        encrypted connections (TLS) and access controls. As noted above, we
        do not persist BVN/NIN data beyond the verification step.
      </p>
    ),
  },
  {
    heading: "10. International Data Transfers",
    body: (
      <p>
        Some of our infrastructure or service providers may process data
        outside Nigeria. Where this occurs, we take steps to ensure
        appropriate safeguards are in place.
      </p>
    ),
  },
  {
    heading: "11. Changes to This Policy",
    body: (
      <p>
        We may update this Privacy Policy from time to time. Material changes
        will be reflected by an updated &quot;Last updated&quot; date at the
        top of this page.
      </p>
    ),
  },
  {
    heading: "12. Contact Us",
    body: (
      <p>
        Questions about this Privacy Policy or your data can be sent to{" "}
        <a
          href="mailto:support@swappr.com.ng"
          className="text-app-primary underline"
        >
          support@swappr.com.ng
        </a>
        .
      </p>
    ),
  },
];

export function PrivacyPolicyPage() {
  return (
    <main className="bg-white px-6 py-16 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-3xl">
        <p className="text-app-primary text-xs font-bold tracking-widest uppercase">
          Privacy Policy
        </p>
        <h1 className="text-tertiary mt-2 text-3xl font-bold sm:text-4xl">
          Privacy Policy
        </h1>
        <p className="mt-3 text-sm text-gray-500">
          Last updated: August 2, 2026
        </p>

        <p className="mt-8 text-sm leading-relaxed text-gray-500">
          Swappr (&quot;Swappr,&quot; &quot;we,&quot; &quot;us,&quot; or
          &quot;our&quot;) operates swappr.com.ng, a marketplace platform
          based in Nigeria that allows independent, verified vendors to list
          pre-owned tech devices for sale and swap, and allows consumers to
          browse, purchase, and request swaps through those vendor listings.
        </p>
        <p className="mt-4 text-sm leading-relaxed text-gray-500">
          This Privacy Policy explains what information we collect, how we
          use it, and the choices you have.
        </p>

        <div className="mt-4 divide-y divide-gray-100">
          {SECTIONS.map((section) => (
            <section key={section.heading} className="py-8">
              <h2 className="text-tertiary text-lg font-semibold">
                {section.heading}
              </h2>
              <div className="mt-2 text-sm leading-relaxed text-gray-500 [&_a]:font-medium [&_strong]:text-tertiary [&_strong]:font-semibold">
                {section.body}
              </div>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
