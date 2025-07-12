
import React from 'react';
import { useTranslation } from 'react-i18next';
import MetaManager from '../components/MetaManager';
import { towelProducts, type TowelProduct, type TowelVariant } from '../data/towelData';
import { InformationCircleIcon, SparklesIcon } from '@heroicons/react/24/outline';
import InlineImage from '../components/InlineImage';

// --- Product Showcase Component ---
const ProductShowcase: React.FC<{ product: TowelProduct }> = ({ product }) => {
    const { t } = useTranslation();
    const headerKeys = ['towelsPage.variantsTable.headerName', 'towelsPage.variantsTable.headerSpec', 'towelsPage.variantsTable.headerSuitability'];

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

                <div className="mt-10 overflow-hidden rounded-xl border border-neutral-200/80 shadow-lg">
                    <table className="min-w-full bg-white/80 backdrop-blur-sm text-base">
                        <thead className="bg-brand-secondary/70 text-brand-dark">
                          <tr>
                            {headerKeys.map(headerKey => (
                              <th key={headerKey} className="text-start py-4 px-6 font-semibold tracking-wider">{t(headerKey)}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="text-neutral-700">
                          {product.variants.map((variant) => (
                            <tr key={variant.nameKey} className="border-t border-neutral-200 hover:bg-brand-light/70 transition-colors duration-200">
                              <td className="py-4 px-6 font-medium">{t(variant.nameKey)}</td>
                              <td className="py-4 px-6">{t(variant.specKey)}</td>
                              <td className="py-4 px-6">{t(variant.suitabilityKey)}</td>
                            </tr>
                          ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
};

// --- First Wash Guide Component ---
interface WashStep {
    id: number;
    titleKey: string;
    reasonKey: string;
    practiceKeys: string[];
    imageUrl: string;
}

const FirstWashGuide: React.FC = () => {
    const { t } = useTranslation();
    const washStepsData: WashStep[] = [
        { id: 1, titleKey: 'towelsPage.firstWash.step1_title', reasonKey: 'towelsPage.firstWash.step1_reason', practiceKeys: ['towelsPage.firstWash.step1_practice_item1', 'towelsPage.firstWash.step1_practice_item2'], imageUrl: 'https://i.postimg.cc/GpRX4qcP/towel0001.jpg' },
        { id: 2, titleKey: 'towelsPage.firstWash.step3_title', reasonKey: 'towelsPage.firstWash.step3_reason', practiceKeys: ['towelsPage.firstWash.step3_practice_item1'], imageUrl: 'https://i.postimg.cc/d1phr6KJ/towel-002.jpg' },
        { id: 3, titleKey: 'towelsPage.firstWash.step6_title', reasonKey: 'towelsPage.firstWash.step6_reason', practiceKeys: [], imageUrl: 'https://i.postimg.cc/C1zZRtXv/towel-003.jpg' },
        { id: 4, titleKey: 'towelsPage.firstWash.step9_title', reasonKey: 'towelsPage.firstWash.step9_reason', practiceKeys: [], imageUrl: 'https://i.postimg.cc/1XFfHF9w/towel-004.jpg' },
    ];

    return (
        <section id="first-wash-guide" aria-labelledby="first-wash-guide-heading">
            <div className="bg-brand-dark text-white p-8 sm:p-12 rounded-2xl shadow-2xl relative overflow-hidden">
                <div className="absolute inset-0 bg-cover bg-center opacity-10" style={{backgroundImage: "url('https://i.postimg.cc/HLScsHZc/towel-001.jpg')"}}></div>
                <div className="relative z-10">
                    <h2 id="first-wash-guide-heading" className="text-4xl sm:text-5xl font-bold mb-8 text-center">{t('towelsPage.firstWash.title')}</h2>
                    <p className="text-lg text-neutral-200 text-center max-w-3xl mx-auto mb-16">{t('towelsPage.firstWash.intro')}</p>
                    
                    <div className="space-y-16">
                        {washStepsData.map((step, index) => (
                            <div key={step.id} className="grid md:grid-cols-2 gap-10 sm:gap-12 items-center">
                                <div className={`md:order-${index % 2 === 0 ? 1 : 2}`}>
                                    <InlineImage src={step.imageUrl} alt={t(step.titleKey)} aspectRatio="1/1" />
                                </div>
                                <div className={`md:order-${index % 2 === 0 ? 2 : 1} text-start`}>
                                    <h3 className="text-3xl font-semibold text-brand-secondary mb-4">{t(step.titleKey)}</h3>
                                    <div className="text-neutral-300 space-y-3 text-base">
                                        <p dangerouslySetInnerHTML={{ __html: t(step.reasonKey) }} />
                                        <ul className="list-disc list-outside ps-5 space-y-1">
                                            {step.practiceKeys.map(key => {
                                                const text = t(key, { defaultValue: '' });
                                                return text && <li key={key} dangerouslySetInnerHTML={{ __html: text }} />;
                                            })}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <p className="text-center text-neutral-200 mt-16 font-semibold italic">{t('towelsPage.firstWash.conclusion')}</p>
                </div>
            </div>
        </section>
    );
};

// --- Long Term Care Component ---
const LongTermCare: React.FC = () => {
    const { t } = useTranslation();
    const tips = Array.from({ length: 5 }, (_, i) => `tip${i + 1}`);

    return (
        <section id="long-term-care" aria-labelledby="long-term-care-heading">
            <div className="max-w-6xl mx-auto">
                <h2 id="long-term-care-heading" className="text-4xl sm:text-5xl font-bold text-neutral-900 mb-12 text-center">{t('towelsPage.careInstructions.title')}</h2>
                <div className="grid lg:grid-cols-2 gap-12 items-center bg-white/80 backdrop-blur-sm p-8 sm:p-12 rounded-2xl shadow-xl">
                    <div className="lg:order-2">
                        <InlineImage src="https://i.postimg.cc/wj8Vr0sK/towel0006.jpg" alt={t('towelsPage.careInstructions.title')} aspectRatio="1/1" />
                    </div>
                    <div className="lg:order-1 space-y-6">
                        {tips.map(tip => (
                            <div key={tip} className="flex items-start space-x-4 rtl:space-x-reverse">
                                 <SparklesIcon className="h-8 w-8 text-brand-primary flex-shrink-0 mt-1" />
                                 <div>
                                    <h3 className="text-xl font-semibold text-brand-dark">{t(`towelsPage.careInstructions.${tip}.title`)}</h3>
                                    <p className="text-neutral-700">{t(`towelsPage.careInstructions.${tip}.explanation`)}</p>
                                 </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

// --- Main Towels Page Component ---
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
        "https://i.postimg.cc/x1vRVMKX/towel0007.jpg", "https://i.postimg.cc/pdPBWrZq/towel0008.jpg",
        "https://i.postimg.cc/HLScsHZc/towel-001.jpg",  "https://i.postimg.cc/d1phr6KJ/towel-002.jpg",
        "https://i.postimg.cc/C1zZRtXv/towel-003.jpg",  "https://i.postimg.cc/1XFfHF9w/towel-004.jpg",
        "https://i.postimg.cc/7hjVwNs2/towel0005.jpg", "https://i.postimg.cc/wj8Vr0sK/towel0006.jpg",
    ];

    const jsonLd = { "@context": "https://schema.org", "@type": "WebPage", "name": pageTitle, "description": pageDescription, "keywords": pageKeywords, "url": canonicalUrl, "publisher": { "@type": "Organization", "name": siteName, "url": homeUrl } };

    return (
        <>
            <MetaManager title={pageTitle} description={pageDescription} keywords={pageKeywords} canonicalUrl={canonicalUrl} ogImage="https://i.postimg.cc/d1phr6KJ/towel-002.jpg" jsonLd={jsonLd} />
            <div className="bg-brand-light relative isolate overflow-hidden">
                <div className="absolute inset-0 -z-10 h-full w-full bg-cover bg-center opacity-10" style={{ backgroundImage: "url('https://i.postimg.cc/Kz1X3X7b/decorative-towels-bg.jpg')" }}></div>
                <div className="absolute inset-0 -z-10 h-full w-full bg-brand-secondary/20 backdrop-blur-sm" />
                
                <header className="text-center py-20 sm:py-28">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-neutral-900 mb-6">{t('towelsPage.mainTitle')}</h1>
                        <p className="text-lg text-neutral-700 max-w-4xl mx-auto">{t('towelsPage.mainDescription')}</p>
                    </div>
                </header>

                <main className="pb-20 sm:pb-28">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 space-y-20 sm:space-y-24">
                        {towelProducts.map(product => (
                            <ProductShowcase key={product.key} product={product} />
                        ))}
                        <FirstWashGuide />
                        <LongTermCare />
                         <section id="inspiration-gallery" aria-labelledby="inspiration-gallery-heading" className="mt-24">
                             <h2 id="inspiration-gallery-heading" className="text-4xl sm:text-5xl font-bold text-neutral-900 mb-12 text-center">
                                Inspiration Gallery
                             </h2>
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
