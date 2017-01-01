/*
  Weighted quick union implementation inspired by the following course:
    https://www.coursera.org/learn/algorithms-part1/ 
*/
function Nodes(n) {
  this.id = [];
  this.size = [];

  for (var i = 0; i < n; i++) {
    this.id[i] = i;
    this.size[i] = 1;
  }

  this.connected = function(p, q) {
    return this.root(p) === this.root(q);
  }

  this.union = function(p, q) {
    var i = this.root(p);
    var j = this.root(q);

    if (i === j) {
        return;
    } else if (this.size[i] < this.size[j]) {
        this.id[i] = j;
        this.size[j] += this.size[i];
    } else {
        this.id[j] = i;
        this.size[i] += this.size[j];
    }
  }

  this.root = function(i) {
    while (i != this.id[i]) {
      this.id[i] = this.id[this.id[i]];
      i = this.id[i];
    }
    return i;
  }
}