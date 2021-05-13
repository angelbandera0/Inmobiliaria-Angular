import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
@Injectable({
  providedIn: 'root',
})
export class NotificationsToastrService {
  progressBar = true;
  timeOut = 5000;
  positionClass = 'toast-top-right';
  constructor(private toastr: ToastrService) {}

  showSuccess(msg: string) {
    this.toastr.success( msg,'Notificación:', {
      progressBar: this.progressBar,
      timeOut: this.timeOut,
      positionClass: this.positionClass,
    });
  }
  showError(msg: string) {
    this.toastr.error( msg,'Error:', {
      progressBar: this.progressBar,
      timeOut: this.timeOut,
      positionClass: this.positionClass,
    });
  }
}
