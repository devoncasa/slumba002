
import React from 'react';
import { useTranslation } from 'react-i18next';
import MetaManager from '../components/MetaManager';
import { towelProducts, type TowelProduct, type TowelVariant } from '../data/towelData';
import { ChevronDownIcon, InformationCircleIcon } from '@heroicons/react/24/outline';
import InlineImage from '../components/InlineImage';

const VariantTable: React.FC<{ variants: TowelVariant[] }> = ({ variants }) => {
  const { t } = useTranslation();
  const headerKeys = ['towelsPage.variantsTable.headerName', 'towelsPage.variantsTable.headerSpec', 'towelsPage.variantsTable.headerSuitability'];

  return (
    <div className="overflow-x-auto rounded-lg mt-6 border border-neutral-200/80">
      <table className="min-w-full bg-white/80 backdrop-blur-sm text-base">
        <thead className="bg-brand-secondary/70 text-brand-dark">
          <tr>
            {headerKeys.map(headerKey => (
              <th key={headerKey} className="text-start py-4 px-6 font-semibold tracking-wider">{t(headerKey)}</th>
            ))}
          </tr>
        </thead>
        <tbody className="text-neutral-700">
          {variants.map((variant) => (
            <tr key={variant.nameKey} className="border-t border-neutral-200 hover:bg-brand-light/70 transition-colors duration-200">
              <td className="py-4 px-6 font-medium">{t(variant.nameKey)}</td>
              <td className="py-4 px-6">{t(variant.specKey)}</td>
              <td className="py-4 px-6">{t(variant.suitabilityKey)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};


const ProductSection: React.FC<{ product: TowelProduct }> = ({ product }) => {
    const { t } = useTranslation();

    return (
        <section id={product.key} aria-labelledby={`${product.key}-heading`} className="scroll-mt-24">
            <div className="bg-white/80 backdrop-blur-sm p-8 sm:p-12 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300">
                <div className="grid md:grid-cols-2 gap-10 sm:gap-12 items-start">
                    <div className="md:order-2">
                        <h2 id={`${product.key}-heading`} className="text-3xl sm:text-4xl font-bold text-brand-primary mb-6">{t(product.nameKey)}</h2>
                        <p className="text-lg text-neutral-700 leading-relaxed mb-6">{t(product.descriptionKey)}</p>
                        <div className="bg-brand-secondary/70 p-5 rounded-xl">
                            <h3 className="text-lg font-semibold text-brand-dark flex items-center mb-2">
                                <InformationCircleIcon className="h-6 w-6 me-2" />
                                {t('towelsPage.techTipTitle')}
                            </h3>
                            <p className="text-neutral-800">{t(product.techTipKey)}</p>
                        </div>
                    </div>
                    <div className="md:order-1">
                        <InlineImage src={product.imageUrl} alt={t(product.nameKey)} aspectRatio="1/1" />
                    </div>
                </div>

                <details className="mt-8 group" open>
                    <summary className="flex justify-between items-center font-semibold text-xl text-neutral-900 cursor-pointer list-none py-4 border-t border-neutral-200">
                        <span>{t('towelsPage.variantsTitle')}</span>
                        <ChevronDownIcon className="h-6 w-6 transform transition-transform duration-300 group-open:rotate-180 text-brand-primary" />
                    </summary>
                    <div className="text-neutral-700 mt-2 text-base leading-relaxed">
                       <VariantTable variants={product.variants} />
                    </div>
                </details>
            </div>
        </section>
    );
};

const TowelsPage: React.FC = () => {
    const { t, i18n } = useTranslation();
    const langPrefix = `/${i18n.language}`;
    const siteName = t('footer.companyName');
    const pageTitle = t('seo.towels.title', { siteName });
    const pageDescription = t('seo.towels.description');
    const pageKeywords = t('seo.towels.keywords');
    const canonicalUrl = `${window.location.origin}${langPrefix}/towels`;
    const homeUrl = `${window.location.origin}${langPrefix}`;

    const towelImageGallery = [
        "https://i.postimg.cc/GpRX4qcP/towel0001.jpg", "https://i.postimg.cc/NjmNGWwf/towel0002.jpg",
        "https://i.postimg.cc/mDXj647V/towel0003.jpg", "https://i.postimg.cc/6QhYnn3k/towel0004.jpg",
        "https://i.postimg.cc/7hjVwNs2/towel0005.jpg", "https://i.postimg.cc/wj8Vr0sK/towel0006.jpg",
        "https://i.postimg.cc/x1vRVMKX/towel0007.jpg", "https://i.postimg.cc/pdPBWrZq/towel0008.jpg",
        "https://i.postimg.cc/HLScsHZc/towel-001.jpg",  "https://i.postimg.cc/d1phr6KJ/towel-002.jpg",
        "https://i.postimg.cc/C1zZRtXv/towel-003.jpg",  "https://i.postimg.cc/1XFfHF9w/towel-004.jpg",
    ];

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "name": pageTitle,
        "description": pageDescription,
        "keywords": pageKeywords,
        "url": canonicalUrl,
        "publisher": { "@type": "Organization", "name": siteName, "url": homeUrl },
    };

    return (
        <>
            <MetaManager
                title={pageTitle}
                description={pageDescription}
                keywords={pageKeywords}
                canonicalUrl={canonicalUrl}
                ogImage="https://i.postimg.cc/d1phr6KJ/towel-002.jpg"
                jsonLd={jsonLd}
            />
            <div className="bg-brand-light relative isolate overflow-hidden">
                <div className="absolute inset-0 -z-10 h-full w-full bg-cover bg-center opacity-10" style={{ backgroundImage: "url('https://i.postimg.cc/Kz1X3X7b/decorative-towels-bg.jpg')" }}></div>
                <div className="absolute inset-0 -z-10 h-full w-full bg-brand-secondary/20 backdrop-blur-sm" />
                
                <header className="text-center py-20 sm:py-28">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-neutral-900 mb-6">
                            {t('towelsPage.mainTitle')}
                        </h1>
                        <p className="text-lg text-neutral-700 max-w-4xl mx-auto">
                            {t('towelsPage.mainDescription')}
                        </p>
                    </div>
                </header>

                <main className="pb-20 sm:pb-28">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
                        {towelProducts.map(product => (
                            <ProductSection key={product.key} product={product} />
                        ))}

                        <section className="mt-24">
                             <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {towelImageGallery.map((img, index) => (
                                    <div key={index} className="group relative overflow-hidden rounded-2xl shadow-lg p-0.5 bg-brand-gold aspect-w-1 aspect-h-1">
                                        <img src={img} alt={`${t('towelsPage.mainTitle')} - ${index + 1}`} loading="lazy" className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 rounded-xl" />
                                        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors rounded-xl"></div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>
                </main>
            </div>
        </>
    );
};

export default TowelsPage;
