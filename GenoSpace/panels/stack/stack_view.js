/* 
 * Creator: Ryan Kophs
 * Organization: University of Colorado: GeneTeam
 * 
 * Description: Extends panel_view object to render a stacked bar chart
 *  
 * Dependencies:
 *  backbone.js
 *  underscore.js
 *  panel_view.js
 *  stacked_model.js
 *  shared.js
 *  highcharts.js
 */

var stack_view = panel_view.extend({
    render: function() {
        var o = this;
        o.set_series().set_chart();
        $(this.$el).empty();
        $(this.$el).removeAttr("data-highcharts-chart");
        $(this.$el).highcharts(o.chart);
        return this;
    },
    initialize: function() {
        this.listenTo(this.model, 'change:updated', function() {
            this.render();
        });
        return this;
    },
    set_series: function() {
        var tmp = [];
        var f = this.model.get("ordinals").layers.length;
        for (var i = 0; i < f; i++) {
            tmp[i] = {};
            tmp[i].name = this.model.get("ordinals").layers[i];
            tmp[i].data = this.model.get("data")[i];
        }
        this.series = tmp;
        return this;
    },
    set_chart: function() {
        var o = this;
        o.chart = {
            chart: {
                type: 'column',
                events: {
                    selection: o.highlighted_selection
                },
                zoomType: 'x'
            },
            colors: getRGBArray(o.model.get("ordinals").layers),
            title: {
                text: o.model.get("title")
            },
            xAxis: {
                categories: o.model.get("ordinals").x.names,
                title: {
                    text: o.model.get("axes").x
                }
            },
            yAxis: {
                min: o.model.get("ymin"),
                title: {
                    text: o.model.get("axes").y
                }
            },
            legend: {
                backgroundColor: '#FFFFFF',
                reversed: true
            },
            plotOptions: {
                series: {
                    stacking: 'normal'
                }
            },
            series: o.series
        };
        return this;
    },
    highlighted_selection: function(event) {
        var domain = event.xAxis[0].axis.max - event.xAxis[0].axis.min;
        var min = event.xAxis[0].min;
        var max = event.xAxis[0].max;
        var minLabel;
        if (min < 0) {
            minLabel = 0;
        } else if (min % 1 <= 0.25) {
            minLabel = Math.floor(min);
        } else {
            minLabel = Math.floor(min) + 1;
        }

        var maxLabel;
        if (max < -0.5) {
            maxLabel = 0;
        } else if (max < 0 && max >= -0.5) {
            maxLabel = 0;
        } else if (max % 1 < 0.75) {
            maxLabel = Math.floor(max);
        } else {
            maxLabel = Math.floor(max) + 1;
        }

        var ordinals = event.xAxis[0].axis.categories.slice(minLabel, maxLabel + 1);

        highlightedRange.setNewRange({
            type: "ordinal",
            axis: event.xAxis[0].axis.axisTitle.text,
            domain: ordinals
        });
        event.preventDefault();
    }
});