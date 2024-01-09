import currentSessionStore from './session';
import documentsStore from './documents';
import attributesStore from './attributes';
import docTypesStore from './documentTypes';
import { injectStores } from '@mobx-devtools/tools';

injectStores({
  currentUserStore: currentSessionStore,
  documentsStore,
  attributesStore,
});

export { currentSessionStore, documentsStore, attributesStore, docTypesStore };
