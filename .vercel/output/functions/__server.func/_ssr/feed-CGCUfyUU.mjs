import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { f as require_jsx_runtime } from "../_libs/@radix-ui/react-avatar+[...].mjs";
import { i as cn } from "./use-current-user-CHvoGxh7.mjs";
import { c as Sparkles, j as Compass } from "../_libs/lucide-react.mjs";
import { t as useQuery } from "../_libs/tanstack__react-query.mjs";
import { a as UserAvatar, g as getFeed, n as Compose } from "./landing-DyPUp5dK.mjs";
import { i as TabsTrigger, n as TabsContent, r as TabsList, t as Tabs } from "./tabs-DFs-UAJs.mjs";
import { o as PostCard } from "./post-card-CFdUJDkd.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/feed-CGCUfyUU.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Skeleton({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("animate-pulse rounded-md bg-secondary", className),
		...props
	});
}
function Feed({ me }) {
	const [tab, setTab] = (0, import_react.useState)("forYou");
	const feed = useQuery({
		queryKey: ["feed", tab],
		queryFn: () => getFeed({ data: { tab } })
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
			className: "sticky top-0 z-20 border-b border-border bg-[#09060dcc] px-4 py-3 backdrop-blur-xl",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-2xl tracking-tight",
					children: "Início"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "grid size-9 place-items-center rounded-full text-muted hover:bg-secondary hover:text-fg",
					"aria-label": "Explorar",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Compass, { className: "size-5" })
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "border-b border-border p-3",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "nyx-panel rounded-2xl p-3",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserAvatar, {
						username: me.username,
						displayName: me.displayName,
						image: me.image,
						toProfile: false,
						className: "size-10"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "min-w-0 flex-1",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Compose, {
							me,
							compact: true
						})
					})]
				})
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
			value: tab,
			onValueChange: (v) => setTab(v),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, {
				className: "sticky top-[143px] z-10 mx-3 mt-3 grid w-auto grid-cols-2 rounded-xl border border-border bg-[#0e0a18ee] p-1 backdrop-blur-xl md:top-[69px]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
					value: "forYou",
					className: "rounded-lg",
					children: "Para você"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
					value: "following",
					className: "rounded-lg",
					children: "Seguindo"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
				value: tab,
				children: feed.isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FeedSkeleton, {}) : feed.data && feed.data.length > 0 ? feed.data.map((post) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PostCard, {
					post,
					viewerId: me.userId,
					onChanged: () => void feed.refetch()
				}, post.id)) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyFeed, { tab })
			})]
		})
	] });
}
function EmptyFeed({ tab }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "px-8 py-20 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mx-auto grid size-14 place-items-center rounded-2xl border border-fuchsia-400/20 bg-fuchsia-500/10 text-fuchsia-300 nyx-glow",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-6" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-5 font-display text-2xl tracking-tight",
				children: tab === "following" ? "Ainda sem vozes próximas." : "A noite está quieta."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mx-auto mt-2 max-w-sm text-sm leading-relaxed text-muted",
				children: tab === "following" ? "Siga pessoas para montar o seu recorte da Nyxoshi." : "Seja a primeira voz. Uma frase já acende o feed."
			})
		]
	});
}
function FeedSkeleton() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "divide-y divide-border",
		children: Array.from({ length: 4 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex gap-3 px-4 py-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "size-10 rounded-full" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex-1 space-y-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-4 w-40" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-4 w-full" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-4 w-2/3" })
				]
			})]
		}, i))
	});
}
//#endregion
export { FeedSkeleton as n, Feed as t };
