function PercolationGrid(n) {
  
  var area = n * n;

  this.grid = [];
  for (var i = 0; i < area; i++) {
    this.grid[i] = false;
  }

  // here we add two 'virtual' sites to the top and bottom of the graph,
  // then connect all nodes on the top row to the top virtual site,
  // and all the nodes on the bottom row to the bottom virtual site.
  // then we can find out if the grid percolates by simply checking if the two virtual sites are connected.
  var sites = area + 2;
  var nodes = new Nodes(sites);

  var top = sites - 2;
  var bottom = sites - 1;

  for (var i = 0; i < n; i++) {
    nodes.union(top, i);
  }

  for (var i = n * (n - 1); i < sites - 2; i++) {
      nodes.union(bottom, i);
  }

  this.percolates = function() {
    return nodes.connected(top, bottom);
  }

  this.open = function(site) {
    this.grid[site] = true;

    // union this node with any adjacent open sites
    if (site % n != 0 && this.grid[site-1]) {
      nodes.union(site, site-1);   // left
    }

    if ((site + 1) % n != 0 && this.grid[site+1]) {
      nodes.union(site, site-1);   // right
    }

    if (site >= n && this.grid[site-n]) {
      nodes.union(site, site-n);   // top
    }

    if (site < area - n && this.grid[site+n]) {
      nodes.union(site, site+n);   // bottom
    }
  }
}