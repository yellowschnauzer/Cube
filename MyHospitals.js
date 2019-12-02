  
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
            id: "organisation",
            dataType: tableau.dataTypeEnum.string
//        }, {
//            id: "state",
//            dataType: tableau.dataTypeEnum.string
        }];

        var tableSchema = {
            id: "test",
            alias: "Vic Gov data connection",
            columns: cols
        };

        schemaCallback([tableSchema]);
    };

    // Download the data
    myConnector.getData = function(table, doneCallback) {
        $.getJSON("https://api.vic.gov.au:443/datavic/opendata/v1.1/datasets",
            {
              "Content-Type": "application/json",
              "Accept": "application/json",
              "apikey": ""
            },
            function(resp) {
              var feat = resp.datasets,
                  tableData = [];

              // Iterate over the JSON object
              for (var i = 0, len = feat.length; i < len; i++) {
                  tableData.push({
//                      "id": feat[i].id,
                      "name": feat[i].name,
                      "organisation": feat[i].oganisation.name,
//                      "state": feat[i].state
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
            tableau.connectionName = "test"; // This will be the data source name in Tableau
            tableau.submit(); // This sends the connector object to Tableau
        });
    });
})();
