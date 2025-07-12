import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import i18n from '../i18n';

interface MetaManagerProps {
  title: string;
  description: string;
  keywords?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogType?: string;
  ogUrl?: string;
  twitterCard?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  jsonLd?: Record<string, any> | Array<Record<string, any>>;
  canonicalUrl?: string;
}

const MetaManager: React.FC<MetaManagerProps> = ({
  title,
  description,
  keywords,
  ogTitle,
  ogDescription,
  ogImage,
  ogType = 'website',
  ogUrl,
  twitterCard = 'summary_large_image',
  twitterTitle,
  twitterDescription,
  jsonLd,
  canonicalUrl,
}) => {
  const location = useLocation();
  
  useEffect(() => {
    document.title = title;

    const setMetaTag = (nameOrProperty: string, content: string | undefined, isProperty = false) => {
      const selector = isProperty ? `meta[property="${nameOrProperty}"]` : `meta[name="${nameOrProperty}"]`;
      let element = document.head.querySelector(selector) as HTMLMetaElement | null;
      
      if (content === undefined) {
        if (element) element.remove();
        return;
      }

      if (!element) {
        element = document.createElement('meta');
        if (isProperty) {
          element.setAttribute('property', nameOrProperty);
        } else {
          element.setAttribute('name', nameOrProperty);
        }
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    const setLinkTag = (rel: string, href: string, hrefLang?: string) => {
        const selector = hrefLang ? `link[rel="${rel}"][hreflang="${hrefLang}"]` : `link[rel="${rel}"]`;
        let element = document.head.querySelector(selector) as HTMLLinkElement | null;

        if (!element) {
            element = document.createElement('link');
            element.setAttribute('rel', rel);
            if (hrefLang) element.setAttribute('hreflang', hrefLang);
            document.head.appendChild(element);
        }
        
        if (element.href !== href) {
            element.setAttribute('href', href);
        }
    };
    
    // --- Standard & Social Meta ---
    setMetaTag('description', description);
    setMetaTag('keywords', keywords);
    setMetaTag('og:title', ogTitle || title, true);
    setMetaTag('og:description', ogDescription || description, true);
    setMetaTag('og:image', ogImage, true);
    setMetaTag('og:type', ogType, true);
    setMetaTag('twitter:card', twitterCard);
    setMetaTag('twitter:title', twitterTitle || title);
    setMetaTag('twitter:description', twitterDescription || description);

    // --- Localization (Canonical & Hreflang) ---
    const getLangPath = (currentPath: string, lang: string): string => {
        const pathParts = currentPath.split('/').filter(p => p);
        const supportedLngs = i18n.options.supportedLngs || [];
        if (pathParts.length > 0 && supportedLngs.includes(pathParts[0])) {
            pathParts.shift(); // remove old lang
        }
        return `/${lang}${pathParts.length > 0 ? '/' : ''}${pathParts.join('/')}`;
    };

    const currentLangPath = getLangPath(location.pathname, i18n.language);
    const defaultCanonicalUrl = `${window.location.origin}${currentLangPath}`;
    
    const finalCanonicalUrl = canonicalUrl || defaultCanonicalUrl;
    
    setLinkTag('canonical', finalCanonicalUrl);
    setMetaTag('og:url', ogUrl || finalCanonicalUrl, true);
    
    const supportedLngs = i18n.options.supportedLngs || [];
    const managedHreflangs: string[] = [];

    supportedLngs.forEach(lng => {
      if (lng === 'fallback') return;
      const langCode = lng === 'zh' ? 'zh-Hans' : lng;
      const href = `${window.location.origin}${getLangPath(location.pathname, lng)}`;
      setLinkTag('alternate', href, langCode);
      managedHreflangs.push(langCode);
    });

    // Set 'th' as the default language for x-default
    const defaultHref = `${window.location.origin}${getLangPath(location.pathname, 'th')}`;
    setLinkTag('alternate', defaultHref, 'x-default');
    managedHreflangs.push('x-default');

    document.querySelectorAll('link[rel="alternate"][hreflang]').forEach(link => {
        const lang = link.getAttribute('hreflang');
        if (lang && !managedHreflangs.includes(lang)) {
            link.remove();
        }
    });

    // --- JSON-LD Structured Data ---
    document.querySelectorAll('script[type="application/ld+json"][data-meta-manager]').forEach(e => e.remove());

    if (jsonLd) {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.setAttribute('data-meta-manager', 'true');
      script.innerHTML = JSON.stringify(jsonLd);
      document.head.appendChild(script);
    }
    
  }, [title, description, keywords, ogTitle, ogDescription, ogImage, ogType, twitterCard, twitterTitle, twitterDescription, jsonLd, i18n.language, location.pathname, canonicalUrl, ogUrl]);

  return null;
};

export default MetaManager;