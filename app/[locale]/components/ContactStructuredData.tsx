interface ContactStructuredDataProps {
  locale: string;
  email: string;
  phone: string;
}

export default function ContactStructuredData({ locale, email, phone }: ContactStructuredDataProps) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "Contact",
    "url": "https://portfolio-pied-pi-a0rx8b1qju.vercel.app/contact",
    "description": "Get in touch for collaboration opportunities",
    "provider": {
      "@type": "Person",
      "name": "Евгений Солдатенко",
      "jobTitle": "Full Stack Developer",
      "email": email,
      "telephone": phone,
      "url": "https://portfolio-pied-pi-a0rx8b1qju.vercel.app",
      "image": "https://portfolio-pied-pi-a0rx8b1qju.vercel.app/me.jpg",
      "sameAs": [
        "https://github.com/evgsold",
        "https://linkedin.com/in/евгений-солдатенко-365301334"
      ]
    },
    "mainEntity": {
      "@type": "ContactAction",
      "target": "https://portfolio-pied-pi-a0rx8b1qju.vercel.app/contact",
      "actionStatus": "ActiveActionStatus"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
