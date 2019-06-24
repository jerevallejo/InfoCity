function Movil(color, historyPositions, id) {
    this.id = id;
  	this.estado = color;
    this.historyPositions = historyPositions;

    var actualIx = 0;

    this.run = function(callback) {
        var self = this;
        setTimeout(function() {
            callback(historyPositions[actualIx]);

            actualIx += 1;
            if(actualIx < historyPositions.length) {
                self.run(callback);
            }
        }, 1000);
    }
};
