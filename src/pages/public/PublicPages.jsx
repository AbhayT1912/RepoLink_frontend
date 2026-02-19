// ─── UseCases ────────────────────────────────────────────────────────────────
import { Link } from 'react-router-dom';
import { SectionHeader, PixelCard } from '../../components/ui';

const CASES = [
  {
    icon: '🧑‍💼', role: 'New Team Member',
    headline: 'Onboard in hours, not weeks',
    desc: 'Get dropped into a 200k line codebase? RepoLink maps the architecture, explains key modules, and answers your "wait, what does THIS do?" questions instantly.',
    tags: ['Onboarding', 'Architecture'],
  },
  {
    icon: '🔍', role: 'Code Reviewer',
    headline: 'Review PRs with full context',
    desc: 'Before reviewing a pull request, understand exactly which functions are affected, what calls them, and what the blast radius of a change is.',
    tags: ['Pull Requests', 'Impact Analysis'],
  },
  {
    icon: '🐛', role: 'Bug Hunter',
    headline: 'Trace bugs through call graphs',
    desc: 'Follow a bug upstream through callers and callees. RepoLink makes it trivial to trace the entire execution path from symptom to root cause.',
    tags: ['Debugging', 'Call Graph'],
  },
  {
    icon: '📦', role: 'OSS Contributor',
    headline: 'Contribute to open source confidently',
    desc: 'Before opening a PR on a large open source project, understand the conventions, architecture, and how your change fits into the whole.',
    tags: ['Open Source', 'Contribution'],
  },
  {
    icon: '📚', role: 'Tech Lead / Architect',
    headline: 'Get a bird\'s eye view',
    desc: 'Use analytics and call graphs to identify technical debt hotspots, over-coupled modules, and candidates for refactoring — backed by data.',
    tags: ['Architecture', 'Tech Debt'],
  },
  {
    icon: '🎓', role: 'Student / Learner',
    headline: 'Learn from real codebases',
    desc: 'Study how production systems are built. Ask AI to explain patterns, walk through algorithms, and understand real-world engineering decisions.',
    tags: ['Learning', 'Education'],
  },
];

export function UseCases() {
  return (
    <div>
      <section style={{ padding: '80px', background: 'var(--sky-top)', borderBottom: '3px solid var(--border-green)', textAlign: 'center' }}>
        <h1 style={{ fontFamily: 'var(--font-pixel)', fontSize: 22, color: 'var(--green-bright)', textShadow: '4px 4px 0 #052e16', marginBottom: 20, lineHeight: 1.6 }}>
          WHO IS THIS FOR?
        </h1>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: 16, color: 'var(--text-secondary)', maxWidth: 560, margin: '0 auto' }}>
          RepoLink is built for every developer who has ever stared at an unfamiliar codebase and thought "where do I even start?"
        </p>
      </section>

      <section style={{ padding: '80px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 28 }}>
          {CASES.map(({ icon, role, headline, desc, tags }, i) => (
            <div key={i} className="card" style={{ transition: 'all 0.15s', animation: `fadeUp 0.5s ${i * 0.08}s ease both` }}
              onMouseOver={e => { e.currentTarget.style.borderColor = 'var(--green-bright)'; e.currentTarget.style.transform = 'translate(-2px,-2px)'; }}
              onMouseOut={e => { e.currentTarget.style.borderColor = 'var(--border-green)'; e.currentTarget.style.transform = ''; }}
            >
              <div style={{ fontSize: 36, marginBottom: 12 }}>{icon}</div>
              <div style={{ fontFamily: 'var(--font-pixel)', fontSize: 7, color: 'var(--text-muted)', marginBottom: 8, letterSpacing: 1 }}>{role}</div>
              <h3 style={{ fontFamily: 'var(--font-pixel)', fontSize: 9, color: 'var(--green-bright)', marginBottom: 14, lineHeight: 1.6 }}>{headline}</h3>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: 16 }}>{desc}</p>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {tags.map(t => <span key={t} className="badge" style={{ fontSize: 7 }}>{t}</span>)}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ padding: '60px 80px', background: 'var(--sky-top)', borderTop: '3px solid var(--border-green)', textAlign: 'center' }}>
        <Link to="/signup" className="btn-primary" style={{ fontSize: 10, padding: '16px 40px' }}>▶ Try It Free</Link>
      </section>
    </div>
  );
}

// ─── Pricing ─────────────────────────────────────────────────────────────────
const PLANS = [
  {
    name: 'FREE', price: '$0', period: '/month',
    color: 'var(--text-secondary)',
    border: 'var(--border-green)',
    features: ['3 public repo analyses/month', '50 AI questions/month', 'Call graph (basic)', 'File structure view', '7-day history'],
    cta: 'Start Free', link: '/signup',
  },
  {
    name: 'PRO', price: '$12', period: '/month',
    color: 'var(--green-bright)',
    border: 'var(--green-bright)',
    highlight: true,
    features: ['Unlimited public repos', '10 private repos/month', '2,000 AI questions/month', 'Full call graph + analytics', 'Unlimited history', 'Priority processing'],
    cta: '▶ Start Pro', link: '/signup?plan=pro',
  },
  {
    name: 'TEAM', price: '$49', period: '/month',
    color: '#a78bfa',
    border: '#7c3aed',
    features: ['Everything in Pro', 'Up to 10 seats', 'Unlimited private repos', 'Shared team history', 'Org-level analytics', 'Slack integration', 'Priority support'],
    cta: 'Start Team Trial', link: '/signup?plan=team',
  },
];

export function Pricing() {
  return (
    <div>
      <section style={{ padding: '80px', background: 'var(--sky-top)', borderBottom: '3px solid var(--border-green)', textAlign: 'center' }}>
        <h1 style={{ fontFamily: 'var(--font-pixel)', fontSize: 22, color: 'var(--green-bright)', textShadow: '4px 4px 0 #052e16', marginBottom: 20, lineHeight: 1.6 }}>
          SIMPLE PRICING
        </h1>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: 16, color: 'var(--text-secondary)' }}>
          No hidden blocks. Cancel anytime.
        </p>
      </section>

      <section style={{ padding: '80px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 28, maxWidth: 1000, margin: '0 auto' }}>
          {PLANS.map(({ name, price, period, color, border, highlight, features, cta, link }) => (
            <div key={name} style={{
              background: highlight ? 'var(--sky-top)' : 'var(--stone-mid)',
              border: `3px solid ${border}`,
              boxShadow: highlight ? `0 0 0 3px var(--green-deepest), 8px 8px 0 #052e16` : 'var(--pixel-shadow)',
              padding: 32,
              position: 'relative',
              transform: highlight ? 'translateY(-8px)' : 'none',
            }}>
              {highlight && (
                <div style={{ position: 'absolute', top: -14, left: '50%', transform: 'translateX(-50%)',
                  background: 'var(--green-dark)', border: '2px solid var(--green-bright)',
                  padding: '4px 12px', fontFamily: 'var(--font-pixel)', fontSize: 7, color: 'var(--green-bright)',
                  whiteSpace: 'nowrap',
                }}>
                  MOST POPULAR
                </div>
              )}
              <div style={{ fontFamily: 'var(--font-pixel)', fontSize: 10, color, marginBottom: 16, letterSpacing: 1 }}>{name}</div>
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: 4, marginBottom: 24 }}>
                <span style={{ fontFamily: 'var(--font-pixel)', fontSize: 28, color, textShadow: '3px 3px 0 #052e16' }}>{price}</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 14, color: 'var(--text-muted)', paddingBottom: 4 }}>{period}</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 28 }}>
                {features.map((f, i) => (
                  <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--text-secondary)' }}>
                    <span style={{ color: 'var(--green-bright)', flexShrink: 0 }}>✓</span>
                    {f}
                  </div>
                ))}
              </div>
              <Link to={link} className={highlight ? 'btn-primary' : 'btn-secondary'} style={{ display: 'block', textAlign: 'center', fontSize: 9, padding: '14px' }}>
                {cta}
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

// ─── About ───────────────────────────────────────────────────────────────────
export function About() {
  return (
    <div>
      <section style={{ padding: '80px', background: 'var(--sky-top)', borderBottom: '3px solid var(--border-green)', textAlign: 'center' }}>
        <h1 style={{ fontFamily: 'var(--font-pixel)', fontSize: 22, color: 'var(--green-bright)', textShadow: '4px 4px 0 #052e16', marginBottom: 20, lineHeight: 1.6 }}>
          ABOUT RepoLink
        </h1>
      </section>

      <section style={{ padding: '80px', maxWidth: 800, margin: '0 auto' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 15, color: 'var(--text-secondary)', lineHeight: 1.9, display: 'flex', flexDirection: 'column', gap: 24 }}>
          <p>RepoLink was born out of frustration. We were a small team dropped into a 400k line legacy monolith with zero documentation. It took months to understand enough to ship safely. We built RepoLink so no developer ever has to go through that again.</p>
          <p>We use a combination of static analysis, AST parsing, and large language models to build a comprehensive understanding of any codebase — then make that understanding accessible through interactive visuals and natural language Q&A.</p>
          <p>Our team is remote-first, open-source-friendly, and obsessed with developer tooling. We eat our own dogfood: RepoLink is analyzed by RepoLink every single day.</p>
        </div>

        <div style={{ marginTop: 56 }}>
          <h2 style={{ fontFamily: 'var(--font-pixel)', fontSize: 11, color: 'var(--green-bright)', marginBottom: 28, textShadow: '2px 2px 0 #052e16' }}>
            OUR VALUES
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
            {[
              ['🚀', 'Speed first', 'Analysis in under 60s. Always.'],
              ['🔒', 'Privacy by default', 'Your code never trains our models.'],
              ['🌍', 'Accessible', 'Free tier forever. No credit card required.'],
              ['🧩', 'Composable', 'API-first so you can build on top of us.'],
            ].map(([icon, title, desc]) => (
              <div key={title} className="card">
                <div style={{ fontSize: 28, marginBottom: 10 }}>{icon}</div>
                <div style={{ fontFamily: 'var(--font-pixel)', fontSize: 9, color: 'var(--green-bright)', marginBottom: 8 }}>{title}</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--text-muted)' }}>{desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

// ─── Contact ─────────────────────────────────────────────────────────────────
export function Contact() {
  return (
    <div>
      <section style={{ padding: '80px', background: 'var(--sky-top)', borderBottom: '3px solid var(--border-green)', textAlign: 'center' }}>
        <h1 style={{ fontFamily: 'var(--font-pixel)', fontSize: 22, color: 'var(--green-bright)', textShadow: '4px 4px 0 #052e16', marginBottom: 20, lineHeight: 1.6 }}>
          GET IN TOUCH
        </h1>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: 15, color: 'var(--text-secondary)' }}>
          Questions, feedback, or partnership inquiries — we read every message.
        </p>
      </section>

      <section style={{ padding: '80px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, maxWidth: 960, margin: '0 auto' }}>
        {/* Form */}
        <div>
          <form style={{ display: 'flex', flexDirection: 'column', gap: 20 }} onSubmit={e => { e.preventDefault(); alert('Message sent! (demo)'); }}>
            {[
              { id: 'name', label: 'YOUR NAME', type: 'text', ph: 'Steve Miner' },
              { id: 'email', label: 'EMAIL ADDRESS', type: 'email', ph: 'steve@example.com' },
            ].map(({ id, label, type, ph }) => (
              <div key={id}>
                <label className="field-label" htmlFor={id}>{label}</label>
                <input id={id} type={type} placeholder={ph} className="field-input" />
              </div>
            ))}
            <div>
              <label className="field-label" htmlFor="msg">MESSAGE</label>
              <textarea id="msg" rows={5} placeholder="Tell us what's on your mind..." className="field-input" style={{ resize: 'vertical', fontFamily: 'var(--font-vt)', fontSize: 20 }} />
            </div>
            <button type="submit" className="btn-primary" style={{ alignSelf: 'flex-start', fontSize: 9 }}>
              ▶ SEND MESSAGE
            </button>
          </form>
        </div>

        {/* Info */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {[
            { icon: '📧', title: 'Email', val: 'hello@RepoLink.dev' },
            { icon: '🐦', title: 'Twitter / X', val: '@RepoLink' },
            { icon: '💬', title: 'Discord', val: 'discord.gg/RepoLink' },
            { icon: '⏱', title: 'Response time', val: 'Within 24 hours' },
          ].map(({ icon, title, val }) => (
            <div key={title} className="card" style={{ display: 'flex', gap: 16, alignItems: 'center', padding: '16px 20px' }}>
              <span style={{ fontSize: 24 }}>{icon}</span>
              <div>
                <div style={{ fontFamily: 'var(--font-pixel)', fontSize: 7, color: 'var(--text-muted)', marginBottom: 4 }}>{title}</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 14, color: 'var(--green-bright)' }}>{val}</div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
