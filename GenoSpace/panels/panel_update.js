/* 
 * Creator: Ryan Kophs
 * Organization: University of Colorado: GeneTeam
 * 
 * Description: Global object to handle events taken place in one panel and
 *  and to trigger event listeners in other panels
 *  
 * Dependencies:
 *  backbone.js
 *  underscore.js
 */

var highlightRangeManager = Backbone.Model.extend({
    defaults : {
        range: {
            type: "",
            axis: "",
            domain: []
        }
    },
    setNewRange: function(r) {
        this.set("range" , r);
    }
});

window.highlightedRange = new highlightRangeManager;