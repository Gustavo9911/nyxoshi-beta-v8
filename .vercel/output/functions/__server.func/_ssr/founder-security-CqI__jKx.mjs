import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { f as require_jsx_runtime } from "../_libs/@radix-ui/react-avatar+[...].mjs";
import { t as Button } from "./use-current-user-CHvoGxh7.mjs";
import { O as Eye, R as ArrowLeft } from "../_libs/lucide-react.mjs";
import { t as useQuery } from "../_libs/tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { F as revealUserEmail, T as getUserSecurityInfo } from "./landing-DyPUp5dK.mjs";
import { n as useMe, t as SignedShell } from "./signed-shell-19pAj6J_.mjs";
import { t as Input } from "./input-CqfiuKoe.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/founder-security-CqI__jKx.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function FounderSecurityPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SignedShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Inner, {}) });
}
function Inner() {
	const { me } = useMe();
	const security = useQuery({
		queryKey: ["founder-security"],
		queryFn: () => getUserSecurityInfo(),
		enabled: me?.founderNumber === 1
	});
	const [reason, setReason] = (0, import_react.useState)("");
	const [email, setEmail] = (0, import_react.useState)(null);
	if (me?.founderNumber !== 1) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "p-8 text-center",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-muted",
			children: "Acesso restrito à Fundadora #1."
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			asChild: true,
			className: "mt-4",
			variant: "outline",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/founders",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, {}), "Voltar"]
			})
		})]
	});
	async function reveal(id) {
		try {
			const r = await revealUserEmail({ data: {
				targetUserId: id,
				reason
			} });
			setEmail(r.email);
			setReason("");
		} catch (e) {
			toast.error(e instanceof Error ? e.message : "Não foi possível revelar o e-mail.");
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "p-4 pb-12",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					variant: "ghost",
					size: "icon",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/founders",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, {})
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-2xl",
					children: "Segurança confidencial"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: "Área exclusiva da Fundadora #1."
				})] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
				className: "mt-5",
				value: reason,
				onChange: (e) => setReason(e.target.value),
				placeholder: "Motivo para revelar um e-mail (mínimo 8 caracteres)"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4 space-y-2",
				children: security.data?.map((u) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between rounded-xl border border-border p-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: u.display_name }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-xs text-muted",
						children: [
							"@",
							u.username,
							" · ",
							u.emailMasked
						]
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						size: "sm",
						variant: "outline",
						onClick: () => void reveal(u.user_id),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, {}), "Ver e-mail"]
					})]
				}, u.user_id))
			}),
			email ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 rounded-xl border border-fuchsia-400/30 bg-fuchsia-500/10 p-4",
				children: [
					"E-mail revelado: ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: email }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						className: "mt-2",
						size: "sm",
						variant: "ghost",
						onClick: () => setEmail(null),
						children: "Ocultar"
					})
				]
			}) : null
		]
	});
}
//#endregion
export { FounderSecurityPage as component };
