import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { f as require_jsx_runtime } from "../_libs/@radix-ui/react-avatar+[...].mjs";
import { r as useQueryClient, t as useQuery } from "../_libs/tanstack__react-query.mjs";
import { N as listNotifications, P as markNotificationsRead, a as UserAvatar } from "./landing-DyPUp5dK.mjs";
import { t as SignedShell } from "./signed-shell-19pAj6J_.mjs";
import { t as relativeTime } from "./time-CB02cFBf.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/notifications-hVE4KKyG.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function NotificationsPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SignedShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NotificationsInner, {}) });
}
function NotificationsInner() {
	const queryClient = useQueryClient();
	const list = useQuery({
		queryKey: ["notifications"],
		queryFn: () => listNotifications()
	});
	(0, import_react.useEffect)(() => {
		markNotificationsRead().then(() => {
			queryClient.invalidateQueries({ queryKey: ["unread"] });
		});
	}, [queryClient]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
		className: "sticky top-0 z-20 border-b border-border bg-bg/85 px-4 py-3 backdrop-blur-sm",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "font-display text-xl tracking-tight",
			children: "Alertas"
		})
	}), list.data && list.data.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", { children: list.data.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NotificationRow, { item }, item.id)) }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "px-6 py-16 text-center text-sm text-muted",
		children: "Nada novo por enquanto. Curtidas, comentários e novos seguidores aparecem aqui."
	})] });
}
function NotificationRow({ item }) {
	const copy = item.type === "like" ? "curtiu sua publicação" : item.type === "comment" ? "comentou sua publicação" : item.type === "follow" ? "começou a seguir você" : item.type === "repost" ? "repostou sua publicação" : item.type === "quote" ? "citou sua publicação" : item.type === "mention" ? "mencionou você" : "reagiu à sua publicação";
	const inner = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserAvatar, {
		username: item.actor.username,
		displayName: item.actor.displayName,
		image: item.actor.image,
		toProfile: false
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-w-0",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "text-sm",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-medium",
					children: item.actor.displayName
				}),
				" ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-muted",
					children: copy
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-xs text-subtle",
			children: relativeTime(item.createdAt)
		})]
	})] });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
		className: "border-b border-border",
		children: item.postId ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/post/$postId",
			params: { postId: item.postId },
			className: "flex items-center gap-3 px-4 py-4",
			children: inner
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/u/$username",
			params: { username: item.actor.username },
			className: "flex items-center gap-3 px-4 py-4",
			children: inner
		})
	});
}
//#endregion
export { NotificationsPage as component };
