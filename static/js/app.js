

jsonfile = "data/samples.json";

// function ReadInJSONData(jsonfile) {
//     var JSONdata = d3.json(jsonfile, function(data) {
//         console.log(data);
//     });
//     console.log("Data Read");
//     return JSONdata;
// };

function unpack(rows, key) {
    return rows.map(function(row) { 
        return row[key];
    });
};


function ReadInJSONData(jsonfile) {
    d3.json(jsonfile).then((data) => {
        console.log(data);
        console.log("JSON Data Read Success!");
        var importedData = data;
        console.log(importedData);
        console.log(" importedData is a " + typeof(importedData));
        SortData(importedData);
        // var dates = importedData.map()
    // .catch(function(error) {
    //     console.log("JOSN data Error!")
    });
};


// var JSONdatatest = ReadInJSONData(jsonfile);
function mainFunction () {
    ReadInJSONData(jsonfile)
};

function SortData(inputdata) {
    console.log("ReturnData Function");
    console.log("ReturnData type is: " + typeof(importedData) + ", data below");
    // console.log(inputdata);
    Object.keys(inputdata.samples[0]).forEach(key => console.log(key));
    var sample_values = Object.values(inputdata.samples[0].sample_values);
    var otu_ids = Object.values(inputdata.samples[0].otu_ids);
    // var sample_values = Object.values(inputdata.samples[0].sample_values).forEach(value => console.log(value));
    // var otu_ids = Object.values(inputdata.samples[0].otu_ids).forEach(value => console.log(value));
    BuildGraph(otu_ids, sample_values);
};


function BuildGraph(x_data,y_data) {
    var trace1 = {
        x: x_data.map(element => element),
        y: y_data,
        type: "bar"
    };
    console.log("BuildGraph")
    x_data.forEach(element => {
        console.log(element)
    });
    var data = [trace1];

    var chartLayout = {
        title: "foo"
    };
    Plotly.newPlot("bar", data, chartLayout);

};
    // var chartData = [trace1];

    // };
    // Plotly.newPlot("bar", chartData, chartLayout)



mainFunction()

// function BuildArrays(inputData) {
//     console.log("start BuildArray");
//     Object.keys(inputData).forEach(key => console.log(key));
// }

// var JSONdata = ReadInJSONData(jsonfile);

// console.log(JSONdata);
// console.log(typeof(JSONdata));

// var myvar = Object.keys(JSONdata).forEach(key => console.log(key));
// console.log("my var " + myvar);
// console.log(JSON.stringify(JSONdata));
