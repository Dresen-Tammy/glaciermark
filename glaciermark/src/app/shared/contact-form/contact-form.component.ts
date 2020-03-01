
import { Subscription, Subject } from 'rxjs';
import { DataService, Msg } from '../../services/data/data.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BaseControlValueAccessor } from '../base-control-value-accessor';
import { Message } from 'src/app/models/message';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.less']
})
export class ContactFormComponent extends BaseControlValueAccessor<string> implements OnInit, OnDestroy {
  public contactForm: FormGroup;
  public nameTouched: boolean = false;
  public emailTouched: boolean = false;
  public subjectTouched: boolean = false;
  public messageTouched: boolean = false;
  public response: string = '';
  private msg: Msg;
  private destroy$: Subject<boolean> = new Subject<boolean>();
  public constructor(
    private formBuilder: FormBuilder,
    private data: DataService
  ) {
    super();
  }

  public ngOnInit(): void {
    this.contactForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.pattern('[A-Za-z0-9 _.,!\']*')]],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', [Validators.required, Validators.minLength(3), Validators.pattern('[A-Za-z0-9 _.,!\']*')]],
      message: ['', [Validators.required, Validators.minLength(3), Validators.pattern('[A-Za-z0-9 _.,!"\'$]*')]],
    });
  }

  public ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  public onSubmit(): void {
    const date: string = new Date().toDateString();
    const {name, email, subject, message}: {name: string, email: string, subject: string, message: string} = this.contactForm.value;
    const formRequest: Message = {name, date, email, subject, message};
    this.data.createMessage(formRequest)
    .pipe(takeUntil(this.destroy$))
      .subscribe(
        res => {
          this.msg = res.body;
          if (res.status === 200) {
          this.response = 'Thanks for reaching out. We will contact you right away.';
          this.nameTouched = false;
          this.emailTouched = false;
          this.subjectTouched = false;
          this.messageTouched = false;
          this.contactForm.reset();
          } else if (res.status === 422) {
           this.response = 'There were errors in your input';
          } else {
            this.response = 'Something went wrong. Try again';
          }
        }
      );
  }

  public inputChange($event: any): void {
    switch ($event.target.id) {
      case 'name': {
        this.nameTouched = true;
        break;
      }
      case 'subject': {
        this.subjectTouched = true;
        break;
      }
      case 'email': {
        this.emailTouched = true;
        break;
      }
      case 'message': {
        this.messageTouched = true;
        break;
      }
    }
  }

}
