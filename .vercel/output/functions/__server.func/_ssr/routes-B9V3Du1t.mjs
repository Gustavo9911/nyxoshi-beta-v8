import { f as require_jsx_runtime } from "../_libs/@radix-ui/react-avatar+[...].mjs";
import { a as useCurrentUserState, n as Logo } from "./use-current-user-CHvoGxh7.mjs";
import { t as useQuery } from "../_libs/tanstack__react-query.mjs";
import { i as Route$11 } from "./router-CdWjU9fN.mjs";
import { h as ensureMyProfile, r as Landing, t as AppShell } from "./landing-DyPUp5dK.mjs";
import { t as Feed } from "./feed-CGCUfyUU.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-B9V3Du1t.js
var import_jsx_runtime = require_jsx_runtime();
function Home() {
	const { sessionUser } = Route$11.useRouteContext();
	const { user, isPending } = useCurrentUserState();
	const me = useQuery({
		queryKey: ["me"],
		queryFn: () => ensureMyProfile(),
		enabled: Boolean(user)
	});
	if (!user && (!isPending || !sessionUser)) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Landing, {});
	if (!user || me.isLoading || !me.data) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BootScreen, {});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, {
		me: me.data,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Feed, { me: me.data })
	});
}
function BootScreen() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "night-wash grid min-h-dvh place-items-center px-5",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "text-center",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, { className: "justify-center" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 text-sm text-muted",
				children: "Abrindo a noite…"
			})]
		})
	});
}
//#endregion
export { Home as component };
