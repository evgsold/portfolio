interface PortfolioStructuredDataProps {
  locale: string;
  title: string;
  intro: string;
}

export default function PortfolioStructuredData({ locale, title, intro }: PortfolioStructuredDataProps) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": title,
    "url": "https://portfolio-pied-pi-a0rx8b1qju.vercel.app/portfolio",
    "description": intro,
    "provider": {
      "@type": "Person",
      "name": "Евгений Солдатенко",
      "jobTitle": "Full Stack Developer",
      "url": "https://portfolio-pied-pi-a0rx8b1qju.vercel.app",
      "image": "https://portfolio-pied-pi-a0rx8b1qju.vercel.app/me.jpg"
    },
    "mainEntity": {
      "@type": "ItemList",
      "itemListElement": [
        {
          "@type": "CreativeWork",
          "name": "Web Development Projects",
          "description": "Collection of modern web applications",
          "creator": {
            "@type": "Person",
            "name": "Евгений Солдатенко",
            "url": "https://portfolio-pied-pi-a0rx8b1qju.vercel.app"
          },
          "programmingLanguage": ["JavaScript", "TypeScript", "React", "Next.js"]
        }
      ]
    },
    "about": [
      "Web Development",
      "React",
      "Next.js",
      "TypeScript",
      "Frontend Development",
      "Backend Development"
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
