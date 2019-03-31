export default function utc_time_local() {
	const today = new Date();

	const FullYear = today.getFullYear();

	let getMonth = today.getMonth() + 1;
	if (getMonth < 10) {
		getMonth = '0' + getMonth;
	}

	let getDate = today.getDate();
	if (getDate < 10) {
		getDate = '0' + getDate;
	}

	let getHours = today.getUTCHours();
	if (getHours < 10) {
		getHours = '0' + getHours;
	}

	let getMinutes = today.getMinutes();
	if (getMinutes < 10) {
		getMinutes = '0' + getMinutes;
	}

	let getSeconds = today.getSeconds();
	if (getSeconds < 10) {
		getSeconds = '0' + getSeconds;
	}
	const FullTimeLocal = `${FullYear}${getMonth}${getDate}${getHours}${getMinutes}${getSeconds}`;
	return FullTimeLocal;
}