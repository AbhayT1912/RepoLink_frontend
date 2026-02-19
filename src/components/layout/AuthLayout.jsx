import { Outlet, Link } from 'react-router-dom';
import { CreeperIcon } from '../ui';
import { useEffect, useRef } from 'react';

function Particles() {
  const colors = ['#4ade80','#16a34a','#15803d','#86efac','#a3e635','#65a30d','#854d0e','#92400e'];
  return (
    <div style={{ position: 'fixed', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
      {Array.from({ length: 16 }).map((_, i) => {
        const size = 8 + Math.floor(Math.random() * 14);
        return (
          <div key={i} style={{
            position: 'absolute',
            left: `${Math.random() * 100}%`,
            bottom: -40,
            width: size, height: size,
            background: colors[i % colors.length],
            boxShadow: 'inset -2px -2px 0 rgba(0,0,0,0.4)',
            animation: `floatUp ${6 + Math.random() * 8}s ${Math.random() * 8}s infinite linear`,
            opacity: 0.7,
          }} />
        );
      })}
      <style>{`
        @keyframes floatUp {
          0% { transform: translateY(0); opacity: 0; }
          10% { opacity: 0.7; }
          90% { opacity: 0.7; }
          100% { transform: translateY(-110vh); opacity: 0; }
        }
      `}</style>
    </div>
  );
}

export default function AuthLayout() {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(180deg, var(--sky-top) 0%, var(--sky-mid) 50%, var(--sky-low) 100%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px 20px 100px',
      position: 'relative',
    }}>
      <Particles />

      {/* Stars */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
        {Array.from({ length: 50 }).map((_, i) => (
          <div key={i} style={{
            position: 'absolute',
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 60}%`,
            width: 2, height: 2,
            background: 'white',
            opacity: 0.3 + Math.random() * 0.5,
            animation: `blink ${1.5 + Math.random() * 3}s ${Math.random() * 3}s infinite`,
          }} />
        ))}
      </div>

      {/* Ground blocks */}
      <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 1, display: 'flex' }}>
        {Array.from({ length: 16 }).map((_, i) => (
          <div key={i} style={{ width: '6.25%', display: 'flex', flexDirection: 'column' }}>
            <div style={{ height: 10, background: '#4ade80', boxShadow: 'inset -2px -2px 0 rgba(0,0,0,0.3)' }} />
            <div style={{ height: 40, background: '#92400e', boxShadow: 'inset -2px 0 0 rgba(0,0,0,0.25)' }} />
          </div>
        ))}
      </div>

      {/* Logo link */}
      <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', marginBottom: 28, position: 'relative', zIndex: 10 }}>
        <CreeperIcon size={24} />
        <span style={{ fontFamily: 'var(--font-pixel)', fontSize: 11, color: 'var(--green-bright)', textShadow: '2px 2px 0 #052e16' }}>
          RepoLink
        </span>
      </Link>

      {/* Auth card */}
      <div style={{
        position: 'relative', zIndex: 10,
        background: 'rgba(15, 25, 40, 0.95)',
        border: '4px solid var(--border-green)',
        boxShadow: '0 0 0 4px var(--green-deepest), 8px 8px 0 #052e16',
        padding: '40px 44px',
        width: '100%', maxWidth: 440,
        backdropFilter: 'blur(8px)',
        boxSizing: 'border-box',
        overflow: 'hidden',
      }}>
        {/* Corner dots */}
        {[{top:0,left:0},{top:0,right:0},{bottom:0,left:0},{bottom:0,right:0}].map((pos,i) => (
          <div key={i} style={{ position: 'absolute', width: 12, height: 12, background: 'var(--green-bright)', ...pos }} />
        ))}

        <Outlet />

        {/* Bottom decoration */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 6, marginTop: 28 }}>
          {['#4ade80','#22c55e','#15803d','#86efac','#15803d','#22c55e','#4ade80'].map((c,i) => (
            <div key={i} style={{ width: 8, height: 8, background: c }} />
          ))}
        </div>
      </div>
    </div>
  );
}