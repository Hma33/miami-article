import { useEffect, useState } from 'react';
import { ChevronDown, List } from 'lucide-react';

interface HeadingItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  headings: HeadingItem[];
}

export function TableOfContents({ headings }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('');
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    if (headings.length === 0) return;

    // Use IntersectionObserver to track the active heading while scrolling
    const observer = new IntersectionObserver(
      (entries) => {
        // Find all intersecting items
        const visibleEntries = entries.filter((entry) => entry.isIntersecting);
        if (visibleEntries.length > 0) {
          // Sort by intersection ratio or prioritize the one closest to the top
          // We default to the first element in the viewport
          setActiveId(visibleEntries[0].target.id);
        }
      },
      {
        // Margin adjusted for the top sticky header (~90px)
        rootMargin: '-100px 0px -70% 0px',
        threshold: 0.1,
      }
    );

    headings.forEach((heading) => {
      const element = document.getElementById(heading.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      headings.forEach((heading) => {
        const element = document.getElementById(heading.id);
        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, [headings]);

  if (!headings || headings.length === 0) return null;

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -120; // Exact offset of sticky header + spacing
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
      setActiveId(id);
    }
  };

  return (
    <>
      {/* Mobile/Tablet Accordion Index (lg:hidden) */}
      <div className="lg:hidden bg-[#f8f9fa] rounded-[24px] border-2 border-[var(--color-navy)]/5 p-6 mb-10 transition-all duration-300">
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="flex items-center justify-between w-full text-[var(--color-navy)] font-semibold text-base uppercase tracking-widest outline-none"
        >
          <span className="flex items-center gap-2.5">
            <List size={18} className="text-[var(--color-navy)]/60" />
            Article Index
          </span>
          <ChevronDown
            className={`transition-transform duration-300 text-[var(--color-navy)]/60 ${
              isMobileOpen ? 'rotate-180' : ''
            }`}
            size={18}
          />
        </button>
        
        {isMobileOpen && (
          <div className="mt-4 pt-4 border-t border-[var(--color-navy)]/10 space-y-3.5 animate-in fade-in duration-300">
            {headings.map((heading) => {
              const isActive = activeId === heading.id;
              const indentClass =
                heading.level === 3 ? 'pl-6 text-[14px]' :
                heading.level === 4 ? 'pl-10 text-[13px]' :
                'pl-0 text-[15px]';

              return (
                <a
                  key={heading.id}
                  href={`#${heading.id}`}
                  onClick={(e) => {
                    handleScroll(e, heading.id);
                    setIsMobileOpen(false);
                  }}
                  className={`block transition-all duration-200 font-medium leading-snug ${indentClass} ${
                    isActive
                      ? 'text-[var(--color-navy)] font-semibold'
                      : 'text-[var(--color-navy)]/60 hover:text-[var(--color-navy)]'
                  }`}
                >
                  {heading.text}
                </a>
              );
            })}
          </div>
        )}
      </div>

      {/* Desktop Sticky Index Sidebar (lg:block) */}
      <div className="hidden lg:block bg-[#f8f9fa] rounded-[32px] border-2 border-[var(--color-navy)]/5 p-8 sticky top-36 transition-all duration-300">
        <h3 className="text-sm uppercase tracking-widest font-semibold text-[var(--color-navy)] mb-6 pb-4 border-b border-[var(--color-navy)]/10 flex items-center gap-2.5">
          <List size={18} className="text-[var(--color-navy)]/40" />
          Article Index
        </h3>
        <nav className="space-y-4">
          {headings.map((heading) => {
            const isActive = activeId === heading.id;
            const indentClass =
              heading.level === 3 ? 'pl-6 text-[14px]' :
              heading.level === 4 ? 'pl-10 text-[13px]' :
              'pl-0 text-[15px]';

            return (
              <a
                key={heading.id}
                href={`#${heading.id}`}
                onClick={(e) => handleScroll(e, heading.id)}
                className={`block transition-all duration-300 font-medium leading-snug hover:text-[var(--color-navy)] ${indentClass} ${
                  isActive
                    ? 'text-[var(--color-navy)] border-l-2 border-[var(--color-navy)] pl-3.5 -ml-3.5 font-semibold translate-x-1'
                    : 'text-[var(--color-navy)]/50 border-l border-transparent hover:pl-1 hover:-ml-1'
                }`}
              >
                {heading.text}
              </a>
            );
          })}
        </nav>
      </div>
    </>
  );
}
