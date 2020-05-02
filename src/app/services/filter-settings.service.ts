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
  hash = 'MD4';
  salt: File;
  dataSet: File;
  nonElemDataSet: File;

  constructor(public http: HttpServiceService, public data: DataResultsService, public charts: ChartsService) { }

  setDataSet(file: File) {
    this.dataSet = file;
    console.log(file);
    console.log('DataSet: ' + file.name);
  }

  setNonElemDataSet(file: File) {
    this.nonElemDataSet = file;
    console.log(file);
    console.log('NonElement dataset: ' + file.name);
  }

  setHashSalt(file: File) {
    this.salt = file;
    console.log(file);
    console.log('Salt: ' + file.name);
  }

  setHashFunc(hash: string) {
    this.hash = hash;
    console.log(hash);
    console.log('Has function: ' + this.hash);
  }



}
