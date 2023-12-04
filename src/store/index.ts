import currentUserStore from './currentUser';
import documentsStore from './documents';
import attributesStore from './attributes';
import { injectStores } from '@mobx-devtools/tools';

injectStores({
  currentUserStore,
  documentsStore,
  attributesStore,
});

export { currentUserStore, documentsStore, attributesStore };
