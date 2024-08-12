import { Component } from '@angular/core';

interface Manches {
  [clé: number]: [number, number];
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  maxPoints = 162;
  deuxCinquenteDeux = 252;
  donneCourante = 1;
  pointsNous: number = 0;
  pointsEux: number = 0;
  totalDonneNous = 0;
  totalDonneEux = 0;
  totalPointsNous = 0;
  totalPointsEux = 0;
  annonceNous = 0;
  annonceEux = 0;
  resultatDonne: any = [];

  mancheActuelle: number = 0; 
  // resultatsManches: { [clé: number]: [number, number] } = {};
  resultatsManches: Manches = {};
  // resultatsManches: Manches = {0: [0, 0]};

  calculerPointsDonne() {
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
        this.pointsEux = this.deuxCinquenteDeux;
        this.pointsNous = 0;
      }else if( Number(this.annonceEux) === 1 ){
        this.pointsNous = this.deuxCinquenteDeux;
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

    this.resultatDonne = {
      partie: this.donneCourante,
      pointsNous: this.pointsNous,
      pointsEux: this.pointsEux
    };
  }

  razDonne() {
    this.pointsNous = 0;
    this.pointsEux = 0;
    this.annonceNous = 0;
    this.annonceEux = 0;
  }

  ajouterDonne() {
    this.donneCourante++;
    this.totalPointsNous += this.resultatDonne["pointsNous"];
    this.totalPointsEux += this.resultatDonne["pointsEux"];
    this.pointsNous = 0;
    this.pointsEux = 0;
    this.annonceNous = 0;
    this.annonceEux = 0;
    this.resultatDonne = null;
    this.maxPoints = 162;
  }

  nouvelleManche() {
    this.ajouterDonne();
    this.mancheActuelle++ ;
    this.resultatsManches[this.mancheActuelle] = [this.totalPointsNous, this.totalPointsEux];
    console.log(this.resultatsManches)

    this.donneCourante = 1;

    // Manche
    this.totalPointsNous = 0;
    this.totalPointsEux = 0;

    // Donne
    this.pointsNous = 0;
    this.pointsEux = 0;
    this.annonceNous = 0;
    this.annonceEux = 0;
    this.resultatDonne = null;

    this.maxPoints = 162;
  }

  getResultManches() {
    return Object.entries(this.resultatsManches);
  }
}