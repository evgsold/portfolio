interface AboutStructuredDataProps {
  locale: string;
  title: string;
  description: string;
}

export default function AboutStructuredData({ locale, title, description }: AboutStructuredDataProps) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Евгений Солдатенко",
    "url": "https://portfolio-pied-pi-a0rx8b1qju.vercel.app",
    "image": "https://portfolio-pied-pi-a0rx8b1qju.vercel.app/me.jpg",
    "jobTitle": "Full Stack Developer",
    "description": description,
    "knowsAbout": [
      "Web Development",
      "React",
      "Next.js", 
      "TypeScript",
      "JavaScript",
      "HTML",
      "CSS",
      "Tailwind CSS",
      "Node.js",
      "API Development"
    ],
    "sameAs": [
      "https://github.com/evgsold",
      "https://linkedin.com/in/евгений-солдатенко-365301334"
    ],
    "worksFor": {
      "@type": "Organization",
      "name": "Freelance"
    },
    "alumniOf": {
      "@type": "EducationalOrganization",
      "name": "MRK"
    },
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "Russia"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
