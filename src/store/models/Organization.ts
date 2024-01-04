import { type OrgDto } from '@api';
import { makeAutoObservable } from 'mobx';

class Organization {
  id: number;
  name: string;
  inn: string;
  constructor({ id, name, inn }: OrgDto) {
    this.id = id;
    this.name = name;
    this.inn = inn;

    makeAutoObservable(this);
  }
}
export { Organization };
