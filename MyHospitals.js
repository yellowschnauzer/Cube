  
(function() {
    // Create the connector object
    var myConnector = tableau.makeConnector();

    // Define the schema
    myConnector.getSchema = function(schemaCallback) {
        var cols = [{
//            id: "id",
//            dataType: tableau.dataTypeEnum.string
//        }, {
            id: "name",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "description",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "state",
            dataType: tableau.dataTypeEnum.string
        }];

        var tableSchema = {
            id: "earthquakeFeed",
            alias: "Earthquakes with magnitude greater than 4.5 in the last seven days",
            columns: cols
        };

        schemaCallback([tableSchema]);
    };

    // Download the data
    myConnector.getData = function(table, doneCallback) {
        $.getJSON("https://www.myhospitals.gov.au/api/datasets?indicatorId=111", function(resp) {
            var feat = resp.hspitals,
                tableData = [];

            // Iterate over the JSON object
            for (var i = 0, len = feat.length; i < len; i++) {
                tableData.push({
  //                  "id": feat[i].id,
                    "name": feat[i].name,
                    "description": feat[i].description,
                    "state": feat[i].state
                });
            }

            table.appendRows(tableData);
            doneCallback();
        });
    };

    tableau.registerConnector(myConnector);

    // Create event listeners for when the user submits the form
    $(document).ready(function() {
        $("#submitButton").click(function() {
            tableau.connectionName = "USGS Earthquake Feed"; // This will be the data source name in Tableau
            tableau.submit(); // This sends the connector object to Tableau
        });
    });
})();
