import { Component, forwardRef, HostBinding , Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AbstractControl, ControlValueAccessor, FormControl, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validator } from '@angular/forms';

@Component({
  selector: 'md-select',
  templateUrl: './medical-select.component.html',
  styleUrls: ['./medical-select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MedicalSelectComponent),
      multi: true
    }
  ]
})
export class MedicalSelectComponent implements OnInit,ControlValueAccessor {
 
 
  @Input() displayAttr: string|null = null;  // Atributo para mostrar
  @Input() keyAttr: string|null = null;      // Atributo para recuperar
  @Input() id: string = '';     
  @Input() data: any[] = [];
  @Input() multiple: boolean = false;
  @Input() disabled: boolean = false;
  @Input() placeholder: string = 'Select Input'; 
  option:any;

  private onTouchedCb?:()=> void;
  private onChangeCb?:(obj:any)=> void;

  // control = new FormControl();
  constructor() {}



  // registerOnValidatorChange?(fn: () => void): void {
  //   throw new Error('Method not implemented.');
  // }


  ngOnInit() {
  
   
  }

  // ngOnChanges(changes: SimpleChanges) {
  //   if (changes['data']) {
  //     // Maneja el cambio en la lista de usuarios
  //     console.log('Users updated:', this.data);
  //   }
  // }


  onTouch(){
    this.onTouchedCb?.();
  }

  onValueChange(event: any): void {
    console.log("onValueChange",event);
    
    this.option = event.value;
   
    this.onChangeCb?.(this.option); // ? si esta el metodo instanciado
  }

  writeValue(obj: any): void {
    console.log("writeValue",obj);
    if(obj){
      this.option = obj;
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
     return p1 == p2;
    }

    return p1[this.keyAttr] == p2[this.keyAttr];
    
}
}
