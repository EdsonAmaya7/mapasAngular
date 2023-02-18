import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"

@Component({
  selector: 'app-mini-mapa',
  templateUrl: './mini-mapa.component.html',
  styles: [
    `
   div {
        width: 100%;
        height: 150px;
        margin: 0px;
      }
    `
  ]
})
export class MiniMapaComponent implements AfterViewInit {

  @ViewChild('mapaComponent') divMapaDos!: ElementRef;
  @Input() lngLat!: [number, number] ;

  constructor() {}


  ngAfterViewInit(): void {

    const mapa = new mapboxgl.Map({
      container: this.divMapaDos.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.lngLat,
      zoom: 15, // starting zoom
      interactive: false
    });

    new mapboxgl.Marker()
        .setLngLat( this.lngLat )
        .addTo( mapa );
  }

}