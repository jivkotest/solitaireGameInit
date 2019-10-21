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
    for (let rows = 0; rows < options.rowsCount; rows++) {
        const row = document.createElement("div");
        row.id = `row - ${rows + 1}`;
        row.className = "row";
        row.style.cssText = "display: flex; justify-content: center; text-align: center; align-items: center;";
        blankGrid.appendChild(row);

        for (let col = 0; col < options.colsCount; col++) {
            const placeholder = document.createElement("div");
            placeholder.id = `placeholder - ${placeholderNumber}`;
            placeholder.className = "placeholder";
            placeholder.style.cssText = "text-align: center; width: 70px; height: 90px;  border: 1px solid #555;";
            row.appendChild(placeholder);
            placeholderNumber++;
        }
    }

    // Generate and shuffle the pack
    for (let i = 0; i < options.suits.length; i++) {
        for (let x = 0; x < options.values.length; x++) {
            const singleCard = {
                Suit: options.suits[i],
                Value: options.values[x]
            };
            pack.push(singleCard);
        }
    }

    function shuffle(pack) {
        for (let i = pack.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [pack[i], pack[j]] = [pack[j], pack[i]];
        }
        return pack;
    }

    // Making the stock
    const packLength = pack.length;
    const stockLength = packLength - options.stockCount;
    const stock = shuffle(pack);
    stock.splice(0, stockLength);

    // Main logic
    stockBtn.addEventListener('click', appendPresentedCard);

    function appendPresentedCard() {

        // Get random card from Array
        const randomCard = stock[Math.floor(Math.random() * stock.length)];

        // Get index of the random card 
        const randomCardIndex = stock.indexOf(randomCard);

        // Splice this card from Array
        stock.splice(randomCardIndex, 1);

        // Append presented card to the DOM
        const randomCardSuit = randomCard.Suit;
        const randomCardValue = randomCard.Value;

        const presentedCard = document.createElement("p");
        presentedCard.className = `new-card ${randomCardSuit}`;
        presentedCard.id = `${randomCardSuit}-${randomCardValue}`;
        presentedCard.innerHTML = `<p>${randomCardValue}</p>  <p>${randomCardSuit}</p>`;
        presentedCard.style.cssText = "position: absolute; text-align: center; width: 70px; height: 90px;  border: 1px solid #555;"
        const newpresentedCard = document.getElementById("presented-card").appendChild(presentedCard);

        stockBtn.style.pointerEvents = "none";
        blankGrid.style.pointerEvents = "auto";
    }

    blankGrid.addEventListener('click', play);

    function play(e) {
        const newCard = document.querySelector(".new-card");
        const { target } = e;

        if (target.classList.contains('placeholder')) {
            target.innerHTML = newCard.innerHTML;
            newCard.remove();
            stockBtn.style.pointerEvents = "auto";
            blankGrid.style.pointerEvents = "none";
            target.style.pointerEvents = "none";

            if (!stock.length) {
                stockBtn.disabled = true;
                blankGrid.style.pointerEvents = "none";
                const placeholders = [].slice.call(document.querySelectorAll('.placeholder'));
                const dealtCardsArray = placeholders.map((placeholders) => placeholders.firstChild.innerHTML);
                dealtCards(dealtCardsArray);
            }
        }
    }

    // Logs an array of the placed cards values once the grid is filled in
    function dealtCards(dealtCardsArray) {
        console.log(dealtCardsArray);
    }
}
