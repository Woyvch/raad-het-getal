import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent {
  title = 'Raad het getal';
  // Variabelen
  hideInputGuess = false;
  hideButtonGuess = false;
  hideButtonReset = true;
  inputGuess = '';
  guessForm: FormGroup;
  // Een willekeurig getal tussen 1 en 100
  randomNumber: number = Math.floor(Math.random()*100);
  // Aantal beurten
  turn = 10;
  result = 'Geef een getal in';
  // De gemaakte keuze weer geven
  choices = '';
  // Constructor
  constructor (private formbuilder: FormBuilder) {
    this.guessForm = this.formbuilder.group({
      gok: '',
    });
  }
  
  onSubmit(choice) {
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
      this.inputGuess = '';
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
    this.choices = '';
    this.result = 'Geef een getal in';
    this.hideInputGuess = false;
    this.hideButtonGuess = false;
    this.hideButtonReset = true;
    // Een nieuw willekeurig getal kiezen
    this.randomNumber = Math.floor(Math.random()*100);
  }
}