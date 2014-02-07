/* 
 * Creator: Ryan Kophs
 * Organization: University of Colorado: GeneTeam
 * 
 * Description: Abstract model to carry data and settings for each graphing 
 *  panel. To be extended into sub models for each graph type.
 *  
 * Dependencies:
 *  backbone.js
 *  underscore.js
 */


var panel_model = Backbone.Model.extend({
    defaults: {
        title: "New Panel",
        highlight_axis: "",
        query: nop,
        updated: 0,
        data: [],
        axes: {},
        ordinals: [],
    },
    set_title: function(t) {
        this.set("title", t);
        return this;
    }
});

//    execute: function() {
//        this.buildScales().buildAxes().buildStacks();
//        return this;
//    },
//    init: function() {
//        this.set_margins()
//            .buildSVG();
//        return this;
//    },
//    render: function(){
//        this.init();
//        this.execute();
//        return this;
//    },
//    set_margins: function(){
//
//        if (!this.margin) {
//            this.margin = {
//                top: 10,
//                right: 10,
//                bottom: 50,
//                left: 50
//            };
//        }
//
//        this.width = this.$el.width() - this.margin.left - this.margin.right;
//        this.height = this.$el.height() - this.margin.top - this.margin.bottom;
//        return this;
//    },
//    buildSVG : function() {
//        this.svg = d3.select(this.el)
//                .append("svg")
//                .attr("width", this.width + this.margin.left + this.margin.right)
//                .attr("height", this.height + this.margin.top + this.margin.bottom)
//                .append("g")
//                .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");
//        return this;
//    },
//    buildScales: function() {
//        var o = this;
//        this.y = d3.scale.linear()
//                .domain([o.model.get("ymin"), o.model.get("ymax")])
//                .range([o.height, 0]);
//        this.x = d3.scale.ordinal()
//                .domain(o.model.get("ordinals").x.names)
//                .rangeRoundBands([0, o.width], o.model.get("spacer"));
//        return this;
//    },
//    buildAxes: function() {
//        var ticks = 10;
//        var obj = this;
//        var hticks = obj.svg.append("g")
//                .attr("class", "ylabels")
//                .selectAll('.ticky').data(obj.y.ticks(7))
//                .enter()
//                .append('g')
//                .attr("transform", function(st) {
//            return "translate(0, " + (obj.y(st)) + ")";
//        }).attr("class", "ticky");
//
//        hticks.append("line")
//                .attr("x1", 0).attr("x2", obj.width).attr("y1", 0).attr("y2", 0)
//                .attr("class", "chart-grid");
//        hticks.append("text")
//                .text(function(st) {
//            return obj.model.formatNumber(st);
//        }).attr('text-anchor', 'end')
//                .attr('dy', 2).attr('dx', -4)
//                .attr("class", "chart-label-text");
//
//        var vticks = obj.svg.append("g")
//                .attr("class", "xlabels")
//                .selectAll('.tickx').data(obj.model.get("ordinals").x.names)
//                .enter()
//                .append('g')
//                .attr("transform", function(st) {
//            return "translate( " + (obj.x(st)) + ", " + (obj.height + obj.margin.top) + ")";
//        }).attr("class", "tickx");
//
//
//        vticks.append("text")
//                .text(function(st) {
//            return st;
//        }).attr('text-anchor', 'end').attr("transform", function(st) {
//            return "rotate(-65)";
//        })
//                .attr('dy', 12).attr('dx', 2)
//                .attr("class", "chart-label-text");
//        return this;
//    }, 
//    buildStacks: function() {
//        var o = this;
//        o.svg.append("g")
//                .attr("class", "bars")
//                .selectAll("g")
//                .data(o.model.get("data"))
//                .enter()
//                .append("g")
//                .attr("class", "stack")
//                .selectAll("rect")
//                .data(function(st) {
//            var sum = 0;
//            var stackArr = new Array();
//            for (var i = 0; i < st.length; i++) {
//                sum += st[i];
//                stackArr.push({
//                    height: st[i],
//                    y0: sum
//                });
//            }
//            return stackArr;
//        }).enter()
//                .append("rect")
//                .attr({
//            "x": function(st, i, j) {
//                return o.x(o.model.get("ordinals").x.names[j]);
//            },
//            "y": function(st) {
//                return o.y(st.y0);
//            },
//            "width": o.x.rangeBand(),
//            "height": function(st) {
//                return o.height - o.y(st.height);
//            }
//        }).style("fill", function(st, i, j) {
//            return o.model.get("ordinals").layers.colors[i];
//        });
//
//        return this;
//    }
