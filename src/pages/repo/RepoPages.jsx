import { useParams, Link, NavLink } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';

/* ══════════════════════════════════════════════════
   SHARED CSS
══════════════════════════════════════════════════ */
const SHARED_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&family=VT323:wght@400&display=swap');

  @keyframes xpBounce{0%,100%{transform:translateY(0) scale(1);}50%{transform:translateY(-5px) scale(1.15);}}
  @keyframes mcBlink{0%,100%{opacity:1;}50%{opacity:0;}}
  @keyframes mcFloat{0%,100%{transform:translateY(0);}50%{transform:translateY(-7px);}}
  @keyframes fadeUp{from{opacity:0;transform:translateY(16px);}to{opacity:1;transform:translateY(0);}}
  @keyframes actIn{from{opacity:0;transform:translateX(-10px);}to{opacity:1;transform:translateX(0);}}
  @keyframes neonPulse{0%,100%{text-shadow:2px 2px 0 #040d07,0 0 12px rgba(74,222,128,0.3);}50%{text-shadow:2px 2px 0 #040d07,0 0 28px rgba(74,222,128,0.7);}}
  @keyframes scanMove{from{transform:translateY(-100%);}to{transform:translateY(8000%);}}
  @keyframes nodePulse{0%,100%{opacity:1;}50%{opacity:0.5;}}
  @keyframes chatSlide{from{opacity:0;transform:translateY(10px);}to{opacity:1;transform:translateY(0);}}

  .pg{position:absolute;inset:0;background-image:linear-gradient(rgba(74,222,128,0.02) 1px,transparent 1px),linear-gradient(90deg,rgba(74,222,128,0.02) 1px,transparent 1px);background-size:34px 34px;pointer-events:none;z-index:0;}
  .scanline{position:absolute;inset:0;overflow:hidden;pointer-events:none;z-index:0;}
  .scanline::after{content:'';position:absolute;left:0;right:0;height:2px;background:rgba(74,222,128,0.04);animation:scanMove 14s linear infinite;}

  .mc-card{background:#0b1e10;border:3px solid #1a4528;position:relative;overflow:hidden;}
  .mc-card::before{content:'';position:absolute;inset:0;background:linear-gradient(135deg,rgba(74,222,128,0.03) 0%,transparent 60%);pointer-events:none;}

  .tab-link{padding:10px 18px;font-family:'Press Start 2P',monospace;font-size:7px;letter-spacing:1px;text-decoration:none;transition:all 0.12s;white-space:nowrap;border-bottom:3px solid transparent;margin-bottom:-3px;color:#1a4a2e;background:transparent;}
  .tab-link:hover{color:#4ade80;background:rgba(74,222,128,0.04);}
  .tab-active{color:#4ade80!important;background:#0d2a14!important;border-bottom:3px solid #4ade80!important;}

  .mc-input{width:100%;padding:12px 14px;box-sizing:border-box;background:#020c06;border:2px solid #1a4528;color:#4ade80;font-family:'VT323',monospace;font-size:20px;outline:none;transition:border-color 0.15s,box-shadow 0.15s;}
  .mc-input:focus{border-color:#4ade80;box-shadow:0 0 0 2px rgba(74,222,128,0.15);}
  .mc-input::placeholder{color:#1a4528;}

  .mc-btn-primary{display:inline-flex;align-items:center;justify-content:center;gap:6px;font-family:'Press Start 2P',monospace;font-size:8px;letter-spacing:1px;padding:11px 20px;color:#fff;text-decoration:none;cursor:pointer;background:linear-gradient(180deg,#16a34a,#15803d);border:3px solid #22c55e;box-shadow:4px 4px 0 #052e16;transition:all 0.1s;position:relative;overflow:hidden;}
  .mc-btn-primary::before{content:'';position:absolute;inset:0;background:linear-gradient(180deg,rgba(255,255,255,0.1) 0%,transparent 50%);pointer-events:none;}
  .mc-btn-primary:hover{transform:translate(-2px,-2px);box-shadow:6px 6px 0 #052e16;}

  .mc-btn-ghost{display:inline-flex;align-items:center;justify-content:center;gap:6px;font-family:'Press Start 2P',monospace;font-size:8px;letter-spacing:1px;padding:10px 18px;color:#4ade80;text-decoration:none;cursor:pointer;background:transparent;border:3px solid #22c55e;box-shadow:3px 3px 0 #052e16;transition:all 0.1s;}
  .mc-btn-ghost:hover{transform:translate(-2px,-2px);box-shadow:5px 5px 0 #052e16;background:rgba(74,222,128,0.06);}

  .toolbar-btn{font-family:'Press Start 2P',monospace;font-size:6px;letter-spacing:1px;color:#2d6a3f;background:#020c06;border:2px solid #1a4528;padding:7px 12px;cursor:pointer;transition:all 0.12s;}
  .toolbar-btn:hover{border-color:#4ade80;color:#4ade80;}

  .fn-link{display:flex;align-items:center;gap:10px;padding:12px 16px;text-decoration:none;transition:all 0.12s;border-bottom:2px solid #0d2a14;}
  .fn-link:hover{background:#0d2a14;}
  .fn-link:last-child{border-bottom:none;}

  .suggestion-btn{background:#020c06;border:2px solid #1a4528;color:#1a4a2e;font-family:'VT323',monospace;font-size:16px;padding:6px 12px;cursor:pointer;transition:all 0.12s;white-space:nowrap;}
  .suggestion-btn:hover{border-color:#4ade80;color:#4ade80;}

  .tree-row{display:flex;align-items:center;gap:8px;padding:5px 10px;cursor:pointer;font-family:'VT323',monospace;font-size:18px;color:#2d6a3f;transition:all 0.1s;}
  .tree-row:hover{color:#4ade80;background:rgba(74,222,128,0.04);}
`;

/* ══════════════════════════════════════════════════
   PIXEL ATOMS
══════════════════════════════════════════════════ */
function Torch({ style = {} }) {
  const [f, setF] = useState(0);
  useEffect(() => { const id = setInterval(() => setF(x => (x + 1) % 3), 110); return () => clearInterval(id); }, []);
  const fc = ['#ff8c00', '#ff5500', '#ffaa00'][f];
  return (
    <div style={{ position: 'relative', width: 10, height: 24, flexShrink: 0, ...style }}>
      <div style={{ position: 'absolute', top: 0, left: 1, width: 8, height: 6, background: fc, boxShadow: `0 0 ${4 + f * 2}px ${fc}`, transition: 'all 0.09s' }} />
      <div style={{ position: 'absolute', top: 5, left: 3, width: 4, height: 12, background: '#8B5E3C' }} />
    </div>
  );
}

function DiamondOre({ size = 30 }) {
  const [ph, setPh] = useState(0);
  useEffect(() => { const id = setInterval(() => setPh(p => (p + 1) % 4), 500); return () => clearInterval(id); }, []);
  const g = ['drop-shadow(0 0 3px #00d4ff)', 'drop-shadow(0 0 7px #00d4ff)', 'drop-shadow(0 0 5px #00eeff)', 'drop-shadow(0 0 3px #00d4ff)'][ph];
  return (
    <svg width={size} height={size} viewBox="0 0 12 12" style={{ imageRendering: 'pixelated', filter: g, transition: 'filter 0.4s', flexShrink: 0 }}>
      <rect width="12" height="12" fill="#7a7a7a" /><rect x="1" y="1" width="10" height="10" fill="#8a8a8a" />
      <rect x="2" y="2" width="8" height="8" fill="#7a7a7a" /><rect x="2" y="3" width="2" height="2" fill="#00d4ff" />
      <rect x="7" y="5" width="3" height="2" fill="#00d4ff" /><rect x="4" y="7" width="2" height="2" fill="#00d4ff" />
      <rect x="3" y="3" width="1" height="1" fill="#aaffff" />
    </svg>
  );
}

function XPOrbs({ count = 8, style = {} }) {
  return (
    <div style={{ display: 'flex', gap: 4, ...style }}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} style={{ width: 8, height: 8, borderRadius: '50%', background: '#a3e635', boxShadow: '0 0 5px #a3e635', animation: `xpBounce 1.4s ${i * 0.1}s ease-in-out infinite`, opacity: 1 - i * 0.09 }} />
      ))}
    </div>
  );
}

function SegBar({ pct, color, segments = 16 }) {
  const filled = Math.round((pct / 100) * segments);
  return (
    <div style={{ display: 'flex', gap: 2 }}>
      {Array.from({ length: segments }).map((_, i) => (
        <div key={i} style={{ flex: 1, height: 7, background: i < filled ? color : '#0d2a14', boxShadow: i < filled ? `0 0 4px ${color}66` : 'none' }} />
      ))}
    </div>
  );
}

function McBadge({ children, color = '#4ade80', style = {} }) {
  return (
    <span style={{ fontFamily: "'Press Start 2P',monospace", fontSize: 6, color, border: `2px solid ${color}55`, padding: '3px 8px', background: `${color}11`, display: 'inline-block', letterSpacing: 1, whiteSpace: 'nowrap', ...style }}>
      {children}
    </span>
  );
}

function CornerPip({ color = '#22c55e', pos = 'tr' }) {
  const p = { tl: { top: -4, left: -4 }, tr: { top: -4, right: -4 }, bl: { bottom: -4, left: -4 }, br: { bottom: -4, right: -4 } }[pos];
  return <div style={{ position: 'absolute', width: 12, height: 12, background: color, boxShadow: `0 0 7px ${color}99`, ...p }} />;
}

function SectionLabel({ title, sub, right }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16, position: 'relative', zIndex: 1 }}>
      <div>
        <div style={{ fontFamily: "'Press Start 2P',monospace", fontSize: 7, color: '#22c55e', letterSpacing: 2, marginBottom: sub ? 5 : 0 }}>▸ {title}</div>
        {sub && <div style={{ fontFamily: "'VT323',monospace", fontSize: 17, color: '#1a4a2e' }}>{sub}</div>}
      </div>
      {right}
    </div>
  );
}

function MiniStat({ icon, label, value, sub, color = '#4ade80', delay = 0 }) {
  const [hov, setHov] = useState(false);
  return (
    <div className="mc-card"
      onMouseOver={() => setHov(true)} onMouseOut={() => setHov(false)}
      style={{ padding: '18px 16px', boxShadow: hov ? `5px 5px 0 #040d07, 0 0 20px ${color}33` : '3px 3px 0 #040d07', border: `3px solid ${hov ? color : '#1a4528'}`, transform: hov ? 'translate(-2px,-2px)' : 'none', transition: 'all 0.18s', animation: `fadeUp 0.4s ${delay}s ease both` }}
    >
      <CornerPip color={color} />
      <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(135deg,${color}06 0%,transparent 55%)`, pointerEvents: 'none' }} />
      <div style={{ fontSize: 22, marginBottom: 8 }}>{icon}</div>
      <div style={{ fontFamily: "'Press Start 2P',monospace", fontSize: 16, color, textShadow: '2px 2px 0 #040d07', marginBottom: 4 }}>{value}</div>
      <div style={{ fontFamily: "'Press Start 2P',monospace", fontSize: 6, color: '#2d6a3f', letterSpacing: 1, marginBottom: sub ? 6 : 0 }}>{label}</div>
      {sub && <div style={{ fontFamily: "'VT323',monospace", fontSize: 15, color: '#1a4a2e' }}>{sub}</div>}
      <div style={{ marginTop: 10 }}><SegBar pct={typeof value === 'string' ? (parseInt(value) % 100) || 70 : value} color={color} segments={10} /></div>
    </div>
  );
}

/* ══════════════════════════════════════════════════
   TAB BAR
══════════════════════════════════════════════════ */
function RepoTabBar({ repoId }) {
  const tabs = [
    { to: `/${repoId}`,           label: '📦 Overview',   end: true },
    { to: `/${repoId}/structure`, label: '🗂 Structure'             },
    { to: `/${repoId}/graph`,     label: '🕸 Call Graph'            },
    { to: `/${repoId}/analytics`, label: '📊 Analytics'             },
    { to: `/${repoId}/ask`,       label: '💬 Ask AI'                },
    { to: `/${repoId}/history`,   label: '🕐 History'               },
  ];
  return (
    <div style={{ display: 'flex', borderBottom: '3px solid #22c55e', marginBottom: 28, gap: 0, flexWrap: 'wrap', position: 'relative', zIndex: 1 }}>
      <Torch style={{ alignSelf: 'center', marginRight: 6 }} />
      {tabs.map(({ to, label, end }) => (
        <NavLink key={to} to={to} end={end}
          className={({ isActive }) => `tab-link${isActive ? ' tab-active' : ''}`}
        >
          {label}
        </NavLink>
      ))}
      <Torch style={{ alignSelf: 'center', marginLeft: 6 }} />
    </div>
  );
}

/* ══════════════════════════════════════════════════
   PAGE WRAPPER
══════════════════════════════════════════════════ */
function Page({ children }) {
  return (
    <>
      <style>{SHARED_CSS}</style>
      <div style={{ background: '#040d07', minHeight: '100%', padding: '28px', position: 'relative', animation: 'fadeUp 0.4s ease both' }}>
        <div className="pg" /><div className="scanline" />
        {children}
      </div>
    </>
  );
}

/* ══════════════════════════════════════════════════
   REPO OVERVIEW
══════════════════════════════════════════════════ */
const MODULES = [
  { name: 'src/core',        files: 24,  functions: 187, complexity: 'high'   },
  { name: 'src/components',  files: 52,  functions: 310, complexity: 'medium' },
  { name: 'src/utils',       files: 18,  functions: 89,  complexity: 'low'    },
  { name: 'src/hooks',       files: 12,  functions: 44,  complexity: 'low'    },
  { name: 'src/api',         files: 8,   functions: 62,  complexity: 'medium' },
];
const COMPLEX_COLOR = { high: '#f87171', medium: '#fbbf24', low: '#4ade80' };

export function RepoOverview() {
  const { repoId } = useParams();
  return (
    <Page>
      <RepoTabBar repoId={repoId} />

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 16, marginBottom: 28, position: 'relative', zIndex: 1 }}>
        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 12, border: '2px solid #22c55e', padding: '4px 14px', fontFamily: "'Press Start 2P',monospace", fontSize: 6, color: '#4ade80', letterSpacing: 2, background: 'rgba(21,128,61,0.12)', boxShadow: '3px 3px 0 #040d07' }}>
            <span style={{ animation: 'xpBounce 1s ease-in-out infinite' }}>✦</span> REPOSITORY <span style={{ animation: 'xpBounce 1s 0.5s ease-in-out infinite' }}>✦</span>
          </div>
          <h1 style={{ fontFamily: "'Press Start 2P',monospace", fontSize: 'clamp(10px,1.5vw,15px)', color: '#4ade80', animation: 'neonPulse 3s ease-in-out infinite', lineHeight: 1.7, marginBottom: 12 }}>
            {repoId?.replace(/-/g, '/')}
          </h1>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <McBadge color="#4ade80">✓ ANALYZED</McBadge>
            <McBadge color="#60a5fa">TYPESCRIPT</McBadge>
            <McBadge color="#fbbf24">MIT LICENSE</McBadge>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <Link to={`/${repoId}/ask`} className="mc-btn-primary" style={{ fontSize: 8 }}>💬 Ask AI</Link>
          <Link to={`/${repoId}/graph`} className="mc-btn-ghost" style={{ fontSize: 8 }}>🕸 View Graph</Link>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16, marginBottom: 28 }}>
        {[
          { icon: '🗂', label: 'Total Files',  value: '1,240', sub: 'across all dirs',   color: '#4ade80', delay: 0.05 },
          { icon: '⚡', label: 'Functions',     value: '4,820', sub: 'parsed & indexed',  color: '#fbbf24', delay: 0.12 },
          { icon: '📝', label: 'Lines of Code', value: '187k',  sub: 'excl. comments',    color: '#60a5fa', delay: 0.19 },
          { icon: '🔗', label: 'Dependencies',  value: '48',    sub: 'direct deps',        color: '#a78bfa', delay: 0.26 },
        ].map(s => <MiniStat key={s.label} {...s} />)}
      </div>

      {/* Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 24, position: 'relative', zIndex: 1 }}>
        <div style={{ animation: 'fadeUp 0.4s 0.32s ease both' }}>
          <SectionLabel title="TOP MODULES" sub="Most active directories by function count" right={<DiamondOre />} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {MODULES.map(({ name, files, functions, complexity }, i) => {
              const cc = COMPLEX_COLOR[complexity];
              return (
                <div key={i} className="mc-card"
                  style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '13px 16px', boxShadow: '3px 3px 0 #040d07', transition: 'all 0.15s', animation: `fadeUp 0.35s ${0.34 + i * 0.06}s ease both` }}
                  onMouseOver={e => { e.currentTarget.style.borderColor = cc; e.currentTarget.style.transform = 'translate(-2px,-2px)'; }}
                  onMouseOut={e => { e.currentTarget.style.borderColor = '#1a4528'; e.currentTarget.style.transform = ''; }}
                >
                  <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 4, background: cc }} />
                  <div style={{ fontFamily: "'VT323',monospace", fontSize: 20, color: '#86efac', flex: 1, marginLeft: 10 }}>{name}</div>
                  <span style={{ fontFamily: "'VT323',monospace", fontSize: 16, color: '#1a4a2e' }}>{files} files</span>
                  <span style={{ fontFamily: "'VT323',monospace", fontSize: 16, color: '#1a4a2e' }}>{functions} fns</span>
                  <McBadge color={cc}>● {complexity}</McBadge>
                </div>
              );
            })}
          </div>
          <XPOrbs count={8} style={{ marginTop: 16 }} />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 20, animation: 'fadeUp 0.4s 0.38s ease both' }}>
          <div>
            <SectionLabel title="QUICK SUMMARY" />
            <div className="mc-card" style={{ padding: '22px', boxShadow: '4px 4px 0 #040d07' }}>
              <CornerPip color="#a78bfa" />
              {[
                <>This is a <span style={{ color: '#4ade80' }}>well-structured TypeScript monorepo</span> with clear separation of concerns between core logic, UI components, and utilities.</>,
                <><code style={{ color: '#4ade80', background: '#020c06', padding: '1px 6px', fontFamily: 'monospace', fontSize: 13 }}>src/core</code> has the highest complexity and is the primary entry point for the rendering pipeline.</>,
                <>Dependency graph is flat with <span style={{ color: '#4ade80' }}>no circular dependencies</span> detected.</>,
              ].map((p, i) => <p key={i} style={{ fontFamily: "'VT323',monospace", fontSize: 18, color: '#2d6a3f', lineHeight: 1.7, marginBottom: i < 2 ? 14 : 0 }}>{p}</p>)}
            </div>
          </div>
          <div>
            <SectionLabel title="RECENT FUNCTIONS" />
            <div className="mc-card" style={{ padding: 0, boxShadow: '3px 3px 0 #040d07' }}>
              {['renderComponent', 'reconcileChildren', 'useState', 'useEffect', 'createElement'].map((fn, i) => (
                <Link key={i} to={`/${repoId}/function/${fn}`} className="fn-link" style={{ animation: `actIn 0.3s ${0.44 + i * 0.06}s ease both` }}>
                  <span style={{ fontFamily: "'Press Start 2P',monospace", fontSize: 8, color: '#22c55e' }}>ƒ</span>
                  <span style={{ fontFamily: "'VT323',monospace", fontSize: 19, color: '#2d6a3f', flex: 1 }}>{fn}</span>
                  <span style={{ fontFamily: "'Press Start 2P',monospace", fontSize: 8, color: '#1a4528' }}>→</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Page>
  );
}

/* ══════════════════════════════════════════════════
   FILE STRUCTURE
══════════════════════════════════════════════════ */
const TREE_DATA = [
  { name: 'src', type: 'dir', children: [
    { name: 'core', type: 'dir', children: [{ name: 'reconciler.ts', type: 'file', lines: 847 }, { name: 'renderer.ts', type: 'file', lines: 624 }, { name: 'fiber.ts', type: 'file', lines: 512 }] },
    { name: 'components', type: 'dir', children: [{ name: 'Component.ts', type: 'file', lines: 198 }, { name: 'PureComponent.ts', type: 'file', lines: 89 }] },
    { name: 'hooks', type: 'dir', children: [{ name: 'useState.ts', type: 'file', lines: 142 }, { name: 'useEffect.ts', type: 'file', lines: 188 }, { name: 'useMemo.ts', type: 'file', lines: 97 }] },
    { name: 'index.ts', type: 'file', lines: 44 },
  ]},
  { name: 'packages', type: 'dir', children: [
    { name: 'react-dom', type: 'dir', children: [{ name: 'index.js', type: 'file', lines: 312 }] },
    { name: 'react-test-renderer', type: 'dir', children: [{ name: 'index.js', type: 'file', lines: 188 }] },
  ]},
  { name: 'scripts', type: 'dir', children: [{ name: 'build.js', type: 'file', lines: 244 }, { name: 'release.js', type: 'file', lines: 112 }] },
  { name: 'package.json', type: 'file', lines: 48 },
  { name: 'tsconfig.json', type: 'file', lines: 24 },
  { name: 'README.md', type: 'file', lines: 180 },
];

function TreeNode({ name, type, children, lines, depth = 0, selectedFile, onSelect }) {
  const [open, setOpen] = useState(depth < 2);
  const isDir = type === 'dir';
  const isSel = selectedFile === name;
  return (
    <div style={{ paddingLeft: depth > 0 ? 16 : 0 }}>
      <div className="tree-row"
        style={{ borderLeft: depth > 0 ? '2px dashed #1a4528' : 'none', color: isSel ? '#4ade80' : isDir ? '#86efac' : '#2d6a3f', background: isSel ? '#0d2a14' : 'transparent' }}
        onClick={() => isDir ? setOpen(!open) : onSelect?.(name, lines)}
      >
        <span>{isDir ? (open ? '📂' : '📁') : '📄'}</span>
        <span style={{ flex: 1 }}>{name}</span>
        {!isDir && lines && <span style={{ fontFamily: "'Press Start 2P',monospace", fontSize: 5, color: '#1a4a2e' }}>{lines}L</span>}
      </div>
      {isDir && open && children?.map((c, i) => <TreeNode key={i} {...c} depth={depth + 1} selectedFile={selectedFile} onSelect={onSelect} />)}
    </div>
  );
}

export function RepoStructure() {
  const { repoId } = useParams();
  const [search, setSearch] = useState('');
  const [selFile, setSelFile] = useState(null);
  const [selLines, setSelLines] = useState(null);
  return (
    <Page>
      <RepoTabBar repoId={repoId} />
      <SectionLabel title="FILE STRUCTURE" sub={`Complete directory tree for ${repoId}`} right={<DiamondOre />} />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 22, position: 'relative', zIndex: 1 }}>
        <div>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search files..." className="mc-input" style={{ marginBottom: 12 }} />
          <div className="mc-card" style={{ padding: '6px 0', maxHeight: '68vh', overflowY: 'auto', boxShadow: '4px 4px 0 #040d07' }}>
            {TREE_DATA.map((n, i) => <TreeNode key={i} {...n} selectedFile={selFile} onSelect={(name, lines) => { setSelFile(name); setSelLines(lines); }} />)}
          </div>
        </div>
        <div>
          <div className="mc-card" style={{ padding: '22px', marginBottom: 14, boxShadow: '4px 4px 0 #040d07' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
              <div style={{ fontFamily: "'Press Start 2P',monospace", fontSize: 7, color: '#22c55e', letterSpacing: 1 }}>FILE PREVIEW</div>
              {selFile && <McBadge color="#60a5fa">{selLines}L</McBadge>}
            </div>
            {selFile ? (
              <>
                <div style={{ fontFamily: "'Press Start 2P',monospace", fontSize: 6, color: '#1a4a2e', marginBottom: 12 }}>{selFile}</div>
                <div style={{ background: '#020c06', border: '2px solid #1a4528', padding: '14px', maxHeight: '40vh', overflowY: 'auto' }}>
                  <pre style={{ margin: 0, fontFamily: 'monospace', fontSize: 12, color: '#2d6a3f', lineHeight: 1.6 }}>{`// ${selFile}\nimport { Fiber, FiberRoot } from './types';\n\nexport function ${selFile.replace(/\.(ts|js)$/, '')}(\n  element: ReactElement,\n  container: DOMContainer,\n): void {\n  const root = createFiberRoot(container);\n  scheduleUpdateOnFiber(root.current);\n  flushPassiveEffects();\n  return commitRoot(root);\n}`}</pre>
                </div>
              </>
            ) : (
              <div style={{ textAlign: 'center', padding: '36px 0' }}>
                <div style={{ fontSize: 40, marginBottom: 12, animation: 'mcFloat 2s ease-in-out infinite' }}>📄</div>
                <div style={{ fontFamily: "'Press Start 2P',monospace", fontSize: 7, color: '#1a4a2e', lineHeight: 1.9 }}>
                  Click any file to preview<span style={{ animation: 'mcBlink 0.9s step-end infinite', color: '#4ade80', marginLeft: 4 }}>█</span>
                </div>
              </div>
            )}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <MiniStat icon="📄" label="Total Files" value="1,240" color="#4ade80" />
            <MiniStat icon="📝" label="Lines" value="187k" color="#60a5fa" />
          </div>
        </div>
      </div>
      <XPOrbs count={8} style={{ marginTop: 18, position: 'relative', zIndex: 1 }} />
    </Page>
  );
}

/* ══════════════════════════════════════════════════
   CALL GRAPH
══════════════════════════════════════════════════ */
const GNODES = [
  { id: 'root',        x: 50, y: 50, label: 'index.ts',        color: '#4ade80', size: 20 },
  { id: 'render',      x: 25, y: 24, label: 'render()',         color: '#60a5fa', size: 16 },
  { id: 'reconcile',   x: 76, y: 24, label: 'reconcile()',      color: '#f87171', size: 14 },
  { id: 'useState',    x: 13, y: 63, label: 'useState()',       color: '#fbbf24', size: 12 },
  { id: 'useEffect',   x: 36, y: 75, label: 'useEffect()',      color: '#a78bfa', size: 12 },
  { id: 'createElement',x:65, y: 71, label: 'createElement()',  color: '#34d399', size: 14 },
  { id: 'diff',        x: 86, y: 58, label: 'diff()',           color: '#f97316', size: 10 },
];
const GEDGES = [['root','render'],['root','reconcile'],['render','useState'],['render','useEffect'],['reconcile','diff'],['reconcile','createElement'],['useState','createElement']];

export function RepoGraph() {
  const { repoId } = useParams();
  const [selected, setSelected] = useState(null);
  const [zoom, setZoom] = useState(1);
  const selNode = GNODES.find(n => n.id === selected);
  const callers = selected ? GEDGES.filter(([,b]) => b === selected).map(([a]) => a) : [];
  const callees = selected ? GEDGES.filter(([a]) => a === selected).map(([,b]) => b) : [];

  return (
    <Page>
      <RepoTabBar repoId={repoId} />
      <SectionLabel title="CALL GRAPH" sub="Interactive visualization of function call relationships" right={<DiamondOre />} />
      <div style={{ display: 'grid', gridTemplateColumns: '3fr 1fr', gap: 22, position: 'relative', zIndex: 1 }}>
        <div className="mc-card" style={{ padding: 0, boxShadow: '6px 6px 0 #040d07' }}>
          <div style={{ padding: '10px 16px', borderBottom: '3px solid #1a4528', display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
            {[['+ Zoom In', () => setZoom(z => Math.min(z+0.2,2.6))],['- Zoom Out', () => setZoom(z => Math.max(z-0.2,0.4))],['↺ Reset', () => { setZoom(1); setSelected(null); }],['↗ Export', () => {}]].map(([l,a]) => (
              <button key={l} className="toolbar-btn" onClick={a}>{l}</button>
            ))}
            <div style={{ marginLeft: 'auto', fontFamily: "'Press Start 2P',monospace", fontSize: 6, color: '#1a4a2e' }}>{Math.round(zoom*100)}% · {GNODES.length} nodes</div>
          </div>
          <div style={{ overflow: 'hidden', background: '#020c06' }}>
            <svg width="100%" viewBox="0 0 100 100" style={{ height: 500, display: 'block', transform: `scale(${zoom})`, transformOrigin: 'center', transition: 'transform 0.2s' }}>
              <defs><pattern id="mcgrid" width="10" height="10" patternUnits="userSpaceOnUse"><path d="M 10 0 L 0 0 0 10" fill="none" stroke="#0d2a14" strokeWidth="0.4"/></pattern></defs>
              <rect width="100" height="100" fill="url(#mcgrid)" />
              {GEDGES.map(([a,b],i) => { const na=GNODES.find(n=>n.id===a),nb=GNODES.find(n=>n.id===b),lit=selected&&(a===selected||b===selected); return <line key={i} x1={na.x} y1={na.y} x2={nb.x} y2={nb.y} stroke={lit?'#22c55e':'#1a4528'} strokeWidth={lit?1:0.5} strokeDasharray={lit?'none':'2 1'} opacity={lit?0.9:0.5} style={{transition:'all 0.2s'}}/>; })}
              {GNODES.map(({ id, x, y, label, color, size }) => {
                const isSel=selected===id, isCaller=callers.includes(id), isCallee=callees.includes(id);
                return (
                  <g key={id} onClick={() => setSelected(id===selected?null:id)} style={{ cursor: 'pointer' }}>
                    {(isSel||isCaller||isCallee) && <rect x={x-size/2-2} y={y-size/2-2} width={size+4} height={size+4} fill="none" stroke={isSel?color:isCaller?'#60a5fa':'#4ade80'} strokeWidth={1.5} opacity={0.5} style={{animation:'nodePulse 1.5s ease-in-out infinite'}}/>}
                    <rect x={x-size/2} y={y-size/2} width={size} height={size} fill={isSel?`${color}22`:'#020c06'} stroke={color} strokeWidth={isSel?1.8:0.8} style={{transition:'all 0.15s'}}/>
                    <rect x={x-size/2} y={y-size/2} width={3} height={3} fill={color} opacity={0.7}/>
                    <text x={x} y={y+size/2+4} textAnchor="middle" fontSize="3.2" fill={color} fontFamily="monospace">{label.length>13?label.slice(0,11)+'…':label}</text>
                  </g>
                );
              })}
            </svg>
          </div>
          <div style={{ padding: '7px 16px', borderTop: '2px solid #0d2a14', fontFamily: "'Press Start 2P',monospace", fontSize: 5, color: '#1a4a2e', display: 'flex', justifyContent: 'space-between' }}>
            <span>Click a node to inspect</span><span>Drag to pan · scroll to zoom</span>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {selNode ? (
            <div className="mc-card" style={{ padding: '22px', boxShadow: '4px 4px 0 #040d07', animation: 'fadeUp 0.3s ease both' }}>
              <CornerPip color={selNode.color} />
              <div style={{ fontFamily: "'Press Start 2P',monospace", fontSize: 7, color: selNode.color, marginBottom: 10, letterSpacing: 1 }}>SELECTED</div>
              <div style={{ fontFamily: "'VT323',monospace", fontSize: 22, color: '#86efac', marginBottom: 16 }}>ƒ {selNode.label}</div>
              <Link to={`/${repoId}/function/${selNode.id}`} className="mc-btn-primary" style={{ fontSize: 6, padding: '9px 12px', display: 'block', textAlign: 'center', marginBottom: 20, textDecoration: 'none' }}>View Full Detail →</Link>
              {callers.length > 0 && <div style={{ marginBottom: 16 }}><div style={{ fontFamily: "'Press Start 2P',monospace", fontSize: 6, color: '#60a5fa', marginBottom: 8, letterSpacing: 1 }}>← CALLED BY</div>{callers.map(c => <div key={c} style={{ fontFamily: "'VT323',monospace", fontSize: 18, color: '#60a5fa', marginBottom: 6 }}>← {c}</div>)}</div>}
              {callees.length > 0 && <div><div style={{ fontFamily: "'Press Start 2P',monospace", fontSize: 6, color: '#4ade80', marginBottom: 8, letterSpacing: 1 }}>→ CALLS INTO</div>{callees.map(c => <div key={c} style={{ fontFamily: "'VT323',monospace", fontSize: 18, color: '#4ade80', marginBottom: 6 }}>→ {c}</div>)}</div>}
              <XPOrbs count={5} style={{ marginTop: 18 }} />
            </div>
          ) : (
            <div className="mc-card" style={{ padding: '40px 20px', textAlign: 'center', boxShadow: '4px 4px 0 #040d07' }}>
              <div style={{ fontSize: 44, marginBottom: 16, animation: 'mcFloat 2.5s ease-in-out infinite' }}>🕸</div>
              <div style={{ fontFamily: "'Press Start 2P',monospace", fontSize: 7, color: '#1a4a2e', lineHeight: 1.9 }}>Click any node<br/>to inspect it<span style={{ animation: 'mcBlink 0.9s step-end infinite', color: '#4ade80', marginLeft: 4 }}>█</span></div>
            </div>
          )}
          <div className="mc-card" style={{ padding: '16px', boxShadow: '3px 3px 0 #040d07' }}>
            <div style={{ fontFamily: "'Press Start 2P',monospace", fontSize: 6, color: '#1a4a2e', marginBottom: 10, letterSpacing: 1 }}>LEGEND</div>
            {GNODES.map(({ id, label, color }) => (
              <div key={id} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 7, cursor: 'pointer' }} onClick={() => setSelected(id===selected?null:id)}>
                <div style={{ width: 10, height: 10, background: color, boxShadow: `0 0 4px ${color}88`, flexShrink: 0 }} />
                <span style={{ fontFamily: "'VT323',monospace", fontSize: 16, color: selected===id?color:'#2d6a3f' }}>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Page>
  );
}

/* ══════════════════════════════════════════════════
   FUNCTION DETAIL
══════════════════════════════════════════════════ */
export function FunctionDetail() {
  const { repoId, functionId } = useParams();
  return (
    <Page>
      <div style={{ marginBottom: 18, position: 'relative', zIndex: 1 }}>
        <Link to={`/${repoId}/graph`} className="mc-btn-ghost" style={{ fontSize: 7 }}>← Back to Graph</Link>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 24, position: 'relative', zIndex: 1 }}>
        <div>
          {/* Header */}
          <div className="mc-card" style={{ padding: '24px', marginBottom: 16, boxShadow: '4px 4px 0 #040d07', animation: 'fadeUp 0.4s 0.05s ease both' }}>
            <CornerPip color="#4ade80" />
            <div style={{ fontFamily: "'Press Start 2P',monospace", fontSize: 6, color: '#1a4a2e', marginBottom: 10, letterSpacing: 1 }}>FUNCTION</div>
            <h1 style={{ fontFamily: "'Press Start 2P',monospace", fontSize: 'clamp(10px,1.5vw,14px)', color: '#4ade80', animation: 'neonPulse 3s ease-in-out infinite', lineHeight: 1.6, marginBottom: 14 }}>ƒ {functionId}</h1>
            <div style={{ fontFamily: "'VT323',monospace", fontSize: 18, color: '#1a4a2e', marginBottom: 14 }}>📄 src/core/renderer.ts · Line 142</div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              <McBadge color="#4ade80">✓ ANALYZED</McBadge>
              <McBadge color="#60a5fa">TYPESCRIPT</McBadge>
              <McBadge color="#fbbf24">EXPORTED</McBadge>
              <McBadge color="#f87171">HIGH COMPLEXITY</McBadge>
            </div>
          </div>

          {/* Source */}
          <div className="mc-card" style={{ padding: '22px', marginBottom: 16, boxShadow: '4px 4px 0 #040d07', animation: 'fadeUp 0.4s 0.12s ease both' }}>
            <div style={{ fontFamily: "'Press Start 2P',monospace", fontSize: 7, color: '#22c55e', marginBottom: 14, letterSpacing: 1 }}>▸ SOURCE CODE</div>
            <div style={{ background: '#020c06', border: '2px solid #1a4528', padding: '16px', overflowX: 'auto' }}>
              <pre style={{ margin: 0, fontSize: 12, lineHeight: 1.7, color: '#2d6a3f', fontFamily: 'monospace' }}>{`export function ${functionId}(\n  element: ReactElement,\n  container: DOMContainer,\n  callback?: () => void\n): void {\n  invariant(\n    isValidContainer(container),\n    'Target container is not a DOM element.'\n  );\n  return legacyRenderSubtreeIntoContainer(\n    null, element, container,\n    false, callback,\n  );\n}`}</pre>
            </div>
          </div>

          {/* AI */}
          <div className="mc-card" style={{ padding: '22px', boxShadow: '4px 4px 0 #040d07', animation: 'fadeUp 0.4s 0.2s ease both' }}>
            <CornerPip color="#a78bfa" />
            <div style={{ fontFamily: "'Press Start 2P',monospace", fontSize: 7, color: '#a78bfa', marginBottom: 14, letterSpacing: 1 }}>🤖 AI EXPLANATION</div>
            <p style={{ fontFamily: "'VT323',monospace", fontSize: 19, color: '#2d6a3f', lineHeight: 1.7 }}>
              Primary entry point for rendering into a DOM container. Validates the target, then delegates to{' '}
              <code style={{ color: '#4ade80', background: '#020c06', padding: '1px 6px', fontFamily: 'monospace', fontSize: 12 }}>legacyRenderSubtreeIntoContainer</code>{' '}
              which handles fiber tree creation and mounting.
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div className="mc-card" style={{ padding: '20px', boxShadow: '4px 4px 0 #040d07', animation: 'fadeUp 0.4s 0.08s ease both' }}>
            <div style={{ fontFamily: "'Press Start 2P',monospace", fontSize: 7, color: '#22c55e', marginBottom: 14, letterSpacing: 1 }}>▸ METRICS</div>
            {[['Complexity','14','#f87171'],['Lines','22','#4ade80'],['Callers','8','#60a5fa'],['Callees','3','#a78bfa']].map(([k,v,c]) => (
              <div key={k} style={{ marginBottom: 14 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 5 }}>
                  <span style={{ fontFamily: "'VT323',monospace", fontSize: 18, color: '#1a4a2e' }}>{k}</span>
                  <span style={{ fontFamily: "'Press Start 2P',monospace", fontSize: 10, color: c }}>{v}</span>
                </div>
                <SegBar pct={parseInt(v)*7} color={c} segments={12} />
              </div>
            ))}
          </div>
          <div className="mc-card" style={{ padding: '20px', boxShadow: '4px 4px 0 #040d07', animation: 'fadeUp 0.4s 0.14s ease both' }}>
            <CornerPip color="#60a5fa" />
            <div style={{ fontFamily: "'Press Start 2P',monospace", fontSize: 7, color: '#60a5fa', marginBottom: 12, letterSpacing: 1 }}>← CALLED BY</div>
            {['ReactDOM.render','hydrate','createRoot'].map(fn => (
              <div key={fn} style={{ fontFamily: "'VT323',monospace", fontSize: 18, color: '#60a5fa', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ fontFamily: "'Press Start 2P',monospace", fontSize: 7 }}>←</span> {fn}
              </div>
            ))}
          </div>
          <div className="mc-card" style={{ padding: '20px', boxShadow: '4px 4px 0 #040d07', animation: 'fadeUp 0.4s 0.2s ease both' }}>
            <CornerPip color="#4ade80" />
            <div style={{ fontFamily: "'Press Start 2P',monospace", fontSize: 7, color: '#4ade80', marginBottom: 12, letterSpacing: 1 }}>→ CALLS INTO</div>
            {['isValidContainer','invariant','legacyRenderSubtreeIntoContainer'].map(fn => (
              <Link key={fn} to={`/${repoId}/function/${fn}`} style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 10, textDecoration: 'none' }}
                onMouseOver={e => e.currentTarget.querySelector('span:last-child').style.color='#86efac'}
                onMouseOut={e => e.currentTarget.querySelector('span:last-child').style.color='#4ade80'}
              >
                <span style={{ fontFamily: "'Press Start 2P',monospace", fontSize: 7, color: '#4ade80' }}>→</span>
                <span style={{ fontFamily: "'VT323',monospace", fontSize: 18, color: '#4ade80', transition: 'color 0.12s' }}>{fn}</span>
              </Link>
            ))}
          </div>
          <XPOrbs count={6} />
        </div>
      </div>
    </Page>
  );
}

/* ══════════════════════════════════════════════════
   ANALYTICS
══════════════════════════════════════════════════ */
const LANGS = [
  { name: 'TypeScript', pct: 68, color: '#60a5fa' },
  { name: 'JavaScript', pct: 22, color: '#fbbf24' },
  { name: 'CSS',        pct: 6,  color: '#a78bfa' },
  { name: 'Other',      pct: 4,  color: '#6b7280' },
];
const HOTSPOTS = [
  { file: 'src/core/reconciler.ts',  complexity: 94, changes: 342 },
  { file: 'src/core/renderer.ts',    complexity: 87, changes: 218 },
  { file: 'src/fiber/workLoop.ts',   complexity: 81, changes: 195 },
  { file: 'src/hooks/useState.ts',   complexity: 62, changes: 156 },
  { file: 'src/scheduler/index.ts',  complexity: 58, changes: 134 },
];

export function RepoAnalytics() {
  const { repoId } = useParams();
  return (
    <Page>
      <RepoTabBar repoId={repoId} />
      <SectionLabel title="ANALYTICS" sub="Code health, complexity, and contributor insights" right={<DiamondOre />} />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16, marginBottom: 28 }}>
        {[
          { icon: '⚠',  label: 'Avg Complexity', value: '24.3', sub: 'all functions',    color: '#f87171', delay: 0.05 },
          { icon: '🧹', label: 'Dead Code',        value: '3.2%', sub: 'of total lines',  color: '#fbbf24', delay: 0.12 },
          { icon: '🔁', label: 'Circular Deps',    value: '0',    sub: 'none detected',    color: '#4ade80', delay: 0.19 },
          { icon: '📝', label: 'Comment Ratio',    value: '18%',  sub: 'code vs comments', color: '#a78bfa', delay: 0.26 },
        ].map(s => <MiniStat key={s.label} {...s} />)}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 22, position: 'relative', zIndex: 1 }}>
        {/* Language breakdown */}
        <div className="mc-card" style={{ padding: '24px', boxShadow: '4px 4px 0 #040d07', animation: 'fadeUp 0.4s 0.32s ease both' }}>
          <CornerPip color="#60a5fa" />
          <div style={{ fontFamily: "'Press Start 2P',monospace", fontSize: 7, color: '#22c55e', marginBottom: 18, letterSpacing: 1 }}>▸ LANGUAGE BREAKDOWN</div>
          <div style={{ display: 'flex', height: 22, border: '3px solid #1a4528', overflow: 'hidden', marginBottom: 22 }}>
            {LANGS.map(({ name, pct, color }) => <div key={name} style={{ width: `${pct}%`, background: color, boxShadow: 'inset -2px 0 rgba(0,0,0,0.3)' }} title={`${name} ${pct}%`} />)}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {LANGS.map(({ name, pct, color }, i) => (
              <div key={name} style={{ animation: `fadeUp 0.35s ${0.34+i*0.07}s ease both` }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{ width: 12, height: 12, background: color, boxShadow: `0 0 5px ${color}88` }} />
                    <span style={{ fontFamily: "'VT323',monospace", fontSize: 19, color: '#2d6a3f' }}>{name}</span>
                  </div>
                  <span style={{ fontFamily: "'Press Start 2P',monospace", fontSize: 8, color }}>{pct}%</span>
                </div>
                <SegBar pct={pct} color={color} segments={16} />
              </div>
            ))}
          </div>
        </div>

        {/* Hotspots */}
        <div className="mc-card" style={{ padding: '24px', boxShadow: '4px 4px 0 #040d07', animation: 'fadeUp 0.4s 0.4s ease both' }}>
          <CornerPip color="#f87171" />
          <div style={{ fontFamily: "'Press Start 2P',monospace", fontSize: 7, color: '#22c55e', marginBottom: 18, letterSpacing: 1 }}>▸ COMPLEXITY HOTSPOTS</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            {HOTSPOTS.map(({ file, complexity, changes }, i) => {
              const c = complexity > 80 ? '#f87171' : complexity > 60 ? '#fbbf24' : '#4ade80';
              return (
                <div key={file} style={{ animation: `fadeUp 0.35s ${0.42+i*0.07}s ease both` }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                    <span style={{ fontFamily: "'VT323',monospace", fontSize: 17, color: '#2d6a3f' }}>{file.split('/').pop()}</span>
                    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                      <McBadge color={c}>{complexity}</McBadge>
                      <span style={{ fontFamily: "'VT323',monospace", fontSize: 15, color: '#1a4a2e' }}>Δ{changes}</span>
                    </div>
                  </div>
                  <SegBar pct={complexity} color={c} segments={18} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <XPOrbs count={9} style={{ marginTop: 22, position: 'relative', zIndex: 1 }} />
    </Page>
  );
}

/* ══════════════════════════════════════════════════
   ASK AI
══════════════════════════════════════════════════ */
const SUGGESTIONS = ['What is the entry point?','How does state management work?','Which function handles routing?','What are the main dependencies?','Explain the auth flow.'];

export function RepoAsk() {
  const { repoId } = useParams();
  const [messages, setMessages] = useState([{ role: 'assistant', text: `Hi! I've fully analyzed **${repoId}**. Ask me anything about this codebase — architecture, specific functions, patterns, or how things work.` }]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef();

  const send = async (text) => {
    if (!text.trim() || loading) return;
    setMessages(m => [...m, { role: 'user', text }]);
    setInput(''); setLoading(true);
    await new Promise(r => setTimeout(r, 1400));
    setMessages(m => [...m, { role: 'assistant', text: `Based on my analysis of **${repoId}**, here's what I found:\n\nThe codebase uses a fiber-based architecture where each component update is broken into small units of work. The entry point is \`src/index.ts\` which exports the main \`render()\` function.\n\nRelated files: \`src/core/reconciler.ts\`, \`src/fiber/workLoop.ts\`` }]);
    setLoading(false);
  };

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  return (
    <>
      <style>{SHARED_CSS}</style>
      <div style={{ background: '#040d07', padding: '28px', position: 'relative', height: 'calc(100vh - 80px)', display: 'flex', flexDirection: 'column' }}>
        <div className="pg" /><div className="scanline" />
        <RepoTabBar repoId={repoId} />
        <SectionLabel title="ASK AI" sub={`Chat with an AI that has read every file in ${repoId}`} right={<DiamondOre />} />

        {/* Messages */}
        <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 12, paddingRight: 4, position: 'relative', zIndex: 1 }}>
          {messages.map((m, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: m.role==='user'?'flex-end':'flex-start', animation: 'chatSlide 0.3s ease both' }}>
              <div style={{ maxWidth: '76%', padding: '16px 20px', background: m.role==='user'?'#0d2a14':'#0b1e10', border: `3px solid ${m.role==='user'?'#22c55e':'#1a4528'}`, boxShadow: m.role==='user'?'4px 4px 0 #052e16':'3px 3px 0 #040d07', position: 'relative' }}>
                <div style={{ position: 'absolute', top: -4, [m.role==='user'?'right':'left']: -4, width: 11, height: 11, background: m.role==='user'?'#22c55e':'#1a4528' }} />
                {m.role === 'assistant' && <div style={{ fontFamily: "'Press Start 2P',monospace", fontSize: 6, color: '#a78bfa', marginBottom: 8, letterSpacing: 1 }}>🤖 REPOLINK AI</div>}
                <div style={{ fontFamily: "'VT323',monospace", fontSize: 19, color: m.role==='user'?'#86efac':'#2d6a3f', lineHeight: 1.6, whiteSpace: 'pre-wrap' }}>{m.text}</div>
              </div>
            </div>
          ))}
          {loading && (
            <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
              <div style={{ padding: '14px 20px', background: '#0b1e10', border: '3px solid #1a4528', boxShadow: '3px 3px 0 #040d07' }}>
                <span style={{ fontFamily: "'Press Start 2P',monospace", fontSize: 7, color: '#a78bfa' }}>
                  Thinking<span style={{ animation: 'mcBlink 0.5s step-end infinite', color: '#4ade80', marginLeft: 4 }}>█</span>
                </span>
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        <div style={{ display: 'flex', gap: 6, marginBottom: 10, flexWrap: 'wrap', position: 'relative', zIndex: 1 }}>
          {SUGGESTIONS.map(s => <button key={s} className="suggestion-btn" onClick={() => send(s)}>{s}</button>)}
        </div>
        <form onSubmit={e => { e.preventDefault(); send(input); }} style={{ display: 'flex', position: 'relative', zIndex: 1 }}>
          <input value={input} onChange={e => setInput(e.target.value)} placeholder="Ask anything about this codebase..." className="mc-input" style={{ flex: 1, borderRight: 'none' }} />
          <button type="submit" disabled={loading} style={{ fontFamily: "'Press Start 2P',monospace", fontSize: 8, letterSpacing: 1, padding: '0 22px', color: '#fff', cursor: loading?'not-allowed':'pointer', background: 'linear-gradient(180deg,#16a34a,#15803d)', border: '2px solid #22c55e', borderLeft: '3px solid #22c55e', boxShadow: '4px 4px 0 #052e16', whiteSpace: 'nowrap', opacity: loading?0.6:1 }}>
            {loading ? '...' : '▶ SEND'}
          </button>
        </form>
      </div>
    </>
  );
}

/* ══════════════════════════════════════════════════
   HISTORY
══════════════════════════════════════════════════ */
const HISTORY = [
  { id: 1, date: '2026-02-19 14:32', files: 1240, functions: 4820, duration: '47s', notes: 'Latest analysis',     tag: '★ LATEST', tagColor: '#4ade80' },
  { id: 2, date: '2026-02-15 09:11', files: 1215, functions: 4710, duration: '51s', notes: 'After v18.3 release',  tag: 'v3',        tagColor: '#60a5fa' },
  { id: 3, date: '2026-02-01 18:44', files: 1198, functions: 4650, duration: '49s', notes: '',                    tag: 'v2',        tagColor: '#2d6a3f' },
  { id: 4, date: '2026-01-20 11:22', files: 1180, functions: 4520, duration: '53s', notes: '',                    tag: 'v1',        tagColor: '#2d6a3f' },
];

export function RepoHistory() {
  const { repoId } = useParams();
  const [selected, setSelected] = useState(null);
  const sel = HISTORY.find(h => h.id === selected);

  return (
    <Page>
      <RepoTabBar repoId={repoId} />
      <SectionLabel title="ANALYSIS HISTORY" sub="Every past analysis is saved and can be revisited or compared." right={<DiamondOre />} />
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 22, position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {HISTORY.map((h, i) => {
            const isSel = selected === h.id;
            return (
              <div key={h.id}
                onClick={() => setSelected(h.id === selected ? null : h.id)}
                style={{ background: '#0b1e10', border: `3px solid ${isSel?'#22c55e':'#1a4528'}`, padding: '18px 20px', cursor: 'pointer', boxShadow: isSel?'6px 6px 0 #040d07':'3px 3px 0 #040d07', transform: isSel?'translate(-3px,-3px)':'none', transition: 'all 0.15s', position: 'relative', overflow: 'hidden', animation: `fadeUp 0.35s ${i*0.07}s ease both` }}
                onMouseOver={e => { if (!isSel) { e.currentTarget.style.borderColor='#22c55e'; e.currentTarget.style.transform='translate(-2px,-2px)'; }}}
                onMouseOut={e => { if (!isSel) { e.currentTarget.style.borderColor='#1a4528'; e.currentTarget.style.transform=''; }}}
              >
                <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 4, background: h.tagColor }} />
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12, marginLeft: 10 }}>
                  <McBadge color={h.tagColor}>{h.tag}</McBadge>
                  <span style={{ fontFamily: "'VT323',monospace", fontSize: 17, color: '#1a4a2e' }}>{h.date}</span>
                </div>
                <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', marginLeft: 10, marginBottom: h.notes ? 10 : 6 }}>
                  {[['🗂', h.files.toLocaleString()+' files'],['⚡', h.functions.toLocaleString()+' fns'],['⏱', h.duration]].map(([icon,val]) => (
                    <span key={val} style={{ fontFamily: "'VT323',monospace", fontSize: 18, color: '#2d6a3f' }}>{icon} {val}</span>
                  ))}
                </div>
                {h.notes && <div style={{ fontFamily: "'VT323',monospace", fontSize: 17, color: '#1a4a2e', marginLeft: 10, fontStyle: 'italic' }}>{h.notes}</div>}
                <div style={{ marginTop: 10 }}><SegBar pct={(h.files/1240)*100} color={h.id===1?'#4ade80':'#1a4528'} segments={18} /></div>
              </div>
            );
          })}
        </div>

        <div>
          {sel ? (
            <div className="mc-card" style={{ padding: '22px', boxShadow: '4px 4px 0 #040d07', animation: 'fadeUp 0.3s ease both' }}>
              <CornerPip color={sel.tagColor} />
              <div style={{ fontFamily: "'Press Start 2P',monospace", fontSize: 7, color: '#22c55e', marginBottom: 18, letterSpacing: 1 }}>▸ ANALYSIS #{sel.id}</div>
              {[['Files',sel.files.toLocaleString()],['Functions',sel.functions.toLocaleString()],['Duration',sel.duration],['Date',sel.date.split(' ')[0]]].map(([k,v]) => (
                <div key={k} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14, paddingBottom: 10, borderBottom: '2px solid #0d2a14' }}>
                  <span style={{ fontFamily: "'VT323',monospace", fontSize: 18, color: '#1a4a2e' }}>{k}</span>
                  <span style={{ fontFamily: "'Press Start 2P',monospace", fontSize: 8, color: '#4ade80' }}>{v}</span>
                </div>
              ))}
              {sel.notes && <div style={{ fontFamily: "'VT323',monospace", fontSize: 18, color: '#1a4a2e', fontStyle: 'italic', marginBottom: 18 }}>{sel.notes}</div>}
              <button className="mc-btn-primary" style={{ width: '100%', marginBottom: 10, fontSize: 7, justifyContent: 'center' }}>↺ Restore This Analysis</button>
              <button className="mc-btn-ghost" style={{ width: '100%', fontSize: 7, justifyContent: 'center' }}>⇄ Compare with Latest</button>
              <XPOrbs count={6} style={{ marginTop: 18, justifyContent: 'center' }} />
            </div>
          ) : (
            <div className="mc-card" style={{ padding: '48px 20px', textAlign: 'center', boxShadow: '4px 4px 0 #040d07' }}>
              <div style={{ fontSize: 44, marginBottom: 16, animation: 'mcFloat 2.5s ease-in-out infinite' }}>🕐</div>
              <div style={{ fontFamily: "'Press Start 2P',monospace", fontSize: 7, color: '#1a4a2e', lineHeight: 1.9 }}>
                Select an analysis<br/>to view details<span style={{ animation: 'mcBlink 0.9s step-end infinite', color: '#4ade80', marginLeft: 4 }}>█</span>
              </div>
            </div>
          )}
        </div>
      </div>
      <XPOrbs count={10} style={{ marginTop: 22, position: 'relative', zIndex: 1 }} />
    </Page>
  );
}