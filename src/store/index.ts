// Этот файл в итоге должен исчезнуть вместе со всей папкой store.

import documentsStore from './documents';
import attributesStore from './attributes';
import docTypesStore from './documentTypes';
import { injectStores } from '@mobx-devtools/tools';

// temp!
import users from '@widgets/CompanyUsersAdministration/model';

injectStores({
  documentsStore,
  attributesStore,
  users,
});

export { documentsStore, attributesStore, docTypesStore };
