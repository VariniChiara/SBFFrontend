import { Component, OnInit } from '@angular/core';
import {FilterSettingsService} from '../../../services/filter-settings.service';
import {HttpServiceService} from '../../../services/http-service.service';
import {DataResultsService} from '../../../services/data-results.service';

@Component({
  selector: 'app-filter-parameters',
  templateUrl: './filter-parameters.component.html',
  styleUrls: ['./filter-parameters.component.sass']
})
export class FilterParametersComponent implements OnInit {

  hashFunction = 'MD4';
  saltName = 'Choose file';
  selectedHash = 4;
  nonELemName = 'Choose file';
  dataSetName = 'Choose file';
  formData: FormData = new FormData();


  constructor(public filter: FilterSettingsService, public http: HttpServiceService, public data: DataResultsService) {}

  ngOnInit() {}

   calculate() {
    this.buildJson();                         // build the jason request body

    console.log(this.formData.getAll('parameters').length);
    console.log(this.formData.getAll('uploads[]').length);

    this.http.calculateFilter(this.formData).then(() => { // call server API
      this.data.loadData(1);                           // reload data for charts
      this.formData = new FormData();                     // clean form
    });

  }

  buildJson() {
    const parameters =  {
      hash: this.selectedHash,
      p: this.filter.p,
      m: this.filter.m,
      k: this.filter.k
    };

    this.formData.set('parameters', JSON.stringify(parameters));

    this.formData.append('uploads[]', this.filter.dataSet, 'ElemDataset.csv');
    this.formData.append('uploads[]', this.filter.nonElemDataSet, 'NonElemDataset.csv');

    if (this.filter.salt !== undefined) {
      this.formData.append('uploads[]', this.filter.salt, 'HashSalt.txt');
    }
    console.log(this.formData.getAll('uploads[]').length);
  }

  selectHashFunction(event) {
    const HashFunIndex = event.target.value;
    switch (HashFunIndex) {
      case '1':  this.hashFunction = 'SHA1'; this.selectedHash = 1; break;
      case '4': this.hashFunction =  'MD4'; this.selectedHash = 4; break;
      case '5': this.hashFunction = 'MD5'; this.selectedHash = 5; break;
    }
    this.filter.setHashFunc(this.hashFunction);
  }

  setHashSalt(e) {
    console.log('set salt');
    const str =  e.target.value;
    const fileName = (str.substring(str.lastIndexOf('\\') + 1));
    this.saltName = fileName;
    this.filter.salt = e.target.files[0];
  }

  setElemDataSet(e) {
    console.log('Elem');
    const str =  e.target.value;
    this.dataSetName = (str.substring(str.lastIndexOf('\\') + 1));
    this.filter.dataSet = e.target.files[0];
  }

  setNonElemDataSet(e) {
    console.log('NonElem');
    const str =  e.target.value;
    this.nonELemName = (str.substring(str.lastIndexOf('\\') + 1));
    this.filter.nonElemDataSet = e.target.files[0];
  }

  disableButton() {
    return !this.filter.dataSet ||
        !this.filter.nonElemDataSet ||
        (this.filter.k !== 0 && this.filter.m === 0);
  }
}

