import { Link } from 'react-router-dom';
import { SignIn } from '@clerk/clerk-react';
import { CreeperIcon } from '../../components/ui';

export default function Login() {
  return (
    <div style={{ width: '100%', boxSizing: 'border-box' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: 28 }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 14 }}>
          <CreeperIcon size={32} />
        </div>
        <h1 style={{ fontFamily: 'var(--font-pixel)', fontSize: 12, color: 'var(--green-bright)', textShadow: '2px 2px 0 #052e16', lineHeight: 1.6 }}>
          WELCOME BACK
        </h1>
        <p style={{ fontFamily: 'var(--font-vt)', fontSize: 18, color: 'var(--text-muted)', marginTop: 6 }}>
          Sign in to your RepoLink account
          <span style={{ animation: 'blink 1s step-end infinite', display: 'inline-block', marginLeft: 2 }}>█</span>
        </p>
      </div>

      <style>{`
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
      `}</style>

      {/* overflow:hidden wrapper prevents any Clerk element bleeding outside the card */}
      <div style={{ width: '100%', overflow: 'hidden', boxSizing: 'border-box' }}>
        <SignIn
          routing="hash"
          redirectUrl="/dashboard"
          appearance={{ layout: { socialButtonsVariant: 'blockButton' } }}
        />
      </div>

      {/* Manual nav links */}
      <div style={{ marginTop: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link
          to="/forgot-password"
          style={{ fontFamily: 'var(--font-pixel)', fontSize: 7, color: 'var(--text-muted)', textDecoration: 'none' }}
          onMouseOver={e => e.target.style.color = 'var(--green-bright)'}
          onMouseOut={e => e.target.style.color = 'var(--text-muted)'}
        >
          Forgot password?
        </Link>
        <div style={{ fontFamily: 'var(--font-pixel)', fontSize: 7, color: 'var(--text-muted)' }}>
          No account?{' '}
          <Link to="/signup" style={{ color: 'var(--green-bright)', textDecoration: 'none' }}>Sign up</Link>
        </div>
      </div>
    </div>
  );
}