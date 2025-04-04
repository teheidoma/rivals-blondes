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
  timer = 30

  chars: Char[] = [
    {
      name: 'Invisible Woman',
      img: 'sue.png'
    },
    {
      name: 'Cloak & Dagger',
      img: 'cnd.png',
    },
    {
      name: 'Hawkeye',
      img: 'hawk.png'
    },
    {
      name: 'Emma Frost',
      img: 'emma.png'
    },
    {
      name: 'Thor',
      img: 'thor.png',
    }
  ]

  pick(char: Char) {
    if(this.score == 0 && !this.running) {
      this.running = true;
      this.timer = 30;
      let interval = setInterval(() => {
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
    while (currentIndex != 0) {

      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [chars[currentIndex], chars[randomIndex]] = [
        chars[randomIndex], chars[currentIndex]];
    }
  }

  protected readonly document = document;
}



interface Char {
  img: string;
  name: string;
}
