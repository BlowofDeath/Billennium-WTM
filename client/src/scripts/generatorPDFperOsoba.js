import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import moment from 'moment';
import { fromPromise } from "apollo-link";

function getTimeFromWorkTimeRecords(WTR){
	let time = 0;
	WTR.forEach(function(WorkTimeRecord) {
		let to;
		if(WorkTimeRecord.to == null){
			to=parseInt(Date.now());
		} else {
			to=parseInt(WorkTimeRecord.to);
		}
		let from=parseInt(WorkTimeRecord.from);
		time += moment(to).diff(moment(from), "minutes");
		console.log(to + " <->" + from);
	});
	return time;
}

// poprawne wyświetlanie w 3 kolumnie
function timeToString(time){
	let outputString = "";
	//zamiana na czas czytelny dla człowieka
	const daysDifference = Math.floor(time/60/24);
	time -= daysDifference*60*24
	const hoursDifference = Math.floor(time/60);
	time -= hoursDifference*60
	const minutesDifference = Math.floor(time);
	time -= minutesDifference
	console.log(time);
	// tekst początkowy
	outputString += "Sumaryczny czas poświęcony na projekt: \n\n"
	// dodaj do stringa dni w odp formacie
	if(daysDifference === 1)
		outputString += daysDifference + " dzień\n"
	else
		outputString += daysDifference + " dni\n"
	// dodaj do stringa godziny w odp formacie
	if(hoursDifference === 1)
		outputString += hoursDifference + " godzina\n"
	else if ( hoursDifference > 1 && hoursDifference < 5)
		outputString += hoursDifference + " godziny\n"
	else if ( hoursDifference > 21 && hoursDifference < 25)
		outputString += hoursDifference + " godziny\n"
	else
		outputString += hoursDifference + " godzin\n"
	// dodaj do stringa minuty w odp formacie
	if(minutesDifference === 1)
		outputString += minutesDifference + " minuta\n"
	else if ( minutesDifference > 1 && minutesDifference < 5)
		outputString += minutesDifference + " minuty\n"
	else if ((minutesDifference > 20) && (minutesDifference % 10 > 1) && (minutesDifference % 10 < 5))
		outputString += `${minutesDifference} minuty\n`;
	else
		outputString += minutesDifference + " minut\n"
	return outputString;
}

// dodaj zawartość do poszczególnych komórek
function buildTableBody(data, columns) {
	var body = [];
	const columnsPoland = [{text: 'Imię', fillColor: '#00264d', color: 'white', bold: true, alignment: 'center'}, {text: 'Nazwisko', fillColor: '#00264d', color: 'white', bold: true, alignment: 'center'}, {text: 'CZAS', fillColor: '#00264d', color: 'white', bold: true, alignment: 'center'}];
	body.push(columnsPoland);
	data.forEach(function(row) {
		var dataRow = [];
		let time = getTimeFromWorkTimeRecords(row["workTimeRecords"]);
		columns.forEach(function(column) {
			dataRow.push(row[column].toString());
		})
		dataRow[2] = timeToString(time);
		body.push(dataRow);
	});
	return body;
}

// buduj tabele na bazie danych dostarczonych w arg
function table(data, columns) {
	return {
		table: {
			widths: [120, 120, '*'],
			headerRows: 1,
			body: buildTableBody(data, columns)
		}
	};
}

export function generujpdf2(Users, month, year){
	//definicja dokumentu
	pdfMake.vfs = pdfFonts.pdfMake.vfs;
	const months=["Styczeń", "Luty", "Marzec", "Kwiecień", "Maj", "Czerwiec", "Lipiec", "Sierpień", "Wrzesień", "Październik", "Listopad", "Grudzień"];
	var dd = {
		content: [
			{
				text: 'Raport miesięczny z '+months[month-1]+' '+year, fontSize: 18,
				alignment: 'center',
				margin: [0, 0, 0, 15]
			},
			table(Users, ['first_name', 'last_name', 'workTimeRecords'])
		]
	}
	//generuj pdf
	pdfMake.createPdf(dd).download();
}