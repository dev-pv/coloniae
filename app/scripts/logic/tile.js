/*

tile.js

*/

INVALID_ID = -1;
INVALID_TYPE = INVALID_ID;

OCEAN = -2;
SEA = -1;
SHALLOW = 0;
COAST = 1;
PLAINS = 2;
HILLSIDE = 3;
MOUTAIN = 4;

var Tile = Class.extend(function () {
  // indeks
  this.index = INVALID_ID;
  // pozycja
  this.x = 0;
  this.y = 0;
  // określa wysokość nad poziomem morza (parzyste płaskie, nieparzyste wzgórza)
  this.terrainLevel = SEA;
  // dodatkowe dane dot. terenu
  this.terrainType = undefined;
  // dane budynku
  // TODO: zamienić na buildingId -- przygotowania do serializacji
  this.buildingData = null;
  // id państwa do którego należy ten tile
  this.countryId = INVALID_ID;
  // id wyspy (nie dot. terenów morskich)
  this.islandId = INVALID_ID;
  // maska używana przez budynki z grupy PublicBuilding
  this.publicBuildingMask = 0;
  // id jednostki okupującej dany tile (na morzu statku, na lądzie ew. wojska)
  this.unitId = INVALID_ID;

  this.constructor = function (x, y) {
    this.index = tiles.index(x, y);

    this.x = x;
    this.y = y;
  };
});

function bindUsefulMapFunctions() {
  // bo generalnie pozycję można przedstawiać na 3 sposoby:
  // {x: 1, y: 1}  LUB  x = 1; y = 1;  LUB  xy = 101
  // i te funkcje pomagają operować na tak różnych sposobach przedstawiania

  // rzuca assercją jak out of board
  this.at = function (x, y) {
    x = this.coords(x, y);

    console.assert(this[x.x] != undefined, 'x out of range');
    console.assert(this[x.x][x.y] != undefined, 'y out of range');

    return this[x.x][x.y];
  };

  // zwraca pusty obiekt jak out of board
  this.at_mayRetEmpty = function (x, y) {
    x = this.coords(x, y);

    return this[x.x] != undefined ? this[x.x][x.y] || {} : {};
  };

  this.exsist = function (x, y) {
    x = this.coords(x, y);

    return this[x.x] != undefined && this[x.x][x.y] != undefined ? true : false;
  };

  // miłe funkcje zamieniajace postać obiektową {x: 1, y: 1} na postać liczbową 101 i odwrotnie

  this.coords = function (x, y) {
    if (x instanceof Object) return x;
    else if (y == undefined) return { x: Math.floor(x / 100), y: x - Math.floor(x / 100) * 100 };
    else return { x: x, y: y };
  };

  this.index = function (x, y) {
    if (x instanceof Object) return 100 * x.x + x.y;
    else if (y == undefined) return x;
    else return 100 * x + y;
  };
}

var tiles = new bindUsefulMapFunctions();
