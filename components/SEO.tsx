// components/SEO.tsx
import React from "react";
import { Helmet } from "react-helmet-async";

type SEOProps = {
  title: string;
  description?: string;
  canonical?: string;
  ogImage?: string;
  jsonLd?: object;
};

const SEO: React.FC<SEOProps> = ({ title, description, canonical, ogImage, jsonLd }) => {
  const href =
    canonical ||
    (typeof window !== "undefined" && window.location ? window.location.href : undefined);

  return (
    <Helmet>
      <title>{title}</title>
      {description && <meta name="description" content={description} />}
      {href && <link rel="canonical" href={href} />}

      <meta property="og:type" content="website" />
      {href && <meta property="og:url" content={href} />}
      <meta property="og:title" content={title} />
      {description && <meta property="og:description" content={description} />}
      {ogImage && <meta property="og:image" content={ogImage} />}

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      {description && <meta name="twitter:description" content={description} />}
      {ogImage && <meta name="twitter:image" content={ogImage} />}

      {jsonLd && (
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      )}
    </Helmet>
  );
};

export default SEO;
