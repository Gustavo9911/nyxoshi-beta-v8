import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { f as require_jsx_runtime } from "../_libs/@radix-ui/react-avatar+[...].mjs";
import { t as Button } from "./use-current-user-CHvoGxh7.mjs";
import { A as Copy, D as Flag, I as Ban, d as ShieldAlert, l as Shield, n as VolumeX, x as MessageCircle } from "../_libs/lucide-react.mjs";
import { r as useQueryClient, t as useQuery } from "../_libs/tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { n as Route$1 } from "./router-CdWjU9fN.mjs";
import { B as toggleBlock, C as getProfilePosts, S as getProfileLikes, U as toggleFollow, X as toggleRestriction, _ as getMessageThreadForUser, a as UserAvatar, i as Textarea, q as toggleMute, u as createReport, w as getProfileReposts, x as getProfileByUsername } from "./landing-DyPUp5dK.mjs";
import { n as useMe, t as SignedShell } from "./signed-shell-19pAj6J_.mjs";
import { a as DialogTitle, i as DialogHeader, n as DialogContent, o as PostCard, r as DialogDescription, t as Dialog } from "./post-card-CFdUJDkd.mjs";
import { n as FeedSkeleton } from "./feed-CGCUfyUU.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/u._username-CuLCYTVl.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ProfilePage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SignedShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProfileInner, {}) });
}
function ProfileInner() {
	const { username } = Route$1.useParams();
	const { me } = useMe();
	const queryClient = useQueryClient();
	const profile = useQuery({
		queryKey: ["profile", username],
		queryFn: () => getProfileByUsername({ data: username })
	});
	const [tab, setTab] = (0, import_react.useState)("posts");
	const posts = useQuery({
		queryKey: ["profile-posts", username],
		queryFn: () => getProfilePosts({ data: username }),
		enabled: tab === "posts"
	});
	const reposts = useQuery({
		queryKey: ["profile-reposts", username],
		queryFn: () => getProfileReposts({ data: username }),
		enabled: tab === "reposts"
	});
	const likes = useQuery({
		queryKey: ["profile-likes", username],
		queryFn: () => getProfileLikes({ data: username }),
		enabled: tab === "likes"
	});
	const [reportOpen, setReportOpen] = (0, import_react.useState)(false);
	const [reason, setReason] = (0, import_react.useState)("");
	const [muted, setMuted] = (0, import_react.useState)(false);
	const [restricted, setRestricted] = (0, import_react.useState)(false);
	const person = profile.data;
	if (profile.isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FeedSkeleton, {});
	if (!person) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "px-6 py-16 text-center text-sm text-muted",
		children: "Este perfil não existe."
	});
	const targetId = person.userId;
	async function onFollow() {
		try {
			await toggleFollow({ data: targetId });
			queryClient.invalidateQueries({ queryKey: ["profile", username] });
			queryClient.invalidateQueries({ queryKey: ["suggestions"] });
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "Não foi possível seguir.");
		}
	}
	async function onBlock() {
		try {
			const result = await toggleBlock({ data: targetId });
			toast.success(result.blocked ? "Conta bloqueada." : "Conta desbloqueada.");
			queryClient.invalidateQueries({ queryKey: ["profile", username] });
			queryClient.invalidateQueries({ queryKey: ["feed"] });
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "Não foi possível bloquear.");
		}
	}
	async function onMute() {
		try {
			const r = await toggleMute({ data: targetId });
			setMuted(r.muted);
			toast.success(r.muted ? "Conta silenciada." : "Conta não está mais silenciada.");
		} catch (e) {
			toast.error(e instanceof Error ? e.message : "Não foi possível silenciar.");
		}
	}
	async function onRestrict() {
		try {
			const r = await toggleRestriction({ data: targetId });
			setRestricted(r.restricted);
			toast.success(r.restricted ? "Conta restringida." : "Restrição removida.");
		} catch (e) {
			toast.error(e instanceof Error ? e.message : "Não foi possível restringir.");
		}
	}
	async function copyId() {
		await navigator.clipboard?.writeText(targetId);
		toast.success("ID do usuário copiado.");
	}
	async function onReport() {
		try {
			await createReport({ data: {
				targetUserId: targetId,
				reason
			} });
			toast.success("Denúncia enviada.");
			setReportOpen(false);
			setReason("");
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "Não foi possível denunciar.");
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative h-36 overflow-hidden bg-gradient-to-br from-violet-950 via-fuchsia-950/60 to-black",
			children: [person.bannerUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: person.bannerUrl,
				alt: "",
				className: "absolute inset-0 size-full object-cover"
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 opacity-60 starfield" }), person.profileGifUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: person.profileGifUrl,
				alt: "",
				className: "absolute right-4 top-4 size-20 rounded-xl object-cover opacity-90"
			}) : null]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "-mt-10 px-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserAvatar, {
					username: person.username,
					displayName: person.displayName,
					image: person.image || person.profileGifUrl,
					toProfile: false,
					className: "size-20 ring-4 ring-bg shadow-[0_0_35px_#a855f755]"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-3 flex items-start justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "font-display text-2xl tracking-tight",
							children: person.displayName
						}), person.role !== "user" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							title: person.role === "founder" ? `Fundador ${person.founderNumber ?? ""}` : person.role.replaceAll("_", " "),
							className: "inline-flex items-center gap-1 rounded-full border border-fuchsia-400/30 bg-fuchsia-500/10 px-2 py-1 text-xs text-fuchsia-200",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shield, { className: "size-3.5" }), person.role === "founder" ? `Fundador ${person.founderNumber ?? ""}` : person.role.replaceAll("_", " ")]
						}) : null]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-sm text-muted",
							children: ["@", person.username]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => void copyId(),
							className: "text-subtle hover:text-fg",
							title: "Copiar ID",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "size-3.5" })
						})]
					})] }), person.isSelf ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						variant: "outline",
						size: "sm",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/settings",
							children: "Editar perfil"
						})
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "sm",
								variant: person.isFollowing ? "outline" : "default",
								onClick: () => void onFollow(),
								children: person.isFollowing ? "Seguindo" : "Seguir"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "icon",
								variant: "ghost",
								className: "size-9",
								onClick: () => void onBlock(),
								title: person.isBlocked ? "Desbloquear" : "Bloquear",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ban, { className: "size-4" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "icon",
								variant: "ghost",
								className: "size-9",
								onClick: () => void onMute(),
								title: "Silenciar",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VolumeX, { className: "size-4" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "icon",
								variant: "ghost",
								className: "size-9",
								onClick: () => void onRestrict(),
								title: "Restringir",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldAlert, { className: "size-4" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "icon",
								variant: "ghost",
								className: "size-9",
								onClick: async () => {
									if (await getMessageThreadForUser({ data: targetId })) toast.success("Conversa encontrada. Abra Mensagens para continuar.");
									else toast.success("Você pode iniciar uma solicitação em Mensagens.");
								},
								title: "Mensagem",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { className: "size-4" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "icon",
								variant: "ghost",
								className: "size-9",
								onClick: () => setReportOpen(true),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flag, { className: "size-4" })
							})
						]
					})]
				}),
				person.websiteUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					href: person.websiteUrl,
					target: "_blank",
					rel: "noreferrer",
					className: "mt-2 block text-sm text-fuchsia-300",
					children: person.websiteUrl
				}) : null,
				person.bio ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 max-w-prose text-sm leading-relaxed",
					children: person.bio
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-4 flex gap-6 text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
							className: "tabular-nums text-fg",
							children: person.following
						}),
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-muted",
							children: "seguindo"
						})
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
							className: "tabular-nums text-fg",
							children: person.followers
						}),
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-muted",
							children: "seguidores"
						})
					] })]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-6 border-y border-border bg-[#0b0712]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-3 text-center text-xs",
				children: [
					["posts", "Publicações"],
					["reposts", "Reposts"],
					["likes", "Curtidas"]
				].map(([key, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => setTab(key),
					className: tab === key ? "border-b-2 border-fuchsia-400 px-3 py-3 font-medium text-fuchsia-200" : "px-3 py-3 text-muted",
					children: label
				}, key))
			}), (() => {
				const data = tab === "posts" ? posts.data : tab === "reposts" ? reposts.data : likes.data;
				return data && data.length > 0 ? data.map((post) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PostCard, {
					post,
					viewerId: me?.userId ?? null
				}, post.id)) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "px-6 py-12 text-center text-sm text-muted",
					children: person.isSelf ? "Você ainda não publicou nada." : "Nenhuma publicação ainda."
				});
			})()]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
			open: reportOpen,
			onOpenChange: setReportOpen,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "Denunciar conta" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: "Descreva o motivo. Isso não é público." })] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
					value: reason,
					onChange: (e) => setReason(e.target.value),
					maxLength: 400
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					onClick: () => void onReport(),
					disabled: reason.trim().length < 8,
					children: "Enviar"
				})
			] })
		})
	] });
}
//#endregion
export { ProfilePage as component };
