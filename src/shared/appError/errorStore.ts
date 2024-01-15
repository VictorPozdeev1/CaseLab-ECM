import { makeAutoObservable, runInAction } from 'mobx';

class ErrorStore {
  errorMessage: string = '';
  showError: boolean = false;
  isLoginPage: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  setLoginPage(): void {
    runInAction(() => {
      this.isLoginPage = true;
    });
  }

  clearLoginPage(): void {
    runInAction(() => {
      this.isLoginPage = false;
    });
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
