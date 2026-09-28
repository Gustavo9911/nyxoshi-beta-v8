import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { f as require_jsx_runtime } from "../_libs/@radix-ui/react-avatar+[...].mjs";
import { T as Hash, c as Sparkles, m as Search } from "../_libs/lucide-react.mjs";
import { t as useQuery } from "../_libs/tanstack__react-query.mjs";
import { I as searchNyxoshi, a as UserAvatar } from "./landing-DyPUp5dK.mjs";
import { n as useMe, t as SignedShell } from "./signed-shell-19pAj6J_.mjs";
import { t as Input } from "./input-CqfiuKoe.mjs";
import { o as PostCard } from "./post-card-CFdUJDkd.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/search-C5-kV67P.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function SearchPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SignedShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SearchInner, {}) });
}
function SearchInner() {
	const { me } = useMe();
	const [q, setQ] = (0, import_react.useState)("");
	const trimmed = q.trim();
	const result = useQuery({
		queryKey: ["search", trimmed],
		queryFn: () => searchNyxoshi({ data: { q: trimmed } }),
		enabled: trimmed.length > 0
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: "sticky top-0 z-20 border-b border-border bg-bg/85 px-4 py-3 backdrop-blur-sm",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "font-display text-xl tracking-tight",
			children: "Explorar"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative mt-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
				value: q,
				onChange: (e) => setQ(e.target.value),
				placeholder: "Buscar pessoas e textos",
				className: "rounded-full bg-secondary pl-9",
				autoFocus: true
			})]
		})]
	}), trimmed.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "p-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "nyx-panel rounded-2xl p-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-4 text-fuchsia-300" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-lg",
					children: "Em alta na Nyxoshi"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4 flex flex-wrap gap-2",
				children: [
					"#anime",
					"#games",
					"#tecnologia",
					"#programação",
					"#arte",
					"#música",
					"#memes",
					"#filosofia",
					"#femboy"
				].map((tag) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					className: "rounded-full border border-fuchsia-400/15 bg-secondary px-3 py-1.5 text-xs text-muted hover:text-fg",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hash, { className: "mr-1 inline size-3" }), tag.slice(1)]
				}, tag))
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "px-2 py-10 text-center text-sm text-muted",
			children: "Procure um @, um nome ou um pedaço de texto."
		})]
	}) : result.isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "px-6 py-16 text-center text-sm text-muted",
		children: "Buscando…"
	}) : result.data && result.data.people.length === 0 && result.data.posts.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
		className: "px-6 py-16 text-center text-sm text-muted",
		children: [
			"Nada encontrado para “",
			trimmed,
			"”."
		]
	}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [result.data?.people.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "border-b border-border px-4 py-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "text-sm font-medium text-muted",
			children: "Pessoas"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "mt-3 space-y-3",
			children: result.data.people.map((person) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/u/$username",
				params: { username: person.username },
				className: "flex items-center gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserAvatar, {
					username: person.username,
					displayName: person.displayName,
					image: person.image,
					toProfile: false
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "min-w-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "block truncate font-medium",
						children: person.displayName
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "block truncate text-sm text-muted",
						children: ["@", person.username]
					})]
				})]
			}) }, person.userId))
		})]
	}) : null, result.data?.posts.map((post) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PostCard, {
		post,
		viewerId: me?.userId ?? null
	}, post.id))] })] });
}
//#endregion
export { SearchPage as component };
