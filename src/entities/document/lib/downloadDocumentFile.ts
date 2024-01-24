import { documentsStore } from '@store/index';

export async function downloadDocumentFile(id: number): Promise<string> {
  if (Number.isNaN(id)) throw new Error('Document id is NaN');
  const documentToDownload = documentsStore.ownDocuments?.find(
    (d) => d.id === id,
  );
  if (documentToDownload === undefined)
    throw new Error('Document info not found in local store');

  /*
  В интернете есть какие-то обсуждения генерации нормальных минио-урлов бэкендом. Например: https://stackoverflow.com/questions/66192029/how-to-get-the-file-link-after-successfully-uploading-in-minio
  Там, вероятно, можно будет загружать файлы без логина.
  Сейчас - требуется логин в MinIO.
  */

  const url = getDocumentDownloadLink(
    documentToDownload.documentLink,
    documentToDownload.name,
  );

  const link = document.createElement('a');
  // 'data:text/plain;charset=utf-8,' +
  link.setAttribute('href', url.href);
  link.setAttribute('download', '');
  link.setAttribute('target', '_blank');
  // link.click();
  return url.toString();
}

export function getDocumentDownloadLink(path: string, name: string): URL {
  const bucket = path?.match(/\/(\w+)$/)?.[0];
  return new URL(
    `https://minio.docflow.fokidoki.su/api/v1/buckets${bucket}/objects/download?prefix=${btoa(
      name,
    )}&version_id=null`,
  );
}
