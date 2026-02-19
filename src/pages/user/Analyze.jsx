import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SectionHeader, Loader } from '../../components/ui';

const EXAMPLES = [
  'https://github.com/facebook/react',
  'https://github.com/vercel/next.js',
  'https://github.com/rust-lang/rust',
  'https://github.com/tailwindlabs/tailwindcss',
];

const STEPS = [
  { icon: '🌐', label: 'Fetching repository metadata...' },
  { icon: '🗂', label: 'Parsing file structure...' },
  { icon: '🔍', label: 'Extracting function signatures...' },
  { icon: '🕸', label: 'Building call graph...' },
  { icon: '🤖', label: 'Running AI analysis...' },
  { icon: '✅', label: 'Analysis complete!' },
];

export default function Analyze() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(0);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!url.trim()) return;

    setLoading(true);
    setStep(0);

    // Simulate analysis steps
    for (let i = 0; i < STEPS.length; i++) {
      await new Promise(r => setTimeout(r, 700));
      setStep(i);
    }

    // Extract repo name for ID (demo)
    const parts = url.replace('https://github.com/', '').split('/');
    const repoId = parts.slice(0, 2).join('-').replace(/[^a-z0-9-]/gi, '-') || 'my-repo';
    await new Promise(r => setTimeout(r, 600));
    navigate(`/${repoId}`);
  };

  return (
    <div style={{ animation: 'fadeIn 0.4s ease', maxWidth: 720, margin: '0 auto' }}>
      <SectionHeader
        title="ANALYZE A REPOSITORY"
        sub="Paste any GitHub, GitLab, or Bitbucket URL to begin AI analysis."
      />

      {!loading ? (
        <>
          {/* URL form */}
          <form onSubmit={handleSubmit}>
            <div className="card" style={{ padding: 32 }}>
              <label className="field-label" htmlFor="repo-url">REPOSITORY URL</label>
              <div style={{ display: 'flex', gap: 0, marginTop: 0 }}>
                <input
                  id="repo-url"
                  type="url"
                  value={url}
                  onChange={e => setUrl(e.target.value)}
                  placeholder="https://github.com/owner/repository"
                  className="field-input"
                  style={{ flex: 1, borderRight: 'none' }}
                  required
                />
                <button type="submit" className="btn-primary" style={{ fontSize: 8, whiteSpace: 'nowrap', borderLeft: '3px solid var(--green-bright)' }}>
                  ▶ ANALYZE
                </button>
              </div>

              {/* Options */}
              <div style={{ marginTop: 24, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div>
                  <label className="field-label" htmlFor="branch">BRANCH (optional)</label>
                  <input id="branch" type="text" placeholder="main" className="field-input" />
                </div>
                <div>
                  <label className="field-label" htmlFor="depth">ANALYSIS DEPTH</label>
                  <select id="depth" className="field-input" style={{ fontFamily: 'var(--font-vt)', fontSize: 20 }}>
                    <option>Standard</option>
                    <option>Deep</option>
                    <option>Quick</option>
                  </select>
                </div>
              </div>

              <div style={{ marginTop: 16, display: 'flex', gap: 12, alignItems: 'center' }}>
                <input type="checkbox" id="private" style={{ accentColor: 'var(--green-bright)', width: 16, height: 16 }} />
                <label htmlFor="private" style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--text-secondary)', cursor: 'pointer' }}>
                  Private repository (requires GitHub token in settings)
                </label>
              </div>
            </div>
          </form>

          {/* Examples */}
          <div style={{ marginTop: 28 }}>
            <div style={{ fontFamily: 'var(--font-pixel)', fontSize: 8, color: 'var(--text-muted)', marginBottom: 14, letterSpacing: 1 }}>
              ▸ TRY AN EXAMPLE
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {EXAMPLES.map((ex) => (
                <button key={ex} onClick={() => setUrl(ex)} style={{
                  background: 'var(--green-deepest)',
                  border: '2px solid var(--border-green)',
                  color: 'var(--green-bright)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: 13,
                  padding: '10px 16px',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.15s',
                  boxShadow: '2px 2px 0 #052e16',
                }}
                  onMouseOver={e => { e.currentTarget.style.borderColor = 'var(--green-bright)'; e.currentTarget.style.background = 'var(--green-deeper)'; }}
                  onMouseOut={e => { e.currentTarget.style.borderColor = 'var(--border-green)'; e.currentTarget.style.background = 'var(--green-deepest)'; }}
                >
                  ↗ {ex}
                </button>
              ))}
            </div>
          </div>

          {/* Info cards */}
          <div style={{ marginTop: 32, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
            {[
              { icon: '⚡', title: '< 60 seconds', desc: 'Average analysis time' },
              { icon: '🔒', title: 'Privacy first', desc: 'Your code is never stored' },
              { icon: '🌍', title: '50+ languages', desc: 'We parse almost everything' },
            ].map(({ icon, title, desc }) => (
              <div key={title} style={{ textAlign: 'center', padding: '20px 16px', background: 'var(--sky-top)', border: '2px solid var(--border-green)' }}>
                <div style={{ fontSize: 28, marginBottom: 8 }}>{icon}</div>
                <div style={{ fontFamily: 'var(--font-pixel)', fontSize: 8, color: 'var(--green-bright)', marginBottom: 6 }}>{title}</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-muted)' }}>{desc}</div>
              </div>
            ))}
          </div>
        </>
      ) : (
        /* Loading state */
        <div className="card" style={{ padding: 48, textAlign: 'center' }}>
          <div style={{ fontFamily: 'var(--font-pixel)', fontSize: 10, color: 'var(--green-bright)', marginBottom: 32, textShadow: '2px 2px 0 #052e16' }}>
            ANALYZING REPOSITORY...
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 400, margin: '0 auto 40px', textAlign: 'left' }}>
            {STEPS.map(({ icon, label }, i) => (
              <div key={i} style={{
                display: 'flex', gap: 12, alignItems: 'center',
                fontFamily: 'var(--font-mono)', fontSize: 14,
                color: i <= step ? 'var(--text-primary)' : 'var(--text-dim)',
                transition: 'color 0.3s',
              }}>
                <span style={{ fontSize: 20 }}>{i < step ? '✅' : i === step ? icon : '◻'}</span>
                {label}
                {i === step && i < STEPS.length - 1 && (
                  <span style={{ animation: 'blink 0.5s step-end infinite', color: 'var(--green-bright)' }}>█</span>
                )}
              </div>
            ))}
          </div>

          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-muted)' }}>
            {url}
          </div>
        </div>
      )}
    </div>
  );
}
