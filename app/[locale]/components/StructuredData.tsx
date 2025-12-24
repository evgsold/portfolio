interface StructuredDataProps {
  locale: string;
}

export default function StructuredData({ locale }: StructuredDataProps) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Евгений Солдатенко",
    "url": "https://portfolio-pied-pi-a0rx8b1qju.vercel.app",
    "image": "https://portfolio-pied-pi-a0rx8b1qju.vercel.app/me.jpg",
    "jobTitle": "Full Stack Developer",
    "description": "Full Stack Developer specializing in modern web technologies",
    "knowsAbout": [
      "Web Development",
      "React",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "HTML",
      "CSS",
      "Tailwind CSS"
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
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
