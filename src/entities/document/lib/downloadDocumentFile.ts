import { documentsStore } from '@store/index';

export function downloadDocumentFile(id: number): void {
  if (Number.isNaN(id)) throw new Error('Document id is NaN');
  const documentToDownload = documentsStore.ownDocuments?.find(
    (d) => d.id === id,
  );
  if (documentToDownload === undefined)
    throw new Error('Document info not found in local store');

  /*
  Не, всё-таки ссылки на загрузку файла другие, похоже.
  Например, вот такие:
  
  https://minio.docflow.fokidoki.su/api/v1/buckets/test111/objects/download?prefix=bG9nLnR4dA==&version_id=null
  
  https://minio.docflow.fokidoki.su/api/v1/buckets/dogovoropredostavleniiuslugdata-tsentra/objects/download?prefix=cGV0cnVzaGVua28xNzAxODA0MjU4ODM1LmRvY3g=&version_id=null
  
  Причём этот префикс - это кодировка в Base64.
  Так что, в принципе, можно получить эти урлы.
  
  Ещё в интернете есть какие-то обсуждения этого вопроса, как сделать урлы бэкендерам. Но это если предыдущее не поможет. например: https://stackoverflow.com/questions/66192029/how-to-get-the-file-link-after-successfully-uploading-in-minio
  */

  let relativePath = `${documentToDownload.documentPath}/${documentToDownload.name}`;
  relativePath =
    'dogovoropredostavleniiuslugdata-tsentra/petrushenko1701804258835.docx';
  relativePath = '/test111/log.txt';
  let url = new URL(relativePath, 'https://minio.docflow.fokidoki.su/browser');
  url = new URL(
    'https://minio.docflow.fokidoki.su/api/v1/buckets/dogovoropredostavleniiuslugdata-tsentra/objects/download?prefix=cGV0cnVzaGVua28xNzAxODA0MjU4ODM1LmRvY3g=&version_id=null',
  );

  const link = document.createElement('a');
  // 'data:text/plain;charset=utf-8,' +
  link.setAttribute('href', url.href);
  link.setAttribute('download', '1213.docx');
  // link.setAttribute('target', '_blank');
  // link.style.display = 'none';
  // document.body.appendChild(link);
  link.click();
  // document.body.removeChild(link);
}
