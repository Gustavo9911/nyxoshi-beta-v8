import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { f as require_jsx_runtime } from "../_libs/@radix-ui/react-avatar+[...].mjs";
import { t as Button } from "./use-current-user-CHvoGxh7.mjs";
import { O as Eye, l as Shield, p as Send, r as Users } from "../_libs/lucide-react.mjs";
import { r as useQueryClient, t as useQuery } from "../_libs/tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { F as revealUserEmail, O as listFounders, T as getUserSecurityInfo, i as Textarea, s as createGlobalAnnouncement, v as getModerationOverview, z as setUserRole } from "./landing-DyPUp5dK.mjs";
import { n as useMe, t as SignedShell } from "./signed-shell-19pAj6J_.mjs";
import { t as Input } from "./input-CqfiuKoe.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/founders-C4B_3WVA.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function FoundersPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SignedShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Inner, {}) });
}
function Inner() {
	const { me } = useMe();
	const qc = useQueryClient();
	const overview = useQuery({
		queryKey: ["moderation-overview"],
		queryFn: () => getModerationOverview(),
		enabled: me?.role === "founder" || me?.role === "admin" || me?.role === "moderator"
	});
	const founders = useQuery({
		queryKey: ["founders"],
		queryFn: () => listFounders(),
		enabled: me?.role === "founder"
	});
	const security = useQuery({
		queryKey: ["founder-security"],
		queryFn: () => getUserSecurityInfo(),
		enabled: me?.founderNumber === 1
	});
	const [announcement, setAnnouncement] = (0, import_react.useState)("");
	const [reason, setReason] = (0, import_react.useState)("");
	const [email, setEmail] = (0, import_react.useState)(null);
	async function role(targetUserId, role) {
		try {
			await setUserRole({ data: {
				targetUserId,
				role
			} });
			await qc.invalidateQueries({ queryKey: ["moderation-overview"] });
			await qc.invalidateQueries({ queryKey: ["founders"] });
			toast.success("Cargo atualizado.");
		} catch (e) {
			toast.error(e instanceof Error ? e.message : "Não foi possível atualizar.");
		}
	}
	async function reveal(targetUserId) {
		try {
			const r = await revealUserEmail({ data: {
				targetUserId,
				reason
			} });
			setEmail(r.email);
			setReason("");
		} catch (e) {
			toast.error(e instanceof Error ? e.message : "Não foi possível revelar o e-mail.");
		}
	}
	async function sendAnnouncement() {
		if (!announcement.trim()) return;
		try {
			await createGlobalAnnouncement({ data: {
				body: announcement,
				seconds: 12
			} });
			setAnnouncement("");
			toast.success("Comunicado enviado para todo o Nyxoshi.");
		} catch (e) {
			toast.error(e instanceof Error ? e.message : "Não foi possível enviar.");
		}
	}
	if (!me || me.role !== "founder" && me.role !== "admin" && me.role !== "moderator") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "p-8 text-center text-muted",
		children: "Acesso negado."
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "p-4 pb-12",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "border-b border-border pb-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-2xl",
					children: "Painel dos Fundadores"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted",
					children: "Permissões administrativas verificadas no servidor."
				})]
			}),
			me.role === "founder" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-5 nyx-panel rounded-2xl p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shield, { className: "text-fuchsia-300" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-medium",
						children: "Fundadores"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-3 space-y-2",
					children: founders.data?.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between rounded-xl border border-border p-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: f.display_name }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs text-muted",
							children: [
								"@",
								f.username,
								" · Fundador #",
								f.founder_number ?? "—"
							]
						})] }), me.founderNumber === 1 && f.user_id !== me.userId ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "sm",
								variant: "outline",
								onClick: () => void role(f.user_id, "admin"),
								children: "Admin"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "sm",
								variant: "ghost",
								onClick: () => void role(f.user_id, "user"),
								children: "Remover"
							})]
						}) : null]
					}, f.user_id))
				})]
			}) : null,
			me.founderNumber === 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-5 nyx-panel rounded-2xl p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "text-fuchsia-300" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-medium",
								children: "Segurança confidencial — Fundadora #1"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							size: "sm",
							variant: "outline",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/founder-security",
								children: "Abrir painel separado"
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-xs text-muted",
						children: "Somente a Fundadora #1 pode acessar e revelar e-mails."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-3 space-y-2",
						children: security.data?.map((u) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "rounded-xl border border-border p-3",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: u.display_name }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-xs text-muted",
									children: [
										"@",
										u.username,
										" · ",
										u.emailMasked
									]
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									size: "sm",
									variant: "outline",
									onClick: () => void reveal(u.user_id),
									children: "Ver e-mail"
								})]
							})
						}, u.user_id))
					}),
					email ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3 rounded-xl border border-fuchsia-400/30 bg-fuchsia-500/10 p-3 text-sm",
						children: ["E-mail revelado: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: email })]
					}) : null,
					!email ? null : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						className: "mt-2",
						variant: "ghost",
						onClick: () => setEmail(null),
						children: "Ocultar"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						className: "mt-3",
						value: reason,
						onChange: (e) => setReason(e.target.value),
						placeholder: "Motivo para acessar o e-mail (mínimo 8 caracteres)"
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-5 nyx-panel rounded-2xl p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { className: "text-fuchsia-300" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-medium",
							children: "Comunicado global"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-xs text-muted",
						children: "Mensagem do Nyxoshi enviada pelo grupo dos Fundadores e exibida para todos."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
						className: "mt-3",
						value: announcement,
						onChange: (e) => setAnnouncement(e.target.value),
						placeholder: "Mensagem do Nyxoshi...",
						maxLength: 500
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						className: "mt-2",
						onClick: () => void sendAnnouncement(),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, {}), "Enviar"]
					})
				]
			})] }) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-5 nyx-panel rounded-2xl p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "text-fuchsia-300" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-medium",
						children: "Visão geral"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-2 text-sm text-muted",
					children: [
						"Usuários: ",
						overview.data?.counts.users ?? 0,
						" · Posts: ",
						overview.data?.counts.posts ?? 0,
						" · Denúncias: ",
						overview.data?.counts.reports ?? 0
					]
				})]
			})
		]
	});
}
//#endregion
export { FoundersPage as component };
