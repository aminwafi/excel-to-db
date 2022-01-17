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

    var ESG_array_User = [];
    var ESG_array_Premise = [];
    var ESG_list = new Object();

    // Iterate starting 6th row, get required data
    for (i=row_baseline; i<max_data; i++)
    {   
        const data = esg_json[i];
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
        if (data['Email'] == null)
        {
            // to do
        }
        else
        {
            ESG_list['Email'] = data['Email'];
        }

        // Extract Premise Name
        if (data['Premise'] == null)
        {
            // to do
        }
        else
        {
            ESG_list['Premise'] = data['Premise'];
        }
        
        // Extract Group Name
        ESG_list['Group'] = (data['Group']);
        if (ESG_list['Group'])

        // Extract ESG Role
        ESG_list['ESG Role'] = (data['ESG Role']);

        // Extract Utility Types
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

        // Validation
        if (ESG_list['Entity'] === 'Maybank' && ESG_list['Country'] === 'Malaysia')
        {
            if (ESG_list['ESG Role'] == 'Maker 1' || ESG_list['ESG Role'] == 'Maker 3' || ESG_list['ESG Role'] == 'Checker 1' || ESG_list['ESG Role'] === 'Checker 2')
            {
                console.log('bokay');
                ESG_array_User.push(ESG_list);
            }
            else if (ESG_list['ESG Role'] === 'Maker 2')
            {
                ESG_array_Premise.push(ESG_list);
            }
            else
            {
                // to do
            }

        }
        else
        {   
            // to do
        }

    }
    return {ESG_array_User: ESG_array_User, ESG_array_Premise: ESG_array_Premise};
}

module.exports = Extract_and_Load;