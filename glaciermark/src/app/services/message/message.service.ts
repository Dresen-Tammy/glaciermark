import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Subject, Observable, throwError } from 'rxjs';
import { Message } from '../../models/message';
import { Msg } from '../data/data.service';
import { retry, catchError, takeUntil } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MessageService implements OnDestroy {
  private baseurl = 'https://us-central1-glaciermark.cloudfunctions.net/webApi/api/v1';
  private destroy$: Subject<boolean> = new Subject<boolean>();

  public constructor(private http: HttpClient) {}

  public ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  public createMessage(value: Message): Observable<HttpResponse<Msg>> {
    return this.http.post<Msg>(this.baseurl + '/contact', value, {observe: 'response'})
    .pipe(
      retry(1),
      catchError(this.errorHandler),
      takeUntil(this.destroy$)
    );
  }

  private errorHandler(error): Observable<any> {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      window.alert('There was an error. Please try again.');
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
