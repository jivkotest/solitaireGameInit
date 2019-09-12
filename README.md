# New solitaire game initialization npm module

Generates blank fields and pack of cards with basic functionality to place a card in the fields

## Getting Started

### Prerequisites

* Create empty index.html file in your project
* The file should have the following HTML tags

```html
<div class="blank-grid">
    <button id="stockBtn"></button>
    <div id="presented-card"></div>
</div>
```

## Installation

`npm i solitaire-game-init --save`

## Usage

```js
import solitaireGameInit from "../node_modules/solitaire-game-init/app.js";

solitaireGameInit({
    suits: ["spades", "clubs", "diamonds", "hearts"],
    values: ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"],
    rowsCount: "5",
    colsCount: "5",
    stockCount: "25"
})

```

## Options

* Should be considered that new card is presented until the stock is finished (stockCount = rowsCount * colsCount)

## Built With

* Vanilla JS

## Author

* **Zhivko Kanev**
