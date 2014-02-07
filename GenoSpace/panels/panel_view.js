/* 
 * Creator: Ryan Kophs
 * Organization: University of Colorado: GeneTeam
 * 
 * Description: Abstract view to render each graphing panel. To be extended 
 *  into sub models for each graph type.
 *  
 * Dependencies:
 *  backbone.js
 *  underscore.js
 */

var panel_view = Backbone.View.extend({
    initialize: function() {
        this.listenTo(this.model, 'change:updated', function() {
            this.render();
        });

        return this;
    }
});