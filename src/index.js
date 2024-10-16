let inputWidth = document.getElementById("width");
let inputHeight = document.getElementById("height");
let inputProbability = document.getElementById("probability");
let inputNbFire = document.getElementById("nbfire");
let startButton = document.getElementById("start");
let forestContainer = document.getElementById("forestContainer");
let countT = parseInt(document.getElementById('countT').value, 10);


startButton.addEventListener("click", start);

let forestCell = {
    tree: "🌳",
    fire: "🔥",
    burned: "⬛"
};

class Forest {
    forestTab = [forestCell];
    height = 0;
    width = 0;
    probability = 1;

    constructor(height, width, probability) {
        this.height = height;
        this.width = width;
        this.probability = probability;
        this.forestTab = Array(width * height).fill(forestCell.tree);
    }

    getCellNumberByCoord(x, y) {
        return x + y * this.width;
    }
    
    startFire(x, y) {
      if (this.forestTab[this.getCellNumberByCoord(x, y)] === forestCell.tree) {
        this.forestTab[this.getCellNumberByCoord(x, y)] = forestCell.fire;
      }
    }

    startRandomFire() {
        let allume = false;
        while (!allume) {
          let random = Math.floor(Math.random() * (this.width * this.height));

          if (this.forestTab[random] === forestCell.tree) {
            this.forestTab[random] = forestCell.fire;
            allume = true;
          }
        }
    }

    startRandomXFire(nb) {
        for (let i = 0; i < nb; i++) {
            this.startRandomFire();
        }
    }

    propagation() {
        if (this.forestTab.includes(forestCell.fire)) {
          let fireTab = "";
          for (let i = 0; i < this.height; i++) {
            //y
            for (let j = 0; j < this.width; j++) {
              //x
              if (this.forestTab[this.getCellNumberByCoord(j, i)] === forestCell.fire) {
                fireTab += [j + "," + i + "|"];
              }
            }
          }
    
          fireTab = fireTab.split("|");
          fireTab.pop();
          fireTab.forEach((coord) => {
            let xy = coord.split(",");
            let x = Number(xy[0]);
            let y = Number(xy[1]);
            //Z
            if (y > 0) {
              if(this.probability > Math.random()){
                this.startFire(x, y - 1);
              }       
            }
            //S
            if (y < this.height - 1) {
                if(this.probability > Math.random()){
                    this.startFire(x, y + 1);
                }
            }
            //Q
            if (x > 0) {
                if(this.probability > Math.random()){
                    this.startFire(x - 1, y);
                }
            }
            //D
            if (x < this.width - 1) {
                if(this.probability > Math.random()){
                    this.startFire(x + 1, y);
                }
            }
    
            this.forestTab[this.getCellNumberByCoord(x, y)] = forestCell.burned;
          });
          this.display();
          return true;
        } else {
          this.display();
          return false;
        }
    }
    
    play() {
        if (this.propagation()) {
          sleep(500).then(() => {
            this.play();
          });
        } else {
          return;
        }
    }

    display() {
        forestContainer.innerHTML = "";
        for (let i = 0; i < this.width * this.height; i++) {
          let cell = document.createElement("p");
          cell.innerHTML = this.forestTab[i];
          forestContainer.appendChild(cell);
        }
    }
}

function start() {
    let width = inputWidth.value;
    let height = inputHeight.value;
    let NbFire = inputNbFire.value;
    let probability = inputProbability.value;
    countT = 0;
    document.getElementById('countT').value = countT;
    
    setGridTemplate(width);

    let forest = new Forest(height, width, probability);

    forest.startRandomXFire(NbFire); 
    forest.play();
}

function setGridTemplate(width) {
    forestContainer.style.gridTemplateColumns = "1fr ".repeat(width);
}
function sleep(ms) {
    countT++;
    document.getElementById('countT').value = countT;
    return new Promise(resolve => setTimeout(resolve, ms));
}

