import { Link } from 'react-router-dom';
import { CreeperIcon, StatCard, PixelDivider } from '../../components/ui';

const FEATURES = [
  { icon: '🕸', title: 'Call Graph Viz', desc: 'See exactly how every function calls another. Interactive node graph with zoom, filter, and focus.' },
  { icon: '🤖', title: 'AI Q&A', desc: 'Ask anything about the repo in plain English. Get instant, cited answers from your codebase.' },
  { icon: '🗂', title: 'File Structure', desc: 'Navigate any repo structure with an intelligent tree view. See dependencies at a glance.' },
  { icon: '📊', title: 'Code Analytics', desc: 'Complexity scores, hotspot detection, language breakdown, and contributor impact analysis.' },
  { icon: '🔍', title: 'Function Drill', desc: 'Deep dive into any function — callers, callees, docstrings, history, and AI explanation.' },
  { icon: '🕐', title: 'Analysis History', desc: 'Every analysis is saved. Revisit, compare, and track how your codebase evolves over time.' },
];

const STEPS = [
  { n: '01', title: 'Paste GitHub URL', desc: 'Drop any public or private GitHub, GitLab, or Bitbucket URL into the analyzer.' },
  { n: '02', title: 'AI Crawls the Code', desc: 'Our engine parses every file, maps call graphs, and indexes the entire repository.' },
  { n: '03', title: 'Understand Instantly', desc: 'Explore the visual graph, ask questions, and get analytics — all in under 60 seconds.' },
];

export default function Home() {
  return (
    <div>
      {/* ── Hero ── */}
      <section style={{
        minHeight: '92vh',
        background: 'linear-gradient(180deg, var(--sky-top) 0%, var(--sky-mid) 50%, var(--stone) 100%)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        textAlign: 'center', padding: '80px 40px',
        position: 'relative', overflow: 'hidden',
      }}>
        {/* Pixel grid background */}
        <div style={{
          position: 'absolute', inset: 0, opacity: 0.08,
          backgroundImage: 'linear-gradient(var(--green-dark) 1px, transparent 1px), linear-gradient(90deg, var(--green-dark) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }} />

        {/* Floating blocks */}
        {[
          { top: '15%', left: '5%', size: 32, color: '#4ade80', delay: '0s' },
          { top: '25%', right: '8%', size: 24, color: '#92400e', delay: '1s' },
          { top: '60%', left: '10%', size: 20, color: '#15803d', delay: '2s' },
          { top: '70%', right: '6%', size: 28, color: '#22c55e', delay: '0.5s' },
          { top: '40%', left: '3%', size: 16, color: '#86efac', delay: '1.5s' },
        ].map((b, i) => (
          <div key={i} style={{
            position: 'absolute', top: b.top, left: b.left, right: b.right,
            width: b.size, height: b.size,
            background: b.color,
            boxShadow: 'inset -4px -4px 0 rgba(0,0,0,0.4), inset 4px 4px 0 rgba(255,255,255,0.15)',
            animation: `float 3s ${b.delay} ease-in-out infinite`,
            opacity: 0.6,
          }} />
        ))}

        <div style={{ position: 'relative', zIndex: 1, maxWidth: 800 }}>
          <div className="badge" style={{ marginBottom: 24, fontSize: 8 }}>
            ✦ AI-Powered Code Intelligence
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 24, animation: 'fadeUp 0.6s ease forwards' }}>
            <CreeperIcon size={56} />
          </div>

          <h1 style={{
            fontFamily: 'var(--font-pixel)',
            fontSize: 'clamp(20px, 4vw, 36px)',
            color: 'var(--green-bright)',
            textShadow: '4px 4px 0 #052e16',
            lineHeight: 1.6,
            marginBottom: 24,
            animation: 'fadeUp 0.6s 0.1s ease both',
          }}>
            UNDERSTAND ANY<br />CODEBASE INSTANTLY
          </h1>

          <p style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 17,
            color: 'var(--text-secondary)',
            lineHeight: 1.8,
            maxWidth: 600,
            margin: '0 auto 40px',
            animation: 'fadeUp 0.6s 0.2s ease both',
          }}>
            Paste a GitHub URL and get a complete AI analysis: call graphs, file structure, code complexity, and natural language Q&A — all in under 60 seconds.
          </p>

          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap', animation: 'fadeUp 0.6s 0.3s ease both' }}>
            <Link to="/signup" className="btn-primary" style={{ fontSize: 10, padding: '16px 32px' }}>
              ▶ ANALYZE FREE REPO
            </Link>
            <Link to="/features" className="btn-secondary" style={{ fontSize: 10, padding: '16px 32px' }}>
              SEE FEATURES
            </Link>
          </div>

          {/* URL input preview */}
          <div style={{
            marginTop: 48,
            display: 'flex', alignItems: 'center', gap: 0,
            maxWidth: 560, margin: '48px auto 0',
            border: '3px solid var(--border-green)',
            boxShadow: '6px 6px 0 #052e16',
            animation: 'fadeUp 0.6s 0.4s ease both',
          }}>
            <div style={{
              flex: 1,
              padding: '14px 16px',
              background: 'var(--green-deepest)',
              fontFamily: 'var(--font-vt)',
              fontSize: 18,
              color: 'var(--text-muted)',
            }}>
              github.com/your/repository<span className="animate-blink">█</span>
            </div>
            <Link to="/analyze" style={{
              padding: '14px 20px',
              background: 'var(--green-dark)',
              color: 'var(--green-bright)',
              fontFamily: 'var(--font-pixel)',
              fontSize: 8,
              textDecoration: 'none',
              whiteSpace: 'nowrap',
              borderLeft: '3px solid var(--border-green)',
            }}>
              ANALYZE →
            </Link>
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section style={{ padding: '60px 80px', background: 'var(--sky-top)', borderTop: '3px solid var(--border-green)', borderBottom: '3px solid var(--border-green)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 }}>
          <StatCard icon="🗂" label="Repos Analyzed" value="12,400+" sub="and counting" />
          <StatCard icon="⚡" label="Avg Analysis Time" value="< 60s" sub="from URL to insights" color="#fbbf24" />
          <StatCard icon="💬" label="AI Questions Answered" value="340K+" sub="across all repos" />
          <StatCard icon="🌟" label="Developer Rating" value="4.9 / 5" sub="from 2,100+ reviews" color="#a78bfa" />
        </div>
      </section>

      {/* ── Features ── */}
      <section style={{ padding: '80px' }}>
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <h2 style={{ fontFamily: 'var(--font-pixel)', fontSize: 18, color: 'var(--green-bright)', textShadow: '3px 3px 0 #052e16', marginBottom: 16 }}>
            EVERY TOOL YOU NEED
          </h2>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: 15, color: 'var(--text-secondary)' }}>
            Everything to understand a codebase you've never seen before.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
          {FEATURES.map(({ icon, title, desc }, i) => (
            <div key={i} className="card" style={{
              transition: 'all 0.15s',
              cursor: 'default',
              animation: `fadeUp 0.5s ${i * 0.08}s ease both`,
            }}
              onMouseOver={e => { e.currentTarget.style.borderColor = 'var(--green-bright)'; e.currentTarget.style.transform = 'translate(-2px,-2px)'; e.currentTarget.style.boxShadow = '6px 6px 0 #052e16'; }}
              onMouseOut={e => { e.currentTarget.style.borderColor = 'var(--border-green)'; e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = 'var(--pixel-shadow)'; }}
            >
              <div style={{ fontSize: 32, marginBottom: 14 }}>{icon}</div>
              <h3 style={{ fontFamily: 'var(--font-pixel)', fontSize: 10, color: 'var(--green-bright)', marginBottom: 12, lineHeight: 1.6 }}>{title}</h3>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.7 }}>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── How it works ── */}
      <section style={{ padding: '80px', background: 'var(--sky-top)', borderTop: '3px solid var(--border-green)' }}>
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <h2 style={{ fontFamily: 'var(--font-pixel)', fontSize: 18, color: 'var(--green-bright)', textShadow: '3px 3px 0 #052e16', marginBottom: 16 }}>
            HOW IT WORKS
          </h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32, maxWidth: 900, margin: '0 auto' }}>
          {STEPS.map(({ n, title, desc }, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <div style={{
                width: 64, height: 64, margin: '0 auto 20px',
                background: 'var(--green-deepest)',
                border: '3px solid var(--green-bright)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: 'var(--font-pixel)', fontSize: 14,
                color: 'var(--green-bright)', textShadow: '2px 2px 0 #052e16',
                boxShadow: '4px 4px 0 #052e16',
              }}>{n}</div>
              <h3 style={{ fontFamily: 'var(--font-pixel)', fontSize: 9, color: 'var(--text-primary)', marginBottom: 12, lineHeight: 1.6 }}>{title}</h3>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.7 }}>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ padding: '100px 80px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, opacity: 0.04,
          backgroundImage: 'linear-gradient(var(--green-dark) 1px, transparent 1px), linear-gradient(90deg, var(--green-dark) 1px, transparent 1px)',
          backgroundSize: '32px 32px' }} />
        <div style={{ position: 'relative' }}>
          <h2 style={{ fontFamily: 'var(--font-pixel)', fontSize: 20, color: 'var(--green-bright)', textShadow: '3px 3px 0 #052e16', marginBottom: 20, lineHeight: 1.6 }}>
            READY TO DIG IN?
          </h2>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: 16, color: 'var(--text-secondary)', marginBottom: 40, maxWidth: 500, margin: '0 auto 40px' }}>
            Start analyzing repositories for free. No credit card required.
          </p>
          <Link to="/signup" className="btn-primary" style={{ fontSize: 11, padding: '18px 48px' }}>
            ▶ START FOR FREE
          </Link>
        </div>
      </section>
    </div>
  );
}
