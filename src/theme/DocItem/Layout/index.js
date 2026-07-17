import React from 'react';
import DocItemLayout from '@theme-original/DocItem/Layout';
import RelatedPages from '@site/src/components/RelatedPages';

export default function DocItemLayoutWrapper(props) {
  return (
    <>
      <DocItemLayout {...props} />
      <RelatedPages />
    </>
  );
}
