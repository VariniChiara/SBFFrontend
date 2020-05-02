import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WholeFilterService {

  k = 0;
  m = 0;
  n = 0;
  p = 0;

  p1 = [];
  n1 = [];

  p2 = [];
  m2 = [];

  p3 = [];
  k3 = [];


  constructor() { }

  setParams(k, m, n, p) {
    this.k = k;
    this.m = m;
    this.n = n;
    this.p = p;
    this.calculateArrays();
  }

  calculateArrays() {
    this.calculate1();
    this.calculate2();
    this.calculate3();
  }

  calculate1() {
    this.p1.length = 0;
    this.n1.length = 0;

    // let myN = this.n * (0.77);
    // const step = this.n * (0.53);

    const step = this.n * (0.53);
    let myN =  this.n * (0.77); // - (9 * step);this.n * 1 - (9 * step); //*

    let index = 0;
    while ( index <= 20) {
      const newN = myN;
      this.n1.push(this.getStrNum(myN));
      this.p1.push(this.calculateP(this.k, this.m, newN));
      myN += step;
      index++;
    }
  }

  calculate2() {

    this.p2.length = 0;
    this.m2.length = 0;

    const step = 100000;
    let myM = this.m - (9 * step);
    let index = 0;

    while (index <= 20) {
      this.m2.push(myM); // Byte
      this.p2.push(this.calculateP(this.k, myM, this.n));
      myM = myM + step;
      index++;
    }

   /* const mkIb = this.m / 8192;
    let myM = mkIb * (0.1123);
    const step = mkIb * (0.0604);
    let index = 0;

    while (index <= 20) {
      const newM = myM * 8192;
      this.m2.push(this.getStrNum(newM));
      this.p2.push(this.calculateP(this.k, newM, this.n));
      myM = myM + step;
      index++;
    }*/

  }

  calculate3() {
    this.k3.length = 0;
    this.p3.length = 0;

    const step = 1; // Math.round(this.k * (0.20));
    let myK = this.k - (9 * step);
    let index = 0;

    while ( index <= 20) {
      this.k3.push(myK);
      this.p3.push(this.calculateP(myK, this.m, this.n));
      myK += step;
      index++;
    }
  }

  calculateP(k, m, n) {
    // pow(1 - exp(-k / (m / n)), k)
    const exp = Math.exp( (- k) / ( m / n));
    const base = 1 - exp;
    return Math.pow( base, k);
  }

  getStrNum(x: number) {
    const xStr = x.toExponential(2);
    const xArr = xStr.split('e');
    return xArr[0];
  }
}
