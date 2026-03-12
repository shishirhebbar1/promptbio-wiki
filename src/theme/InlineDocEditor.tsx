import React, {useEffect, useState} from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import {API_BASE} from '../constants';
import {useEditMode} from './EditModeContext';

function contentForPreview(raw: string): string {
  const lines = raw.split('\n');
  if (lines[0]?.trim() === '---') {
    const end = lines.findIndex((l, i) => i > 0 && l.trim() === '---');
    if (end > 0) return lines.slice(end + 1).join('\n');
  }
  return raw;
}

const BODY_EDIT_CLASS = 'promptbio-edit-mode-active';

export default function InlineDocEditor({docPath}: {docPath: string}) {
  const {setEditMode} = useEditMode();
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [sha, setSha] = useState<string | undefined>(undefined);

  useEffect(() => {
    document.body.classList.add(BODY_EDIT_CLASS);
    return () => document.body.classList.remove(BODY_EDIT_CLASS);
  }, []);

  const loadDoc = React.useCallback(async () => {
    setLoading(true);
    setError(null);
    setMessage(null);
    try {
      const url = `${API_BASE}/doc?path=${encodeURIComponent(docPath)}`;
      const res = await fetch(url);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to load document');
      setContent(data.content ?? '');
      setSha(data.sha);
    } catch (e: any) {
      setError(e.message || 'Error loading document');
      setContent('');
      setSha(undefined);
    } finally {
      setLoading(false);
    }
  }, [docPath]);

  useEffect(() => {
    void loadDoc();
  }, [loadDoc]);

  const handleSave = async () => {
    setSaving(true);
    setError(null);
    setMessage(null);
    try {
      const res = await fetch(`${API_BASE}/doc`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          path: docPath,
          content,
          message: `web-edit: update ${docPath}`,
          sha,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to save document');
      setMessage('Saved (commit ' + (data.commit || '').slice(0, 7) + '...)');
      if (data.sha != null) setSha(data.sha);
      else await loadDoc();
    } catch (e: any) {
      setError(e.message || 'Error saving document');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div style={{padding: '2rem', textAlign: 'center', color: '#666'}}>
        Loading document…
      </div>
    );
  }

  const handleExit = () => {
    void loadDoc(); // discard unsaved changes (reload from server)
    setEditMode(false);
  };

  return (
    <div className="inline-doc-editor-root" style={{marginTop: '0.5rem'}}>
      {error && (
        <div style={{marginBottom: '1rem', color: '#b00020', fontWeight: 500}}>
          {error}
        </div>
      )}
      {message && (
        <div style={{marginBottom: '1rem', color: '#0b8043', fontWeight: 500}}>
          {message}
        </div>
      )}
      <div
        style={{
          display: 'flex',
          gap: '1rem',
          minHeight: '60vh',
          border: '1px solid #ccc',
          borderRadius: 8,
          overflow: 'hidden',
        }}>
        <div
          style={{
            flex: '1 1 50%',
            minWidth: 0,
            display: 'flex',
            flexDirection: 'column',
          }}>
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
      <div style={{marginTop: '1rem', display: 'flex', gap: '0.75rem', flexWrap: 'wrap'}}>
        <button
          type="button"
          onClick={handleSave}
          disabled={saving}
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
          onClick={handleExit}
          style={{
            padding: '0.6rem 1rem',
            borderRadius: 6,
            border: '1px solid #b3261e',
            background: '#b3261e',
            color: '#fff',
            fontWeight: 700,
            cursor: 'pointer',
          }}>
          Exit (discard changes)
        </button>
      </div>
    </div>
  );
}
