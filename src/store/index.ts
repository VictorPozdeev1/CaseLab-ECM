// Этот файл в итоге должен исчезнуть вместе со всей папкой store.

import documentsStore from './documents';
import attributesStore from './attributes';
import docTypesStore from './documentTypes';
import { injectStores } from '@mobx-devtools/tools';

injectStores({
  documentsStore,
  attributesStore,
});

export { documentsStore, attributesStore, docTypesStore };
