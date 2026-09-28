import { n as formatDistanceToNow, t as ptBR } from "../_libs/date-fns.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/time-CB02cFBf.js
function relativeTime(iso) {
	const date = new Date(iso);
	if (Number.isNaN(date.getTime())) return "";
	return formatDistanceToNow(date, {
		addSuffix: true,
		locale: ptBR
	});
}
//#endregion
export { relativeTime as t };
