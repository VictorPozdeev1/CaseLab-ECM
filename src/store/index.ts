import currentSessionStore from '@entities/session/session';
import documentsStore from './documents';
import attributesStore from './attributes';
import docTypesStore from './documentTypes';
import errorStore from '@entities/session/errorStore';
import { injectStores } from '@mobx-devtools/tools';

injectStores({
  currentUserStore: currentSessionStore,
  documentsStore,
  attributesStore,
  errorStore,
});

export {
  currentSessionStore,
  documentsStore,
  attributesStore,
  docTypesStore,
  errorStore,
};
