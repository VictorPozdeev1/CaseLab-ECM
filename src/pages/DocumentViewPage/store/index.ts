import { Service } from '@api';
import { DocumentModel } from '@entities/document';
import { asyncWrapper } from '@shared/utils/asyncWrapper';
import { makeAutoObservable, runInAction } from 'mobx';

export class DocumentViewPageStore {
  protected _document?: DocumentModel;
  constructor() {
    makeAutoObservable(this);
  }

  get document(): DocumentModel | undefined {
    return this._document ?? undefined;
  }

  loadDocumentByName = asyncWrapper(
    async (documentName: string): Promise<void> => {
      const response = await Service.findDocuments(documentName);

      if (response?.content === undefined) {
        throw new Error(`Не удалось загрузить документ ${documentName}`);
      }
      const document = response?.content.find(
        (doc) => doc.name === documentName,
      );
      if (document === undefined) {
        throw new Error(`Документ ${documentName} не найден`);
      }
      runInAction(() => {
        this._document = new DocumentModel(document);
      });
    },
  );

  loadDocumentById = asyncWrapper(async (id: number): Promise<void> => {
    const document = await Service.getDocumentById(id);
    if (document === undefined) {
      throw new Error(`Не удалось загрузить документ ID:${id}`);
    }
    runInAction(() => {
      this._document = new DocumentModel(document);
    });
  });
}
export const documentViewPageStore = new DocumentViewPageStore();
