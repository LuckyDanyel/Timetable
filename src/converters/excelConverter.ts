const ExcelJS = require('exceljs');

export default async function(excelFile: any): Promise<any>  {
    const buffer = excelFile.buffer;
    console.log(buffer);
    const workBook = new ExcelJS.Workbook();
    const dataExcel = await workBook.xlsx.load(buffer);
    const groupRows = deleteEmptyItemsAndGroupRows(dataExcel);
    const groupRowsWithoutNameFields = deleteNameFields(groupRows);
    return groupRowsWithoutNameFields;
}

function deleteEmptyItemsAndGroupRows(readBufferInstitute: any): any {
    let institute = {};
    let numberStroke: number = 0;
    readBufferInstitute.eachSheet((sheet: any) => {
        sheet.eachRow((row: any) => {
            institute[numberStroke] = [];
            console.log(row.values);
            row.values.forEach((valueFeild: string) => {
                if(valueFeild) {
                    valueFeild = deleteSpace(valueFeild);
                    institute[numberStroke].push(valueFeild);
                }
            });
            numberStroke++;
        })
    })
    console.log(institute);
    return institute;
}

const deleteSpace = (str: any) => (typeof(str) === "string") ? str.replace(/\s/g, '') : str; 

function deleteNameFields(groupRows: any) {
    delete groupRows['0'];
    return groupRows;
}