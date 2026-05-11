import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { WhatsAppFab } from '../components/WhatsAppFab';
import { fetchAPI, getStrapiUrl } from '../utils/api';
import { ArrowLeft } from 'lucide-react';

interface Article {
  id: number;
  documentId: string;
  Title: string;
  Content: any[];
  Image?: {
    url: string;
    alternativeText: string | null;
  };
}

export function ArticleDetailPage() {
  const { documentId } = useParams<{ documentId: string }>();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadArticle() {
      try {
        // Fetch the specific article by documentId
        const response = await fetchAPI(`/articles/${documentId}`, { populate: '*' });
        setArticle(response.data);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch article');
      } finally {
        setLoading(false);
      }
    }

    if (documentId) {
      loadArticle();
    }
  }, [documentId]);

  const renderStrapiBlocks = (blocks: any[]) => {
    if (!blocks || !Array.isArray(blocks)) return null;
    return blocks.map((block, index) => {
      switch (block.type) {
        case 'paragraph':
          return (
            <p key={index} className="mb-6 text-[18px] text-[var(--color-navy)]/80 leading-relaxed">
              {block.children.map((child: any, cIndex: number) => {
                let text = child.text;
                if (child.bold) return <strong key={cIndex} className="font-semibold text-[var(--color-navy)]">{text}</strong>;
                if (child.italic) return <em key={cIndex}>{text}</em>;
                if (child.underline) return <u key={cIndex}>{text}</u>;
                if (child.strikethrough) return <del key={cIndex}>{text}</del>;
                if (child.code) return <code key={cIndex} className="bg-gray-100 text-gray-800 px-1.5 py-0.5 rounded text-sm">{text}</code>;
                if (child.type === 'link') {
                  return (
                    <a key={cIndex} href={child.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline transition-colors">
                      {child.children[0]?.text}
                    </a>
                  );
                }
                return <span key={cIndex}>{text}</span>;
              })}
            </p>
          );
        case 'heading':
          const HeadingTag = `h${block.level}` as keyof JSX.IntrinsicElements;
          const classNames = {
            1: 'text-4xl mt-12 mb-6',
            2: 'text-3xl mt-10 mb-5',
            3: 'text-2xl mt-8 mb-4',
            4: 'text-xl mt-6 mb-3',
            5: 'text-lg mt-4 mb-2',
            6: 'text-base mt-4 mb-2',
          };
          return (
            <HeadingTag key={index} className={`${classNames[block.level as 1|2|3|4|5|6] || 'text-2xl'} font-medium text-[var(--color-navy)]`}>
              {block.children.map((child: any) => child.text).join('')}
            </HeadingTag>
          );
        case 'list':
          const ListTag = block.format === 'ordered' ? 'ol' : 'ul';
          const listClassName = block.format === 'ordered' ? 'list-decimal ml-6 mb-6' : 'list-disc ml-6 mb-6';
          return (
            <ListTag key={index} className={`${listClassName} text-[18px] text-[var(--color-navy)]/80 space-y-2`}>
              {block.children.map((item: any, iIndex: number) => (
                <li key={iIndex} className="pl-2">
                  {item.children.map((child: any) => child.text).join('')}
                </li>
              ))}
            </ListTag>
          );
        case 'quote':
          return (
            <blockquote key={index} className="border-l-4 border-[var(--color-navy)]/30 bg-[var(--color-navy)]/5 p-6 rounded-r-lg my-8 text-[19px] italic text-[var(--color-navy)]/70">
              {block.children.map((child: any) => child.text).join('')}
            </blockquote>
          );
        case 'image':
          if (block.image) {
            return (
              <figure key={index} className="my-10">
                <img 
                  src={`${getStrapiUrl()}${block.image.url}`} 
                  alt={block.image.alternativeText || ''} 
                  className="rounded-2xl w-full h-auto shadow-lg"
                />
                {block.image.caption && (
                  <figcaption className="text-center text-sm text-gray-500 mt-3">{block.image.caption}</figcaption>
                )}
              </figure>
            );
          }
          return null;
        default:
          return (
            <div key={index} className="mb-4">
              {block.children?.map((child: any) => child.text).join('')}
            </div>
          );
      }
    });
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      
      <main className="flex-grow py-24">
        <div className="max-w-[800px] mx-auto px-6 md:px-8">
          
          <Link to="/articles" className="inline-flex items-center text-[var(--color-navy)]/60 hover:text-[var(--color-navy)] mb-12 transition-colors group">
            <ArrowLeft size={20} className="mr-2 group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm uppercase tracking-widest font-medium">Back to Articles</span>
          </Link>

          {loading ? (
            <div className="text-center py-20">
              <div className="w-10 h-10 border-4 border-[var(--color-navy)]/20 border-t-[var(--color-navy)] rounded-full animate-spin mx-auto mb-6"></div>
              <p className="text-[19px] text-[var(--color-navy)]/70">Loading article...</p>
            </div>
          ) : error || !article ? (
            <div className="text-center py-20 bg-red-50 rounded-2xl">
              <p className="text-[19px] text-red-500 mb-4">{error || 'Article not found'}</p>
              <Link to="/articles" className="text-[var(--color-navy)] underline">Return to articles</Link>
            </div>
          ) : (
            <article className="animate-in fade-in slide-in-from-bottom-4 duration-700">
              <header className="mb-12">
                <h1 className="text-4xl md:text-5xl font-medium text-[var(--color-navy)] leading-tight mb-8">
                  {article.Title}
                </h1>
                
                {article.Image?.url && (
                  <div className="w-full aspect-[21/9] md:aspect-[21/9] rounded-[32px] overflow-hidden bg-gray-100 mb-12 shadow-sm">
                    <img 
                      src={`${getStrapiUrl()}${article.Image.url}`} 
                      alt={article.Image.alternativeText || article.Title} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </header>

              <div className="prose prose-lg max-w-none">
                {renderStrapiBlocks(article.Content)}
              </div>
            </article>
          )}

        </div>
      </main>

      <Footer />
      <WhatsAppFab />
    </div>
  );
}
