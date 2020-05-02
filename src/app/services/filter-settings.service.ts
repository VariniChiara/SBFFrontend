import {Injectable} from '@angular/core';
import {HttpServiceService} from './http-service.service';
import {DataResultsService} from './data-results.service';
import {ChartsService} from './charts.service';

@Injectable({
  providedIn: 'root'
})
export class FilterSettingsService {
  p = 0;  // false positive probability
  m = 0;  // cells
  k = 0;  // hash number
  hash = '4';
  salt: Blob;
  dataSet: Blob;
  nonElemDataSet: Blob;

  constructor(public http: HttpServiceService, public data: DataResultsService, public charts: ChartsService) { }

  setDataSet(file: Blob) {
    this.dataSet = file;
    console.log(file);
  }

  setNonElemDataSet(file: Blob) {
    this.nonElemDataSet = file;
    console.log(file);
  }

  setHashSalt(file: Blob) {
    this.salt = file;
    console.log(file);
  }

  setHashFunc(hash: string) {
    this.hash = hash;
    console.log(hash);
    console.log('Has function: ' + this.hash);
  }


}
