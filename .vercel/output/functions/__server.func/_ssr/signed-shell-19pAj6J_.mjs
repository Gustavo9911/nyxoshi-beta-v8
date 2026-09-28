import "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { y as Navigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { f as require_jsx_runtime } from "../_libs/@radix-ui/react-avatar+[...].mjs";
import { a as useCurrentUserState, n as Logo } from "./use-current-user-CHvoGxh7.mjs";
import { t as useQuery } from "../_libs/tanstack__react-query.mjs";
import { h as ensureMyProfile, r as Landing, t as AppShell } from "./landing-DyPUp5dK.mjs";
require_react();
var import_jsx_runtime = require_jsx_runtime();
/**
* Auth state components — plain wrappers around `useCurrentUserState()`.
*
* With auth on, visitors are signed out until they authenticate — in the sandbox
* live preview too, which does real sign-in. The shared dev user appears only
* when auth is disabled (`VITE_AUTH_ENABLED=false`, the shipped default).
* While the session is still resolving, gates that care about signed-out state
* render nothing so there's no signed-out flash on hard reload.
*/
/** Where `RedirectToSignIn` sends signed-out visitors. Create this route. */
var SIGN_IN_PATH = "/login";
/**
* Client-side redirect to the sign-in route (TanStack `<Navigate>` — NOT a full
* `window.location` reload). A hard navigation re-bootstraps the SPA and re-runs
* session loading, which feels like a second "Loading…" on /login.
*
* Guard routes by waiting out `isPending` first (see `use-current-user`), then
* render this.
*/
function RedirectToSignIn({ to = SIGN_IN_PATH }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigate, { to });
}
function useMe() {
	const { user, isPending } = useCurrentUserState();
	const me = useQuery({
		queryKey: ["me"],
		queryFn: () => ensureMyProfile(),
		enabled: Boolean(user)
	});
	return {
		sessionPending: isPending,
		user,
		me: me.data ?? null,
		meLoading: Boolean(user) && (me.isLoading || !me.data)
	};
}
function SignedShell({ children, guest = "redirect" }) {
	const { sessionPending, user, me, meLoading } = useMe();
	if (sessionPending || meLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "night-wash grid min-h-dvh place-items-center px-5",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "text-center",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, { className: "justify-center" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 text-sm text-muted",
				children: "Abrindo a noite…"
			})]
		})
	});
	if (!user) return guest === "landing" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Landing, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RedirectToSignIn, {});
	if (!me) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid min-h-dvh place-items-center text-sm text-muted",
		children: "Não foi possível carregar o perfil."
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, {
		me,
		children
	});
}
//#endregion
export { useMe as n, SignedShell as t };
