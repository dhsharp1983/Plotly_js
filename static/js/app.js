

jsonfile = "data/samples.json";

// function ReadInJSONData(jsonfile) {
//     var JSONdata = d3.json(jsonfile, function(data) {
//         console.log(data);
//     });
//     console.log("Data Read");
//     return JSONdata;
// };
function getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
  }

function unpack(rows, key) {
    return rows.map(function(row) { 
        return row[key];
    });
};

function convertAsString(val) {
    var str1 = "OTU ";
    var str2 = val.toString();
    var result = str1.concat(str2);
    return result;
};

function ReadInJSONData(jsonfile) {
    d3.json(jsonfile).then((data) => {
        console.log(data);
        console.log("JSON Data Read Success!");
        var importedData = data;
        console.log(importedData);
        console.log(" importedData is a " + typeof(importedData));

        var names_list = Object.values(importedData.names)
        // names_list.forEach(name => console.log(name));
        PopulateDropDown (names_list);
        SortData(importedData);

        // var dates = importedData.map()
    // .catch(function(error) {
    //     console.log("JOSN data Error!")
    });
};


function PopulateDropDown (names) {
    console.log("populate drop down")
    names.forEach(name => console.log(name))
    var dropDown = d3.select("#selDataset");

    var options = dropDown.selectAll("option")
                    .data(names)
                    .enter()
                    .append("option");

    options.text(function (d) {return d;});
};

// var JSONdatatest = ReadInJSONData(jsonfile);
function mainFunction () {
    ReadInJSONData(jsonfile)
};

function SortData(inputdata) {
    var names_list = Object.values(inputdata.names)
    var candidate_id = d3.select("#selDataset").node().value;
    console.log("name", candidate_id)
    
    var candidate_index = names_list.indexOf(candidate_id);
    console.log("Candidate Index", candidate_index);

    console.log("ReturnData Function");
    console.log("ReturnData type is: " + typeof(inputdata) + ", data below");

    // Object.keys(inputdata.samples[0]).forEach(key => console.log(key))
    // bar data 
    var otu_ids = Object.values(inputdata.samples[candidate_index]["otu_ids"]).slice(0,11)
    var sample_values = Object.values(inputdata.samples[candidate_index]["sample_values"]).slice(0,11)
    var otu_labels = Object.values(inputdata.samples[candidate_index]["otu_labels"]).slice(0,11)
    otu_ids_str = otu_ids.map(convertAsString);

    // meta data 
    const str1 = "Ethnicity: ";
    const str2 = "Gender: ";
    const str3 = "Age: ";
    const str4 = "Location: ";
    const str5 = "bbtype: ";
    const str6 = "wfreq: "
    var candidate_meta_ethnicity = str1.concat(inputdata.metadata[candidate_index]["ethnicity"]);
    var candidate_meta_gender = str2.concat(inputdata.metadata[candidate_index]["gender"]);
    var candidate_meta_age = str3.concat(inputdata.metadata[candidate_index]["age"]);
    var candidate_meta_location = str4.concat(inputdata.metadata[candidate_index]["location"]);
    var candidate_meta_bbtype = str5.concat(inputdata.metadata[candidate_index]["bbtype"]);
    var candidate_meta_wfreq = str6.concat(inputdata.metadata[candidate_index]["wfreq"]);
    
    

    console.log(typeof(otu_ids))

    BuildBarGraph(otu_ids_str, sample_values, otu_labels);
    BuildBubbleChart(otu_ids, sample_values, otu_labels);
    BuildMetaTab(candidate_meta_ethnicity, candidate_meta_gender, candidate_meta_age, candidate_meta_location, candidate_meta_bbtype, candidate_meta_wfreq)
};


function BuildBarGraph(x_data, y_data, hover_data) {
    var trace1 = {
        y: x_data.map(element => element),
        x: y_data,
        type: "bar",
        text: hover_data,
        orientation: "h"
    };
    console.log("BuildGraph")
    // x_data.forEach(element => {
    //     console.log(element)
    // });
    var data = [trace1];

    var chartLayout = {
        title: "Top 10 Bacteria Colonies in Bellybutton (yum yum)",
        // xaxis: {
        //     autorange: "reversed"
        // },
        yaxis: {
            autorange: "reversed"
        }
    };
    Plotly.newPlot("bar", data, chartLayout);

};

function BuildBubbleChart (otu_ids, sample_values, otu_labels) {
    var myColor = d3.scaleOrdinal()
    .domain(otu_ids)
    .range(d3.schemeSet2);

    var trace1 = {
        x: otu_ids,
        y: sample_values, 
        mode: "markers",
        marker: {
            size: sample_values.map(element => element /2),
        }
    };
    
    var data = [trace1];

    var layout = {
        title: "Scatter Plot of Bacteria IDs vs Sample Count",
        showlegend: false,
    }
    Plotly.newPlot("bubble", data, layout)
}

function BuildMetaTab (candidate_meta_ethnicity, candidate_meta_gender, candidate_meta_age, candidate_meta_location, candidate_meta_bbtype, candidate_meta_wfreq) {
    var meta_array = []
    meta_array.push(candidate_meta_ethnicity, candidate_meta_gender, candidate_meta_age, candidate_meta_location, candidate_meta_bbtype, candidate_meta_wfreq)
    meta_array.forEach(element => console.log(element));
    var table = d3.select("#sample-metadata").append("table");
    var thead = table.append("thead")
    var tbody = table.append("tbody");
    var rows = tbody.selectAll("tr")
        .data(meta_array)
        .enter()
        .append("tr")
        .append("td")
        .text(function(d) {
            return d
        });

};


mainFunction();

// d3.select("#selDataset")
//     .on("change", optionChanged());

function optionChanged() {
    console.log("function optionChange")
    d3.select("#sample-metadata").selectAll("tr").remove();
    ReadInJSONData(jsonfile)
}