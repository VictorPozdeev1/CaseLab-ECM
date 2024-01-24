export enum DocumentStatus {
  NEW = 'NEW',
  WAITING_FOR_APPROVE = 'WAITING_FOR_APPROVE',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  CORRECTING = 'CORRECTING',
  DELEGATED = 'DELEGATED',
}
export type DocumentStatusUnion = `${DocumentStatus}`;

export const documentStatusMap: Record<DocumentStatusUnion, string> = {
  [DocumentStatus.NEW]: 'Создан',
  [DocumentStatus.WAITING_FOR_APPROVE]: 'На рассмотрении',
  [DocumentStatus.APPROVED]: 'Принят',
  [DocumentStatus.REJECTED]: 'Отклонён',
  [DocumentStatus.CORRECTING]: 'Требует правок',
  [DocumentStatus.DELEGATED]: 'Перенаправлен',
};
