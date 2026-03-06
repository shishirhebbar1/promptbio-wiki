import React, {useEffect, useState} from 'react';
import Layout from '@theme/Layout';

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

export default function AdminPage() {
  const [selectedPath, setSelectedPath] = useState<string>(DOCS[0].path);
  const [content, setContent] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [sha, setSha] = useState<string | undefined>(undefined);

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
      setContent(data.content ?? '');
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
      const res = await fetch(`${API_BASE}/doc`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          path: selectedPath,
          content,
          message: `web-edit: update ${selectedPath}`,
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

        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          style={{
            width: '100%',
            minHeight: '60vh',
            fontFamily: 'monospace',
            fontSize: '0.9rem',
            padding: '0.75rem',
            borderRadius: 6,
            border: '1px solid #ccc',
            resize: 'vertical',
          }}
        />

        <div style={{marginTop: '1rem', display: 'flex', gap: '0.75rem'}}>
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

