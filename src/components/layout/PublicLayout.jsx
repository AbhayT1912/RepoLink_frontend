import { Outlet, Link, NavLink } from 'react-router-dom';
import { CreeperIcon } from '../ui';

const navLinks = [
  { to: '/features', label: 'Features' },
  { to: '/use-cases', label: 'Use Cases' },
  { to: '/pricing', label: 'Pricing' },
  { to: '/about', label: 'About' },
];

export default function PublicLayout() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Navbar */}
      <nav style={{
        position: 'sticky', top: 0, zIndex: 100,
        background: 'rgba(12, 26, 46, 0.95)',
        backdropFilter: 'blur(8px)',
        borderBottom: '3px solid var(--border-green)',
        boxShadow: '0 4px 0 #052e16',
        padding: '0 40px',
        height: 'var(--header-height)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        {/* Logo */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 12, textDecoration: 'none' }}>
          <CreeperIcon size={28} />
          <div>
            <div style={{ fontFamily: 'var(--font-pixel)', fontSize: 11, color: 'var(--green-bright)', textShadow: '2px 2px 0 #052e16', lineHeight: 1 }}>
              RepoLink
            </div>
            <div style={{ fontFamily: 'var(--font-vt)', fontSize: 14, color: 'var(--text-muted)', lineHeight: 1, marginTop: 2 }}>
              AI Repo Analyzer
            </div>
          </div>
        </Link>

        {/* Nav links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          {navLinks.map(({ to, label }) => (
            <NavLink key={to} to={to} className="btn-ghost" style={({ isActive }) => ({
              color: isActive ? 'var(--green-bright)' : 'var(--text-secondary)',
              borderColor: isActive ? 'var(--border-green)' : 'transparent',
              background: isActive ? 'var(--green-deepest)' : 'transparent',
            })}>
              {label}
            </NavLink>
          ))}
        </div>

        {/* CTA */}
        <div style={{ display: 'flex', gap: 12 }}>
          <Link to="/login" className="btn-ghost">Login</Link>
          <Link to="/signup" className="btn-primary">▶ Get Started</Link>
        </div>
      </nav>

      {/* Page content */}
      <main style={{ flex: 1 }}>
        <Outlet />
      </main>

      {/* Footer */}
      <footer style={{
        borderTop: '3px solid var(--border-green)',
        background: 'var(--sky-top)',
        padding: '48px 80px 32px',
      }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 48, marginBottom: 40 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <CreeperIcon size={24} />
              <span style={{ fontFamily: 'var(--font-pixel)', fontSize: 10, color: 'var(--green-bright)' }}>RepoLink</span>
            </div>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.7, maxWidth: 280 }}>
              Understand any codebase instantly. AI-powered analysis, call graphs, and natural language Q&A for your repositories.
            </p>
          </div>
          {[
            { title: 'Product', links: [['Features','/features'],['Use Cases','/use-cases'],['Pricing','/pricing']] },
            { title: 'Company', links: [['About','/about'],['Contact','/contact']] },
            { title: 'Legal', links: [['Privacy','/privacy'],['Terms','/terms'],['Security','/security']] },
          ].map(({ title, links }) => (
            <div key={title}>
              <div style={{ fontFamily: 'var(--font-pixel)', fontSize: 8, color: 'var(--text-secondary)', marginBottom: 16, letterSpacing: 1 }}>
                {title}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {links.map(([label, to]) => (
                  <Link key={to} to={to} style={{ fontFamily: 'var(--font-mono)', fontSize: 14, color: 'var(--text-muted)', textDecoration: 'none', transition: 'color 0.15s' }}
                    onMouseOver={e => e.target.style.color = 'var(--green-bright)'}
                    onMouseOut={e => e.target.style.color = 'var(--text-muted)'}
                  >
                    {label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div style={{ borderTop: '2px solid var(--border-green)', paddingTop: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-muted)' }}>
            © 2026 RepoLink. Built block by block.
          </span>
          <div style={{ display: 'flex', gap: 6 }}>
            {['#4ade80','#22c55e','#15803d','#86efac','#15803d','#22c55e','#4ade80'].map((c,i) => (
              <div key={i} style={{ width: 8, height: 8, background: c }} />
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
