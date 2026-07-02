import { useState } from "react";

const STYLES = `
  @import url('https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/tabler-icons.min.css');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  .cms-app {
    display: flex;
    height: 100vh;
    background: #0f0f11;
    color: #e8e8ea;
    font-size: 14px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    overflow: hidden;
  }

  /* SIDEBAR */
  .cms-sidebar {
    width: 220px;
    min-width: 220px;
    background: #141416;
    border-right: 0.5px solid #222226;
    display: flex;
    flex-direction: column;
  }
  .cms-brand {
    padding: 18px 16px 14px;
    border-bottom: 0.5px solid #222226;
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .cms-brand-icon {
    width: 28px; height: 28px; border-radius: 6px;
    background: #6c5ce7;
    display: flex; align-items: center; justify-content: center;
    font-size: 14px; color: #fff;
  }
  .cms-brand-name { font-size: 14px; font-weight: 500; color: #f0f0f2; }
  .cms-brand-sub { font-size: 11px; color: #666; margin-top: 1px; }

  .cms-nav-section { padding: 14px 10px 6px; }
  .cms-nav-label {
    font-size: 10px; text-transform: uppercase; letter-spacing: 0.08em;
    color: #555; padding: 0 6px; margin-bottom: 4px;
  }
  .cms-nav-item {
    display: flex; align-items: center; gap: 9px;
    padding: 7px 8px; border-radius: 7px;
    cursor: pointer; color: #888; font-size: 13px;
    transition: background 0.1s, color 0.1s;
    margin-bottom: 1px;
    user-select: none;
  }
  .cms-nav-item:hover { background: #1e1e22; color: #ccc; }
  .cms-nav-item.active { background: #1e1c36; color: #a89df5; }
  .cms-nav-badge {
    margin-left: auto; background: #2a2040;
    color: #a89df5; font-size: 10px; font-weight: 500;
    padding: 2px 6px; border-radius: 10px;
  }
  .cms-sidebar-footer {
    margin-top: auto;
    padding: 12px 10px;
    border-top: 0.5px solid #222226;
  }
  .cms-user-row {
    display: flex; align-items: center; gap: 10px;
    padding: 6px 8px; border-radius: 7px; cursor: pointer;
  }
  .cms-user-row:hover { background: #1e1e22; }
  .cms-avatar {
    width: 28px; height: 28px; border-radius: 50%;
    background: #2a2040; color: #a89df5;
    display: flex; align-items: center; justify-content: center;
    font-size: 11px; font-weight: 500;
  }
  .cms-user-name { font-size: 12px; color: #ccc; font-weight: 500; }
  .cms-user-role { font-size: 11px; color: #555; }

  /* MAIN */
  .cms-main {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }
  .cms-topbar {
    display: flex; align-items: center; gap: 12px;
    padding: 13px 20px;
    border-bottom: 0.5px solid #1e1e22;
    background: #0f0f11;
  }
  .cms-page-title { font-size: 15px; font-weight: 500; color: #f0f0f2; }
  .cms-topbar-actions { margin-left: auto; display: flex; gap: 8px; align-items: center; }
  .cms-search-box {
    display: flex; align-items: center; gap: 8px;
    background: #161618; border: 0.5px solid #2a2a2e;
    border-radius: 7px; padding: 6px 10px;
    width: 200px;
  }
  .cms-search-box input {
    background: none; border: none; outline: none;
    color: #ccc; font-size: 13px;
    font-family: inherit;
    width: 100%;
  }
  .cms-search-icon { color: #555; font-size: 15px; }
  .cms-btn-primary {
    background: #6c5ce7; color: #fff; border: none;
    padding: 7px 14px; border-radius: 7px;
    font-size: 13px; font-weight: 500; cursor: pointer;
    display: flex; align-items: center; gap: 6px;
    font-family: inherit;
    transition: background 0.15s;
  }
  .cms-btn-primary:hover { background: #7d6ff0; }

  /* CONTENT AREA */
  .cms-content-area {
    flex: 1; overflow-y: auto; padding: 18px 20px;
    display: flex; flex-direction: column; gap: 16px;
  }
  .cms-content-area::-webkit-scrollbar { width: 4px; }
  .cms-content-area::-webkit-scrollbar-track { background: transparent; }
  .cms-content-area::-webkit-scrollbar-thumb { background: #2a2a2e; border-radius: 2px; }

  /* STATS */
  .cms-stats-row {
    display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px;
  }
  .cms-stat-card {
    background: #141416; border: 0.5px solid #222226;
    border-radius: 9px; padding: 14px 16px;
  }
  .cms-stat-label { font-size: 11px; color: #666; margin-bottom: 6px; }
  .cms-stat-value { font-size: 22px; font-weight: 500; color: #f0f0f2; }
  .cms-stat-delta {
    font-size: 11px; margin-top: 4px;
    display: flex; align-items: center; gap: 4px;
  }
  .cms-stat-delta.up { color: #2ecc8a; }
  .cms-stat-delta.down { color: #e05b5b; }

  /* TABLE */
  .cms-section-header {
    display: flex; align-items: center; justify-content: space-between;
    margin-bottom: 10px;
  }
  .cms-section-title { font-size: 13px; font-weight: 500; color: #aaa; }
  .cms-filter-tabs { display: flex; gap: 4px; }
  .cms-filter-tab {
    padding: 4px 10px; border-radius: 5px; font-size: 12px;
    cursor: pointer; color: #666; background: none; border: none;
    font-family: inherit;
    transition: background 0.1s, color 0.1s;
  }
  .cms-filter-tab:hover { background: #1a1a1e; color: #aaa; }
  .cms-filter-tab.active { background: #1e1c36; color: #a89df5; }

  .cms-table { width: 100%; border-collapse: collapse; }
  .cms-table th {
    text-align: left; font-size: 11px; color: #555; font-weight: 500;
    padding: 6px 8px; border-bottom: 0.5px solid #1e1e22;
    text-transform: uppercase; letter-spacing: 0.05em;
  }
  .cms-table td {
    padding: 10px 8px; border-bottom: 0.5px solid #181820;
    vertical-align: middle;
  }
  .cms-table tr:hover td { background: #141418; }
  .cms-table tr:last-child td { border-bottom: none; }

  .cms-post-title { font-size: 13px; color: #e0e0e2; font-weight: 500; }
  .cms-post-meta { font-size: 11px; color: #555; margin-top: 2px; }
  .cms-author-chip { display: flex; align-items: center; gap: 6px; font-size: 12px; color: #888; }
  .cms-author-dot {
    width: 22px; height: 22px; border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    font-size: 9px; font-weight: 500;
  }
  .cms-status-badge {
    display: inline-flex; align-items: center; gap: 4px;
    font-size: 11px; font-weight: 500;
    padding: 3px 8px; border-radius: 20px;
  }
  .cms-status-published { background: #0e2a1a; color: #2ecc8a; }
  .cms-status-draft { background: #1a1a1e; color: #666; }
  .cms-status-review { background: #1e1a0e; color: #e8a735; }
  .cms-status-scheduled { background: #0e1a2a; color: #4db2ff; }

  .cms-row-actions { display: flex; gap: 4px; opacity: 0; transition: opacity 0.15s; }
  .cms-table tr:hover .cms-row-actions { opacity: 1; }
  .cms-icon-btn {
    background: none; border: none; cursor: pointer;
    color: #555; padding: 4px; border-radius: 5px;
    transition: color 0.1s, background 0.1s;
    font-family: inherit;
  }
  .cms-icon-btn:hover { color: #aaa; background: #222226; }

  /* RIGHT PANEL */
  .cms-panel {
    width: 220px; min-width: 220px;
    background: #141416;
    border-left: 0.5px solid #1e1e22;
    overflow-y: auto; padding: 16px;
    display: flex; flex-direction: column; gap: 18px;
  }
  .cms-panel::-webkit-scrollbar { display: none; }
  .cms-panel-title {
    font-size: 11px; text-transform: uppercase; letter-spacing: 0.08em;
    color: #555; margin-bottom: 10px;
  }
  .cms-activity-item { display: flex; gap: 8px; margin-bottom: 12px; align-items: flex-start; }
  .cms-activity-dot { width: 6px; height: 6px; border-radius: 50%; margin-top: 5px; min-width: 6px; }
  .cms-activity-text { font-size: 12px; color: #888; line-height: 1.5; }
  .cms-activity-time { font-size: 10px; color: #444; margin-top: 2px; }

  .cms-bar-item { margin-bottom: 7px; }
  .cms-bar-label { display: flex; justify-content: space-between; font-size: 11px; color: #777; margin-bottom: 3px; }
  .cms-bar-track { height: 3px; background: #1e1e22; border-radius: 2px; }
  .cms-bar-fill { height: 3px; border-radius: 2px; background: #6c5ce7; }

  .cms-tag-cloud { display: flex; flex-wrap: wrap; gap: 5px; }
  .cms-tag {
    font-size: 11px; color: #666; background: #1a1a1e;
    border: 0.5px solid #2a2a2e; border-radius: 4px;
    padding: 3px 8px; cursor: pointer;
    transition: color 0.1s, border-color 0.1s;
  }
  .cms-tag:hover { color: #a89df5; border-color: #3a3060; }
`;

const AUTHOR_COLORS = [
  { bg: "#1e1c36", fg: "#a89df5" },
  { bg: "#0e2a1a", fg: "#2ecc8a" },
  { bg: "#1e1a0e", fg: "#e8a735" },
  { bg: "#0e1a2a", fg: "#4db2ff" },
  { bg: "#2a1010", fg: "#e05b5b" },
];

const ALL_POSTS = [
  { title: "State of AI in 2026", meta: "2,400 words · 4 min read", author: "Sam L.", initials: "SL", colorIdx: 1, category: "Engineering", status: "published", date: "Jun 10" },
  { title: "The Typography Playbook", meta: "1,800 words · 3 min read", author: "Riya P.", initials: "RP", colorIdx: 3, category: "Design", status: "review", date: "Jun 9" },
  { title: "Building with Design Tokens", meta: "3,100 words · 6 min read", author: "Alex K.", initials: "AK", colorIdx: 0, category: "Engineering", status: "scheduled", date: "Jun 13" },
  { title: "Remote Culture Handbook", meta: "1,200 words · 2 min read", author: "Maya T.", initials: "MT", colorIdx: 2, category: "Culture", status: "draft", date: "Jun 7" },
  { title: "API Design Principles", meta: "2,900 words · 5 min read", author: "Sam L.", initials: "SL", colorIdx: 1, category: "Engineering", status: "published", date: "Jun 6" },
  { title: "Accessibility Checklist 2026", meta: "900 words · 2 min read", author: "Riya P.", initials: "RP", colorIdx: 3, category: "Design", status: "published", date: "Jun 4" },
  { title: "Our Product Roadmap Q3", meta: "1,500 words · 3 min read", author: "Alex K.", initials: "AK", colorIdx: 0, category: "Product", status: "draft", date: "Jun 2" },
  { title: "React 20 Migration Guide", meta: "4,200 words · 8 min read", author: "Maya T.", initials: "MT", colorIdx: 2, category: "Engineering", status: "published", date: "Jun 1" },
];

const STATUS_MAP = {
  published: { cls: "cms-status-published", label: "Published" },
  draft: { cls: "cms-status-draft", label: "Draft" },
  review: { cls: "cms-status-review", label: "In review" },
  scheduled: { cls: "cms-status-scheduled", label: "Scheduled" },
};

const NAV_ITEMS = [
  { section: "Content", items: [
    { icon: "ti-file-text", label: "Posts", badge: "148", key: "posts" },
    { icon: "ti-layout-grid", label: "Pages", key: "pages" },
    { icon: "ti-photo", label: "Media", key: "media" },
    { icon: "ti-tag", label: "Categories", key: "categories" },
  ]},
  { section: "Manage", items: [
    { icon: "ti-users", label: "Authors", key: "authors" },
    { icon: "ti-bell", label: "Comments", badge: "12", key: "comments" },
    { icon: "ti-chart-bar", label: "Analytics", key: "analytics" },
    { icon: "ti-settings", label: "Settings", key: "settings" },
  ]},
];

const ACTIVITY = [
  { dot: "#2ecc8a", text: 'Sam published "State of AI 2026"', time: "3 min ago" },
  { dot: "#e8a735", text: "Riya submitted draft for review", time: "18 min ago" },
  { dot: "#4db2ff", text: '"Design Tokens" scheduled for Fri', time: "1h ago" },
  { dot: "#a89df5", text: "12 new comments pending review", time: "2h ago" },
  { dot: "#2ecc8a", text: "Alex updated site SEO settings", time: "Yesterday" },
];

const CATEGORIES = [
  { label: "Engineering", count: 38, pct: 80 },
  { label: "Design", count: 29, pct: 61 },
  { label: "Product", count: 21, pct: 44 },
  { label: "Culture", count: 14, pct: 30 },
];

const TAGS = ["react", "ai", "design", "typescript", "ux", "api", "performance", "css", "accessibility"];

const FILTERS = [
  { key: "all", label: "All" },
  { key: "published", label: "Published" },
  { key: "draft", label: "Drafts" },
  { key: "scheduled", label: "Scheduled" },
];

function filterPosts(posts, filter) {
  if (filter === "all") return posts;
  if (filter === "published") return posts.filter(p => p.status === "published");
  if (filter === "draft") return posts.filter(p => p.status === "draft" || p.status === "review");
  if (filter === "scheduled") return posts.filter(p => p.status === "scheduled");
  return posts;
}

export default function CMSAdminDashboard() {
  const [activeNav, setActiveNav] = useState("posts");
  const [activeFilter, setActiveFilter] = useState("all");
  const [search, setSearch] = useState("");

  const visiblePosts = filterPosts(ALL_POSTS, activeFilter).filter(p =>
    search === "" || p.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <style>{STYLES}</style>
      <div className="cms-app">
        {/* SIDEBAR */}
        <div className="cms-sidebar">
          <div className="cms-brand">
            <div className="cms-brand-icon">
              <i className="ti ti-layout-columns" />
            </div>
            <div>
              <div className="cms-brand-name">Inkwell CMS</div>
              <div className="cms-brand-sub">Admin panel</div>
            </div>
          </div>

          {NAV_ITEMS.map(group => (
            <div className="cms-nav-section" key={group.section}>
              <div className="cms-nav-label">{group.section}</div>
              {group.items.map(item => (
                <div
                  key={item.key}
                  className={`cms-nav-item${activeNav === item.key ? " active" : ""}`}
                  onClick={() => setActiveNav(item.key)}
                >
                  <i className={`ti ${item.icon}`} />
                  {item.label}
                  {item.badge && <span className="cms-nav-badge">{item.badge}</span>}
                </div>
              ))}
            </div>
          ))}

          <div className="cms-sidebar-footer">
            <div className="cms-user-row">
              <div className="cms-avatar">AK</div>
              <div>
                <div className="cms-user-name">Alex Kim</div>
                <div className="cms-user-role">Super admin</div>
              </div>
            </div>
          </div>
        </div>

        {/* MAIN */}
        <div className="cms-main">
          <div className="cms-topbar">
            <span className="cms-page-title">Posts</span>
            <div className="cms-topbar-actions">
              <div className="cms-search-box">
                <i className="ti ti-search cms-search-icon" />
                <input
                  placeholder="Search posts…"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                />
              </div>
              <button className="cms-btn-primary">
                <i className="ti ti-plus" /> New post
              </button>
            </div>
          </div>

          <div className="cms-content-area">
            {/* Stats */}
            <div className="cms-stats-row">
              <div className="cms-stat-card">
                <div className="cms-stat-label">Published</div>
                <div className="cms-stat-value">94</div>
                <div className="cms-stat-delta up"><i className="ti ti-trending-up" /> +6 this month</div>
              </div>
              <div className="cms-stat-card">
                <div className="cms-stat-label">Drafts</div>
                <div className="cms-stat-value">23</div>
                <div className="cms-stat-delta down"><i className="ti ti-trending-down" /> 3 overdue</div>
              </div>
              <div className="cms-stat-card">
                <div className="cms-stat-label">Scheduled</div>
                <div className="cms-stat-value">8</div>
                <div className="cms-stat-delta up"><i className="ti ti-clock" /> Next in 2h</div>
              </div>
              <div className="cms-stat-card">
                <div className="cms-stat-label">Monthly views</div>
                <div className="cms-stat-value">41.2k</div>
                <div className="cms-stat-delta up"><i className="ti ti-trending-up" /> +12% vs last</div>
              </div>
            </div>

            {/* Table */}
            <div>
              <div className="cms-section-header">
                <span className="cms-section-title">All posts</span>
                <div className="cms-filter-tabs">
                  {FILTERS.map(f => (
                    <button
                      key={f.key}
                      className={`cms-filter-tab${activeFilter === f.key ? " active" : ""}`}
                      onClick={() => setActiveFilter(f.key)}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>
              </div>

              <table className="cms-table">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Author</th>
                    <th>Category</th>
                    <th>Status</th>
                    <th>Date</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {visiblePosts.map((post, i) => {
                    const color = AUTHOR_COLORS[post.colorIdx];
                    const { cls, label } = STATUS_MAP[post.status];
                    return (
                      <tr key={i}>
                        <td>
                          <div className="cms-post-title">{post.title}</div>
                          <div className="cms-post-meta">{post.meta}</div>
                        </td>
                        <td>
                          <div className="cms-author-chip">
                            <div
                              className="cms-author-dot"
                              style={{ background: color.bg, color: color.fg }}
                            >
                              {post.initials}
                            </div>
                            {post.author}
                          </div>
                        </td>
                        <td style={{ color: "#666", fontSize: 12 }}>{post.category}</td>
                        <td><span className={`cms-status-badge ${cls}`}>{label}</span></td>
                        <td style={{ color: "#555", fontSize: 12 }}>{post.date}</td>
                        <td>
                          <div className="cms-row-actions">
                            <button className="cms-icon-btn" title="Edit"><i className="ti ti-edit" /></button>
                            <button className="cms-icon-btn" title="Preview"><i className="ti ti-eye" /></button>
                            <button className="cms-icon-btn" title="Delete"><i className="ti ti-trash" /></button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="cms-panel">
          <div>
            <div className="cms-panel-title">Recent activity</div>
            {ACTIVITY.map((a, i) => (
              <div className="cms-activity-item" key={i}>
                <div className="cms-activity-dot" style={{ background: a.dot }} />
                <div>
                  <div className="cms-activity-text">{a.text}</div>
                  <div className="cms-activity-time">{a.time}</div>
                </div>
              </div>
            ))}
          </div>

          <div>
            <div className="cms-panel-title">Top categories</div>
            {CATEGORIES.map((c, i) => (
              <div className="cms-bar-item" key={i}>
                <div className="cms-bar-label"><span>{c.label}</span><span>{c.count}</span></div>
                <div className="cms-bar-track">
                  <div className="cms-bar-fill" style={{ width: `${c.pct}%` }} />
                </div>
              </div>
            ))}
          </div>

          <div>
            <div className="cms-panel-title">Popular tags</div>
            <div className="cms-tag-cloud">
              {TAGS.map(tag => (
                <span className="cms-tag" key={tag}>{tag}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
