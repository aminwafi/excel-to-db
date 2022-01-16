const xlsx = require("xlsx");
const path = require("path");

const filePath = path.resolve(__dirname, "./data/ESG_Premise_Template.xlsx");
const wb = xlsx.readFile(filePath);
const sheetName = wb.SheetNames[0];
var worksheet = wb.Sheets[sheetName];

/* for (let rowNum = range.s.r; rowNum <= range.e.r; rowNum++){
    for (let i=0; i<5; i++){
        // iterate through each rows, ignore undefined rows 
        const secondCell = worksheet[xlsx.utils.encode_cell({r:rowNum, c:i})];
        console.log(secondCell);
    }
} 

function sheet_to_array(worksheet){
    console.log('okat');
    var result = [];
    var row;
    var rowNum;
    var colNum;
    var range = xlsx.utils.decode_range(worksheet['!ref']);
    for (rowNum = range.s.r; rowNum <= range.e.r; rowNum++){
        row = [];
        for (colNum = range.s.c; colNum <= range.e.c; colNum++){
            var nextCell = worksheet[xlsx.utils.encode_cell({r: rowNum, c: colNum})];
            //console.log(nextCell);
        }
        result.push(nextCell);
    }
    return result;
}

sheet_to_array(worksheet); */


function Extract_and_Load(){
    // convert into json and generate data as arrays
    const esg_json = xlsx.utils.sheet_to_json(worksheet, {header:['Email', 'Premise', 'Group', 'ESG Role', 'Water', 'Electricity', 'Genset', 'Extinguisher', 'Refrigerant', 'Fuel', 'Air Travel', 'Milage', 'Waste', 'Printing']});

    var row_baseline = 4;
    var max_data = esg_json.length;
    console.log(max_data);

    var ESG_array = new Object();

    // Extract Entity
    var address_of_cell = 'B1';
    var desired_cell = worksheet[address_of_cell];
    ESG_array['Entity'] = (desired_cell ? desired_cell.v : undefined);
    console.log(ESG_array['Entity']);

    // Extract Country
    var address_of_cell = 'B2';
    var desired_cell = worksheet[address_of_cell];
    ESG_array['Country'] = (desired_cell ? desired_cell.v : undefined);
    console.log(ESG_array['Country']);

    // Iterate starting 6th row, get required data
    for (i=row_baseline; i<max_data; i++)
    {
        // Extract email
        const data = esg_json[i];
        ESG_array['email'] = data['Email'];
        console.log(ESG_array['email']);
        /*for (i=0; i<email.length; i++){
            if(email[i] == null)
            {

            }
        }*/

        // Extract premise name
        ESG_array['Premise'] = data['Premise'];
        console.log(ESG_array['Premise']);
        /*for (i=0; i<premise_name.length; i++){
            if(premise_name[i] == null)
            {

            }
        } */   
    }
    
    return ESG_array;

}

module.exports = Extract_and_Load;