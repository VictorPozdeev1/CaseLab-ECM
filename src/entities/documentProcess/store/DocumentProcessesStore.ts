import { Service } from '@api/services/Service';
import { makeAutoObservable, runInAction } from 'mobx';
import { ProcessModel } from '../model/ProcessModel';
import { asyncWrapper } from '@shared/utils/asyncWrapper';
import { type DocProcessDto } from '@api';

class ProcessWrapper {
  process: ProcessModel;
  constructor(data: DocProcessDto) {
    this.process = new ProcessModel(data);
    makeAutoObservable(this);
  }

  approve = asyncWrapper(async (comment?: string): Promise<ProcessModel> => {
    const process = await Service.approve(this.process.id, comment);
    runInAction(() => {
      this.process = new ProcessModel(process);
    });
    return this.process;
  });

  reject = asyncWrapper(async (comment?: string): Promise<ProcessModel> => {
    const process = await Service.reject(this.process.id, comment);
    runInAction(() => {
      this.process = new ProcessModel(process);
    });
    return this.process;
  });

  sendToCorrection = asyncWrapper(
    async (comment?: string): Promise<ProcessModel> => {
      const process = await Service.sendToCorrection(this.process.id, comment);
      runInAction(() => {
        this.process = new ProcessModel(process);
      });
      return this.process;
    },
  );

  sendToApprove = asyncWrapper(
    async (comment?: string): Promise<ProcessModel> => {
      const process = await Service.sendToApprove(this.process.id, comment);
      runInAction(() => {
        this.process = new ProcessModel(process);
      });
      return this.process;
    },
  );
}

export class DocumentProcessesStore {
  protected _processes?: Map<number, ProcessWrapper>;

  constructor() {
    makeAutoObservable(this);
  }

  get processesList(): ProcessModel[] | undefined {
    return this._processes !== undefined
      ? Array.from(this._processes.values(), (el) => el.process)
      : undefined;
  }

  get processesCount(): number {
    return this._processes !== undefined ? this._processes.size : 0;
  }

  get isEmpty(): boolean {
    return this.processesCount === 0;
  }

  clear(): void {
    this._processes?.clear();
    this._processes = undefined;
  }

  getProcessById(id: number): ProcessWrapper | undefined {
    return this._processes !== undefined ? this._processes.get(id) : undefined;
  }

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
        if (this._processes === undefined) {
          this._processes = new Map();
        }
        this._processes.set(data.id, new ProcessWrapper(data));
      });
      return this._processes?.get(data.id);
    },
  );

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
      console.log('succcess', this.processesList);

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
      this._processes?.delete(id);
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

  load = asyncWrapper(async (documentId: number): Promise<void> => {
    const response = await Service.findProcessByDocumentId(documentId);
    if (response.length < 1) {
      throw new Error(
        `Не удалось загрузить процессы по документу ${documentId}`,
      );
    }
    runInAction(() => {
      this._processes = new Map(
        response.map((element) => [element.id, new ProcessWrapper(element)]),
      );
    });
  });
}

export const documentProcessesStore = new DocumentProcessesStore();
