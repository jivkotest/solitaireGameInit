# Basic functionality for solitaire games

This package provides a grid of card placeholders with customizable   
number of rows and columns.   
Other customizable options are card suits, values and the number of   
shuffled cards in the stock
(a pile of cards, face down, which are left over   
after setting up the rest of the game).

In your markup you have to provide a button which will pull a new card from the stock   
to be placed on the choosen card placeholder.

## Getting Started

### Prerequisites

* In index.html file you should have the following HTML markup

```html
<div class="blank-grid">
    <button id="stockBtn"></button>
    <div id="presented-card"></div>
</div>
```

In script tag you have specify type *module*

```html
<script type="module" src="app.js"></script>
```

## Installation

`npm i solitaire-game-init --save`

## Usage

Standard French suited deck of 52 cards

```js
import solitaireGameInit from "../node_modules/solitaire-init/app.js";

 solitaireGameInit ({
    suits: ["spades", "clubs", "diamonds", "hearts"],
    values: ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"],
    rowsCount: "4",
    colsCount: "13",
    stockCount: "52"
})

```

## Options

This package supports following required options:

* *suits* - _["spades", "clubs", "diamonds", "hearts"]_ - array of card suits
* *values* - _["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"]_ - array of card values
* *rowsCount* - _"number"_ - count of rows in the grid
* *colsCount* - _"number"_ - count of columns in the grid
* *stockCount* - _"number"_ - count of cards in the stock. New cards will be presented until the stock is finished, thus (stockCount = rowsCount * colsCount)

## Built With

* Vanilla JS

## Author

* **Zhivko Kanev**
