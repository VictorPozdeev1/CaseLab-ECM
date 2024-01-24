import { Service } from '@api';
import { DocumentModel } from '@entities/document';
import { asyncWrapper } from '@shared/utils/asyncWrapper';
import { makeAutoObservable, runInAction } from 'mobx';

export class DocumentViewPageStore {
  protected _document?: DocumentModel;
  protected _pendingRequestCount = 0;
  constructor() {
    makeAutoObservable(this);
  }

  get pendingRequestCount(): number {
    return this._pendingRequestCount;
  }

  get document(): DocumentModel | undefined {
    return this._document ?? undefined;
  }

  clear(): void {
    this._document = undefined;
    this._pendingRequestCount = 0;
  }

  loadDocumentByName = asyncWrapper(
    async (documentName: string): Promise<void> => {
      runInAction(() => {
        this._pendingRequestCount++;
      });
      const response = await Service.findDocuments(documentName);

      if (response?.content === undefined) {
        runInAction(() => {
          this._pendingRequestCount--;
        });
        throw new Error(`Не удалось загрузить документ ${documentName}`);
      }
      const document = response?.content.find(
        (doc) => doc.name === documentName,
      );
      if (document === undefined) {
        runInAction(() => {
          this._pendingRequestCount--;
        });
        throw new Error(`Документ ${documentName} не найден`);
      }
      runInAction(() => {
        this._document = new DocumentModel(document);
        this._pendingRequestCount--;
      });
    },
  );

  loadDocumentById = asyncWrapper(async (id: number): Promise<void> => {
    runInAction(() => {
      this._pendingRequestCount++;
    });
    const document = await Service.getDocumentById(id);
    if (document === undefined) {
      runInAction(() => {
        this._pendingRequestCount--;
      });
      throw new Error(`Не удалось загрузить документ ID:${id}`);
    }
    runInAction(() => {
      this._document = new DocumentModel(document);
      this._pendingRequestCount--;
    });
  });
}
export const documentViewPageStore = new DocumentViewPageStore();
