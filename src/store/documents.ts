import { makeAutoObservable, runInAction } from 'mobx';
import { Service } from '@api';
import currentSession from './session';
import { type Document } from '@entities/document';

// Видимо, никакого общего стора документов быть не должно, а каждый модуль должен иметь свой стор (и там может быть всего одна загруженная страничка с документами)

class DocumentsStore {
  constructor() {
    makeAutoObservable(this);
  }

  documents?: Document[];

  // todo сделать норм
  get ownDocuments(): Document[] | undefined {
    return this.documents;
  }

  async getDocuments(): Promise<void> {
    try {
      const creatorId: number = (await Service.getUserInfo()).id;
      const response = await Service.findDocuments(
        undefined,
        undefined,
        undefined,
        creatorId,
      );
      runInAction(() => {
        this.documents = response.content?.map((d) => ({
          ...d,
          date: new Date(d.date as unknown as string),
        }));
      });
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async createDocument(
    docTypeId: number,
    attributeValues: Map<number, string>,
  ): Promise<void> {
    try {
      if (currentSession.currentUserData !== undefined) {
        const res = await Service.createDocument({
          docTypeId,
          title: 'Добавить пользовательское название документа',
          attributeValues: Array.from(
            attributeValues,
            ([attributeId, value]) => ({ attributeId, value }),
          ),
        });
        runInAction(() => {
          this.documents?.push({ ...res, date: new Date(res.date) });
        });
      } else {
        // todo: Разобраться, как сделать, чтобы не писать эту проверку во всех методах. Декоратор использовать, мб?
        throw new Error(
          'currentUser.data is undefined. Probably, user is not logged in.',
        );
      }
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
}

export default new DocumentsStore();
