import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"

interface MarcadorColor {
  color: string,
  marker?: mapboxgl.Marker,
  centro?: [number, number]
}


@Component({
  selector: 'app-marcadores',
  templateUrl: './marcadores.component.html',
  styles: [
    `
    .mapa-container{
      width : 100%;
      height : 100%;
    }
  
    .list-group{
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 99;
    }

    li{
      cursor:pointer;
    }
    `
  ]
})

export class MarcadoresComponent implements OnInit, AfterViewInit {
  @ViewChild('mapa') divMapa!: ElementRef;
  mapa!: mapboxgl.Map;
  zoomLevel: number = 15;
  center: [number, number] = [-100.9852957128847, 25.44830448247249];

  // arreglo marcadores
  marcadores: MarcadorColor[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {

    this.mapa = new mapboxgl.Map({
      container: this.divMapa.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.center, // starting position [lng, lat]
      zoom: this.zoomLevel, // starting zoom
    });

    const marketHtml: HTMLElement = document.createElement('div')
    marketHtml.innerHTML = 'marcador';


    const marker = new mapboxgl.Marker({
      element: marketHtml
    })
      .setLngLat(this.center)
      .addTo(this.mapa)

    this.leerLocalStorage()

  }

  irMarcador(marcador: MarcadorColor) {
    const { marker } = marcador

    this.mapa.flyTo({
      center: marker!.getLngLat()
    })
  }

  agregarMarcador() {
    const color = "#xxxxxx".replace(/x/g, y => (Math.random() * 16 | 0).toString(16));

    const nuevoMarcador = new mapboxgl.Marker({
      draggable: true,
      color
    })
      .setLngLat(this.center)
      .addTo(this.mapa)

    this.marcadores.push({
      color,
      marker: nuevoMarcador
    })

    this.guardarMarcadoresLocalStorage();

    nuevoMarcador.on('dragend', () => {
      this.guardarMarcadoresLocalStorage();
    })
  }

  guardarMarcadoresLocalStorage() {

    const lngLatArr: MarcadorColor[] = [];

    this.marcadores.forEach(m => {
      const color = m.color;
      const { lng, lat } = m.marker!.getLngLat();

      lngLatArr.push({
        color,
        centro: [lng, lat]
      })

    });

    localStorage.setItem('marcadores', JSON.stringify(lngLatArr))
  }

  leerLocalStorage() {
    if (!localStorage.getItem('marcadores')) {
      return;
    }

    const lngLatArr: MarcadorColor[] = JSON.parse(localStorage.getItem('marcadores')!)

    lngLatArr.forEach(m => {

      const newMarker = new mapboxgl.Marker({
        color: m.color,
        draggable: true
      })
        .setLngLat(m.centro!)
        .addTo(this.mapa)

      this.marcadores.push({
        marker: newMarker,
        color: m.color
      })

      newMarker.on('dragend', () => {
        this.guardarMarcadoresLocalStorage();
      })

    })

  }

  borrarMarcador(index: number){
    // eliminar del mapa
    this.marcadores[index].marker?.remove();
    // eliminar del arreglo
    this.marcadores.splice(index,1)
    // actualizar el localstorage
    this.guardarMarcadoresLocalStorage()
  }

}
