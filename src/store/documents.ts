import { makeAutoObservable, runInAction } from 'mobx';
import { Service } from '@api';
import { currentSessionStore } from '@entities/session';
import { DocumentModel } from '@entities/document';

// Видимо, никакого общего стора документов быть не должно, а каждый модуль должен иметь свой стор (и там может быть всего одна загруженная страничка с документами)

class DocumentsStore {
  constructor() {
    makeAutoObservable(this);
  }

  documents: DocumentModel[] = [];

  // todo сделать норм
  get ownDocuments(): DocumentModel[] {
    return this.documents;
  }

  public get isEmpty(): boolean {
    return this.documents.length === 0;
  }

  getDocumentById(id: number): DocumentModel | undefined {
    return this.documents?.find((document) => document.id === id);
  }

  getDocumentByName(name: string): DocumentModel | undefined {
    return this.documents?.find((document) => document.name === name);
  }

  async loadOwnDocuments(): Promise<void> {
    try {
      const creatorId: number = (await Service.getUserInfo()).id;
      const response = await Service.findDocuments(
        undefined,
        undefined,
        undefined,
        creatorId,
      );
      runInAction(() => {
        if (response?.content === undefined) {
          throw new Error('empty response');
        }
        this.documents = response.content.map((d) => new DocumentModel(d));
      });
    } catch (e) {
      console.error(e);
    }
  }

  async createDocument(
    docTypeId: number,
    title: string,
    attributeValues: Map<number, string>,
  ): Promise<void> {
    try {
      if (currentSessionStore.currentUserData !== undefined) {
        const res = await Service.createDocument({
          docTypeId,
          title,
          attributeValues: Array.from(
            attributeValues,
            ([attributeId, value]) => ({ attributeId, value }),
          ),
        });
        runInAction(() => {
          this.documents?.push(new DocumentModel(res));
        });
      } else {
        // todo: Разобраться, как сделать, чтобы не писать эту проверку во всех методах. Декоратор использовать, мб?
        throw new Error(
          'currentUser.data is undefined. Probably, user is not logged in.',
        );
      }
    } catch (e) {
      console.error(e);
    }
  }
}

export default new DocumentsStore();
