import { documentsStore } from '@store/index';

export function downloadDocumentFile(id: number): void {
  if (Number.isNaN(id)) throw new Error('Document id is NaN');
  const documentToDownload = documentsStore.ownDocuments?.find(
    (d) => d.id === id,
  );
  if (documentToDownload === undefined)
    throw new Error('Document info not found in local store');

  /*
  В интернете есть какие-то обсуждения генерации нормальных минио-урлов бэкендом. Например: https://stackoverflow.com/questions/66192029/how-to-get-the-file-link-after-successfully-uploading-in-minio
  Но, в принципе, сейчас оно работает и так.
  */

  const url = new URL(
    `https://minio.docflow.fokidoki.su/api/v1/buckets/${documentToDownload.documentPath
      .split('/')
      .pop()}/objects/download?prefix=${btoa(
      documentToDownload.name,
    )}&version_id=null`,
  );
  const link = document.createElement('a');
  // 'data:text/plain;charset=utf-8,' +
  link.setAttribute('href', url.href);
  link.setAttribute('download', '');
  // link.setAttribute('target', '_blank');
  link.click();
}
