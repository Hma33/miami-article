import { useState, useEffect } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { WhatsAppFab } from '../components/WhatsAppFab';
import { Check, Loader2 } from 'lucide-react';
import { fetchAPI, getStrapiUrl } from '../utils/api';

interface Package {
  id: number;
  documentId: string;
  Title: string;
  Description: string;
  Price: string;
  Popular: boolean;
  Features: any;
  Poster?: {
    url: string;
    alternativeText: string | null;
  };
}

export function PackagePage() {
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadPackages() {
      try {
        const response = await fetchAPI('/packages', { populate: '*' });
        setPackages(response.data);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch packages');
      } finally {
        setLoading(false);
      }
    }

    loadPackages();
  }, []);

  const parseFeatures = (features: any) => {
    if (!features) return [];
    if (typeof features === 'string') {
      try {
        const parsed = JSON.parse(features);
        if (Array.isArray(parsed)) return extractFromBlocks(parsed);
      } catch (e) {
        return features.split('\n').filter(line => line.trim() !== '');
      }
    }
    if (Array.isArray(features)) return extractFromBlocks(features);
    return [];
  };

  const extractFromBlocks = (blocks: any[]) => {
    const list: string[] = [];
    blocks.forEach(block => {
      if (block.type === 'paragraph' || block.type === 'list-item') {
        const text = block.children?.map((child: any) => child.text).join('') || '';
        if (text.trim()) list.push(text);
      } else if (block.type === 'list') {
        block.children?.forEach((item: any) => {
          const text = item.children?.map((child: any) => child.text).join('') || '';
          if (text.trim()) list.push(text);
        });
      }
    });
    return list;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-[var(--color-navy)] text-white py-20">
        <div className="max-w-[1200px] mx-auto px-5 text-center">
          <h1 className="text-4xl md:text-5xl font-light mb-6 uppercase tracking-widest">Premium Dental Packages</h1>
          <p className="text-lg opacity-80 max-w-2xl mx-auto font-light">
            Choose from our curated dental care packages designed to give you the perfect smile with transparent pricing and world-class care.
          </p>
        </div>
      </section>

      {/* Packages Grid */}
      <section className="py-20 px-5">
        <div className="max-w-[1200px] mx-auto">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <Loader2 className="w-10 h-10 text-[var(--color-navy)] animate-spin mb-4" />
              <p className="text-gray-500">Loading our latest packages...</p>
            </div>
          ) : error ? (
            <div className="text-center py-20 bg-red-50 rounded-2xl border border-red-100">
              <p className="text-red-500 mb-2">Something went wrong</p>
              <p className="text-sm text-red-400">{error}</p>
            </div>
          ) : packages.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {packages.map((pkg) => (
                <div 
                  key={pkg.id} 
                  className={`bg-white rounded-[32px] border ${pkg.Popular ? 'border-[var(--color-navy)] ring-1 ring-[var(--color-navy)]' : 'border-gray-200'} shadow-sm flex flex-col h-full hover:shadow-md transition-shadow relative overflow-hidden`}
                >
                  {pkg.Popular && (
                    <div className="absolute top-0 right-0 bg-[var(--color-navy)] text-white text-[10px] uppercase tracking-widest px-4 py-1 rounded-bl-lg font-bold z-10">
                      Most Popular
                    </div>
                  )}
                  
                  {/* Poster Section */}
                  {pkg.Poster?.url ? (
                    <div className="w-full aspect-[16/9] overflow-hidden bg-gray-100">
                      <img 
                        src={`${getStrapiUrl()}${pkg.Poster.url}`} 
                        alt={pkg.Poster.alternativeText || pkg.Title} 
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      />
                    </div>
                  ) : (
                    <div className="w-full aspect-[16/9] bg-gray-100 flex items-center justify-center text-gray-400 italic text-sm">
                      Package image coming soon
                    </div>
                  )}
                  
                  <div className="p-8 flex flex-col flex-grow">
                    <div className="mb-6">
                      <h3 className="text-2xl font-light uppercase tracking-wide mb-2">{pkg.Title}</h3>
                      <p className="text-gray-600 text-sm leading-relaxed">{pkg.Description}</p>
                    </div>

                    <div className="mb-8">
                      <span className="text-3xl font-medium text-[var(--color-navy)]">{pkg.Price}</span>
                    </div>

                    <div className="flex-grow mb-10">
                      <ul className="space-y-4">
                        {parseFeatures(pkg.Features).map((feature, fIndex) => (
                          <li key={fIndex} className="flex items-start gap-3 text-sm text-gray-700">
                            <Check size={18} className="text-green-500 mt-0.5 shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <a
                      href="https://wa.me/message/BRARC5HBPTZCC1"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`block text-center py-4 rounded-full text-sm uppercase tracking-widest font-medium transition-all ${
                        pkg.Popular 
                          ? 'bg-[var(--color-navy)] text-white hover:opacity-90' 
                          : 'border border-[var(--color-navy)] text-[var(--color-navy)] hover:bg-[var(--color-navy)] hover:text-white'
                      }`}
                    >
                      Book This Package
                    </a>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-300">
              <h3 className="text-xl font-light uppercase tracking-widest mb-4">Packages Coming Soon</h3>
              <p className="text-gray-500">We are currently updating our premium dental packages. Please check back shortly.</p>
            </div>
          )}
        </div>
      </section>

      {/* FAQ / Info Section */}
      <section className="bg-white py-20 border-t border-gray-100">
        <div className="max-w-[800px] mx-auto px-5 text-center">
          <h2 className="text-3xl font-light uppercase tracking-widest mb-10">Need a Custom Package?</h2>
          <p className="text-gray-600 mb-8 leading-relaxed">
            Every smile is unique. If you have specific requirements or wish to combine treatments, our specialists are happy to create a personalized plan just for you.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-5">
            <a 
              href="/#visit-us" 
              className="px-10 py-4 border border-black rounded-full text-sm uppercase tracking-widest hover:bg-black hover:text-white transition-all"
            >
              Contact Us
            </a>
            <a 
              href="https://wa.me/message/BRARC5HBPTZCC1" 
              className="px-10 py-4 bg-[var(--color-navy)] text-white rounded-full text-sm uppercase tracking-widest hover:opacity-90 transition-all"
            >
              WhatsApp Consultation
            </a>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppFab />
    </div>
  );
}
