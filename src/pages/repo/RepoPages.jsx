import { useParams, Link, NavLink } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import { Badge, StatCard, SectionHeader, ProgressBar, EmptyState } from '../../components/ui';

// ─── Shared repo nav tab bar ──────────────────────────────────────────────────
function RepoTabBar({ repoId }) {
  const tabs = [
    { to: `/${repoId}`, label: 'Overview', end: true },
    { to: `/${repoId}/structure`, label: 'Structure' },
    { to: `/${repoId}/graph`, label: 'Call Graph' },
    { to: `/${repoId}/analytics`, label: 'Analytics' },
    { to: `/${repoId}/ask`, label: 'Ask AI' },
    { to: `/${repoId}/history`, label: 'History' },
  ];
  return (
    <div style={{ display: 'flex', borderBottom: '3px solid var(--border-green)', marginBottom: 32, gap: 0, flexWrap: 'wrap' }}>
      {tabs.map(({ to, label, end }) => (
        <NavLink key={to} to={to} end={end} style={({ isActive }) => ({
          padding: '10px 20px',
          fontFamily: 'var(--font-pixel)', fontSize: 8,
          color: isActive ? 'var(--green-bright)' : 'var(--text-muted)',
          background: isActive ? 'var(--green-deepest)' : 'transparent',
          borderBottom: isActive ? '3px solid var(--green-bright)' : '3px solid transparent',
          marginBottom: -3, textDecoration: 'none', letterSpacing: 1,
          transition: 'all 0.15s',
        })}>
          {label}
        </NavLink>
      ))}
    </div>
  );
}

// ─── RepoOverview ─────────────────────────────────────────────────────────────
export function RepoOverview() {
  const { repoId } = useParams();
  const MODULES = [
    { name: 'src/core', files: 24, functions: 187, complexity: 'high' },
    { name: 'src/components', files: 52, functions: 310, complexity: 'medium' },
    { name: 'src/utils', files: 18, functions: 89, complexity: 'low' },
    { name: 'src/hooks', files: 12, functions: 44, complexity: 'low' },
    { name: 'src/api', files: 8, functions: 62, complexity: 'medium' },
  ];
  const complexColor = { high: '#f87171', medium: '#fbbf24', low: '#4ade80' };

  return (
    <div style={{ animation: 'fadeIn 0.4s ease' }}>
      <RepoTabBar repoId={repoId} />

      {/* Repo header */}
      <div style={{ marginBottom: 32, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 16 }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-pixel)', fontSize: 16, color: 'var(--green-bright)', textShadow: '3px 3px 0 #052e16', marginBottom: 8 }}>
            {repoId?.replace(/-/g, '/')}
          </h1>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <Badge variant="success">✓ Analyzed</Badge>
            <Badge>TypeScript</Badge>
            <Badge>MIT License</Badge>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <Link to={`/${repoId}/ask`} className="btn-primary" style={{ fontSize: 8 }}>💬 Ask AI</Link>
          <Link to={`/${repoId}/graph`} className="btn-secondary" style={{ fontSize: 8 }}>🕸 View Graph</Link>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20, marginBottom: 32 }}>
        <StatCard icon="🗂" label="Total Files" value="1,240" />
        <StatCard icon="⚡" label="Functions" value="4,820" color="#fbbf24" />
        <StatCard icon="📝" label="Lines of Code" value="187k" color="#60a5fa" />
        <StatCard icon="🔗" label="Dependencies" value="48" color="#a78bfa" />
      </div>

      {/* Modules table */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 28 }}>
        <div>
          <SectionHeader title="TOP MODULES" sub="Most active directories by function count" />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {MODULES.map(({ name, files, functions, complexity }, i) => (
              <div key={i} className="card" style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '14px 18px' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--green-bright)', flex: 1 }}>{name}</div>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-muted)' }}>{files} files</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-muted)' }}>{functions} fns</span>
                <span style={{ fontFamily: 'var(--font-pixel)', fontSize: 7, color: complexColor[complexity] }}>●{complexity}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <SectionHeader title="QUICK SUMMARY" />
          <div className="card" style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.8 }}>
            <p style={{ marginBottom: 14 }}>
              This repository is a <span style={{ color: 'var(--green-bright)' }}>well-structured TypeScript monorepo</span> with clear separation of concerns between core logic, UI components, and utilities.
            </p>
            <p style={{ marginBottom: 14 }}>
              The <code style={{ color: 'var(--green-bright)', background: 'var(--green-deepest)', padding: '2px 6px' }}>src/core</code> module has the highest complexity score and is the primary entry point for the rendering pipeline.
            </p>
            <p>
              Dependency graph is relatively flat with no circular dependencies detected.
            </p>
          </div>

          <div style={{ marginTop: 20 }}>
            <SectionHeader title="RECENT FUNCTIONS" />
            <div className="card" style={{ padding: 0 }}>
              {['renderComponent', 'reconcileChildren', 'useState', 'useEffect', 'createElement'].map((fn, i) => (
                <Link key={i} to={`/${repoId}/function/${fn}`} style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  padding: '12px 16px',
                  borderBottom: i < 4 ? '1px solid var(--border-green)' : 'none',
                  textDecoration: 'none',
                  color: 'var(--text-secondary)',
                  fontFamily: 'var(--font-mono)', fontSize: 13,
                  transition: 'all 0.15s',
                }}
                  onMouseOver={e => { e.currentTarget.style.background = 'var(--green-deepest)'; e.currentTarget.style.color = 'var(--green-bright)'; }}
                  onMouseOut={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--text-secondary)'; }}
                >
                  <span style={{ color: 'var(--green-bright)' }}>ƒ</span> {fn}
                  <span style={{ marginLeft: 'auto', fontSize: 16 }}>→</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── RepoStructure ────────────────────────────────────────────────────────────
function TreeNode({ name, type, children, repoId, depth = 0 }) {
  const [open, setOpen] = useState(depth < 2);
  const isDir = type === 'dir';
  return (
    <div style={{ paddingLeft: depth > 0 ? 20 : 0 }}>
      <div
        style={{
          display: 'flex', alignItems: 'center', gap: 8,
          padding: '5px 8px', cursor: isDir ? 'pointer' : 'default',
          fontFamily: 'var(--font-mono)', fontSize: 13,
          color: isDir ? 'var(--text-secondary)' : 'var(--text-muted)',
          transition: 'all 0.1s',
          borderLeft: depth > 0 ? '1px dashed var(--border-green)' : 'none',
        }}
        onClick={() => isDir && setOpen(!open)}
        onMouseOver={e => e.currentTarget.style.color = 'var(--green-bright)'}
        onMouseOut={e => e.currentTarget.style.color = isDir ? 'var(--text-secondary)' : 'var(--text-muted)'}
      >
        <span>{isDir ? (open ? '📂' : '📁') : '📄'}</span>
        <span>{name}</span>
        {!isDir && <span style={{ marginLeft: 'auto', fontSize: 11, color: 'var(--text-dim)' }}>247 lines</span>}
      </div>
      {isDir && open && children?.map((c, i) => (
        <TreeNode key={i} {...c} repoId={repoId} depth={depth + 1} />
      ))}
    </div>
  );
}

const TREE = [
  { name: 'src', type: 'dir', children: [
    { name: 'core', type: 'dir', children: [
      { name: 'reconciler.ts', type: 'file' },
      { name: 'renderer.ts', type: 'file' },
      { name: 'fiber.ts', type: 'file' },
    ]},
    { name: 'components', type: 'dir', children: [
      { name: 'Component.ts', type: 'file' },
      { name: 'PureComponent.ts', type: 'file' },
    ]},
    { name: 'hooks', type: 'dir', children: [
      { name: 'useState.ts', type: 'file' },
      { name: 'useEffect.ts', type: 'file' },
      { name: 'useMemo.ts', type: 'file' },
    ]},
    { name: 'index.ts', type: 'file' },
  ]},
  { name: 'packages', type: 'dir', children: [
    { name: 'react-dom', type: 'dir', children: [{ name: 'index.js', type: 'file' }] },
    { name: 'react-test-renderer', type: 'dir', children: [{ name: 'index.js', type: 'file' }] },
  ]},
  { name: 'scripts', type: 'dir', children: [
    { name: 'build.js', type: 'file' },
    { name: 'release.js', type: 'file' },
  ]},
  { name: 'package.json', type: 'file' },
  { name: 'tsconfig.json', type: 'file' },
  { name: 'README.md', type: 'file' },
];

export function RepoStructure() {
  const { repoId } = useParams();
  const [search, setSearch] = useState('');
  return (
    <div style={{ animation: 'fadeIn 0.4s ease' }}>
      <RepoTabBar repoId={repoId} />
      <SectionHeader title="FILE STRUCTURE" sub={`Complete directory tree for ${repoId}`} />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        <div>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search files..." className="field-input" style={{ marginBottom: 16 }} />
          <div className="card" style={{ padding: '8px 0', maxHeight: '70vh', overflowY: 'auto' }}>
            {TREE.map((node, i) => <TreeNode key={i} {...node} repoId={repoId} />)}
          </div>
        </div>
        <div>
          <div className="card" style={{ marginBottom: 16 }}>
            <div style={{ fontFamily: 'var(--font-pixel)', fontSize: 8, color: 'var(--green-bright)', marginBottom: 12 }}>FILE PREVIEW</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-muted)', marginBottom: 16 }}>Click any file to preview</div>
            <div className="code-block">
              <div style={{ color: '#60a5fa' }}>import</div>
              <div style={{ color: 'var(--text-muted)' }}>{'// Select a file to preview its contents'}</div>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <StatCard icon="📄" label="Total Files" value="1,240" />
            <StatCard icon="📝" label="Lines of Code" value="187k" color="#60a5fa" />
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── RepoGraph ───────────────────────────────────────────────────────────────
const NODES = [
  { id: 'root', x: 50, y: 50, label: 'index.ts', color: '#4ade80', size: 20 },
  { id: 'render', x: 25, y: 25, label: 'render()', color: '#60a5fa', size: 16 },
  { id: 'reconcile', x: 75, y: 25, label: 'reconcile()', color: '#f87171', size: 14 },
  { id: 'useState', x: 15, y: 65, label: 'useState()', color: '#fbbf24', size: 12 },
  { id: 'useEffect', x: 35, y: 75, label: 'useEffect()', color: '#a78bfa', size: 12 },
  { id: 'createElement', x: 65, y: 70, label: 'createElement()', color: '#34d399', size: 14 },
  { id: 'diff', x: 85, y: 60, label: 'diff()', color: '#f97316', size: 10 },
];
const EDGES = [
  ['root','render'], ['root','reconcile'], ['render','useState'],
  ['render','useEffect'], ['reconcile','diff'], ['reconcile','createElement'],
  ['useState','createElement'],
];

export function RepoGraph() {
  const { repoId } = useParams();
  const [selected, setSelected] = useState(null);
  const svgRef = useRef();

  return (
    <div style={{ animation: 'fadeIn 0.4s ease' }}>
      <RepoTabBar repoId={repoId} />
      <SectionHeader title="CALL GRAPH" sub="Interactive visualization of function call relationships" />

      <div style={{ display: 'grid', gridTemplateColumns: '3fr 1fr', gap: 24 }}>
        {/* Graph canvas */}
        <div className="card" style={{ padding: 0, overflow: 'hidden', position: 'relative' }}>
          {/* Toolbar */}
          <div style={{ padding: '10px 16px', borderBottom: '2px solid var(--border-green)', display: 'flex', gap: 8 }}>
            {['Zoom In', 'Zoom Out', 'Reset', 'Export SVG'].map(t => (
              <button key={t} className="btn-ghost" style={{ fontSize: 11, padding: '4px 10px', border: '1px solid var(--border-green)' }}>{t}</button>
            ))}
          </div>

          <svg ref={svgRef} width="100%" viewBox="0 0 100 100" style={{ height: 500, background: 'var(--stone)', display: 'block' }}>
            {/* Grid */}
            <defs>
              <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#1c2820" strokeWidth="0.3" />
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#grid)" />

            {/* Edges */}
            {EDGES.map(([a, b], i) => {
              const na = NODES.find(n => n.id === a);
              const nb = NODES.find(n => n.id === b);
              return (
                <line key={i}
                  x1={na.x} y1={na.y} x2={nb.x} y2={nb.y}
                  stroke="#15803d" strokeWidth="0.5" strokeDasharray="2 1" opacity="0.6"
                />
              );
            })}

            {/* Nodes */}
            {NODES.map(({ id, x, y, label, color, size }) => (
              <g key={id} onClick={() => setSelected(id)} style={{ cursor: 'pointer' }}>
                <rect x={x - size/2} y={y - size/2} width={size} height={size}
                  fill={selected === id ? '#052e16' : '#0c1a2e'}
                  stroke={color}
                  strokeWidth={selected === id ? 1.5 : 0.8}
                />
                <text x={x} y={y + size/2 + 3.5} textAnchor="middle"
                  fontSize="3" fill={color} fontFamily="monospace"
                >
                  {label.length > 12 ? label.slice(0,10)+'…' : label}
                </text>
              </g>
            ))}
          </svg>

          <div style={{ position: 'absolute', bottom: 12, left: 16, fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-muted)' }}>
            {NODES.length} nodes · {EDGES.length} edges · Click a node to inspect
          </div>
        </div>

        {/* Inspector */}
        <div>
          {selected ? (() => {
            const node = NODES.find(n => n.id === selected);
            const callers = EDGES.filter(([,b]) => b === selected).map(([a]) => a);
            const callees = EDGES.filter(([a]) => a === selected).map(([,b]) => b);
            return (
              <div className="card">
                <div style={{ fontFamily: 'var(--font-pixel)', fontSize: 9, color: node.color, marginBottom: 12 }}>SELECTED NODE</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 14, color: 'var(--text-primary)', marginBottom: 16 }}>
                  ƒ {node.label}
                </div>
                <Link to={`/${repoId}/function/${node.id}`} className="btn-primary" style={{ fontSize: 7, padding: '8px 12px', display: 'block', textAlign: 'center', marginBottom: 20 }}>
                  View Full Detail →
                </Link>
                {callers.length > 0 && (
                  <div style={{ marginBottom: 14 }}>
                    <div style={{ fontFamily: 'var(--font-pixel)', fontSize: 7, color: 'var(--text-muted)', marginBottom: 8 }}>CALLED BY</div>
                    {callers.map(c => <div key={c} style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: '#60a5fa', marginBottom: 4 }}>← {c}</div>)}
                  </div>
                )}
                {callees.length > 0 && (
                  <div>
                    <div style={{ fontFamily: 'var(--font-pixel)', fontSize: 7, color: 'var(--text-muted)', marginBottom: 8 }}>CALLS</div>
                    {callees.map(c => <div key={c} style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: '#4ade80', marginBottom: 4 }}>→ {c}</div>)}
                  </div>
                )}
              </div>
            );
          })() : (
            <div className="card" style={{ textAlign: 'center', padding: '40px 20px' }}>
              <div style={{ fontSize: 36, marginBottom: 16 }}>🕸</div>
              <div style={{ fontFamily: 'var(--font-pixel)', fontSize: 8, color: 'var(--text-muted)', lineHeight: 1.8 }}>
                Click a node to inspect it
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── FunctionDetail ───────────────────────────────────────────────────────────
export function FunctionDetail() {
  const { repoId, functionId } = useParams();
  return (
    <div style={{ animation: 'fadeIn 0.4s ease' }}>
      <div style={{ marginBottom: 20, display: 'flex', alignItems: 'center', gap: 10 }}>
        <Link to={`/${repoId}/graph`} className="btn-ghost" style={{ fontSize: 12 }}>← Back to Graph</Link>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 28 }}>
        <div>
          <div className="card" style={{ marginBottom: 20 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
              <div>
                <div style={{ fontFamily: 'var(--font-pixel)', fontSize: 7, color: 'var(--text-muted)', marginBottom: 8 }}>FUNCTION</div>
                <h1 style={{ fontFamily: 'var(--font-pixel)', fontSize: 16, color: 'var(--green-bright)', textShadow: '2px 2px 0 #052e16' }}>
                  ƒ {functionId}
                </h1>
              </div>
              <Badge variant="success">Analyzed</Badge>
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-muted)', marginBottom: 8 }}>
              📄 src/core/renderer.ts · Line 142
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <Badge>TypeScript</Badge>
              <Badge>Exported</Badge>
              <Badge variant="warning">High Complexity</Badge>
            </div>
          </div>

          {/* Source code */}
          <div className="card" style={{ marginBottom: 20 }}>
            <div style={{ fontFamily: 'var(--font-pixel)', fontSize: 8, color: 'var(--green-bright)', marginBottom: 14 }}>SOURCE CODE</div>
            <div className="code-block" style={{ overflow: 'auto' }}>
              <pre style={{ margin: 0, fontSize: 13, lineHeight: 1.6, color: 'var(--text-secondary)' }}>{`export function ${functionId}(
  element: ReactElement,
  container: DOMContainer,
  callback?: () => void
): void {
  // Validate container
  invariant(
    isValidContainer(container),
    'Target container is not a DOM element.'
  );

  // Delegate to legacy render
  return legacyRenderSubtreeIntoContainer(
    null,
    element,
    container,
    false,
    callback,
  );
}`}</pre>
            </div>
          </div>

          {/* AI explanation */}
          <div className="card">
            <div style={{ fontFamily: 'var(--font-pixel)', fontSize: 8, color: 'var(--green-bright)', marginBottom: 14 }}>🤖 AI EXPLANATION</div>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.8 }}>
              This function is the primary entry point for rendering a React element into a DOM container. It validates the target container, then delegates to the internal <code style={{ color: 'var(--green-bright)', background: 'var(--green-deepest)', padding: '1px 5px' }}>legacyRenderSubtreeIntoContainer</code> function which handles the actual fiber tree creation and mounting process.
            </p>
          </div>
        </div>

        {/* Sidebar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div className="card">
            <div style={{ fontFamily: 'var(--font-pixel)', fontSize: 8, color: 'var(--text-muted)', marginBottom: 12 }}>METRICS</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[['Complexity', '14', '#f87171'], ['Lines', '22', 'var(--green-bright)'], ['Callers', '8', '#60a5fa'], ['Callees', '3', '#a78bfa']].map(([k,v,c]) => (
                <div key={k} style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--text-muted)' }}>{k}</span>
                  <span style={{ fontFamily: 'var(--font-pixel)', fontSize: 10, color: c }}>{v}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="card">
            <div style={{ fontFamily: 'var(--font-pixel)', fontSize: 8, color: 'var(--text-muted)', marginBottom: 12 }}>CALLED BY</div>
            {['ReactDOM.render', 'hydrate', 'createRoot'].map(fn => (
              <div key={fn} style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: '#60a5fa', marginBottom: 8 }}>← {fn}</div>
            ))}
          </div>

          <div className="card">
            <div style={{ fontFamily: 'var(--font-pixel)', fontSize: 8, color: 'var(--text-muted)', marginBottom: 12 }}>CALLS INTO</div>
            {['isValidContainer', 'invariant', 'legacyRenderSubtreeIntoContainer'].map(fn => (
              <Link key={fn} to={`/${repoId}/function/${fn}`} style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: 12, color: '#4ade80', marginBottom: 8, textDecoration: 'none' }}>
                → {fn}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── RepoAnalytics ────────────────────────────────────────────────────────────
export function RepoAnalytics() {
  const { repoId } = useParams();
  const LANGS = [
    { name: 'TypeScript', pct: 68, color: '#60a5fa' },
    { name: 'JavaScript', pct: 22, color: '#fbbf24' },
    { name: 'CSS', pct: 6, color: '#a78bfa' },
    { name: 'Other', pct: 4, color: '#6b7280' },
  ];
  const HOTSPOTS = [
    { file: 'src/core/reconciler.ts', complexity: 94, changes: 342 },
    { file: 'src/core/renderer.ts', complexity: 87, changes: 218 },
    { file: 'src/fiber/workLoop.ts', complexity: 81, changes: 195 },
    { file: 'src/hooks/useState.ts', complexity: 62, changes: 156 },
    { file: 'src/scheduler/index.ts', complexity: 58, changes: 134 },
  ];

  return (
    <div style={{ animation: 'fadeIn 0.4s ease' }}>
      <RepoTabBar repoId={repoId} />
      <SectionHeader title="ANALYTICS" sub="Code health, complexity, and contributor insights" />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20, marginBottom: 32 }}>
        <StatCard icon="⚠" label="Avg Complexity" value="24.3" sub="across all functions" color="#f87171" />
        <StatCard icon="🧹" label="Dead Code" value="3.2%" sub="of total lines" color="#fbbf24" />
        <StatCard icon="🔁" label="Circular Deps" value="0" sub="none detected" color="#4ade80" />
        <StatCard icon="📝" label="Comment Ratio" value="18%" sub="code vs comments" color="#a78bfa" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 28 }}>
        {/* Language breakdown */}
        <div className="card">
          <div style={{ fontFamily: 'var(--font-pixel)', fontSize: 9, color: 'var(--green-bright)', marginBottom: 20 }}>LANGUAGE BREAKDOWN</div>
          <div style={{ display: 'flex', gap: 8, height: 24, marginBottom: 20, border: '2px solid var(--border-green)', overflow: 'hidden' }}>
            {LANGS.map(({ name, pct, color }) => (
              <div key={name} style={{ width: `${pct}%`, background: color, transition: 'width 0.6s' }} title={`${name} ${pct}%`} />
            ))}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {LANGS.map(({ name, pct, color }) => (
              <div key={name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ width: 10, height: 10, background: color }} />
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--text-secondary)' }}>{name}</span>
                </div>
                <span style={{ fontFamily: 'var(--font-pixel)', fontSize: 8, color }}>{pct}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Hotspots */}
        <div className="card">
          <div style={{ fontFamily: 'var(--font-pixel)', fontSize: 9, color: 'var(--green-bright)', marginBottom: 20 }}>COMPLEXITY HOTSPOTS</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {HOTSPOTS.map(({ file, complexity, changes }) => (
              <div key={file}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-secondary)' }}>{file.split('/').pop()}</span>
                  <span style={{ fontFamily: 'var(--font-pixel)', fontSize: 8, color: complexity > 80 ? '#f87171' : '#fbbf24' }}>{complexity}</span>
                </div>
                <div style={{ height: 8, background: 'var(--stone)', border: '1px solid var(--border-green)', overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${complexity}%`, background: complexity > 80 ? '#f87171' : '#fbbf24', transition: 'width 0.6s' }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── RepoAsk ─────────────────────────────────────────────────────────────────
const SUGGESTIONS = [
  'What is the entry point of this app?',
  'How does state management work here?',
  'Which function handles routing?',
  'What are the main dependencies?',
  'Explain the authentication flow.',
];

export function RepoAsk() {
  const { repoId } = useParams();
  const [messages, setMessages] = useState([
    { role: 'assistant', text: `Hi! I've fully analyzed **${repoId}**. Ask me anything about this codebase — architecture, specific functions, patterns, or how things work.` }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef();

  const send = async (text) => {
    if (!text.trim() || loading) return;
    const userMsg = { role: 'user', text };
    setMessages(m => [...m, userMsg]);
    setInput('');
    setLoading(true);
    await new Promise(r => setTimeout(r, 1400));
    const reply = { role: 'assistant', text: `Based on my analysis of **${repoId}**, here's what I found:\n\nThe codebase uses a fiber-based architecture where each component update is broken into small units of work. The entry point is \`src/index.ts\` which exports the main \`render()\` function.\n\nRelated files: \`src/core/reconciler.ts\`, \`src/fiber/workLoop.ts\`` };
    setMessages(m => [...m, reply]);
    setLoading(false);
  };

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  return (
    <div style={{ animation: 'fadeIn 0.4s ease', height: 'calc(100vh - 160px)', display: 'flex', flexDirection: 'column' }}>
      <RepoTabBar repoId={repoId} />
      <SectionHeader title="ASK AI" sub={`Chat with an AI that has read every file in ${repoId}`} />

      {/* Chat area */}
      <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 16, paddingRight: 4 }}>
        {messages.map((m, i) => (
          <div key={i} style={{ display: 'flex', justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start' }}>
            <div style={{
              maxWidth: '75%', padding: '14px 18px',
              background: m.role === 'user' ? 'var(--green-deepest)' : 'var(--stone-mid)',
              border: `2px solid ${m.role === 'user' ? 'var(--green-bright)' : 'var(--border-green)'}`,
              fontFamily: 'var(--font-mono)', fontSize: 14, color: 'var(--text-primary)', lineHeight: 1.7,
              boxShadow: m.role === 'user' ? '3px 3px 0 #052e16' : 'var(--pixel-shadow)',
              whiteSpace: 'pre-wrap',
            }}>
              {m.role === 'assistant' && (
                <div style={{ fontFamily: 'var(--font-pixel)', fontSize: 7, color: 'var(--green-bright)', marginBottom: 8 }}>🤖 RepoLink AI</div>
              )}
              {m.text}
            </div>
          </div>
        ))}
        {loading && (
          <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
            <div style={{ padding: '14px 18px', background: 'var(--stone-mid)', border: '2px solid var(--border-green)' }}>
              <span style={{ fontFamily: 'var(--font-pixel)', fontSize: 8, color: 'var(--green-bright)' }}>
                Thinking<span className="animate-blink">█</span>
              </span>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Suggestions */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 12, flexWrap: 'wrap' }}>
        {SUGGESTIONS.map(s => (
          <button key={s} onClick={() => send(s)} style={{
            background: 'var(--green-deepest)', border: '1px solid var(--border-green)',
            color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)', fontSize: 11,
            padding: '5px 10px', cursor: 'pointer', transition: 'all 0.15s',
          }}
            onMouseOver={e => { e.currentTarget.style.borderColor = 'var(--green-bright)'; e.currentTarget.style.color = 'var(--green-bright)'; }}
            onMouseOut={e => { e.currentTarget.style.borderColor = 'var(--border-green)'; e.currentTarget.style.color = 'var(--text-secondary)'; }}
          >
            {s}
          </button>
        ))}
      </div>

      {/* Input */}
      <form onSubmit={e => { e.preventDefault(); send(input); }} style={{ display: 'flex', gap: 0 }}>
        <input
          value={input} onChange={e => setInput(e.target.value)}
          placeholder="Ask anything about this codebase..."
          className="field-input"
          style={{ flex: 1, borderRight: 'none' }}
        />
        <button type="submit" disabled={loading} className="btn-primary" style={{ fontSize: 8, whiteSpace: 'nowrap', borderLeft: '3px solid var(--green-bright)' }}>
          {loading ? '...' : '▶ SEND'}
        </button>
      </form>
    </div>
  );
}

// ─── RepoHistory ──────────────────────────────────────────────────────────────
const HISTORY = [
  { id: 1, date: '2026-02-19 14:32', files: 1240, functions: 4820, duration: '47s', notes: 'Latest analysis' },
  { id: 2, date: '2026-02-15 09:11', files: 1215, functions: 4710, duration: '51s', notes: 'After v18.3 release' },
  { id: 3, date: '2026-02-01 18:44', files: 1198, functions: 4650, duration: '49s', notes: '' },
  { id: 4, date: '2026-01-20 11:22', files: 1180, functions: 4520, duration: '53s', notes: '' },
];

export function RepoHistory() {
  const { repoId } = useParams();
  const [selected, setSelected] = useState(null);

  return (
    <div style={{ animation: 'fadeIn 0.4s ease' }}>
      <RepoTabBar repoId={repoId} />
      <SectionHeader title="ANALYSIS HISTORY" sub="Every past analysis is saved and can be revisited or compared." />

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 28 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {HISTORY.map((h) => (
            <div key={h.id} className="card"
              style={{ cursor: 'pointer', transition: 'all 0.15s', borderColor: selected === h.id ? 'var(--green-bright)' : 'var(--border-green)' }}
              onClick={() => setSelected(h.id)}
              onMouseOver={e => e.currentTarget.style.borderColor = 'var(--green-bright)'}
              onMouseOut={e => e.currentTarget.style.borderColor = selected === h.id ? 'var(--green-bright)' : 'var(--border-green)'}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                <div style={{ fontFamily: 'var(--font-pixel)', fontSize: 8, color: h.id === 1 ? 'var(--green-bright)' : 'var(--text-muted)' }}>
                  {h.id === 1 ? '★ LATEST' : `v${HISTORY.length - h.id + 1}`}
                </div>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-muted)' }}>{h.date}</span>
              </div>
              <div style={{ display: 'flex', gap: 20 }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--text-secondary)' }}>🗂 {h.files.toLocaleString()} files</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--text-secondary)' }}>⚡ {h.functions.toLocaleString()} functions</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--text-secondary)' }}>⏱ {h.duration}</span>
              </div>
              {h.notes && <div style={{ marginTop: 8, fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-muted)', fontStyle: 'italic' }}>{h.notes}</div>}
            </div>
          ))}
        </div>

        <div>
          {selected ? (
            <div className="card">
              <div style={{ fontFamily: 'var(--font-pixel)', fontSize: 8, color: 'var(--green-bright)', marginBottom: 16 }}>ANALYSIS #{selected}</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 20 }}>
                {[['Files', HISTORY.find(h=>h.id===selected)?.files],['Functions', HISTORY.find(h=>h.id===selected)?.functions],['Duration', HISTORY.find(h=>h.id===selected)?.duration]].map(([k,v]) => (
                  <div key={k} style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--text-muted)' }}>{k}</span>
                    <span style={{ fontFamily: 'var(--font-pixel)', fontSize: 9, color: 'var(--green-bright)' }}>{v?.toLocaleString?.() ?? v}</span>
                  </div>
                ))}
              </div>
              <button className="btn-primary" style={{ fontSize: 8, width: '100%', marginBottom: 10 }}>Restore This Analysis</button>
              <button className="btn-secondary" style={{ fontSize: 8, width: '100%' }}>Compare with Latest</button>
            </div>
          ) : (
            <div className="card" style={{ textAlign: 'center', padding: '40px 20px' }}>
              <div style={{ fontSize: 36, marginBottom: 16 }}>🕐</div>
              <div style={{ fontFamily: 'var(--font-pixel)', fontSize: 8, color: 'var(--text-muted)', lineHeight: 1.8 }}>
                Select an analysis to view details or compare snapshots
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
