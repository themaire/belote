import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  maxPoints = 162;
  deuxSoixanteDeux = 262;
  partieCourante = 1;
  pointsNous: number = 0;
  pointsEux: number = 0;
  totalPartieNous = 0;
  totalPartieEux = 0;
  totalPointsNous = 0;
  totalPointsEux = 0;
  annonceNous = 0;
  annonceEux = 0;
  resultatPartie: any;

  calculerPointsPartie() {
    if (Number(this.annonceEux) === 20 || Number(this.annonceNous) === 20) {
      this.maxPoints = 182;
    }

    if (Number(this.annonceNous) === 1 && Number(this.annonceEux) === 1){
      this.pointsNous = 0;
      this.pointsEux = 0;
      this.annonceNous = 0;
      this.annonceEux = 0;
    }else if (Number(this.annonceNous) === 1 || Number(this.annonceEux) === 1){
      if( Number(this.annonceNous) === 1 ){
        this.pointsEux = this.deuxSoixanteDeux;
        this.pointsNous = 0;
      }else if( Number(this.annonceEux) === 1 ){
        this.pointsNous = this.deuxSoixanteDeux;
        this.pointsEux = 0;
      }

    }else{
      if (this.pointsNous > this.maxPoints || this.pointsEux > this.maxPoints) {
        console.log("Grands points");
        this.pointsEux = 0;
        this.pointsNous = 0;
      }else if (this.pointsEux === 0 && Number(this.annonceEux) === 0) {
        // Si on rentre NOS points
        console.log("On a rentré NOS points")
        if (Number(this.annonceNous) === 0){
          // Si pas d'annonce
          console.log("Pas d'annonce faite")
          this.pointsEux = this.maxPoints - this.pointsNous;
          this.pointsNous += Number(this.annonceNous);

        }else if (Number(this.annonceNous) === 20){
          // Si NOUS avons belotte
          console.log("Belotte!")
          this.pointsEux = this.maxPoints - (Number(this.annonceNous) + this.pointsNous);
          this.pointsNous += Number(this.annonceNous);
        }

      } else if (this.pointsNous === 0 && Number(this.annonceNous) === 0) {
        // Si on rentre LEURS points
        if (Number(this.annonceNous) === 20){
          this.pointsEux = this.maxPoints - (Number(this.annonceNous) + this.pointsEux);
        }

        if (Number(this.annonceEux) === 0){
          // Si pas d'annonce
          console.log("Pas d'annonce faite")
          this.pointsNous = this.maxPoints - this.pointsEux;

        }else if (Number(this.annonceEux) === 20){
          // Si NOUS avons belotte
          console.log("Belotte!")
          this.pointsNous = this.maxPoints - (Number(this.annonceEux) + this.pointsEux);
          this.pointsEux += Number(this.annonceEux);
        }
      }
    }

    this.resultatPartie = {
      partie: this.partieCourante,
      pointsNous: this.pointsNous,
      pointsEux: this.pointsEux
    };
  }

  raz() {
    this.pointsNous = 0;
    this.pointsEux = 0;
    this.annonceNous = 0;
    this.annonceEux = 0;
  }

  ajouterPartie() {
    this.partieCourante++;
    this.totalPointsNous += this.resultatPartie["pointsNous"];
    this.totalPointsEux += this.resultatPartie["pointsEux"];
    this.pointsNous = 0;
    this.pointsEux = 0;
    this.annonceNous = 0;
    this.annonceEux = 0;
    this.resultatPartie = null;
    this.maxPoints = 162;
  }
}