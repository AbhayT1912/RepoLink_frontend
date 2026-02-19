import { Link } from 'react-router-dom';
import { SectionHeader, ProgressBar } from '../../components/ui';

const FEATURES = [
  {
    icon: '🕸', title: 'Interactive Call Graph',
    desc: 'Visualize function call relationships across your entire codebase in a zoomable, filterable node graph. Color-coded by file, filterable by depth, and clickable to drill into any function.',
    bullets: ['Force-directed graph layout','Filter by module or directory','Click any node to view function detail','Export as SVG or PNG'],
  },
  {
    icon: '🤖', title: 'AI-Powered Q&A',
    desc: 'Ask any question about the repo in natural language. RepoLink searches the codebase, reads relevant files, and returns precise, cited answers.',
    bullets: ['Cite specific files and lines','Multi-turn conversation context','Understands architecture patterns','Works on 50+ languages'],
  },
  {
    icon: '🗂', title: 'Smart File Structure',
    desc: 'An intelligent tree view that understands your project. Not just a file browser — it highlights important entry points, flags dead code, and groups related files.',
    bullets: ['Highlight entry points and exports','Flag unused files','Group by domain or type','Search across all filenames'],
  },
  {
    icon: '📊', title: 'Code Analytics Dashboard',
    desc: 'Deep metrics on complexity, maintainability, and code health. Identify hotspots before they become problems.',
    bullets: ['Cyclomatic complexity per function','Lines of code over time','Language & framework breakdown','Contributor impact heatmap'],
  },
  {
    icon: '🔍', title: 'Function Deep Dive',
    desc: 'Click any function in the graph or structure view to get a complete profile: callers, callees, parameters, return type, AI-generated explanation, and change history.',
    bullets: ['Full caller/callee tree','Parameter & return type inference','AI-generated docstrings','Git blame & history integration'],
  },
  {
    icon: '🕐', title: 'Analysis History',
    desc: 'Every analysis is saved and versioned. Track how your codebase changes over time, compare two snapshots, or revisit a previous analysis instantly.',
    bullets: ['Infinite analysis history','Side-by-side snapshot comparison','Shareable analysis links','Team-visible history'],
  },
];

const LANGS = [
  { name: 'TypeScript / JavaScript', pct: 98 },
  { name: 'Python', pct: 95 },
  { name: 'Rust', pct: 88 },
  { name: 'Go', pct: 92 },
  { name: 'Java / Kotlin', pct: 85 },
  { name: 'C / C++', pct: 78 },
  { name: 'Ruby / Rails', pct: 82 },
  { name: 'PHP', pct: 76 },
];

export default function Features() {
  return (
    <div>
      {/* Header */}
      <section style={{ padding: '80px 80px 60px', background: 'var(--sky-top)', borderBottom: '3px solid var(--border-green)', textAlign: 'center' }}>
        <div className="badge" style={{ marginBottom: 20 }}>✦ Full Feature List</div>
        <h1 style={{ fontFamily: 'var(--font-pixel)', fontSize: 26, color: 'var(--green-bright)', textShadow: '4px 4px 0 #052e16', lineHeight: 1.6, marginBottom: 20 }}>
          EVERYTHING IN THE BOX
        </h1>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: 16, color: 'var(--text-secondary)', maxWidth: 560, margin: '0 auto' }}>
          RepoLink is the most complete AI code analysis platform for developers who need to understand unfamiliar codebases fast.
        </p>
      </section>

      {/* Features list */}
      <section style={{ padding: '80px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 64 }}>
          {FEATURES.map(({ icon, title, desc, bullets }, i) => (
            <div key={i} style={{
              display: 'grid',
              gridTemplateColumns: i % 2 === 0 ? '1fr 1fr' : '1fr 1fr',
              gap: 48, alignItems: 'center',
              flexDirection: i % 2 !== 0 ? 'row-reverse' : 'row',
            }}>
              {/* Text side */}
              <div style={{ order: i % 2 !== 0 ? 2 : 1 }}>
                <div style={{ fontSize: 40, marginBottom: 16 }}>{icon}</div>
                <h2 style={{ fontFamily: 'var(--font-pixel)', fontSize: 13, color: 'var(--green-bright)', textShadow: '2px 2px 0 #052e16', marginBottom: 16, lineHeight: 1.6 }}>
                  {title}
                </h2>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 20 }}>
                  {desc}
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {bullets.map((b, j) => (
                    <div key={j} style={{ display: 'flex', alignItems: 'center', gap: 10, fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--text-secondary)' }}>
                      <span style={{ color: 'var(--green-bright)', flexShrink: 0 }}>▸</span>
                      {b}
                    </div>
                  ))}
                </div>
              </div>

              {/* Visual side */}
              <div style={{ order: i % 2 !== 0 ? 1 : 2 }}>
                <div className="card" style={{ height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: 'var(--sky-top)', fontSize: 72,
                  boxShadow: '6px 6px 0 #052e16',
                }}>
                  {icon}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Language support */}
      <section style={{ padding: '80px', background: 'var(--sky-top)', borderTop: '3px solid var(--border-green)' }}>
        <SectionHeader title="LANGUAGE COVERAGE" sub="RepoLink parses, indexes, and understands 50+ languages. Here are our top-tier supported languages." centered />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, maxWidth: 800, margin: '0 auto' }}>
          {LANGS.map(({ name, pct }) => (
            <ProgressBar key={name} label={name} value={pct} max={100} />
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '80px', textAlign: 'center' }}>
        <h2 style={{ fontFamily: 'var(--font-pixel)', fontSize: 16, color: 'var(--green-bright)', textShadow: '3px 3px 0 #052e16', marginBottom: 20, lineHeight: 1.6 }}>
          READY TO EXPLORE?
        </h2>
        <div style={{ display: 'flex', gap: 16, justifyContent: 'center' }}>
          <Link to="/signup" className="btn-primary">▶ Start Free Trial</Link>
          <Link to="/pricing" className="btn-secondary">View Pricing</Link>
        </div>
      </section>
    </div>
  );
}
