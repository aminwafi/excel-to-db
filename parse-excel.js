const xlsx = require("xlsx");
const path = require("path");

const filePath = path.resolve(__dirname, "./data/ESG_Premise_Template.xlsx");
const wb = xlsx.readFile(filePath);
const sheetName = wb.SheetNames[0];
var worksheet = wb.Sheets[sheetName];

function Extract_and_Load(){
    // convert into json and generate data as arrays
    const esg_json = xlsx.utils.sheet_to_json(worksheet, {header:['Email', 'Premise', 'Group', 'ESG Role', 'Water', 'Electricity', 'Genset', 'Extinguisher', 'Refrigerant', 'Fuel', 'Air Travel', 'Milage', 'Waste', 'Printing']});

    var row_baseline = 4;
    var data_baseline = 4;
    var max_data = esg_json.length;

    var ESG_array = [];

    // Iterate starting 6th row, get required data
    for (i=row_baseline; i<max_data; i++)
    {   
        const data = esg_json[i];
        var ESG_list = new Object();
        var utility_type = new Object();        

        // Extract Entity
        var address_of_cell = 'B1';
        var desired_cell = worksheet[address_of_cell];
        ESG_list['Entity'] = (desired_cell ? desired_cell.v : undefined);

        // Extract Country
        var address_of_cell = 'B2';
        var desired_cell = worksheet[address_of_cell];
        ESG_list['Country'] = (desired_cell ? desired_cell.v : undefined);

        // Extract Email
        if (ESG_array.length < 1 && data['Email'] == null)
        {
            // to do
        }
        else
        {
            ESG_list['Email'] = data['Email'];
        }

        // Extract Premise Name
        if (ESG_array.length < 1 && data['Premise'] == null)
        {
            // to do
        }
        else
        {
            ESG_list['Premise'] = data['Premise'];
        }
        
        // Extract Group Name
        ESG_list['Group'] = (data['Group']);

        // Extract ESG Role
        ESG_list['ESG Role'] = (data['ESG Role']);

        
        var keys = Object.keys(data);
        for (var j = data_baseline; j < keys.length; j++) {
            if (data[keys[j]] == 'Enabled')
            {
                utility_type[keys[j]] = true;
            }
            else
            {
                utility_type[keys[j]] = false;
            }
        }   
        ESG_list['Utility Type'] = utility_type;

        ESG_array.push(ESG_list);
    }

    return ESG_array;
    
}

module.exports = Extract_and_Load;