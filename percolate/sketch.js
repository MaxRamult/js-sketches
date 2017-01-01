var sketch = new Sketch(100);
sketch.run();

document.getElementById('run').onclick = function() {
  sketch.run();
};

function Sketch(n) {

  this.reset = function() {
    this.nodeWidth = 5;
    this.grid = new PercolationGrid(n);
    this.done = false;
    this.canvas = document.getElementById('canvas');
    this.canvas.width = n * this.nodeWidth;
    this.canvas.height = n * this.nodeWidth;
    
    this.ctx = this.canvas.getContext('2d');
    this.ctx.fillStyle = 'white';
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  };
  
  this.run = function() {
    this.reset();
    while (!this.grid.percolates()) {
      var site = this.getClosedSite();
      this.grid.open(site);
      this.draw(site);
    }
  };

  this.draw = function(site) {
    this.ctx.beginPath();
    this.ctx.rect((site % n) * this.nodeWidth, (Math.floor(site/n)) * this.nodeWidth, this.nodeWidth, this.nodeWidth);
    this.ctx.fill();
  };

  this.getClosedSite = function() {
    var site = Math.floor(Math.random() * (n * n));
    while (this.grid[site]) {
      site = Math.floor(Math.random() * (n * n));
    }
    return site;
  };
}