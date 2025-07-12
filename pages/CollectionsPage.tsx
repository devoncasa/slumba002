

import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Button from '../components/Button';
import MetaManager from '../components/MetaManager';

interface CategoryCardProps {
  titleKey: string;
  descriptionKey: string;
  linkTo: string;
  linkTextKey: string;
  imageUrl: string;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ titleKey, descriptionKey, linkTo, linkTextKey, imageUrl }) => {
  const { t } = useTranslation();
  return (
    <div 
        className="relative group overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 aspect-[4/5] bg-brand-dark p-0.5 bg-brand-gold"
    >
      <img 
          src={imageUrl} 
          alt={t(titleKey)} 
          loading="lazy" 
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 rounded-xl"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/80 via-brand-dark/40 to-transparent rounded-xl"></div>
      <div className="relative h-full flex flex-col justify-end p-8 text-white z-10 text-start">
        <h3 className="text-3xl sm:text-4xl font-bold mb-3 transition-transform duration-300 group-hover:-translate-y-1 text-white">{t(titleKey)}</h3>
        <p className="text-base mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100 text-neutral-200">{t(descriptionKey)}</p>
        <div className="mt-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-200">
          <Button to={linkTo} variant="secondary" size="medium">{t(linkTextKey)} <span className="inline-block rtl:rotate-180">&rarr;</span></Button>
        </div>
      </div>
    </div>
  );
};

const CollectionsPage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const langPrefix = `/${i18n.language}`;
  const siteName = t('footer.companyName');
  const canonicalUrl = `${window.location.origin}${langPrefix}/collections`;
  const homeUrl = `${window.location.origin}${langPrefix}`;

  const categories: CategoryCardProps[] = [
    {
      titleKey: "collectionsPage.categoryWhite.title",
      descriptionKey: "collectionsPage.categoryWhite.description",
      linkTo: `${langPrefix}/products/white-sheets`,
      linkTextKey: "collectionsPage.categoryWhite.buttonText",
      imageUrl: "https://i.postimg.cc/NfWtgJGR/White-Bed-Sheets-Large.jpg",
    },
    {
      titleKey: "collectionsPage.categoryColors.title",
      descriptionKey: "collectionsPage.categoryColors.description",
      linkTo: `${langPrefix}/products/premium-colors`,
      linkTextKey: "collectionsPage.categoryColors.buttonText",
      imageUrl: "https://i.postimg.cc/Qd13VQVw/Premium-Color-Sheets-Large.jpg",
    },
    {
      titleKey: "collectionsPage.categorySets.title",
      descriptionKey: "collectionsPage.categorySets.description",
      linkTo: `${langPrefix}/products/sets`,
      linkTextKey: "collectionsPage.categorySets.buttonText",
      imageUrl: "https://i.postimg.cc/QMDr7FTt/Complete-Bedding-Sets-Large.jpg",
    }
  ];
  
  const breadcrumbJsonLd = {
    "@context": "https://schema.org", "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": t('nav.home'), "item": homeUrl },
      { "@type": "ListItem", "position": 2, "name": t('collectionsPage.mainTitle'), "item": canonicalUrl }
    ]
  };

  const collectionJsonLd = {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "name": t('seo.collections.title', { siteName }),
      "description": t('seo.collections.description'),
      "url": canonicalUrl,
      "keywords": t('seo.collections.keywords'),
       "publisher": {
        "@type": "Organization",
        "name": siteName,
        "logo": {
            "@type": "ImageObject",
            "url": "https://i.postimg.cc/k5NcGrQx/Slumba-ZEN-logo-200.png"
        }
      },
      "mainEntity": {
        "@type": "ItemList",
        "itemListElement": categories.map((cat, index) => ({
          "@type": "ListItem",
          "position": index + 1,
          "name": t(cat.titleKey),
          "description": t(cat.descriptionKey),
          "url": `${window.location.origin}${cat.linkTo}`,
          "image": cat.imageUrl
        }))
      }
    };


  return (
    <>
      <MetaManager
        title={t('seo.collections.title', { siteName })}
        description={t('seo.collections.description')}
        keywords={t('seo.collections.keywords')}
        ogImage="https://i.postimg.cc/XNw1dQZQ/decorative0008.jpg"
        canonicalUrl={canonicalUrl}
        jsonLd={[breadcrumbJsonLd, collectionJsonLd]}
      />
      <div className="bg-brand-light relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10 h-full w-full bg-cover bg-center opacity-10" style={{ backgroundImage: "url('https://i.postimg.cc/qqXmrvf9/decorative0007.jpg')" }}></div>
        <div className="absolute inset-0 -z-10 h-full w-full bg-brand-secondary/20 backdrop-blur-sm" />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
          <header className="text-center mb-16 sm:mb-20">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-neutral-900 mb-6">
              {t('collectionsPage.mainTitle')}
            </h1>
            <p className="text-lg text-neutral-700 max-w-3xl mx-auto">
              {t('collectionsPage.mainDescription')}
            </p>
          </header>

          <section id="shop-by-category" aria-labelledby="shop-by-category-heading">
            <h2 id="shop-by-category-heading" className="sr-only">Shop by Category</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
              {categories.map(category => (
                <CategoryCard key={category.titleKey} {...category} />
              ))}
            </div>
          </section>

          <section 
            id="learn-more-cta" 
            className="text-center py-20 sm:py-24 mt-20 bg-brand-dark rounded-2xl relative overflow-hidden bg-cover bg-center"
            style={{ backgroundImage: "url('https://i.postimg.cc/XNw1dQZQ/decorative0008.jpg')" }}
          >
            <div className="absolute inset-0 bg-brand-dark/70"></div>
            <div className="max-w-2xl mx-auto px-4 relative z-10 text-white">
              <h2 className="text-3xl sm:text-4xl font-semibold mb-5">
                {t('collectionsPage.cta.title')}
              </h2>
              <p className="text-neutral-200 mb-10">
                {t('collectionsPage.cta.description')}
              </p>
              <Button to={`${langPrefix}/materials`} variant="secondary" size="large">
                {t('collectionsPage.cta.button')}
              </Button>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default CollectionsPage;
