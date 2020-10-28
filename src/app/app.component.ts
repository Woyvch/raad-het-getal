import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent {
  title = 'Raad het getal';
  // Variabelen
  hideInputGuess: boolean = false;
  hideButtonGuess: boolean = false;
  hideButtonReset: boolean = true;
  inputGuess: string = '';
  guessForm: FormGroup;
  // Een willekeurig getal tussen 1 en 100
  randomNumber: number = Math.floor(Math.random()*100);
  // Aantal beurten
  turn: number = 10;
  //result: string = 'Geef een getal in';
  result: string = null;
  // De initiele waarde van de progressbar
  progressBarValue: number = 100;
  // De gemaakte keuze weer geven
  choices: string = '';
  // Constructor
  constructor (
    private _formbuilder: FormBuilder, 
    private _snackBar: MatSnackBar,
    ) {
      this.guessForm = this._formbuilder.group({
      gok: '',
    });
  }

  openSnackBar (message: string, action: string = '') {
    this._snackBar.open(message, action, { duration: 2000 });
  }
  
  onSubmit = (choice)  => {
    // Controleren of er een nummer ingevuld is
    if (Number(choice.guess)) {
      // Controleren of de gok correct is
      if (choice.guess > this.randomNumber) {
        this.result = 'De gok is te hoog!';
      } else if (choice.guess < this.randomNumber) {
        this.result = 'De gok is te laag!';
      } else {
        this.result = 'Je hebt het goed!';
        this.endGame();
      }
      // De gok weer geven en een beurt aftrekken
      this.choices += choice.guess + ' ';
      this.turn -=1;
      this.progressBarValue = this.turn * 10;
      this.inputGuess = '';
      this.openSnackBar(this.result);
      // Geen beurten meer
      if (this.turn <= 0) {
        this.result = 'GAME OVER!';
        this.endGame();
      }
    } else {
      this.result = 'geen geldig nummer ingevoerd!';
    }
  }
  
  endGame() {
    // De knop "Gok" blokkeren om een gok te doen
    this.hideInputGuess = true;
    this.hideButtonGuess = true;
    // De knop weer geven om het spel te herbeginnen
    this.hideButtonReset = false;
  }

  resetGame() {
    // Alles terug zetten naar de beginwaarden
    this.turn = 10;
    this.progressBarValue = 100;
    this.choices = '';
    this.result = 'Geef een getal in';
    this.hideInputGuess = false;
    this.hideButtonGuess = false;
    this.hideButtonReset = true;
    // Een nieuw willekeurig getal kiezen
    this.randomNumber = Math.floor(Math.random()*100);
  }
}