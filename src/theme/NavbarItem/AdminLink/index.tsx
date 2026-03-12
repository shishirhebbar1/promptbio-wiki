import React from 'react';
import {useLocation} from '@docusaurus/router';
import DefaultNavbarItem from '@theme/NavbarItem/DefaultNavbarItem';

export default function NavbarItemAdminLink(props: any): React.ReactElement {
  const location = useLocation();

  // Hide on homepage
  if (location.pathname === '/' || location.pathname === '') {
    return <></>;
  }

  return <DefaultNavbarItem {...props} />;
}

