const Excel = require("exceljs");
const path = require("path");

var workbook = new Excel.Workbook();
const filePath = path.resolve(__dirname, "./data/ESG_Premise_Template.xlsx");
var esg_list = [];
var sheet = "Main";
var row_baseline = 4;
var data_baseline = 5;
var ESG_array_User = [];
var ESG_array_Premise = [];

function ExtractandLoad() {    
    workbook.xlsx.readFile(filePath)
    .then(function() {
        
        // read workbook and convert into json
        var worksheet = workbook.getWorksheet(sheet);
        var ESG_list = new Object();

        worksheet.eachRow({ includeEmpty: false }, function(row, rowNumber) {
            console.log("Row " + rowNumber + " = " + JSON.stringify(row.values));
            esg_list.push(row.values);
        });

        // Extract Entity and Country
        for (var i=0; i<esg_list.length; i++)
        {          
            // filter null and undefined value in array
            const data = [];
            data[i] = esg_list[i].filter((item) => item);
            
            // Extract Entity 
            if (data[i][0] == 'Entity')
            {
                ESG_list['Entity'] = data[i][1];
            }
            // Extract Country
            else if (data[i][0] == 'Country')
            {
                ESG_list['Country'] = data[i][1];
            }
        }

        console.log(ESG_list);

        for (var j=row_baseline; j<esg_list.length; j++)
        {
            var utility_type = new Object();
            var ESG_list_item = new Object();
            var ESG_merge = new Object();
            const data = [];
            data[j] = esg_list[j];
                
            // Extract Email
            if (typeof data[j][1] == 'object')
            {
                ESG_list_item['Email'] = data[j][1]['text'];
            }
            else
            {
                ESG_list_item['Email'] = data[j][1];
            }

            // Extract Premise Name
            ESG_list_item['Premise'] = data[j][2];

            // Extract Group Name
            ESG_list_item['Group'] = data[j][3];

            // Extract ESG Role
            ESG_list_item['ESG Role'] = data[j][4];

            var header = ['Water', 'Electricity', 'Genset', 'Extinguisher', 'Refrigerant', 
            'Fuel', 'Air Travel', 'Mileage', 'Waste', 'Printing']

            // Extract Utility Types
            for (var k=data_baseline; k<data[j].length; k++)
            {
                for (var m=0; m<header.length; m++)
                {
                    if (data[j][k] == 'Enabled')
                    {
                        utility_type[header[m]] = true;
                    }
                    else
                    {
                        utility_type[header[m]] = false;
                    }
                    ESG_list_item['Utility Types'] = utility_type;
                }
            } 

            ESG_merge = {
                ...ESG_list,
                ...ESG_list_item
            };
                
            // Validation Requirement 
            if (ESG_merge['Entity'] === 'Maybank' && ESG_merge['Country'] === 'Malaysia')
            {
                if (ESG_merge['ESG Role'] === 'Maker 1' || ESG_merge['ESG Role'] === 'Maker 3' || ESG_merge['ESG Role'] === 'Checker 1' || ESG_merge['ESG Role'] === 'Checker 2')
                {
                    ESG_array_User.push(ESG_merge);
                    console.log(ESG_array_User);
                }
                else if (ESG_merge['ESG Role'] === 'Maker 2')
                {
                    ESG_array_Premise.push(ESG_merge);
                    console.log(ESG_array_Premise);
                }
            }
        }  

        return {ESG_array_Premise: ESG_array_Premise, ESG_array_User: ESG_array_User};
        
    });
}

ExtractandLoad();

module.exports = ExtractandLoad;
