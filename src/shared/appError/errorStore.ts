import { makeAutoObservable, runInAction } from 'mobx';

class ErrorStore {
  errorMessage: string = '';
  showError: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  setError(message: string, isLoginPage: boolean = false): void {
    runInAction(() => {
      this.errorMessage = message;
      this.showError = true;
    });
  }

  clearError(): void {
    runInAction(() => {
      this.errorMessage = '';
      this.showError = false;
    });
  }
}

export default new ErrorStore();
