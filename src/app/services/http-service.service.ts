import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})

export class HttpServiceService {

 // base = 'https://sbfbackend.herokuapp.com';
  base = 'http://localhost:3000';
  port = '3000';
  ip = this.base; // + ':' + this.port;


  constructor(private http: HttpClient) {
  }

  readUploadedFileAsText = (inputFile) => {
    const temporaryFileReader = new FileReader();

    return new Promise((resolve, reject) => {
      temporaryFileReader.onerror = () => {
        temporaryFileReader.abort();
        reject(new DOMException('Problem parsing input file'));
      };

      temporaryFileReader.onload = () => {
        resolve(temporaryFileReader.result);
      };
      temporaryFileReader.readAsText(inputFile);
    });
  }

  async calculateFilter( formData: FormData) {
    console.time('save');
    console.log('Start save parameters');

    const url1 = this.ip + '/save';

    // tslint:disable-next-line:no-shadowed-variable
    console.log('1');

    await new Promise((res, _) => {
      // tslint:disable-next-line:no-shadowed-variable
      this.http.post(url1, formData).subscribe( _ => res('Ok'));
    });
    console.log('2');
    console.log('Finish save parameters in ');
    console.timeEnd('save');


    console.time('calc');
    console.log('Start calculate filter');

    await this.calc();

    console.log('Finish save parameters in ');
    console.timeEnd('calc');

    console.log('5');
    return 'ok';
  }

  async calc() {
    const url2 = this.ip + '/calculateFilter';
    // tslint:disable-next-line:no-shadowed-variable
    console.log('3');
    // tslint:disable-next-line:no-shadowed-variable
    await new Promise((res, _) => this.http.get(url2).subscribe(_ => {console.log('done'); res('ok'); }));
    console.log('4');
    return 'ok1';
  }

}
