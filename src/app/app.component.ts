import {Component, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  standalone: true,
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  char?: Char
  score = 0
  running = false
  timer = 5

  chars: Char[] = [
    {
      name: 'sue',
      img: 'sue.webp'
    },
    {
      name: 'dagger',
      img: 'cnd.webp',
    },
    {
      name: 'thor',
      img: 'thor.webp',
    }
  ]

  pick(char: Char) {
    if(this.score == 0 && !this.running) {
      this.running = true;
      this.timer = 60;
      let interval = setInterval(() => {
        console.log("22")
        this.timer -= 1;
        if (this.timer <= 0) {
          clearInterval(interval)
          this.running = false;
        }
      }, 1000)
    }
    if (char.name === this.char?.name) {
      this.score++;
    }
    this.newChar()
  }

  ngOnInit(): void {
    this.newChar()
    console.log("char", this.char)
  }

  newChar() {
    let newChar = this.chars[Math.floor(Math.random() * this.chars.length)]
    while (newChar.name === this.char?.name) {
      newChar = this.chars[Math.floor(Math.random() * this.chars.length)]
    }
    this.char = newChar
    this.shuffle(this.chars)
  }

  shuffle(chars: Char[]) {
    let currentIndex = chars.length;

    // While there remain elements to shuffle...
    while (currentIndex != 0) {

      // Pick a remaining element...
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [chars[currentIndex], chars[randomIndex]] = [
        chars[randomIndex], chars[currentIndex]];
    }
  }
}



interface Char {
  img: string;
  name: string;
}
