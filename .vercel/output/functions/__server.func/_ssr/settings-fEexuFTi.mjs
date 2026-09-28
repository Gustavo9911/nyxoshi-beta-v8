import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { f as require_jsx_runtime } from "../_libs/@radix-ui/react-avatar+[...].mjs";
import { i as signOut } from "./client-B40BzJxt.mjs";
import { t as Button } from "./use-current-user-CHvoGxh7.mjs";
import { r as useQueryClient } from "../_libs/tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { Q as updateMyProfile, Z as updateMyPreferences, i as Textarea, y as getMyPreferences } from "./landing-DyPUp5dK.mjs";
import { n as useMe, t as SignedShell } from "./signed-shell-19pAj6J_.mjs";
import { t as Input } from "./input-CqfiuKoe.mjs";
import { t as Label } from "./label-CYQYOFDo.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/settings-fEexuFTi.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function SettingsPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SignedShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingsInner, {}) });
}
function SettingsInner() {
	const { me } = useMe();
	const queryClient = useQueryClient();
	const [displayName, setDisplayName] = (0, import_react.useState)("");
	const [username, setUsername] = (0, import_react.useState)("");
	const [bio, setBio] = (0, import_react.useState)("");
	const [image, setImage] = (0, import_react.useState)("");
	const [bannerUrl, setBannerUrl] = (0, import_react.useState)("");
	const [profileGifUrl, setProfileGifUrl] = (0, import_react.useState)("");
	const [websiteUrl, setWebsiteUrl] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [prefs, setPrefs] = (0, import_react.useState)({
		likes: true,
		comments: true,
		follows: true,
		messages: true,
		reposts: true,
		mentions: true,
		quotes: true,
		reactions: true,
		discoverable: true,
		message_policy: "requests",
		mention_policy: "everyone"
	});
	(0, import_react.useEffect)(() => {
		if (!me) return;
		getMyPreferences().then((v) => setPrefs({
			...v.notifications,
			...v.privacy
		}));
		setDisplayName(me.displayName);
		setUsername(me.username);
		setBio(me.bio);
		setImage(me.image ?? "");
		setBannerUrl(me.bannerUrl ?? "");
		setProfileGifUrl(me.profileGifUrl ?? "");
		setWebsiteUrl(me.websiteUrl ?? "");
	}, [me]);
	if (!me) return null;
	async function save(e) {
		e.preventDefault();
		setBusy(true);
		try {
			await updateMyProfile({ data: {
				displayName,
				username,
				bio,
				image,
				bannerUrl,
				profileGifUrl,
				websiteUrl
			} });
			await updateMyPreferences({ data: {
				notifications: {
					likes: prefs.likes,
					comments: prefs.comments,
					follows: prefs.follows,
					messages: prefs.messages,
					reposts: prefs.reposts,
					mentions: prefs.mentions,
					quotes: prefs.quotes,
					reactions: prefs.reactions
				},
				privacy: {
					discoverable: prefs.discoverable,
					message_policy: prefs.message_policy,
					mention_policy: prefs.mention_policy
				}
			} });
			await queryClient.invalidateQueries({ queryKey: ["me"] });
			toast.success("Perfil atualizado.");
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "Não foi possível salvar.");
		} finally {
			setBusy(false);
		}
	}
	async function logout() {
		try {
			await signOut("/");
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "Não foi possível sair.");
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
		className: "sticky top-0 z-20 border-b border-border bg-bg/85 px-4 py-3 backdrop-blur-sm",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "font-display text-xl tracking-tight",
			children: "Configurações"
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		onSubmit: (e) => void save(e),
		className: "space-y-8 px-4 py-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-lg",
					children: "Perfil"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted",
					children: "Personalize como as pessoas verão você."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Nome",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: displayName,
								onChange: (e) => setDisplayName(e.target.value),
								maxLength: 40,
								required: true
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Usuário",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted",
									children: "@"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									value: username,
									onChange: (e) => setUsername(e.target.value.toLowerCase()),
									className: "pl-7",
									maxLength: 20,
									required: true
								})]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Bio",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
								value: bio,
								onChange: (e) => setBio(e.target.value.slice(0, 160)),
								maxLength: 160,
								placeholder: "Uma linha sobre você"
							})
						})
					]
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-lg",
					children: "Personalização visual"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted",
					children: "Use URLs públicas de imagem/GIF nesta primeira beta. O armazenamento próprio pode ser conectado depois."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Foto de perfil (URL)",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: image,
								onChange: (e) => setImage(e.target.value),
								type: "url",
								placeholder: "https://..."
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Banner (URL)",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: bannerUrl,
								onChange: (e) => setBannerUrl(e.target.value),
								type: "url",
								placeholder: "https://..."
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "GIF do perfil (URL)",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: profileGifUrl,
								onChange: (e) => setProfileGifUrl(e.target.value),
								type: "url",
								placeholder: "https://...gif"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Site/link",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: websiteUrl,
								onChange: (e) => setWebsiteUrl(e.target.value),
								type: "url",
								placeholder: "https://..."
							})
						})
					]
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-lg",
				children: "Privacidade, notificações e segurança"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 space-y-3 text-sm",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						className: "block rounded-xl border border-border p-3 hover:bg-secondary",
						to: "/messages",
						children: "Mensagens e solicitações →"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid gap-2 sm:grid-cols-2",
						children: [
							"likes",
							"comments",
							"follows",
							"messages",
							"reposts",
							"mentions",
							"quotes",
							"reactions"
						].map((k) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "flex items-center justify-between rounded-xl border border-border p-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: k }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "checkbox",
								checked: Boolean(prefs[k]),
								onChange: (e) => setPrefs((v) => ({
									...v,
									[k]: e.target.checked
								}))
							})]
						}, k))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "flex items-center justify-between rounded-xl border border-border p-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Permitir descoberta do perfil" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "checkbox",
							checked: prefs.discoverable,
							onChange: (e) => setPrefs((v) => ({
								...v,
								discoverable: e.target.checked
							}))
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted",
						children: "Bloqueios, silenciamentos e restrições também podem ser controlados diretamente no perfil de cada pessoa."
					})
				]
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-2xl border border-border p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm font-medium",
						children: "Seu cargo"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted",
						children: me.role === "founder" ? `Fundadora${me.founderNumber ? ` #${me.founderNumber}` : ""}` : me.role.replaceAll("_", " ")
					}),
					me.role === "founder" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/founders",
						className: "mt-3 inline-block text-sm text-fuchsia-300",
						children: "Abrir painel dos fundadores →"
					}) : null
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-3 sm:flex-row",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "submit",
					disabled: busy,
					children: busy ? "Salvando…" : "Salvar alterações"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "button",
					variant: "outline",
					onClick: () => void logout(),
					children: "Sair da conta"
				})]
			})
		]
	})] });
}
function Field({ label, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-1.5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: label }), children]
	});
}
//#endregion
export { SettingsPage as component };
