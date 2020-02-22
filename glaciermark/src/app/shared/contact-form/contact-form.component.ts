import { Subscription } from 'rxjs';
import { DataService } from '../../services/data/data.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BaseControlValueAccessor } from '../base-control-value-accessor';
import { Message } from 'src/app/models/message';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.less']
})
export class ContactFormComponent extends BaseControlValueAccessor<string> implements OnInit {
  public contactForm: FormGroup;
  public nameTouched: boolean = false;
  public emailTouched: boolean = false;
  public subjectTouched: boolean = false;
  public messageTouched: boolean = false;
  public response: string = '';

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

  public onSubmit(): void {
    const date: string = new Date().toDateString();
    console.log('in onSubmit');
    const {name, email, subject, message}: {name: string, email: string, subject: string, message: string} = this.contactForm.value;
    const formRequest: Message = {name, date, email, subject, message};
    this.data.createMessage(formRequest)
      .subscribe(
        res => {
          console.log('in Response');
          this.response = 'Thanks for reaching out. We will contact you right away.';
          this.nameTouched = false;
          this.emailTouched = false;
          this.subjectTouched = false;
          this.messageTouched = false;
          this.contactForm.reset();
        }
      );
      this.contactForm.reset();
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
