(function () {
    var myConnector = tableau.makeConnector(); 
 
 
	// Define the schema
   myConnector.getSchema = function (schemaCallback) {
    
		var HospitalCols = [
			{ id : "description", dataType : tableau.dataTypeEnum.string },
//			{ id : "id", alias : "ID", dataType : tableau.dataTypeEnum.string },
//			{ id : "isClosed", alias : "Closed", dataType : tableau.dataTypeEnum.boolean },
//			{ id : "isPublic", alias : "Public", dataType : tableau.dataTypeEnum.boolean },
//			{ id : "latitude", alias : "Latitude", dataType : tableau.dataTypeEnum.float },
//			{ id : "longitude", alias : "Longitude", dataType : tableau.dataTypeEnum.float },
			{ id : "name", dataType : tableau.dataTypeEnum.string },
//			{ id : "phnCode", alias : "Code", dataType : tableau.dataTypeEnum.float },
//			{ id : "phnName", alias : "Hospital", dataType : tableau.dataTypeEnum.string },
			{ id : "state", dataType : tableau.dataTypeEnum.string }
		];

		var HospitalsTableInfo = {
			id : "HospitalUrl",
			alias : "Hospitals",
			columns : HospitalCols
		};
		
//		var IndicatorCols = [
//			{ id : "code", alias : "Code", dataTypeEnum : tableau.dataTypeEnum.float },
//			{ id : "indicatorName", alias : "Indicator", dataTypeEnum : tableau.dataTypeEnum.string },
//			{ id : "name", alias : "Name", dataTypeEnum : tableau.dataTypeEnum.string },
//			{ id : "quarterlyPeriods", alias : "Period", dataTypeEnum : tableau.dataTypeEnum.string },
//			{ id : "unitOfMeasure", alias : "Measure", dataTypeEnum : tableau.dataTypeEnum.string }
//		];
		
//		var IndicatorTableInfo = {
//			id: "IndicatorUrl",
//			alias : "Indicators",
//			columns : IndicatorCols
//		};



		schemaCallback([HospitalsTableInfo]);

	};
 
 
 // Download data
    myConnector.getData = function (table, doneCallback) {
		$.getJSON("http://myhospitals.gov.au/api/datasets", function (resp) {
			var hospDataset = resp.indicatorId,
//				indiURL = resp.indicators,
			    tableData = [];
			
			for (var i = 0, len = hospDataset.length; i < len; i++) {
				tableData.push({
					"description" : hospDataset[i].hospitals.description,
//					"id" : hospDataset[i].id,
//					"isClosed" : hospDataset[i].isClosed,
//					"isPublic" : hospDataset[i].isPublic,
//					"latitude" : hospDataset[i].latitude,
//					"longitude" : hospDataset[i].longitude,
					"name" : hospDataset[i].hospitals.name,
//					"phnCode" : hospDataset[i].phnCode,
//					"phnName" : hospDataset[i].phnName,
					"state" : hospDataset[i].hospitals.state
				});
			}

			table.appendRows(tableData);

			doneCallback();
		});
	};

    tableau.registerConnector(myConnector);
	
	$(document).ready(function () {
		$("#submitButton").click(function () {
			tableau.connectionName = "MyHospitals";
			tableau.submit();
		});
	});
	
})();
