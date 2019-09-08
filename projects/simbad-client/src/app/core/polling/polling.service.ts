import { Injectable } from '@angular/core';
import { asyncScheduler, Observable, SchedulerLike, timer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PollingService {

  constructor() { }

  public getTimer(dueTime?: number, period?: number, scheduler: SchedulerLike = asyncScheduler): Observable<number> {
      return timer(dueTime, period, scheduler);
  }
}
