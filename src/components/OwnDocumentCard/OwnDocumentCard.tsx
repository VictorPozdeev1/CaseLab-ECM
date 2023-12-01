import { type FC } from 'react';

import type IDocument from '@entities/IDocument';

interface OwnDocumentProps {
  document: IDocument;
}

export const OwnDocument: FC<OwnDocumentProps> = ({ document }) => {
  return (
    <div
      style={{
        border: 'solid black 1px',
        width: '200px',
        height: '50px',
        margin: '10px',
      }}
    >
      <h3>{document.name}</h3>
    </div>
  );
};
