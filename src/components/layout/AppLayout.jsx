import { Outlet, NavLink, Link, useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useUser, useClerk } from '@clerk/clerk-react';
import { CreeperIcon } from '../ui';

function SidebarLink({ to, icon, label, end = false }) {
  return (
    <NavLink
      to={to}
      end={end}
      style={({ isActive }) => ({
        display: 'flex', alignItems: 'center', gap: 10,
        padding: '10px 16px',
        fontFamily: 'var(--font-mono)',
        fontSize: 13,
        color: isActive ? 'var(--green-bright)' : 'var(--text-secondary)',
        background: isActive ? 'var(--green-deepest)' : 'transparent',
        borderLeft: isActive ? '3px solid var(--green-bright)' : '3px solid transparent',
        textDecoration: 'none',
        transition: 'all 0.15s',
        cursor: 'pointer',
      })}
      onMouseOver={e => { if (!e.currentTarget.classList.contains('active')) e.currentTarget.style.background = 'rgba(5,46,22,0.4)'; }}
      onMouseOut={e => { if (!e.currentTarget.classList.contains('active')) e.currentTarget.style.background = 'transparent'; }}
    >
      <span style={{ width: 18, textAlign: 'center' }}>{icon}</span>
      {label}
    </NavLink>
  );
}

function RepoSidebar({ repoId }) {
  return (
    <div style={{ marginTop: 8 }}>
      <div style={{
        padding: '6px 16px',
        fontFamily: 'var(--font-pixel)', fontSize: 7,
        color: 'var(--text-muted)', letterSpacing: 1,
        borderBottom: '1px solid var(--border-green)',
        marginBottom: 4, paddingBottom: 10,
      }}>
        ▸ REPOSITORY
      </div>
      <SidebarLink to={`/${repoId}`} end icon="📦" label="Overview" />
      <SidebarLink to={`/${repoId}/structure`} icon="🗂" label="Structure" />
      <SidebarLink to={`/${repoId}/graph`} icon="🕸" label="Call Graph" />
      <SidebarLink to={`/${repoId}/analytics`} icon="📊" label="Analytics" />
      <SidebarLink to={`/${repoId}/ask`} icon="💬" label="Ask AI" />
      <SidebarLink to={`/${repoId}/history`} icon="🕐" label="History" />
    </div>
  );
}

export default function AppLayout() {
  const { repoId } = useParams();
  const navigate = useNavigate();
  const { user } = useUser();
  const { signOut } = useClerk();

  // Real user data from Clerk
  const displayName = user?.fullName || user?.username || user?.primaryEmailAddress?.emailAddress || 'User';
  const avatarLetter = displayName[0]?.toUpperCase() ?? '?';
  const avatarUrl = user?.imageUrl;

  const handleSignOut = async () => {
    await signOut();
    navigate('/login');
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>

      {/* ── Sidebar ── */}
      <aside style={{
        width: 'var(--sidebar-width)',
        background: 'var(--sky-top)',
        borderRight: '3px solid var(--border-green)',
        display: 'flex', flexDirection: 'column',
        position: 'fixed', top: 0, left: 0, bottom: 0,
        zIndex: 50,
        overflowY: 'auto',
      }}>
        {/* Logo */}
        <div style={{
          padding: '20px 16px 16px',
          borderBottom: '3px solid var(--border-green)',
        }}>
          <Link to="/dashboard" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
            <CreeperIcon size={24} />
            <div>
              <div style={{ fontFamily: 'var(--font-pixel)', fontSize: 9, color: 'var(--green-bright)', textShadow: '2px 2px 0 #052e16' }}>
                RepoLink
              </div>
              <div style={{ fontFamily: 'var(--font-vt)', fontSize: 13, color: 'var(--text-muted)' }}>
                AI Analyzer
              </div>
            </div>
          </Link>
        </div>

        {/* Main nav */}
        <nav style={{ flex: 1, paddingTop: 12 }}>
          <div style={{ padding: '6px 16px 10px', fontFamily: 'var(--font-pixel)', fontSize: 7, color: 'var(--text-muted)', letterSpacing: 1 }}>
            ▸ WORKSPACE
          </div>
          <SidebarLink to="/dashboard" end icon="🏠" label="Dashboard" />
          <SidebarLink to="/analyze" icon="🔍" label="Analyze Repo" />

          {/* Repo sub-nav (shown when inside a repo) */}
          {repoId && <RepoSidebar repoId={repoId} />}

          <div style={{ height: 16 }} />
          <div style={{ padding: '6px 16px 10px', fontFamily: 'var(--font-pixel)', fontSize: 7, color: 'var(--text-muted)', letterSpacing: 1 }}>
            ▸ ACCOUNT
          </div>
          <SidebarLink to="/profile" icon="👤" label="Profile" />
          <SidebarLink to="/settings" icon="⚙" label="Settings" />
        </nav>

        {/* Bottom user card */}
        <div style={{
          padding: '14px 16px',
          borderTop: '3px solid var(--border-green)',
          background: 'var(--green-deepest)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            {/* Avatar: use Clerk profile image if available, else initial */}
            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt={displayName}
                style={{
                  width: 34, height: 34, flexShrink: 0,
                  border: '2px solid var(--border-green)',
                  objectFit: 'cover',
                  imageRendering: 'pixelated',
                }}
              />
            ) : (
              <div style={{
                width: 34, height: 34, flexShrink: 0,
                background: 'var(--green-dark)',
                border: '2px solid var(--border-green)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: 'var(--font-pixel)', fontSize: 10, color: 'var(--green-bright)',
              }}>
                {avatarLetter}
              </div>
            )}
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--text-primary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {displayName}
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-muted)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {user?.primaryEmailAddress?.emailAddress ?? ''}
              </div>
            </div>
            <button
              onClick={handleSignOut}
              style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: 16, flexShrink: 0 }}
              title="Sign out"
            >
              ⏏
            </button>
          </div>
        </div>
      </aside>

      {/* ── Main area ── */}
      <div style={{ marginLeft: 'var(--sidebar-width)', flex: 1, display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>

        {/* Header */}
        <header style={{
          height: 'var(--header-height)',
          background: 'var(--sky-top)',
          borderBottom: '3px solid var(--border-green)',
          padding: '0 32px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          position: 'sticky', top: 0, zIndex: 40,
        }}>
          {/* Breadcrumb placeholder - pages can override via context */}
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--text-muted)' }}>
            RepoLink /&nbsp;
            <span style={{ color: 'var(--text-secondary)' }}>
              {repoId ? repoId : 'Workspace'}
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            {/* Credits badge */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: 8,
              padding: '6px 12px',
              background: 'var(--green-deepest)',
              border: '2px solid var(--border-green)',
            }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-secondary)' }}>⚡ Credits:</span>
              <span style={{ fontFamily: 'var(--font-pixel)', fontSize: 9, color: 'var(--green-bright)' }}>420</span>
            </div>

            <Link to="/analyze" className="btn-primary" style={{ padding: '8px 16px', fontSize: 8 }}>
              + New Repo
            </Link>
          </div>
        </header>

        {/* Page content */}
        <main style={{ flex: 1, padding: '32px', background: 'var(--stone)', overflowX: 'hidden' }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}