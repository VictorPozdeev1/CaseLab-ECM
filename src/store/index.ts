// Этот файл в итоге должен исчезнуть вместе со всей папкой store.

import documentsStore from './documents';
import docTypesStore from './documentTypes'; // На текущий момент осталось использование при создании документа
import { injectStores } from '@mobx-devtools/tools';

// temp!
import users from '@widgets/CompanyUsersControlPanel/model';

injectStores({
  documentsStore,
  users,
});

export { documentsStore, docTypesStore };
