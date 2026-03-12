import React from 'react';
import {useEditMode} from '../../EditModeContext';
import {useLocation} from '@docusaurus/router';

export default function NavbarItemEditMode(): React.ReactElement {
  const {editMode, setEditMode} = useEditMode();
  const location = useLocation();

  // Hide on homepage
  if (location.pathname === '/' || location.pathname === '') {
    return <></>;
  }

  return (
    <div style={{display: 'flex', alignItems: 'center', gap: '0.25rem'}}>
      <button
        type="button"
        onClick={() => setEditMode(false)}
        style={{
          padding: '0.35rem 0.6rem',
          fontSize: '0.875rem',
          border: `1px solid ${editMode ? '#e0e0e0' : '#3578e5'}`,
          background: editMode ? 'transparent' : '#3578e5',
          color: editMode ? '#666' : '#fff',
          borderRadius: 4,
          cursor: 'pointer',
          fontWeight: editMode ? 400 : 600,
        }}>
        View
      </button>
      <button
        type="button"
        onClick={() => setEditMode(true)}
        style={{
          padding: '0.35rem 0.6rem',
          fontSize: '0.875rem',
          border: `1px solid ${editMode ? '#3578e5' : '#e0e0e0'}`,
          background: editMode ? '#3578e5' : 'transparent',
          color: editMode ? '#fff' : '#666',
          borderRadius: 4,
          cursor: 'pointer',
          fontWeight: editMode ? 600 : 400,
        }}>
        Edit
      </button>
    </div>
  );
}
