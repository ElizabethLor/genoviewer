/* 
 * Creator: Ryan Kophs
 * Organization: University of Colorado: GeneTeam
 * 
 * Description: Extends panel_model object carry data for the stacked bar chart
 *  
 * Dependencies:
 *  backbone.js
 *  underscore.js
 *  panel_model.js
 *  stack_mock_data.js
 */

var stack_model = panel_model.extend({
    defaults: _.extend({}, panel_model.prototype.defaults, {
        highlight_axis: "x",
        axes: {x: "", y: ""},
        ordinals: {x:[], layers:[]},
        ymax: 0,
        ymin: 0,
        spacer: 0.2
    }),
    set_x_axis: function(t) {
        this.get("axes").x = t;
        return this;
    },
    set_y_axis: function(t) {
        this.get("axes").y = t;
        return this;
    },
    set_x_ordinals: function(names) {
        var o = this.get("ordinals");
        o.x.names = names;
        return this;
    },
    set_data: function(d) {
        this.set("data", d);
        var max = _.reduce(this.get("data"), function(memo, arr) {
            var r = _.reduce(arr, function(memo, num) {
                return memo + num;
            }, 0);
            return (memo > r) ? memo : r;
        }, 0);
        this.set("ymax", max);
        return this;
    },
    set_spacer: function(s) {
        this.set("spacer", s);
        return this;
    },
    set_layers_ordinals: function(names) {
        var o = this.get("ordinals");
        o.layers = names;
        return this;
    },
    build: function() {
        this.listenTo(highlightedRange, "change", function(a) {
            if(a.get("range").axis === this.get("axes").x){
                this.set_data(mockData.getStacks(a.get("range").domain))
                .set_x_ordinals(a.get("range").domain).build();
            }
        });
        this.set("updated", this.get("updated") + 1);
        return this;
    }
});