import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-ejercicio",
  templateUrl: "./ejercicio.component.html",
  styleUrls: ["./ejercicio.component.css"]
})
export class EjercicioComponent implements OnInit {
  @Input() ejercicio;

  constructor() {}

  ngOnInit() {}
}
