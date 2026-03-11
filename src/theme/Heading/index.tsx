import React from 'react';
import Heading from '@theme-original/Heading';
import type HeadingType from '@theme/Heading';
import {useDocPath} from '../DocPathContext';

type Props = React.ComponentProps<typeof HeadingType>;

export default function HeadingWrapper(props: Props) {
  const ctx = useDocPath();
  const Tag = (props as any).as || 'h2';

  const isHtmlTag =
    typeof Tag === 'string' && /^h[1-6]$/.test(Tag as string);
  const level = isHtmlTag ? Number((Tag as string).slice(1)) : undefined;
  const isEditableLevel = !!ctx && level !== undefined && level >= 2 && level <= 3;

  if (!isEditableLevel) {
    return <Heading {...props} />;
  }

  const children = props.children as React.ReactNode;

  const text =
    typeof children === 'string'
      ? children
      : Array.isArray(children)
      ? children
          .map((c) => (typeof c === 'string' ? c : ''))
          .join(' ')
      : '';

  const editHref =
    ctx && text
      ? `/admin?path=${encodeURIComponent(
          ctx.docPath,
        )}&section=${encodeURIComponent(text)}`
      : undefined;

  if (!editHref) {
    return <Heading {...props} />;
  }

  return (
    <Heading
      {...props}
      children={
        <>
          {children}{' '}
          <a
            href={editHref}
            style={{
              fontSize: '0.7rem',
              marginLeft: '0.5rem',
              textDecoration: 'underline',
            }}>
            Edit
          </a>
        </>
      }
    />
  );
}

