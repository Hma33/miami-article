import { useEffect } from 'react';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  ogType?: 'website' | 'article';
  canonicalUrl?: string;
  schemaData?: object;
}

export function SEO({
  title,
  description,
  keywords,
  ogImage,
  ogType = 'website',
  canonicalUrl,
  schemaData,
}: SEOProps) {
  useEffect(() => {
    // 1. Update Title
    const defaultTitle = 'Miami Dubai Clinic | Premium Healthcare & Dental Clinic';
    const fullTitle = title ? `${title} | Miami Dubai Clinic` : defaultTitle;
    document.title = fullTitle;

    // Helper function to update or append meta elements in <head>
    const updateMetaTag = (attrName: string, attrVal: string, content: string) => {
      if (!content) return;
      let element = document.querySelector(`meta[${attrName}="${attrVal}"]`);
      if (element) {
        element.setAttribute('content', content);
      } else {
        element = document.createElement('meta');
        element.setAttribute(attrName, attrVal);
        element.setAttribute('content', content);
        document.head.appendChild(element);
      }
    };

    // 2. Meta Description
    if (description) {
      updateMetaTag('name', 'description', description);
      updateMetaTag('property', 'og:description', description);
      updateMetaTag('name', 'twitter:description', description);
    }

    // 3. Keywords
    if (keywords) {
      updateMetaTag('name', 'keywords', keywords);
    }

    // 4. Open Graph & Twitter Titles
    updateMetaTag('property', 'og:title', title || 'Miami Dubai Clinic');
    updateMetaTag('name', 'twitter:title', title || 'Miami Dubai Clinic');
    updateMetaTag('property', 'og:type', ogType);

    // 5. Open Graph & Twitter Images
    if (ogImage) {
      updateMetaTag('property', 'og:image', ogImage);
      updateMetaTag('name', 'twitter:image', ogImage);
    }

    // 6. Canonical Link URL
    const currentUrl = canonicalUrl || window.location.href;
    let canonicalElement = document.querySelector('link[rel="canonical"]');
    if (canonicalElement) {
      canonicalElement.setAttribute('href', currentUrl);
    } else {
      canonicalElement = document.createElement('link');
      canonicalElement.setAttribute('rel', 'canonical');
      canonicalElement.setAttribute('href', currentUrl);
      document.head.appendChild(canonicalElement);
    }

    // 7. Structured JSON-LD Data
    let schemaScript = document.getElementById('json-ld-schema');
    if (schemaScript) {
      if (schemaData) {
        schemaScript.innerHTML = JSON.stringify(schemaData);
      } else {
        schemaScript.remove();
      }
    } else if (schemaData) {
      schemaScript = document.createElement('script');
      schemaScript.setAttribute('id', 'json-ld-schema');
      schemaScript.setAttribute('type', 'application/ld+json');
      schemaScript.innerHTML = JSON.stringify(schemaData);
      document.head.appendChild(schemaScript);
    }

    // Cleanup logic (not strictly necessary for SPA as other pages will overwrite it,
    // but good practice for structured data script)
    return () => {
      // We keep the title/description as is, but we can clean up schema markup to avoid duplicate schemas
      const scriptElement = document.getElementById('json-ld-schema');
      if (scriptElement) {
        scriptElement.remove();
      }
    };
  }, [title, description, keywords, ogImage, ogType, canonicalUrl, schemaData]);

  return null;
}
