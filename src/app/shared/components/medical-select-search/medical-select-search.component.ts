import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { AbstractControl, ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, ValidationErrors, Validator } from '@angular/forms';
import { BehaviorSubject, Observable, scan, Subscription } from 'rxjs';

@Component({
  selector: 'md-select-search',
  templateUrl: './medical-select-search.component.html',
  styleUrls: ['./medical-select-search.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MedicalSelectSearchComponent),
      multi: true
    }
  ]
})
export class MedicalSelectSearchComponent implements OnInit,ControlValueAccessor {
  
 
  @Input() displayAttr: string|null = null;  // Atributo para mostrar
  @Input() keyAttr: string|null = null;      // Atributo para recuperar
  @Input() id: string = '';     
  // @Input() data: any[] = [];
  @Input() multiple: boolean = false;
  @Input() disabled: boolean = false;
  @Input() placeholder: string = 'Select Input'; 
  optionSelect:any;
  total = 100;
  data = Array.from({length: this.total}).map((_, i) => `Option ${i}`);
  limit = 10;
  offset = 0;
  options = new BehaviorSubject<any[]>([]);
  options$: Observable<any[]>;


  
  searchCtrl: FormControl = new FormControl();
  subscriptions: Subscription[] = [];
  private onTouchedCb?:()=> void;
  private onChangeCb?:(obj:any)=> void;

  constructor() {

    this.options$ = this.options.asObservable().pipe(
      scan((acc:any, curr: any) => {
          return [...acc, ...curr];
      }, [])
  );

    this.subscriptions.push(
      this.searchCtrl.valueChanges.subscribe((val) => this.onSearchChange(val))
    );

  }



  ngOnInit() {
    this.getNextBatch();
   
  }

  getNextBatch() {
    const result = this.data.slice(this.offset, this.offset + this.limit);
    this.options.next(result);
    this.offset += this.limit;
}
  onSearchChange(e:string): void  {
    console.log(`Search Changed: ${e}`);
  
}

  onTouch(){
    this.onTouchedCb?.();
  }

  onValueChange(event: any): void {
    console.log("onValueChange",event);
    
    this.optionSelect = event.value;
   
    this.onChangeCb?.(this.optionSelect); // ? si esta el metodo instanciado
  }

  writeValue(obj: any): void {
    console.log("writeValue",obj);
    if(obj){
      this.optionSelect = obj;
    }
 
 
  }
  registerOnChange(fn: any): void {

    this.onChangeCb = fn;
    // this.control.registerOnChange(fn);

  }
  registerOnTouched(fn: any): void {

    this.onTouchedCb=fn;
    // this.control.addT(fn);
  }
  setDisabledState(isDisabled: boolean): void {

    this.disabled = isDisabled;
  }

  compareTo(p1:any, p2: any): boolean {
    if (!p1 || !p2) {
      return false;
    }

    if(!this.keyAttr){
     return p1 === p2;
    }

    return p1[this.keyAttr] === p2[this.keyAttr];
    
}
}
