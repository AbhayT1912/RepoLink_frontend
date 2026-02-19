import { Link, useParams } from 'react-router-dom';
import { SignUp } from '@clerk/clerk-react';
import { CreeperIcon } from '../../components/ui';
import { useState } from 'react';

const clerkStyles = `
  /* Force box-sizing on every Clerk element */
  .cl-rootBox, .cl-rootBox * { box-sizing: border-box !important; }

  /* Root + card sizing */
  .cl-rootBox  { width: 100% !important; max-width: 100% !important; }
  .cl-card     { background: transparent !important; box-shadow: none !important; border: none !important; padding: 0 !important; width: 100% !important; max-width: 100% !important; }
  .cl-main     { width: 100% !important; }

  /* Hide Clerk's own header / footer */
  .cl-headerTitle, .cl-headerSubtitle, .cl-footer { display: none !important; }

  /* Social buttons */
  .cl-socialButtonsBlockButton {
    width: 100% !important; box-sizing: border-box !important;
    background: var(--green-deepest) !important; border: 2px solid var(--border-green) !important;
    color: var(--green-bright) !important; font-family: var(--font-vt) !important;
    font-size: 18px !important; border-radius: 0 !important;
  }
  .cl-socialButtonsBlockButton:hover { background: var(--green-deeper) !important; box-shadow: 3px 3px 0 #052e16 !important; }
  .cl-socialButtonsBlockButtonText { font-family: var(--font-vt) !important; font-size: 17px !important; }

  /* Divider */
  .cl-dividerLine { background: var(--border-green) !important; }
  .cl-dividerText { color: var(--green-bright) !important; font-family: var(--font-pixel) !important; font-size: 8px !important; }

  /* Form fields — 100% width is the key fix */
  .cl-formFieldRow, .cl-formField { width: 100% !important; box-sizing: border-box !important; }
  .cl-formFieldLabel {
    color: var(--text-secondary) !important; font-family: var(--font-pixel) !important;
    font-size: 7px !important; letter-spacing: 1px !important;
  }
  .cl-formFieldInput {
    width: 100% !important; max-width: 100% !important; box-sizing: border-box !important;
    background: var(--green-deepest) !important; border: 2px solid var(--border-green) !important;
    border-radius: 0 !important; color: var(--green-bright) !important;
    font-family: var(--font-vt) !important; font-size: 20px !important;
    padding: 10px 14px !important; outline: none !important;
  }
  .cl-formFieldInput:focus { border-color: var(--green-bright) !important; box-shadow: 0 0 0 2px var(--green-glow) !important; }
  .cl-formFieldInputShowPasswordButton { color: var(--green-bright) !important; }

  /* Primary button */
  .cl-formButtonPrimary {
    width: 100% !important; box-sizing: border-box !important;
    background: var(--green-dark) !important; border: 3px solid var(--green-bright) !important;
    border-radius: 0 !important; font-family: var(--font-pixel) !important; font-size: 9px !important;
    padding: 14px !important; box-shadow: 4px 4px 0 #052e16 !important; color: #f0fdf4 !important;
    letter-spacing: 1px !important; transition: all 0.1s !important;
  }
  .cl-formButtonPrimary:hover { transform: translate(-2px,-2px) !important; box-shadow: 6px 6px 0 #052e16 !important; background: var(--green-mid) !important; }
  .cl-formButtonPrimary:active { transform: translate(2px,2px) !important; box-shadow: 2px 2px 0 #052e16 !important; }

  /* Footer links */
  .cl-footerActionLink { color: var(--green-bright) !important; font-family: var(--font-pixel) !important; font-size: 7px !important; }
  .cl-footerActionText { color: var(--text-muted) !important; font-family: var(--font-pixel) !important; font-size: 7px !important; }

  /* Identity preview */
  .cl-identityPreview {
    width: 100% !important; box-sizing: border-box !important;
    background: var(--green-deepest) !important; border: 2px solid var(--border-green) !important;
    border-radius: 0 !important; color: var(--green-bright) !important;
  }
  .cl-identityPreviewText { color: var(--green-bright) !important; font-family: var(--font-mono) !important; }
  .cl-identityPreviewEditButton { color: var(--text-muted) !important; }

  /* Alternative method buttons */
  .cl-alternativeMethodsBlockButton {
    width: 100% !important; box-sizing: border-box !important;
    border: 2px solid var(--border-green) !important; border-radius: 0 !important;
    color: var(--green-bright) !important; background: transparent !important;
    font-family: var(--font-vt) !important; font-size: 16px !important;
  }

  /* OTP inputs */
  .cl-formResendCodeLink { color: var(--green-bright) !important; }
  .cl-otpCodeField input {
    background: var(--green-deepest) !important; border: 2px solid var(--border-green) !important;
    border-radius: 0 !important; color: var(--green-bright) !important;
    font-family: var(--font-pixel) !important;
  }

  /* Error states */
  .cl-formFieldErrorText { color: #f87171 !important; font-family: var(--font-mono) !important; font-size: 12px !important; }
  .cl-alert { background: #450a0a !important; border: 2px solid #f87171 !important; border-radius: 0 !important; color: #f87171 !important; font-family: var(--font-mono) !important; }
`;

// ─── Signup ──────────────────────────────────────────────────────────────────
export function Signup() {
  return (
    <div>
      <div style={{ textAlign: 'center', marginBottom: 28 }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 14 }}>
          <CreeperIcon size={32} />
        </div>
        <h1 style={{ fontFamily: 'var(--font-pixel)', fontSize: 11, color: 'var(--green-bright)', textShadow: '2px 2px 0 #052e16', lineHeight: 1.6 }}>
          JOIN RepoLink
        </h1>
        <p style={{ fontFamily: 'var(--font-vt)', fontSize: 18, color: 'var(--text-muted)', marginTop: 6 }}>
          Analyze your first repo in 60 seconds
          <span style={{ animation: 'blink 1s step-end infinite', display: 'inline-block', marginLeft: 2 }}>█</span>
        </p>
      </div>

      <style>{clerkStyles}</style>

      <div style={{ width: '100%', overflow: 'hidden', boxSizing: 'border-box' }}>
        <SignUp
          routing="hash"
          redirectUrl="/dashboard"
          appearance={{ layout: { socialButtonsVariant: 'blockButton' } }}
        />
      </div>

      <div style={{ marginTop: 20, textAlign: 'center', fontFamily: 'var(--font-pixel)', fontSize: 7, color: 'var(--text-muted)' }}>
        Already have an account?{' '}
        <Link to="/login" style={{ color: 'var(--green-bright)', textDecoration: 'none' }}>Log in</Link>
      </div>
    </div>
  );
}

// ─── ForgotPassword ──────────────────────────────────────────────────────────
export function ForgotPassword() {
  const [sent, setSent] = useState(false);
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) setSent(true);
  };

  return (
    <div>
      <div style={{ textAlign: 'center', marginBottom: 28 }}>
        <div style={{ fontSize: 40, marginBottom: 14 }}>🔑</div>
        <h1 style={{ fontFamily: 'var(--font-pixel)', fontSize: 11, color: 'var(--green-bright)', textShadow: '2px 2px 0 #052e16', lineHeight: 1.6, marginBottom: 8 }}>
          FORGOT PASSWORD?
        </h1>
        <p style={{ fontFamily: 'var(--font-vt)', fontSize: 17, color: 'var(--text-muted)' }}>
          No worries — we'll send you a reset link.
        </p>
      </div>

      {sent ? (
        <div style={{ textAlign: 'center', padding: '20px 0' }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>📬</div>
          <div style={{ fontFamily: 'var(--font-pixel)', fontSize: 10, color: 'var(--green-bright)', lineHeight: 1.6, marginBottom: 12 }}>
            CHECK YOUR EMAIL
          </div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 14, color: 'var(--text-muted)', marginBottom: 24 }}>
            We sent a reset link to <span style={{ color: 'var(--green-bright)' }}>{email}</span>
          </div>
          <Link to="/login" className="btn-secondary" style={{ fontSize: 8, padding: '12px 24px' }}>
            ← Back to Login
          </Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div>
            <label className="field-label" htmlFor="email">EMAIL ADDRESS</label>
            <input
              id="email" type="email" required
              value={email} onChange={e => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="field-input"
            />
          </div>
          <button type="submit" className="btn-primary" style={{ fontSize: 9 }}>
            ▶ SEND RESET LINK
          </button>
          <div style={{ textAlign: 'center', fontFamily: 'var(--font-pixel)', fontSize: 7, color: 'var(--text-muted)' }}>
            <Link to="/login" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>← Back to Login</Link>
          </div>
        </form>
      )}
    </div>
  );
}

// ─── ResetPassword ───────────────────────────────────────────────────────────
export function ResetPassword() {
  const { token } = useParams();
  const [done, setDone] = useState(false);
  const [pw, setPw] = useState('');
  const [pw2, setPw2] = useState('');
  const [err, setErr] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (pw !== pw2) { setErr('Passwords do not match.'); return; }
    if (pw.length < 8) { setErr('Password must be at least 8 characters.'); return; }
    setErr('');
    setDone(true);
  };

  return (
    <div>
      <div style={{ textAlign: 'center', marginBottom: 28 }}>
        <div style={{ fontSize: 40, marginBottom: 14 }}>🛡</div>
        <h1 style={{ fontFamily: 'var(--font-pixel)', fontSize: 10, color: 'var(--green-bright)', textShadow: '2px 2px 0 #052e16', lineHeight: 1.6, marginBottom: 8 }}>
          SET NEW PASSWORD
        </h1>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-muted)', wordBreak: 'break-all' }}>
          Token: {token?.slice(0, 20)}…
        </div>
      </div>

      {done ? (
        <div style={{ textAlign: 'center', padding: '20px 0' }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>✅</div>
          <div style={{ fontFamily: 'var(--font-pixel)', fontSize: 10, color: 'var(--green-bright)', lineHeight: 1.6, marginBottom: 16 }}>
            PASSWORD UPDATED!
          </div>
          <Link to="/login" className="btn-primary" style={{ fontSize: 9 }}>▶ LOG IN NOW</Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {err && (
            <div style={{ background: '#450a0a', border: '2px solid #f87171', padding: '10px 14px', fontFamily: 'var(--font-mono)', fontSize: 13, color: '#f87171' }}>
              ⚠ {err}
            </div>
          )}
          <div>
            <label className="field-label" htmlFor="pw">NEW PASSWORD</label>
            <input id="pw" type="password" required value={pw} onChange={e => setPw(e.target.value)} placeholder="Min. 8 characters" className="field-input" />
          </div>
          <div>
            <label className="field-label" htmlFor="pw2">CONFIRM PASSWORD</label>
            <input id="pw2" type="password" required value={pw2} onChange={e => setPw2(e.target.value)} placeholder="Same as above" className="field-input" />
          </div>
          <button type="submit" className="btn-primary" style={{ fontSize: 9 }}>▶ RESET PASSWORD</button>
        </form>
      )}
    </div>
  );
}