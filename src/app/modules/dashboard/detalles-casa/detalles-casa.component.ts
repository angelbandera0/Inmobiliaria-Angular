import { CasaService } from './../../../services/casa.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Casa } from 'src/app/models/casa.model';

declare var activee: any;
// Declaro las variables de jQuery
declare var jQuery: any;
declare var $: any;
declare var myExtObject: any;
declare var webGlObject: any;
@Component({
  selector: 'app-detalles-casa',
  templateUrl: './detalles-casa.component.html',
  styleUrls: ['./detalles-casa.component.css'],
})
export class DetallesCasaComponent implements OnInit {
  id!: string;
  isLoadImg=false;
  casa!: Casa;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private casaService: CasaService
  ) {}

  ngOnInit(): void {
    activee($);
    this.id = this.route.snapshot.params['id'];
    console.log(this.id);
    this.getCasaById();
  }
  getCasaById() {
    this.casaService.getCasaById(this.id).subscribe({
      next: (res) => {
        this.casa = res.casa;
        console.log(this.casa);
        console.log(this.casa.img);
        this.isLoadImg=true;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
