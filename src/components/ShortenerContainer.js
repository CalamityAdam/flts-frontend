import React from 'react';
import { useStateValue } from '../state';
import { LinkForm, CopyToClipboard } from './index'

function ShortenerContainer(props) {
  const [{ newUrl }] = useStateValue();
  return (
    !newUrl ? (
      <LinkForm />
    ) : (
      <CopyToClipboard newUrl={newUrl} />
    )
  )
};

export default ShortenerContainer;
