module.exports = () => {
	const {
		extractImportString
	} = require("../lib/utils");

	const import1 = `import "main.css";`;
	const import2 = `import 'main.css';`;
	const import3 = `import './main.css';`;

	const str1 = extractImportString(import1)
	const str2 = extractImportString(import2)
	const str3 = extractImportString(import3)

	console.log({
		str1,
		str2,
		str3
	})
}