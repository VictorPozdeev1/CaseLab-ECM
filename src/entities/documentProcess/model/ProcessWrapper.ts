import { Service } from '@api/services/Service';
import { makeAutoObservable, runInAction } from 'mobx';
import { ProcessModel } from './ProcessModel';
import { asyncWrapper } from '@shared/utils/asyncWrapper';
import { type DocProcessDto } from '@api';

export class ProcessWrapper {
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
