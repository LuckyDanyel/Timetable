const ExcelJS = require('exceljs');

export default async function(excelFile: any): Promise<any>  {
    const buffer = excelFile.buffer;
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
            row.values.forEach((valueFeild: string) => {
                if(valueFeild) {
                    institute[numberStroke].push(valueFeild);
                }
            });
            numberStroke++;
        })
    })
    return institute;
}

function deleteNameFields(groupRows: any) {
    delete groupRows['0'];
    return groupRows;
}