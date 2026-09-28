import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { b as useNavigate, v as Link, y as Navigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { f as require_jsx_runtime } from "../_libs/@radix-ui/react-avatar+[...].mjs";
import { r as signIn, t as authClient } from "./client-B40BzJxt.mjs";
import { a as useCurrentUserState, n as Logo, t as Button } from "./use-current-user-CHvoGxh7.mjs";
import { t as GROK_PROVIDERS } from "./server-VLaKapud.mjs";
import { t as Input } from "./input-CqfiuKoe.mjs";
import { i as TabsTrigger, n as TabsContent, r as TabsList, t as Tabs } from "./tabs-DFs-UAJs.mjs";
import { t as Label } from "./label-CYQYOFDo.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/login-HZym_i1M.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Login() {
	const { user, isPending } = useCurrentUserState();
	if (!isPending && user) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigate, { to: "/" });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "night-wash starfield grid min-h-dvh place-items-center px-5 py-10",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "w-full max-w-md rounded-xl border border-border bg-card p-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-6 font-display text-3xl tracking-tight",
					children: "Entre na noite."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted",
					children: "Uma conta. Seu nome. Sem palco emprestado."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
					defaultValue: "entrar",
					className: "mt-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
							value: "entrar",
							children: "Entrar"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
							value: "criar",
							children: "Criar conta"
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
							value: "entrar",
							className: "pt-5",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmailForm, { mode: "signin" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
							value: "criar",
							className: "pt-5",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmailForm, { mode: "signup" })
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "my-5 flex items-center gap-3 text-xs tracking-wide text-subtle uppercase",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-px flex-1 bg-border" }),
						"ou",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-px flex-1 bg-border" })
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex flex-col gap-2",
					children: GROK_PROVIDERS.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						type: "button",
						variant: "outline",
						onClick: () => signIn(p.providerId, { callbackURL: "/" }),
						children: ["Continuar com ", p.label]
					}, p.providerId))
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-6 text-center text-sm text-muted",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "hover:text-fg",
						children: "Voltar"
					})
				})
			]
		})
	});
}
function EmailForm({ mode }) {
	const [name, setName] = (0, import_react.useState)("");
	const [email, setEmail] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [error, setError] = (0, import_react.useState)(null);
	const [busy, setBusy] = (0, import_react.useState)(false);
	const navigate = useNavigate();
	async function submit(e) {
		e.preventDefault();
		setBusy(true);
		setError(null);
		try {
			if (mode === "signup") {
				const { error: err } = await authClient.signUp.email({
					email,
					password,
					name: name.trim() || email.split("@")[0] || "Nyx"
				});
				if (err) throw new Error(err.message || "Não foi possível criar a conta.");
			} else {
				const { error: err } = await authClient.signIn.email({
					email,
					password
				});
				if (err) throw new Error(err.message || "E-mail ou senha inválidos.");
			}
			await authClient.getSession();
			navigate({ to: "/" });
		} catch (err) {
			setError(err instanceof Error ? err.message : "Algo deu errado.");
		} finally {
			setBusy(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		onSubmit: (e) => void submit(e),
		className: "space-y-3",
		children: [
			mode === "signup" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-1.5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
					htmlFor: "name",
					children: "Nome"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					id: "name",
					value: name,
					onChange: (e) => setName(e.target.value),
					autoComplete: "name",
					required: true
				})]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-1.5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
					htmlFor: `${mode}-email`,
					children: "E-mail"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					id: `${mode}-email`,
					type: "email",
					value: email,
					onChange: (e) => setEmail(e.target.value),
					autoComplete: "email",
					required: true
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-1.5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
					htmlFor: `${mode}-password`,
					children: "Senha"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					id: `${mode}-password`,
					type: "password",
					value: password,
					onChange: (e) => setPassword(e.target.value),
					autoComplete: mode === "signup" ? "new-password" : "current-password",
					minLength: 8,
					required: true
				})]
			}),
			error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-destructive",
				children: error
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				type: "submit",
				className: "w-full",
				disabled: busy,
				children: mode === "signup" ? "Criar conta" : "Entrar"
			})
		]
	});
}
//#endregion
export { Login as component };
