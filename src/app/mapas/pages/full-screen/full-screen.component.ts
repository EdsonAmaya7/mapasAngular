import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"

@Component({
  selector: 'app-full-screen',
  templateUrl: './full-screen.component.html',
  styles: [
    `
    #map{
    width: 100%;
    height: 100%;
    }
`
  ]
})

export class FullScreenComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    

    const map = new mapboxgl.Map({
      container: 'map', // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: [-100.9852957128847, 25.44830448247249], // starting position [lng, lat]
      zoom: 15, // starting zoom
    });

  }

}
