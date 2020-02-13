import { ControlValueAccessor } from '@angular/forms';

export class BaseControlValueAccessor<T> implements ControlValueAccessor {
  public value: T;
  public disabled: boolean = false;
  public onChange: (newVal: T) => void = () => {};
  public onTouched: (_?: any) => void = () => {};

  public writeValue(obj: T): void {
    this.value = obj;
  }

  public registerOnChange(fn: (newVal: T) => void): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  public setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
