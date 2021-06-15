import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Casa } from 'src/app/models/casa.model';
import { CasaService } from 'src/app/services/casa.service';
import { LikesService } from 'src/app/services/likes.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-card-listado',
  templateUrl: './card-listado.component.html',
  styleUrls: ['./card-listado.component.css']
})
export class CardListadoComponent implements OnInit {
  @Input() casa!: Casa;
  idDelete!: string;
  isLiked = false;
  isUser=false;
  like:any;
  constructor(
    private casaService: CasaService,
    private likesService: LikesService,
    private modalService: NgbModal,
  ) {

  }

  ngOnInit(): void {

  }


}
