import { Service } from '@api/services/Service';
import { makeAutoObservable, runInAction } from 'mobx';
import { asyncWrapper } from '@shared/utils/asyncWrapper';
import { ProcessWrapper } from '../model/ProcessWrapper';
import { type ProcessModel } from '../model/ProcessModel';

export class DocumentProcessesStore {
  protected _processes: Map<number, ProcessWrapper> = new Map<
    number,
    ProcessWrapper
  >();

  constructor() {
    makeAutoObservable(this);
  }

  get processesList(): ProcessModel[] {
    return Array.from(this._processes.values(), (el) => el.process);
  }

  get processesCount(): number {
    return this._processes.size;
  }

  get isEmpty(): boolean {
    return this.processesCount === 0;
  }

  // возвращает массив id проверяющих
  get reviewerIds(): number[] {
    return this.processesList
      .map((el) => el.recipient)
      .filter((el, index, arr) => arr.indexOf(el) === index);
  }

  // возвращает массив id организаций в которые были направлены процессы
  get companiesIds(): number[] {
    return this.processesList
      .map((el) => el.recipientOrganization)
      .filter((el, index, arr) => arr.indexOf(el) === index);
  }

  clear(): void {
    this._processes?.clear();
  }

  getProcessById(id: number): ProcessWrapper | undefined {
    return this._processes.get(id);
  }

  // создать процесс в своей организации
  create = asyncWrapper(
    async (
      documentId: number,
      recipientId: number,
    ): Promise<ProcessWrapper | undefined> => {
      const data = await Service.createNewProcess(documentId, recipientId);
      if (data === undefined) {
        throw new Error('Не удалось создать процесс');
      }

      runInAction(() => {
        if (this._processes === undefined) {
          this._processes = new Map();
        }
        this._processes.set(data.id, new ProcessWrapper(data));
      });
      return this._processes?.get(data.id);
    },
  );

  // создать процесс в другой организации
  createProcessInCompany = asyncWrapper(
    async (
      documentId: number,
      companyId: number,
    ): Promise<ProcessWrapper | undefined> => {
      const data = await Service.createNewProcessWithCompany(
        documentId,
        companyId,
      );
      if (data === undefined) {
        throw new Error('Не удалось создать процесс');
      }
      runInAction(() => {
        this._processes.set(data.id, new ProcessWrapper(data));
      });
      return this._processes.get(data.id);
    },
  );

  // создать процесс и направить на согласование
  createAndSend = asyncWrapper(
    async (
      documentId: number,
      {
        isOwnCompany,
        recipientId,
      }: { isOwnCompany: boolean; recipientId: number },
      comment?: string,
    ): Promise<ProcessModel | undefined> => {
      const [newProcess, error] = isOwnCompany
        ? await this.create(documentId, recipientId)
        : await this.createProcessInCompany(documentId, recipientId);

      if (error !== null) {
        throw error as Error;
      }

      const [sentProcess, sentError] = await (
        newProcess as ProcessWrapper
      )?.sendToApprove(comment);
      if (sentProcess === null) {
        throw sentError;
      }

      return sentProcess;
    },
  );

  delete = asyncWrapper(async (id: number): Promise<void> => {
    await Service.deleteProcess(id);
    runInAction(() => {
      this._processes.delete(id);
    });
  });

  // удаляет все процессы, связанные с документом
  deleteAll = asyncWrapper(async (): Promise<void> => {
    if (this.processesList === undefined) {
      return;
    }
    const requests = this.processesList?.map(
      async (el) => await this.delete(el.id),
    );
    const responses = await Promise.allSettled(requests);
    const rejected = responses.filter((el) => el.status === 'rejected');
    if (rejected.length === 0) {
      this.clear();
    } else {
      console.error('Не удалоь удалить процессы', rejected);
    }
  });

  // загрузка всех процессов, связанных с документом
  load = asyncWrapper(async (documentId: number): Promise<void> => {
    const response = await Service.findProcessByDocumentId(documentId);
    if (response.length < 1) {
      throw new Error(
        `Не удалось загрузить процессы по документу ${documentId}`,
      );
    }
    runInAction(() => {
      response.forEach((element) => {
        this._processes.set(element.id, new ProcessWrapper(element));
      });
    });
  });
}

export const documentProcessesStore = new DocumentProcessesStore();
