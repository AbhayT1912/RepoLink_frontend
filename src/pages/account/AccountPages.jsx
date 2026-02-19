import { useState, useEffect } from 'react';
import { SectionHeader, Badge } from '../../components/ui';
import { useUser } from '@clerk/clerk-react';

// ─── Profile ─────────────────────────────────────────────────────────────────
export function Profile() {
  const { user, isLoaded } = useUser();
  const [editing, setEditing] = useState(false);

  // Populate form from real Clerk user once loaded
  const [form, setForm] = useState({ name: '', bio: '', location: '', website: '', username: '' });

  useEffect(() => {
    if (!isLoaded || !user) return;
    setForm({
      name:     user.fullName                              ?? '',
      username: user.username                              ?? '',
      location: user.unsafeMetadata?.location              ?? '',
      website:  user.unsafeMetadata?.website               ?? '',
      bio:      user.unsafeMetadata?.bio                   ?? '',
    });
  }, [isLoaded, user]);

  const handleSave = async () => {
    // Clerk lets you update fullName directly; extra fields go into unsafeMetadata
    await user.update({
      firstName: form.name.split(' ')[0] || '',
      lastName:  form.name.split(' ').slice(1).join(' ') || '',
      username:  form.username || undefined,
      unsafeMetadata: {
        ...user.unsafeMetadata,
        bio:      form.bio,
        location: form.location,
        website:  form.website,
      },
    });
    setEditing(false);
  };

  const avatarUrl    = user?.imageUrl;
  const avatarLetter = (form.name || form.username || '?')[0]?.toUpperCase();
  const joinDate     = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
    : '—';
  const email        = user?.primaryEmailAddress?.emailAddress ?? '—';

  return (
    <div style={{ animation: 'fadeIn 0.4s ease', maxWidth: 800, margin: '0 auto' }}>
      <SectionHeader title="YOUR PROFILE" sub="Manage your public profile information." />

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 28 }}>
        {/* Avatar section */}
        <div>
          <div className="card" style={{ textAlign: 'center', padding: 32 }}>
            {/* Real Clerk avatar or pixel initial fallback */}
            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt={form.name}
                style={{
                  width: 96, height: 96, margin: '0 auto 16px', display: 'block',
                  border: '3px solid var(--green-bright)',
                  boxShadow: '4px 4px 0 #052e16',
                  objectFit: 'cover',
                }}
              />
            ) : (
              <div style={{
                width: 96, height: 96, margin: '0 auto 16px',
                background: 'var(--green-deepest)',
                border: '3px solid var(--green-bright)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: 'var(--font-pixel)', fontSize: 32, color: 'var(--green-bright)',
                boxShadow: '4px 4px 0 #052e16',
              }}>
                {avatarLetter}
              </div>
            )}
            <div style={{ fontFamily: 'var(--font-pixel)', fontSize: 10, color: 'var(--green-bright)', marginBottom: 4 }}>
              {form.username || form.name || 'Player'}
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-muted)', marginBottom: 10 }}>
              {email}
            </div>
            <Badge variant="success">Pro Plan</Badge>
            <button className="btn-secondary" style={{ fontSize: 7, padding: '8px 14px', marginTop: 16, width: '100%' }}>
              Change Avatar
            </button>
          </div>

          {/* Stats — Member Since comes from real Clerk data */}
          <div className="card" style={{ marginTop: 16 }}>
            {[['Repos Analyzed', '4'],['AI Questions', '87'],['Member Since', joinDate],['Credits Left', '420']].map(([k,v]) => (
              <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid var(--border-green)' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-muted)' }}>{k}</span>
                <span style={{ fontFamily: 'var(--font-pixel)', fontSize: 8, color: 'var(--green-bright)' }}>{v}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Edit form */}
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
            <div style={{ fontFamily: 'var(--font-pixel)', fontSize: 9, color: 'var(--green-bright)' }}>PROFILE INFO</div>
            <button onClick={() => setEditing(!editing)} className="btn-ghost" style={{ fontSize: 12 }}>
              {editing ? '✕ Cancel' : '✏ Edit'}
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {[
              { id: 'name', label: 'DISPLAY NAME', type: 'text' },
              { id: 'username', label: 'USERNAME', type: 'text' },
              { id: 'location', label: 'LOCATION', type: 'text' },
              { id: 'website', label: 'WEBSITE', type: 'text' },
            ].map(({ id, label, type }) => (
              <div key={id}>
                <label className="field-label" htmlFor={id}>{label}</label>
                <input
                  id={id} type={type}
                  value={form[id]}
                  onChange={e => setForm(f => ({ ...f, [id]: e.target.value }))}
                  className="field-input"
                  readOnly={!editing}
                  style={{ opacity: editing ? 1 : 0.7, cursor: editing ? 'text' : 'default' }}
                />
              </div>
            ))}
            <div>
              <label className="field-label" htmlFor="bio">BIO</label>
              <textarea
                id="bio" rows={3}
                value={form.bio}
                onChange={e => setForm(f => ({ ...f, bio: e.target.value }))}
                className="field-input"
                readOnly={!editing}
                style={{ resize: 'vertical', fontFamily: 'var(--font-vt)', fontSize: 18, opacity: editing ? 1 : 0.7 }}
              />
            </div>
            {editing && (
              <button onClick={handleSave} className="btn-primary" style={{ fontSize: 9, alignSelf: 'flex-start' }}>
                ▶ SAVE CHANGES
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Settings ─────────────────────────────────────────────────────────────────
export function Settings() {
  const { user } = useUser();
  const [tab, setTab] = useState('account');
  const [token, setToken] = useState('');
  const [tokenVisible, setTokenVisible] = useState(false);
  const [pwForm, setPwForm] = useState({ current: '', next: '' });
  const [pwMsg, setPwMsg] = useState('');

  const handlePasswordChange = async () => {
    if (!pwForm.current || !pwForm.next) return;
    try {
      await user.updatePassword({ currentPassword: pwForm.current, newPassword: pwForm.next });
      setPwMsg('✓ Password updated!');
      setPwForm({ current: '', next: '' });
    } catch (e) {
      setPwMsg(`⚠ ${e.errors?.[0]?.message ?? 'Failed to update password.'}`);
    }
  };

  const TABS = [
    { id: 'account', label: '👤 Account' },
    { id: 'integrations', label: '🔗 Integrations' },
    { id: 'notifications', label: '🔔 Notifications' },
    { id: 'billing', label: '💳 Billing' },
    { id: 'danger', label: '⚠ Danger Zone' },
  ];

  return (
    <div style={{ animation: 'fadeIn 0.4s ease' }}>
      <SectionHeader title="SETTINGS" sub="Manage your account preferences and integrations." />

      <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', gap: 28 }}>
        {/* Tabs sidebar */}
        <div className="card" style={{ padding: 8, height: 'fit-content' }}>
          {TABS.map(({ id, label }) => (
            <button key={id} onClick={() => setTab(id)} style={{
              display: 'block', width: '100%', textAlign: 'left',
              padding: '10px 14px',
              background: tab === id ? 'var(--green-deepest)' : 'transparent',
              color: tab === id ? 'var(--green-bright)' : 'var(--text-muted)',
              borderLeft: tab === id ? '3px solid var(--green-bright)' : '3px solid transparent',
              fontFamily: 'var(--font-mono)', fontSize: 13,
              border: 'none', cursor: 'pointer', transition: 'all 0.15s',
            }}>
              {label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div>
          {tab === 'account' && (
            <div className="card">
              <div style={{ fontFamily: 'var(--font-pixel)', fontSize: 9, color: 'var(--green-bright)', marginBottom: 24 }}>ACCOUNT SETTINGS</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                {/* Email — read-only, managed by Clerk */}
                <div>
                  <label className="field-label" htmlFor="email-settings">EMAIL ADDRESS</label>
                  <input
                    id="email-settings" type="email"
                    value={user?.primaryEmailAddress?.emailAddress ?? ''}
                    readOnly
                    className="field-input"
                    style={{ opacity: 0.7, cursor: 'default' }}
                  />
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-muted)', marginTop: 6 }}>
                    Email changes are managed through Clerk's account portal.
                  </div>
                </div>

                {/* Password change — calls Clerk updatePassword */}
                <div>
                  <label className="field-label" htmlFor="current-pw">CURRENT PASSWORD</label>
                  <input id="current-pw" type="password" placeholder="••••••••" className="field-input"
                    value={pwForm.current} onChange={e => setPwForm(f => ({ ...f, current: e.target.value }))}
                  />
                </div>
                <div>
                  <label className="field-label" htmlFor="new-pw">NEW PASSWORD</label>
                  <input id="new-pw" type="password" placeholder="Min. 8 characters" className="field-input"
                    value={pwForm.next} onChange={e => setPwForm(f => ({ ...f, next: e.target.value }))}
                  />
                </div>

                {pwMsg && (
                  <div style={{
                    padding: '10px 14px', fontFamily: 'var(--font-mono)', fontSize: 13,
                    background: pwMsg.startsWith('✓') ? 'var(--green-deepest)' : '#450a0a',
                    border: `2px solid ${pwMsg.startsWith('✓') ? 'var(--green-bright)' : '#f87171'}`,
                    color: pwMsg.startsWith('✓') ? 'var(--green-bright)' : '#f87171',
                  }}>
                    {pwMsg}
                  </div>
                )}

                <button onClick={handlePasswordChange} className="btn-primary" style={{ fontSize: 9, alignSelf: 'flex-start' }}>
                  ▶ UPDATE PASSWORD
                </button>
              </div>
            </div>
          )}

          {tab === 'integrations' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <div className="card">
                <div style={{ fontFamily: 'var(--font-pixel)', fontSize: 9, color: 'var(--green-bright)', marginBottom: 16 }}>GITHUB TOKEN</div>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--text-muted)', marginBottom: 16, lineHeight: 1.7 }}>
                  Required for analyzing private repositories. Your token is encrypted and never logged.
                </p>
                <label className="field-label" htmlFor="gh-token">PERSONAL ACCESS TOKEN</label>
                <div style={{ display: 'flex', gap: 0 }}>
                  <input
                    id="gh-token" type={tokenVisible ? 'text' : 'password'}
                    value={token} onChange={e => setToken(e.target.value)}
                    placeholder="ghp_xxxxxxxxxxxxxxxxxxxx"
                    className="field-input" style={{ flex: 1, borderRight: 'none' }}
                  />
                  <button onClick={() => setTokenVisible(!tokenVisible)} className="btn-ghost" style={{ border: '2px solid var(--border-green)', fontSize: 16, padding: '0 12px' }}>
                    {tokenVisible ? '🙈' : '👁'}
                  </button>
                </div>
                <button className="btn-primary" style={{ fontSize: 9, marginTop: 16 }}>▶ SAVE TOKEN</button>
              </div>

              {[{ icon: '🦊', name: 'GitLab', status: 'Not connected' }, { icon: '🪣', name: 'Bitbucket', status: 'Not connected' }].map(({ icon, name, status }) => (
                <div key={name} className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <span style={{ fontSize: 28 }}>{icon}</span>
                    <div>
                      <div style={{ fontFamily: 'var(--font-pixel)', fontSize: 8, color: 'var(--text-primary)', marginBottom: 4 }}>{name}</div>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-muted)' }}>{status}</div>
                    </div>
                  </div>
                  <button className="btn-secondary" style={{ fontSize: 7, padding: '8px 14px' }}>Connect</button>
                </div>
              ))}
            </div>
          )}

          {tab === 'notifications' && (
            <div className="card">
              <div style={{ fontFamily: 'var(--font-pixel)', fontSize: 9, color: 'var(--green-bright)', marginBottom: 20 }}>NOTIFICATION PREFERENCES</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {[
                  ['Analysis complete', 'Get notified when a repo analysis finishes', true],
                  ['Weekly digest', 'Summary of all your activity each week', true],
                  ['Product updates', 'New features and improvements', false],
                  ['Credit low warning', 'Alert when credits fall below 50', true],
                ].map(([title, desc, defaultOn], i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 0', borderBottom: i < 3 ? '1px solid var(--border-green)' : 'none' }}>
                    <div>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 14, color: 'var(--text-primary)', marginBottom: 4 }}>{title}</div>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-muted)' }}>{desc}</div>
                    </div>
                    <div style={{
                      width: 44, height: 24,
                      background: defaultOn ? 'var(--green-dark)' : 'var(--stone-light)',
                      border: '2px solid var(--border-green)',
                      cursor: 'pointer', position: 'relative',
                    }}>
                      <div style={{
                        position: 'absolute', top: 2, left: defaultOn ? 22 : 2,
                        width: 16, height: 16, background: defaultOn ? 'var(--green-bright)' : 'var(--text-muted)',
                        transition: 'left 0.2s',
                      }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab === 'billing' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <div className="card">
                <div style={{ fontFamily: 'var(--font-pixel)', fontSize: 9, color: 'var(--green-bright)', marginBottom: 16 }}>CURRENT PLAN</div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                  <div>
                    <div style={{ fontFamily: 'var(--font-pixel)', fontSize: 14, color: 'var(--green-bright)', marginBottom: 6 }}>PRO PLAN</div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--text-muted)' }}>$12 / month · Renews Mar 19, 2026</div>
                  </div>
                  <Badge variant="success">Active</Badge>
                </div>
                <div style={{ display: 'flex', gap: 10 }}>
                  <button className="btn-secondary" style={{ fontSize: 8 }}>Upgrade to Team</button>
                  <button className="btn-ghost" style={{ fontSize: 12, color: '#f87171', border: '2px solid #f87171' }}>Cancel Plan</button>
                </div>
              </div>

              <div className="card">
                <div style={{ fontFamily: 'var(--font-pixel)', fontSize: 9, color: 'var(--green-bright)', marginBottom: 16 }}>BILLING HISTORY</div>
                {[['Feb 19, 2026', 'Pro Plan', '$12.00'], ['Jan 19, 2026', 'Pro Plan', '$12.00'], ['Dec 19, 2025', 'Pro Plan', '$12.00']].map(([date, desc, amt]) => (
                  <div key={date} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid var(--border-green)' }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--text-muted)' }}>{date}</span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--text-secondary)' }}>{desc}</span>
                    <span style={{ fontFamily: 'var(--font-pixel)', fontSize: 9, color: 'var(--green-bright)' }}>{amt}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab === 'danger' && (
            <div className="card" style={{ border: '3px solid #f87171', boxShadow: '4px 4px 0 #450a0a' }}>
              <div style={{ fontFamily: 'var(--font-pixel)', fontSize: 9, color: '#f87171', marginBottom: 20 }}>⚠ DANGER ZONE</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                {[
                  { title: 'Delete All Analysis History', desc: 'This will permanently delete all saved repo analyses. This cannot be undone.', btn: 'Delete History' },
                  { title: 'Delete Account', desc: 'Permanently delete your account and all associated data. This action is irreversible.', btn: 'Delete My Account' },
                ].map(({ title, desc, btn }) => (
                  <div key={title} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 0', borderBottom: '1px solid #7f1d1d' }}>
                    <div>
                      <div style={{ fontFamily: 'var(--font-pixel)', fontSize: 8, color: '#fca5a5', marginBottom: 8 }}>{title}</div>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--text-muted)', maxWidth: 400 }}>{desc}</div>
                    </div>
                    <button style={{
                      background: 'transparent', border: '2px solid #f87171',
                      color: '#f87171', fontFamily: 'var(--font-pixel)', fontSize: 7,
                      padding: '10px 14px', cursor: 'pointer', whiteSpace: 'nowrap',
                      boxShadow: '3px 3px 0 #450a0a',
                    }}
                      onClick={() => alert(`${btn} (demo - no action taken)`)}
                    >
                      {btn}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}