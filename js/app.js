function init(){
    buildPlot()
}


function optionChanged() {
    buildPlot();
  }


function buildPlot(){
    d3.json("samples.json").then((data) =>{
        var idValues = data.names;

        idValues.forEach(id => d3.select('#selDataset').append('option').text(id).property("value", id));

        var currentID = d3.selectAll("#selDataset").node().value;

        filteredID = data.samples.filter(entry => entry.id == currentID);

        var trace1 = {
            x: filteredID[0].sample_values.slice(0,10).reverse(),
            y: filteredID[0].otu_ids.slice(0, 10).reverse().map(int => "OTU " + int.toString()),
            text: filteredID[0].otu_labels.slice(0,10).reverse(),
            type:"bar",
            orientation: 'h'
        };

        var dataPlot = [trace1];

        var layout = {
            title : 'Top 10 OTU samples',
            margin: {
                l: 75,
                r: 100,
                t: 60,
                b: 60
            }

        };

        Plotly.newPlot("bar", dataPlot, layout);

        filteredMeta = data.metadata.filter(entry => entry.id == currentID)

        var demographics = {
            'id: ': filteredMeta[0].id,
            'ethnicity: ': filteredMeta[0].ethnicity,
            'gender: ': filteredMeta[0].gender,
            'age: ': filteredMeta[0].age,
            'location: ': filteredMeta[0].location,
            'bbtype: ': filteredMeta[0].bbtype,
            'wfreq: ': filteredMeta[0].wfreq
        }
        panelBody = d3.select("#sample-metadata")

        panelBody.html("")

        Object.entries(demographics).forEach(([key, value]) => {
            panelBody.append('p').attr('style', 'font-weight: bold').text(key + value)
        });

        var trace2 ={
            x : filteredID[0].otu_ids,
            y : filteredID[0].sample_values,
            text : filteredID[0].otu_labels,
            mode : 'markers',
            marker: {
                color : filteredID[0].otu_ids,
                size : filteredID[0].sample_values
            }
        }

        var data2 = [trace2]

        var layout2 = {
            title : 'Marker Size',
            showlegend : false,
        }

        Plotly.newPlot('bubble', data2, layout2)
        console.log(filteredID)
        gauge()
    });
};


init();
