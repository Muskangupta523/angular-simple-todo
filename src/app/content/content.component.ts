import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {
  property!: string;
  datepicker: any;
  array: { texts: string, dates: string }[] = [];
  mus: any;
  completearray: { texts: string, dates: string }[] = [];
  today: any;
  isTextValid: boolean = true;
  isTextTouched: boolean = false;
  minDate: any;
  maxDate: any;
formSubmitted: boolean = false;
currentDate:any=new Date();


constructor() {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1; // January is 0
  const day = today.getDate();
  this.minDate = `${year}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day}`;
  this.maxDate = '2029-10-28';
}

  ngOnInit() {
    this.getlocalstorage();
   
  }


  addtask() {
    if (this.isInputValid()) {


      if (this.mus == null) {
        this.array.push({ texts: this.property, dates: this.datepicker });
        this.property = '';
        this.datepicker = '';
       
        
      } else {
        this.array[this.mus].texts = this.property;
        this.array[this.mus].dates = this.datepicker;
        this.property = '';
        this.datepicker = '';
       
        this.isTextTouched= false;
        this.mus = null;
      }
      

    }
   
    this.setlocalstorage();
  }

  deletetask(i: number) {
    this.array.splice(i, 1);
    this.setlocalstorage();
  }

  edittask(i: number) {
    this.mus = i;
    this.property = this.array[this.mus].texts;
    this.datepicker = this.array[this.mus].dates;
  }

  setlocalstorage() {
    localStorage.setItem('data', JSON.stringify(this.array));
    localStorage.setItem('datatwo', JSON.stringify(this.completearray));
  }

  getlocalstorage() {
    const item = localStorage.getItem('data');
    const itemtwo = localStorage.getItem('datatwo');
    if (item !== null && item !== undefined) {
      this.array = JSON.parse(item);  
    }
    if (itemtwo !== null && itemtwo !== undefined) {
      this.completearray = JSON.parse(itemtwo);
    }
  }

  donetask(i: number) {
    const completedTask = this.array.splice(i, 1)[0];
    this.completearray.push(completedTask);
    console.log("h",this.completearray);

    this.setlocalstorage();
  }

  pendingtask(i: number) {
    const pendingTask = this.completearray.splice(i, 1)[0];
    this.array.push(pendingTask);
    console.log("k",this.array)
    this.setlocalstorage();
  }
  isInputValid(): boolean {
    const currentDate = new Date().toISOString().slice(0, 10);
    this.isTextValid = /^[a-z]{7,}$/.test(this.property.trim())  && this.datepicker !== null && this.datepicker !== undefined;;


    this.isTextTouched = true;

    return /^[a-z]{7,}$/.test(this.property.trim()) && this.datepicker >= currentDate;
  }
}


