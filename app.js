
export default function solitaireGameInit(options) {

    const blankGrid = document.querySelector(".blank-grid");
    const stockBtn = document.querySelector("#stockBtn");
    const pack = [];
    let placeholderNumber = 0;
    
    if (!(Array.isArray(options.suits)) || (options.suits.length === 0)) {
        options.suits = ["spades", "clubs", "diamonds", "hearts"];
        alert("Please, check suits array in your options. Given a default card values");
    }

    if (!(Array.isArray(options.values)) || (options.values.length === 0)) {
        options.values = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
        alert("Please, check values array in your options. Given a default card values");
    }

    if (typeof options.rowsCount !== 'number' || !(options.rowsCount >= 1)) {
        options.rowsCount = '4';
        alert("Please, check rowsCount options. Given a default value of 4 rows");
    }

    if (typeof options.colsCount !== 'number' || !(options.colsCount >= 1)) {
        options.colsCount = '13';
        alert("Please, check colsCount options. Given a default value of 13 columns");
    }

    if (typeof options.stockCount !== 'number' || !(options.stockCount >= 1)) {
        options.stockCount = '52';
        alert("Please, check stockCount options. Given a default value of 52 cards");
    }

    stockBtn.style.cssText = "width: 150px; height: 45px; background-color: #999;";
    // Generate empty blank-grid 
    for (rows = 0; rows < options.rowsCount; rows++) {
        let row = document.createElement("div");
        row.id = "row-" + (rows + 1);
        row.className = "row";
        row.style.cssText = "display: flex; justify-content: center; text-align: center; align-items: center;";
        blankGrid.appendChild(row);

        for (col = 0; col < options.colsCount; col++) {
            let placeholder = document.createElement("div");
            placeholder.id = "placeholder-" + placeholderNumber;
            placeholder.className = "placeholder";
            placeholder.style.cssText = "text-align: center; width: 70px; height: 90px;  border: 1px solid #555;";
            row.appendChild(placeholder);
            placeholderNumber++;
        }
    }

    // Generate and shuffle the pack
    for (let i = 0; i < options.suits.length; i++) {
        for (x = 0; x < options.values.length; x++) {
            let singleCard = {
                Suit: options.suits[i],
                Value: options.values[x]
            };
            pack.push(singleCard);
        }
    }
  

    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
          let j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    // Making the stock
    let packLength = pack.length;
    let stockLength = packLength - options.stockCount;
    let stock = shuffle(pack);
    stock.splice(0, stockLength);


    // Main logic
    document.getElementById("stockBtn").addEventListener('click', () => {
        stockBtn.style.pointerEvents = "none";

        // Get random card from Array
        let randomCard = stock[Math.floor(Math.random() * stock.length)];

        // Get index of the random card 
        let randomCardIndex = stock.indexOf(randomCard);

        // Splice this card from Array
        stock.splice(randomCardIndex, 1);

        // Append presented card to the DOM
        let randomCardSuit = randomCard["Suit"];
        let randomCardValue = randomCard["Value"];

        const presentedCard = document.createElement("p");
            presentedCard.className = "card new-card " + `${randomCardSuit}`;
            presentedCard.id = `${randomCardSuit}-${randomCardValue}`;
            presentedCard.innerHTML = `<p>${randomCardValue}</p>  <p>${randomCardSuit}</p>`;
            presentedCard.style.cssText = "position: absolute; text-align: center; width: 70px; height: 90px;  border: 1px solid #555;"
        let newCard = document.getElementById("presented-card").appendChild(presentedCard);

        const placeholders = document.querySelectorAll(".placeholder");

        placeholders.forEach((placeholder) => {
            placeholder.parentElement.parentElement.style.pointerEvents = "auto";
            placeholder.addEventListener('click', function () {
            // new cards is presented until the stock is finished
                if(stock.length || stock.length === 0) {
                    applyCard(this);
                } 
                if(!stock.length) {
                    stockBtn.disabled = true;
                }
            })
        });

        // Apply presented card onto clicked placeholder
        function applyCard(placeholder) {
            placeholder.style.pointerEvents = "none";
            placeholder.classList.remove('placeholder');
            placeholder.parentElement.parentElement.style.pointerEvents = "none";
            placeholder.className = "card " + `${randomCardSuit}`;
            placeholder.innerHTML = `<p>${randomCardValue}</p><p>${randomCardSuit}</p>`;
            stockBtn.style.pointerEvents = "auto";
            presentedCard.remove();
        }        
    });
}
