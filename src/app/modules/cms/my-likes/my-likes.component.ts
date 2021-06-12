import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Casa } from 'src/app/models/casa.model';
import { MomentService } from 'src/app/services/moment.service';
import { NotificationsToastrService } from 'src/app/services/notifications-toastr.service';
import { UserService } from 'src/app/services/user.service';

declare var activee: any;
// Declaro las variables de jQuery
declare var jQuery: any;
declare var $: any;
declare var myExtObject: any;
declare var webGlObject: any;

@Component({
  selector: 'app-my-likes',
  templateUrl: './my-likes.component.html',
  styleUrls: ['./my-likes.component.css'],
})
export class MyLikesComponent implements OnInit {
  listadoCasas: Casa[] = [];
  id!: string;
  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private momentService: MomentService,
    private modalService: NgbModal,
    private notificationsToastrService: NotificationsToastrService
  ) {}

  ngOnInit(): void {
    activee($);
    this.id = this.route.snapshot.params.id;
    this.userService.misLikes().subscribe({
      next: (res) => {
        console.log(res);
        res.likes.forEach((e: { casa: Casa; }) => {
          this.listadoCasas.push(e.casa);
        });
        console.log(this.listadoCasas);

      },
      error: (res) => {
        console.log(res);
      },
    });
  }
}
