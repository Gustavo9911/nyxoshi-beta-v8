import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { f as require_jsx_runtime } from "../_libs/@radix-ui/react-avatar+[...].mjs";
import { E as Gamepad2, M as CodeXml, T as Hash, b as Music2, i as UsersRound, y as Palette } from "../_libs/lucide-react.mjs";
import { t as SignedShell } from "./signed-shell-19pAj6J_.mjs";
import { t as Input } from "./input-CqfiuKoe.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/communities-BxKW4p36.js
var import_jsx_runtime = require_jsx_runtime();
var communities = [
	{
		name: "Anime & Mangá",
		members: "12,4 mil membros",
		icon: Gamepad2
	},
	{
		name: "Games",
		members: "8,7 mil membros",
		icon: Gamepad2
	},
	{
		name: "Programação",
		members: "5,2 mil membros",
		icon: CodeXml
	},
	{
		name: "Tecnologia",
		members: "4,8 mil membros",
		icon: Hash
	},
	{
		name: "Arte & Design",
		members: "3,9 mil membros",
		icon: Palette
	},
	{
		name: "Música",
		members: "3,1 mil membros",
		icon: Music2
	}
];
function CommunitiesPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SignedShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "sticky top-0 z-20 border-b border-border bg-[#09060dcc] px-4 py-3 backdrop-blur-xl",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-2xl",
					children: "Comunidades"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UsersRound, { className: "size-5 text-fuchsia-300" })]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
				className: "mt-3 rounded-full bg-secondary",
				placeholder: "Buscar comunidades..."
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex gap-2 overflow-x-auto px-4 py-3 nyx-scrollbar",
			children: [
				"Todas",
				"Anime",
				"Games",
				"Tecnologia",
				"Arte"
			].map((x, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: `rounded-full px-3 py-1.5 text-xs ${i === 0 ? "bg-primary text-white" : "bg-secondary text-muted"}`,
				children: x
			}, x))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "divide-y divide-border",
			children: communities.map(({ name, members, icon: Icon }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/communities",
				className: "flex items-center gap-3 px-4 py-4 hover:bg-white/[.02]",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "grid size-12 place-items-center rounded-2xl border border-fuchsia-400/15 bg-gradient-to-br from-violet-500/20 to-fuchsia-500/5 text-fuchsia-300",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-5" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "min-w-0 flex-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
							className: "block text-sm",
							children: name
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs text-muted",
							children: members
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "rounded-full border border-fuchsia-400/20 px-3 py-1 text-xs text-fuchsia-200",
						children: "Entrar"
					})
				]
			}, name))
		})
	] }) });
}
//#endregion
export { CommunitiesPage as component };
