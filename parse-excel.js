const xlsx = require("xlsx");
const path = require("path");

const filePath = path.resolve(__dirname, "ESG_Premise_Template.xlsx");
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

// convert into json and generate data as arrays
const esg_json = xlsx.utils.sheet_to_json(worksheet, {header:['Email', 'Premise', 'Group', 'ESG Role', 'Water', 'Electricity', 'Genset', 'Extinguisher', 'Refrigerant', 'Fuel', 'Air Travel', 'Milage', 'Waste', 'Printing']});

var baseline = 4;
var max_data = esg_json.length;
console.log(max_data);

var email = [];
var premise_name = [];

for (i=baseline; i<max_data; i++)
{
    // email
    const data = esg_json[i];
    email.push(data['Email']);
    console.log(email);
    /*for (i=0; i<email.length; i++){
        if(email[i] == null)
        {

        }
    }*/

    // premise name
    premise_name.push(data['Premise']);
    console.log(premise_name);
    /*for (i=0; i<premise_name.length; i++){
        if(premise_name[i] == null)
        {

        }
    } */   
}

/* var address_of_cell = 'B1';
var desired_cell = worksheet[address_of_cell];
var entity = (desired_cell ? desired_cell.v : undefined);
console.log(entity);

if (entity !== null) {
    console.log('okay')
} */