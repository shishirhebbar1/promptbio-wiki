import React, {useEffect, useRef, useState} from 'react';
import Layout from '@theme/Layout';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const API_BASE = 'https://qobjexg86e.execute-api.us-east-1.amazonaws.com';

type DocPath = {
  label: string;
  path: string;
};

const DOCS: DocPath[] = [
  {label: 'Intro (Home)', path: 'docs/intro.md'},
  {label: 'Getting Started', path: 'docs/general/Home/getting-started.md'},
  {label: 'Project Overview', path: 'docs/general/Project/overview.md'},
  {label: 'Data Overview', path: 'docs/general/Data/overview.md'},
  {label: 'Differential Analysis', path: 'docs/general/Analysis/Differential_analysis.md'},
  {label: 'Comparative Analysis', path: 'docs/general/Analysis/Comparative_analysis.md'},
  {label: 'API Reference', path: 'docs/technical/api-reference.md'},
  {label: 'Workbook Overview', path: 'docs/workbook/index.md'},
  {label: 'Tutorial: Differential Analysis', path: 'docs/workbook/tutorial-differential-analysis.md'},
];

/** Find a section by its heading text (e.g. "3. Upload Your Data"). Returns start line index, end line index, and the section text. */
function findSection(
  fullContent: string,
  sectionHeading: string,
): {start: number; end: number; sectionText: string} | null {
  const lines = fullContent.split('\n');
  let sectionStartLevel: number | null = null;
  let sectionStartIndex = -1;
  for (let i = 0; i < lines.length; i++) {
    const m = lines[i].match(/^(#{1,6})\s+(.*)$/);
    if (m) {
      const level = m[1].length;
      const title = m[2].trim();
      if (sectionStartLevel === null) {
        if (title === sectionHeading || title.endsWith(sectionHeading)) {
          sectionStartLevel = level;
          sectionStartIndex = i;
        }
      } else {
        if (level <= sectionStartLevel) {
          return {
            start: sectionStartIndex,
            end: i,
            sectionText: lines.slice(sectionStartIndex, i).join('\n'),
          };
        }
      }
    }
  }
  if (sectionStartIndex >= 0) {
    return {
      start: sectionStartIndex,
      end: lines.length,
      sectionText: lines.slice(sectionStartIndex).join('\n'),
    };
  }
  return null;
}

/** Replace the section (by heading) in fullContent with newSectionText. */
function replaceSection(
  fullContent: string,
  sectionHeading: string,
  newSectionText: string,
): string {
  const result = findSection(fullContent, sectionHeading);
  if (!result) return fullContent;
  const lines = fullContent.split('\n');
  const newLines = newSectionText.split('\n');
  const merged = [
    ...lines.slice(0, result.start),
    ...newLines,
    ...lines.slice(result.end),
  ].join('\n');
  return merged;
}

/** Strip YAML frontmatter for preview so we don't render key: value as content. */
function contentForPreview(raw: string): string {
  const lines = raw.split('\n');
  if (lines[0]?.trim() === '---') {
    const end = lines.findIndex((l, i) => i > 0 && l.trim() === '---');
    if (end > 0) return lines.slice(end + 1).join('\n');
  }
  return raw;
}

export default function AdminPage() {
  const getInitialFromQuery = (): {path: string; section?: string} => {
    if (typeof window === 'undefined') {
      return {path: DOCS[0].path};
    }
    const params = new URLSearchParams(window.location.search);
    const path = params.get('path') || DOCS[0].path;
    const section = params.get('section') || undefined;
    return {path, section};
  };

  const initial = getInitialFromQuery();

  const [selectedPath, setSelectedPath] = useState<string>(initial.path);
  const [sectionHeading] = useState<string | undefined>(initial.section);
  const [content, setContent] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [sha, setSha] = useState<string | undefined>(undefined);
  /** When editing a section, we keep the full document here to merge on save. */
  const fullDocumentRef = useRef<string>('');

  const loadDoc = async (path: string) => {
    setLoading(true);
    setError(null);
    setMessage(null);
    try {
      const url = `${API_BASE}/doc?path=${encodeURIComponent(path)}`;
      const res = await fetch(url);
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to load document');
      }
      const full = data.content ?? '';
      fullDocumentRef.current = full;

      if (sectionHeading) {
        const section = findSection(full, sectionHeading);
        if (section) {
          setContent(section.sectionText);
        } else {
          setContent(full);
        }
      } else {
        setContent(full);
      }
      setSha(data.sha);
    } catch (e: any) {
      setError(e.message || 'Error loading document');
      setContent('');
      setSha(undefined);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadDoc(selectedPath);
  }, [selectedPath]);

  const handleSave = async () => {
    setSaving(true);
    setError(null);
    setMessage(null);
    try {
      const toSave =
        sectionHeading && fullDocumentRef.current
          ? replaceSection(fullDocumentRef.current, sectionHeading, content)
          : content;

      const res = await fetch(`${API_BASE}/doc`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          path: selectedPath,
          content: toSave,
          message: sectionHeading
            ? `web-edit: update section "${sectionHeading}" in ${selectedPath}`
            : `web-edit: update ${selectedPath}`,
          sha,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to save document');
      }
      setMessage(
        'Saved successfully (commit ' + (data.commit || '').slice(0, 7) + '...)',
      );
      await loadDoc(selectedPath);
    } catch (e: any) {
      setError(e.message || 'Error saving document');
    } finally {
      setSaving(false);
    }
  };

  return (
    <Layout title="Admin editor" description="Edit PromptBio wiki docs">
      <main style={{maxWidth: 1200, margin: '0 auto', padding: '2rem 1rem'}}>
        <h1>PromptBio Wiki Admin Editor</h1>
        <p style={{color: '#666', marginBottom: '1rem'}}>
          Only use from a trusted IP. Changes are committed directly to GitHub
          (main branch) and will trigger an Amplify deploy.
        </p>
        {sectionHeading && (
          <p style={{color: '#444', marginBottom: '0.5rem', fontSize: '0.9rem'}}>
            Editing section:&nbsp;
            <strong>{sectionHeading}</strong>
            {' · '}
            <a
              href={`/admin?path=${encodeURIComponent(selectedPath)}`}
              style={{fontSize: '0.85rem'}}>
              Edit full page
            </a>
          </p>
        )}
        {sectionHeading && (
          <p style={{color: '#666', marginBottom: '1rem', fontSize: '0.85rem'}}>
            Only this section is shown below; saving will update just this part of the document.
          </p>
        )}

        <div
          style={{
            marginBottom: '1rem',
            display: 'flex',
            gap: '0.75rem',
            alignItems: 'center',
            flexWrap: 'wrap',
          }}>
          <label htmlFor="doc-select" style={{fontWeight: 600}}>
            Document:
          </label>
          <select
            id="doc-select"
            value={selectedPath}
            onChange={(e) => setSelectedPath(e.target.value)}
            style={{minWidth: 320, padding: '0.4rem'}}>
            {DOCS.map((doc) => (
              <option key={doc.path} value={doc.path}>
                {doc.label} ({doc.path})
              </option>
            ))}
          </select>
          <button
            type="button"
            onClick={() => loadDoc(selectedPath)}
            disabled={loading}
            style={{padding: '0.4rem 0.8rem'}}>
            {loading ? 'Loading…' : 'Reload'}
          </button>
        </div>

        {error && (
          <div
            style={{
              marginBottom: '1rem',
              color: '#b00020',
              fontWeight: 500,
            }}>
            {error}
          </div>
        )}
        {message && (
          <div
            style={{
              marginBottom: '1rem',
              color: '#0b8043',
              fontWeight: 500,
            }}>
            {message}
          </div>
        )}

        <div
          style={{
            display: 'flex',
            gap: '1rem',
            marginBottom: '1rem',
            minHeight: '60vh',
            border: '1px solid #ccc',
            borderRadius: 8,
            overflow: 'hidden',
          }}>
          <div style={{flex: '1 1 50%', minWidth: 0, display: 'flex', flexDirection: 'column'}}>
            <div
              style={{
                padding: '0.4rem 0.75rem',
                background: '#f5f5f5',
                borderBottom: '1px solid #ccc',
                fontSize: '0.8rem',
                fontWeight: 600,
              }}>
              Editor
            </div>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              style={{
                flex: 1,
                width: '100%',
                minHeight: 280,
                fontFamily: 'monospace',
                fontSize: '0.9rem',
                padding: '0.75rem',
                border: 'none',
                resize: 'none',
                outline: 'none',
              }}
            />
          </div>
          <div
            style={{
              flex: '1 1 50%',
              minWidth: 0,
              display: 'flex',
              flexDirection: 'column',
              background: '#fff',
              borderLeft: '1px solid #ccc',
            }}>
            <div
              style={{
                padding: '0.4rem 0.75rem',
                background: '#f5f5f5',
                borderBottom: '1px solid #ccc',
                fontSize: '0.8rem',
                fontWeight: 600,
              }}>
              Preview
            </div>
            <div
              style={{
                flex: 1,
                overflow: 'auto',
                padding: '1rem 1.25rem',
                fontSize: '1rem',
                lineHeight: 1.6,
                color: '#1a1a1a',
                background: '#fff',
              }}
              className="admin-preview markdown">
              <style>{`
                .admin-preview { color: #1a1a1a; }
                .admin-preview h1, .admin-preview h2, .admin-preview h3,
                .admin-preview h4, .admin-preview h5, .admin-preview h6 { color: #000; }
                .admin-preview a { color: #3578e5; }
                .admin-preview a:hover { text-decoration: underline; }
                .admin-preview code { background: #f0f0f0; color: #1a1a1a; padding: 0.15em 0.4em; border-radius: 4px; }
                .admin-preview pre { background: #f5f5f5; color: #1a1a1a; padding: 1rem; border-radius: 6px; overflow: auto; }
                .admin-preview pre code { background: none; padding: 0; }
              `}</style>
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {contentForPreview(content)}
              </ReactMarkdown>
            </div>
          </div>
        </div>

        <div style={{marginTop: '0.5rem', display: 'flex', gap: '0.75rem'}}>
          <button
            type="button"
            onClick={handleSave}
            disabled={saving || loading}
            style={{
              padding: '0.6rem 1.4rem',
              backgroundColor: '#5b47e0',
              border: 'none',
              color: '#fff',
              borderRadius: 6,
              fontWeight: 600,
              cursor: 'pointer',
            }}>
            {saving ? 'Saving…' : 'Save to GitHub'}
          </button>
          <button
            type="button"
            onClick={() => loadDoc(selectedPath)}
            disabled={loading}
            style={{
              padding: '0.6rem 1.0rem',
              borderRadius: 6,
              border: '1px solid #ccc',
              backgroundColor: '#f5f5f5',
              cursor: 'pointer',
            }}>
            Reset
          </button>
        </div>
      </main>
    </Layout>
  );
}

