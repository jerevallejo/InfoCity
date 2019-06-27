function SupportTruck(id, historyPositions, historyStates){

    this.id = id;
    this.historyPositions = historyPositions;
    this.historyStates = historyStates;

    var actualIx = 0;

    this.mover = function(callback) {// recibe el recorrido.update
      
        var self = this;
        setTimeout(function() {
            
            callback(historyPositions[actualIx],historyStates[actualIx],id);

            actualIx += 1;
            if(actualIx < historyPositions.length) {
                self.mover(callback);
            }
        }, 1000);
    }
   
 }
