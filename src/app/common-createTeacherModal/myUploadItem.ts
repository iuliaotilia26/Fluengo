/**
 * Created by Iulia Mustea on 1/17/2017.
 */
//noinspection TypeScriptCheckImport
import { UploadItem }    from 'angular2-http-file-upload';

//noinspection TypeScriptValidateTypes
export class MyUploadItem extends UploadItem {
  constructor(file: any) {
    super();
    this.url = '/api/upload';
    this.file = file;
  }
}
