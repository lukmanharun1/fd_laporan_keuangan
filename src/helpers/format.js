export default function format(format) {
	return new Intl.NumberFormat('id-ID', {
		minimumFractionDigits: 0
	}).format(parseInt(format));
}