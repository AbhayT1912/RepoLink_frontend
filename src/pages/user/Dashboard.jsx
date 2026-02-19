import { Link } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import { StatCard, Badge, SectionHeader } from '../../components/ui';

const REPOS = [
  { id: 'react-core', name: 'facebook/react', lang: 'JavaScript', stars: '220k', files: 1240, analyzed: '2h ago', status: 'ready' },
  { id: 'next-js', name: 'vercel/next.js', lang: 'TypeScript', stars: '118k', files: 3820, analyzed: '1d ago', status: 'ready' },
  { id: 'rust-lang', name: 'rust-lang/rust', lang: 'Rust', stars: '94k', files: 8900, analyzed: '3d ago', status: 'ready' },
  { id: 'tailwind', name: 'tailwindlabs/tailwindcss', lang: 'JavaScript', stars: '79k', files: 340, analyzed: '5d ago', status: 'ready' },
];

const LANG_COLORS = { JavaScript: '#fbbf24', TypeScript: '#60a5fa', Rust: '#f97316', Go: '#34d399', Python: '#a78bfa' };

const ACTIVITY = [
  { icon: '🔍', text: 'Analyzed facebook/react', time: '2h ago' },
  { icon: '💬', text: 'Asked 14 questions on vercel/next.js', time: '1d ago' },
  { icon: '📊', text: 'Viewed analytics for rust-lang/rust', time: '3d ago' },
  { icon: '🕸', text: 'Explored call graph for tailwindcss', time: '5d ago' },
];

export default function Dashboard() {
  const { user } = useUser();
  const firstName = user?.firstName || user?.username || 'there';
  return (
    <div style={{ animation: 'fadeIn 0.4s ease' }}>
      {/* Welcome header */}
      <div style={{ marginBottom: 32, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-pixel)', fontSize: 16, color: 'var(--green-bright)', textShadow: '3px 3px 0 #052e16', marginBottom: 8 }}>
            DASHBOARD
          </h1>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: 14, color: 'var(--text-muted)' }}>
            Welcome back, {firstName}. You have 420 credits remaining.
          </p>
        </div>
        <Link to="/analyze" className="btn-primary" style={{ fontSize: 8 }}>
          + Analyze New Repo
        </Link>
      </div>

      {/* Stats row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20, marginBottom: 40 }}>
        <StatCard icon="📦" label="Repos Analyzed" value="4" sub="this month" />
        <StatCard icon="💬" label="AI Questions" value="87" sub="across all repos" color="#60a5fa" />
        <StatCard icon="⚡" label="Credits Left" value="420" sub="of 500 monthly" color="#fbbf24" />
        <StatCard icon="🕐" label="Analyses Saved" value="12" sub="total history" color="#a78bfa" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 28 }}>
        {/* Repos table */}
        <div>
          <SectionHeader title="YOUR REPOSITORIES" sub="Recently analyzed codebases" />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {REPOS.map(({ id, name, lang, stars, files, analyzed, status }) => (
              <Link key={id} to={`/${id}`} style={{ textDecoration: 'none' }}>
                <div className="card" style={{ display: 'flex', alignItems: 'center', gap: 16, transition: 'all 0.15s', cursor: 'pointer', padding: '16px 20px' }}
                  onMouseOver={e => { e.currentTarget.style.borderColor = 'var(--green-bright)'; e.currentTarget.style.transform = 'translate(-2px,-2px)'; e.currentTarget.style.boxShadow = '6px 6px 0 #052e16'; }}
                  onMouseOut={e => { e.currentTarget.style.borderColor = 'var(--border-green)'; e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = 'var(--pixel-shadow)'; }}
                >
                  <div style={{
                    width: 40, height: 40, flexShrink: 0,
                    background: 'var(--green-deepest)',
                    border: '2px solid var(--border-green)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontFamily: 'var(--font-pixel)', fontSize: 12, color: 'var(--green-bright)',
                  }}>
                    {name[0].toUpperCase()}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 14, color: 'var(--text-primary)', marginBottom: 4 }}>{name}</div>
                    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                      <span style={{ fontFamily: 'var(--font-pixel)', fontSize: 7, color: LANG_COLORS[lang] || 'var(--text-secondary)' }}>
                        ● {lang}
                      </span>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-muted)' }}>
                        ⭐ {stars}
                      </span>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-muted)' }}>
                        🗂 {files.toLocaleString()} files
                      </span>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <Badge variant="success">{status}</Badge>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-muted)', marginTop: 6 }}>{analyzed}</div>
                  </div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 18, color: 'var(--text-muted)' }}>→</div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Activity feed */}
        <div>
          <SectionHeader title="RECENT ACTIVITY" />
          <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
            {ACTIVITY.map(({ icon, text, time }, i) => (
              <div key={i} style={{
                display: 'flex', gap: 12, alignItems: 'flex-start',
                padding: '14px 16px',
                borderBottom: i < ACTIVITY.length - 1 ? '1px solid var(--border-green)' : 'none',
              }}>
                <span style={{ fontSize: 18 }}>{icon}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--text-secondary)', marginBottom: 4, lineHeight: 1.5 }}>{text}</div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-muted)' }}>{time}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Quick actions */}
          <div style={{ marginTop: 20 }}>
            <SectionHeader title="QUICK ACTIONS" />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                { to: '/analyze', icon: '🔍', label: 'Analyze a new repo' },
                { to: '/profile', icon: '👤', label: 'Edit profile' },
                { to: '/settings', icon: '⚙', label: 'Account settings' },
              ].map(({ to, icon, label }) => (
                <Link key={to} to={to} className="btn-ghost" style={{ justifyContent: 'flex-start', border: '2px solid var(--border-green)' }}>
                  <span>{icon}</span>{label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}