

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
    console.log("ReturnData type is: " + typeof(inputdata) + ", data below");
    // console.log(inputdata);
    // Object.keys(inputdata.samples[0]).forEach(key => console.log(key));
    // Object.values(inputdata.samples[0]).forEach(value => console.log(value))
    // start prev good code 
    // var sample_values = Object.values(inputdata.samples[0].sample_values);
    // var otu_ids = Object.values(inputdata.samples[0].otu_ids);
    // var samples_to_otu = [];
    // otu_ids.forEach((key, i) => samples_to_otu[key] = sample_values[i]);
    // Object.keys(samples_to_otu).forEach(key => console.log(key));
    // Object.values(samples_to_otu).forEach(value => console.log(value));
    // end prev good code 
    // SamplesArray = Object.entries(inputdata.samples[0]["otu_ids"])
    var otu_ids = Object.values(inputdata.samples[0]["otu_ids"]).slice(0,11)
    var sample_values = Object.values(inputdata.samples[0]["sample_values"]).slice(0,11)
    otu_ids.forEach(element => {
        console.log(element)
    });
    sample_values.forEach(element => {
        console.log(element)
    });
    otu_ids_str = otu_ids.map(convertAsString);
    otu_ids_str.forEach(element => {
        console.log(element)
    });
    // var sample_values = Object.values(SamplesArray[2]).slice(0,11)
    // otu_ids.forEach(([key,value]) => {
    //     console.log(key);
    //     console.log(value);
    // });

    console.log(typeof(otu_ids))
    // var sample_values = Object.values(inputdata.samples[0].sample_values).forEach(value => console.log(value));
    // var otu_ids = Object.values(inputdata.samples[0].otu_ids).forEach(value => console.log(value));
    // numArray3.sort((firstNum, secondNum) => firstNum - secondNum);
    BuildGraph(otu_ids_str, sample_values);
};


function BuildGraph(x_data,y_data) {
    var trace1 = {
        x: x_data.map(element => element),
        y: y_data,
        type: "bar"
    };
    console.log("BuildGraph")
    // x_data.forEach(element => {
    //     console.log(element)
    // });
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
