import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { WhatsAppFab } from '../components/WhatsAppFab';
import { fetchAPI, getStrapiUrl } from '../utils/api';
import { SEO } from '../components/SEO';

interface Article {
  id: number;
  documentId?: string;
  Title: string;
  Content: any[];
  Image?: {
    url: string;
    alternativeText: string | null;
  };
}

export function ArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadArticles() {
      try {
        const response = await fetchAPI('/articles', { populate: '*' });
        setArticles(response.data);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch articles');
      } finally {
        setLoading(false);
      }
    }

    loadArticles();
  }, []);

  // Helper to extract a short preview from Strapi blocks content
  const extractPreview = (contentBlocks: any[]) => {
    if (!contentBlocks || !Array.isArray(contentBlocks)) return "Click to read more...";

    for (const block of contentBlocks) {
      if (block.type === 'paragraph' && block.children && block.children.length > 0) {
        const text = block.children.map((child: any) => child.text).join(' ');
        return text.length > 100 ? text.substring(0, 100) + '...' : text;
      }
    }
    return "Click to read more...";
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <SEO 
        title="Articles & Health Insights"
        description="Stay up to date with the latest dental care tips, expert articles, and health insights from the specialists at Miami Dubai Clinic."
        keywords="dental clinic articles, oral health tips, Miami Dubai Clinic blog, dental advice dubai"
      />
      <Header />

      <main className="flex-grow py-32">
        <div className="max-w-[1200px] mx-auto px-8">
          <div className="text-center mb-20">
            <h1 className="mb-6 text-[var(--color-navy)]">Articles</h1>
            <div className="w-16 h-1 bg-[var(--color-navy)] mx-auto mb-8"></div>
            <p className="text-[19px] text-[var(--color-navy)]/70 max-w-[600px] mx-auto">
              Stay tuned for our latest dental health tips, news, and insights.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {loading ? (
              <div className="col-span-full text-center py-10">
                <p className="text-[19px] text-[var(--color-navy)]/70">Loading articles...</p>
              </div>
            ) : error ? (
              <div className="col-span-full text-center py-10">
                <p className="text-[19px] text-red-500">{error}</p>
              </div>
            ) : articles && articles.length > 0 ? (
              articles.map((article) => (
                <div key={article.id} className="bg-[#f8f9fa] rounded-[24px] p-0 text-center border-2 border-[var(--color-navy)]/5 transition-transform hover:-translate-y-2 duration-300 overflow-hidden flex flex-col">
                  {article.Image?.url ? (
                    <div className="w-full h-48 bg-gray-200">
                      <img
                        src={`${getStrapiUrl()}${article.Image.url}`}
                        alt={article.Image.alternativeText || article.Title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-full h-48 bg-gray-200 flex items-center justify-center text-[var(--color-navy)]/40">
                      No Image Available
                    </div>
                  )}
                  <div className="p-10 flex flex-col flex-grow items-center">
                    <h3 className="text-[22px] font-medium text-[var(--color-navy)] mb-4">{article.Title || 'Untitled'}</h3>
                    <p className="text-[15px] text-[var(--color-navy)]/70 leading-relaxed mb-6">
                      {extractPreview(article.Content)}
                    </p>
                    {article.documentId && (
                      <Link to={`/articles/${article.documentId}`} className="mt-auto text-[var(--color-navy)] font-semibold border-b border-[var(--color-navy)] pb-1 hover:opacity-70 transition-opacity">
                        Read Article
                      </Link>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-[#f8f9fa] rounded-[24px] p-10 text-center border-2 border-[var(--color-navy)]/5 col-span-full">
                <h3 className="text-[22px] font-medium text-[var(--color-navy)] mb-4">Coming Soon</h3>
                <p className="text-[15px] text-[var(--color-navy)]/70 leading-relaxed">
                  We are working on bringing you valuable content. Check back later!
                </p>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
      <WhatsAppFab />
    </div>
  );
}
