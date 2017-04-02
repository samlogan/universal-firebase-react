import React from 'react';
import Helmet from 'react-helmet';

export const Head = (props) => {
  const {
    title,
    defaultTitle,
    metadesc,
    canonical,
    nofollow,
    noindex,
    ogDescription,
    ogImage,
    ogTitle
  } = props;

  const meta = [
    {name: 'viewport', content: 'width=device-width, initial-scale=1.0'},
    {name: 'description', content: metadesc },
    {property: 'og:type', content: 'website'},
    {property: 'og:title', content: !ogTitle ? title : ogTitle },
    {property: 'og:description', content: !ogDescription ? metadesc : ogDescription},
    {property: 'og:image', content: ogImage},
    {property: 'robots', content: noindex},
    {property: 'robots', content: nofollow}
  ];

  const links = [
    {rel: 'canonical', href: canonical },
    {rel: 'shortcut icon', href: '/assets/images/favicon.ico' }
  ];

  return (
    <Helmet
      htmlAttributes={{lang: 'en', amp: undefined}}
      title={title}
      defaultTitle={defaultTitle}
      titleAttributes={{itemprop: 'name', lang: 'en'}}
      meta={meta.map(data => {
        if (data.content) return data;
        return {};
      })}
      link={links.map(link => {
        if (link.href) return link;
        return {};
      })}
    />
  );
};
