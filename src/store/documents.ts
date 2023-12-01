import { makeAutoObservable } from 'mobx';

import type IDocument from '@entities/IDocument';

class DocumentsStore {
  constructor() {
    makeAutoObservable(this);
  }

  get ownDocuments(): IDocument[] {
    return [
      { id: 15, name: 'Some document' },
      { id: 77, name: 'Another document' },
    ];
  }
}

export default new DocumentsStore();
