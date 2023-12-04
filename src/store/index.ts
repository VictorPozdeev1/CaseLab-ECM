import currentUserStore from './currentUser';
import documentsStore from './documents';
import atributesStore from './atributes';
import { injectStores } from '@mobx-devtools/tools';

injectStores({
  currentUserStore,
  documentsStore,
  atributesStore,
});

export { currentUserStore, documentsStore, atributesStore };
