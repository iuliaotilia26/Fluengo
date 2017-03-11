/**
 * Created by Iulia Mustea on 1/26/2017.
 */
//noinspection TypeScriptCheckImport
import { UploadItem }    from 'angular2-http-file-upload';

//noinspection TypeScriptValidateTypes
export class MyUploadItemStudent extends UploadItem {
  constructor(file: any) {
    super();
    this.url = '/api/uploadStudent';
    this.file = file;
  }
}
