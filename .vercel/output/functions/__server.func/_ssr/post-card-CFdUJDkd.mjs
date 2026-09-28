import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { b as useNavigate, v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { f as require_jsx_runtime } from "../_libs/@radix-ui/react-avatar+[...].mjs";
import { i as cn, t as Button } from "./use-current-user-CHvoGxh7.mjs";
import { A as Copy, D as Flag, P as Bookmark, _ as Quote, g as Repeat2, k as Ellipsis, l as Shield, s as Trash2, t as X, w as Heart, x as MessageCircle } from "../_libs/lucide-react.mjs";
import { r as useQueryClient } from "../_libs/tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { a as DialogOverlay$1, i as DialogDescription$1, n as DialogClose, o as DialogPortal$1, r as DialogContent$1, s as DialogTitle$1, t as Dialog$1 } from "../_libs/@radix-ui/react-dialog+[...].mjs";
import { G as toggleLike, J as toggleReaction, V as toggleBookmark, Y as toggleRepost, a as UserAvatar, i as Textarea, l as createQuote, m as deletePost, u as createReport } from "./landing-DyPUp5dK.mjs";
import { a as Separator2, i as Root2, n as Item2, o as Trigger, r as Portal2, t as Content2 } from "../_libs/@radix-ui/react-dropdown-menu+[...].mjs";
import { t as relativeTime } from "./time-CB02cFBf.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/post-card-CFdUJDkd.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var DropdownMenu = Root2;
var DropdownMenuTrigger = Trigger;
var DropdownMenuContent = import_react.forwardRef(({ className, sideOffset = 8, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Portal2, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content2, {
	ref,
	sideOffset,
	className: cn("z-50 min-w-44 overflow-hidden rounded-lg border border-border bg-popover p-1 text-fg shadow-xl origin-[var(--radix-dropdown-menu-content-transform-origin)] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-[0.97] data-[state=open]:zoom-in-100", className),
	...props
}) }));
DropdownMenuContent.displayName = Content2.displayName;
var DropdownMenuItem = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Item2, {
	ref,
	className: cn("relative flex cursor-pointer select-none items-center gap-2 rounded-sm px-3 py-2 text-sm outline-none transition-colors focus:bg-secondary data-disabled:pointer-events-none data-disabled:opacity-50", className),
	...props
}));
DropdownMenuItem.displayName = Item2.displayName;
var DropdownMenuSeparator = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator2, {
	ref,
	className: cn("-mx-1 my-1 h-px bg-border", className),
	...props
}));
DropdownMenuSeparator.displayName = Separator2.displayName;
var Dialog = Dialog$1;
var DialogPortal = DialogPortal$1;
var DialogOverlay = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay$1, {
	ref,
	className: cn("fixed inset-0 z-50 bg-bg/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", className),
	...props
}));
DialogOverlay.displayName = DialogOverlay$1.displayName;
var DialogContent = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent$1, {
	ref,
	className: cn("fixed top-1/2 left-1/2 z-50 w-[calc(100%-2rem)] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-xl border border-border bg-card p-5 shadow-2xl duration-[var(--motion-fast)] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-[0.96] data-[state=open]:zoom-in-100", className),
	...props,
	children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogClose, {
		className: "absolute top-3 right-3 rounded-sm p-1 text-muted opacity-80 hover:opacity-100 focus-visible:ring-2 focus-visible:ring-ring",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "sr-only",
			children: "Fechar"
		})]
	})]
})] }));
DialogContent.displayName = DialogContent$1.displayName;
function DialogHeader({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("flex flex-col gap-1 pr-8", className),
		...props
	});
}
var DialogTitle = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle$1, {
	ref,
	className: cn("font-display text-xl font-medium tracking-tight", className),
	...props
}));
DialogTitle.displayName = DialogTitle$1.displayName;
var DialogDescription = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription$1, {
	ref,
	className: cn("text-sm text-muted", className),
	...props
}));
DialogDescription.displayName = DialogDescription$1.displayName;
function RoleBadge({ role, founderNumber }) {
	if (!role || role === "user") return null;
	const label = role === "founder" ? `Fundador ${founderNumber ?? ""}`.trim() : role.replaceAll("_", " ");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		title: label,
		className: "inline-flex items-center gap-1 rounded-full border border-fuchsia-400/30 bg-fuchsia-500/10 px-1.5 py-0.5 text-[10px] text-fuchsia-200",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shield, { className: "size-3" }), role === "founder" ? `F${founderNumber ?? ""}` : role]
	});
}
function PostCard({ post, viewerId, onChanged }) {
	const queryClient = useQueryClient();
	const navigate = useNavigate();
	const isMine = viewerId === post.author.userId;
	const [liked, setLiked] = (0, import_react.useState)(post.likedByMe);
	const [likes, setLikes] = (0, import_react.useState)(post.likeCount);
	const [reportOpen, setReportOpen] = (0, import_react.useState)(false);
	const [reason, setReason] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [reposted, setReposted] = (0, import_react.useState)(post.repostedByMe);
	const [reposts, setReposts] = (0, import_react.useState)(post.repostCount);
	const [bookmarked, setBookmarked] = (0, import_react.useState)(post.bookmarkedByMe);
	const [quoteOpen, setQuoteOpen] = (0, import_react.useState)(false);
	const [quoteBody, setQuoteBody] = (0, import_react.useState)("");
	async function onLike() {
		if (!viewerId) {
			navigate({ to: "/login" });
			return;
		}
		const next = !liked;
		setLiked(next);
		setLikes((n) => n + (next ? 1 : -1));
		try {
			const result = await toggleLike({ data: post.id });
			setLiked(result.liked);
			queryClient.invalidateQueries({ queryKey: ["feed"] });
			onChanged?.();
		} catch {
			setLiked(!next);
			setLikes((n) => n + (next ? -1 : 1));
			toast.error("Não foi possível curtir.");
		}
	}
	async function onRepost() {
		if (!viewerId) {
			navigate({ to: "/login" });
			return;
		}
		const next = !reposted;
		setReposted(next);
		setReposts((n) => n + (next ? 1 : -1));
		try {
			const r = await toggleRepost({ data: post.id });
			setReposted(r.reposted);
			queryClient.invalidateQueries({ queryKey: ["feed"] });
		} catch {
			setReposted(!next);
			setReposts((n) => n + (next ? -1 : 1));
			toast.error("Não foi possível repostar.");
		}
	}
	async function onBookmark() {
		if (!viewerId) {
			navigate({ to: "/login" });
			return;
		}
		const next = !bookmarked;
		setBookmarked(next);
		try {
			const r = await toggleBookmark({ data: post.id });
			setBookmarked(r.bookmarked);
			toast.success(r.bookmarked ? "Salvo nos seus favoritos." : "Removido dos favoritos.");
		} catch {
			setBookmarked(!next);
			toast.error("Não foi possível salvar.");
		}
	}
	async function onQuote() {
		if (!quoteBody.trim()) return;
		setBusy(true);
		try {
			await createQuote({ data: {
				postId: post.id,
				body: quoteBody
			} });
			setQuoteBody("");
			setQuoteOpen(false);
			toast.success("Citação publicada.");
			queryClient.invalidateQueries({ queryKey: ["feed"] });
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "Não foi possível citar.");
		} finally {
			setBusy(false);
		}
	}
	async function copyPostId() {
		await navigator.clipboard?.writeText(post.id);
		toast.success("ID da publicação copiado.");
	}
	async function onDelete() {
		try {
			await deletePost({ data: post.id });
			toast.success("Publicação apagada.");
			queryClient.invalidateQueries({ queryKey: ["feed"] });
			onChanged?.();
		} catch {
			toast.error("Não foi possível apagar.");
		}
	}
	async function onReport() {
		setBusy(true);
		try {
			await createReport({ data: {
				targetPostId: post.id,
				targetUserId: post.author.userId,
				reason
			} });
			toast.success("Denúncia enviada.");
			setReportOpen(false);
			setReason("");
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "Não foi possível denunciar.");
		} finally {
			setBusy(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "border-b border-border px-4 py-4 transition-colors hover:bg-fuchsia-500/[.018]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserAvatar, {
					username: post.author.username,
					displayName: post.author.displayName,
					image: post.author.image
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0 flex-1",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start justify-between gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/u/$username",
									params: { username: post.author.username },
									className: "truncate font-medium text-fg hover:underline",
									children: post.author.displayName
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "truncate text-sm text-muted",
										children: [
											"@",
											post.author.username,
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "text-subtle",
												children: [" · ", relativeTime(post.createdAt)]
											})
										]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RoleBadge, {
										role: post.author.role,
										founderNumber: post.author.founderNumber
									})]
								})]
							}), viewerId ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenu, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuTrigger, {
								asChild: true,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									variant: "ghost",
									size: "icon",
									className: "size-9 text-muted",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ellipsis, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "sr-only",
										children: "Mais"
									})]
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuContent, {
								align: "end",
								children: isMine ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
									onSelect: () => void onDelete(),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4" }), "Apagar"]
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
									onSelect: () => setReportOpen(true),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flag, { className: "size-4" }), "Denunciar"]
								})
							})] }) : null]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/post/$postId",
							params: { postId: post.id },
							className: "mt-2 block whitespace-pre-wrap text-[15px] leading-relaxed text-fg",
							children: post.body
						}),
						post.quotedPost ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/post/$postId",
							params: { postId: post.quotedPost.id },
							className: "mt-3 block rounded-2xl border border-border bg-secondary/40 p-3 hover:bg-secondary/60",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2 text-xs",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: post.quotedPost.author.displayName }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-muted",
										children: ["@", post.quotedPost.author.username]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RoleBadge, {
										role: post.quotedPost.author.role,
										founderNumber: post.quotedPost.author.founderNumber
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 whitespace-pre-wrap text-sm text-fg",
								children: post.quotedPost.body
							})]
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-3 flex flex-wrap items-center gap-1",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: () => void onLike(),
									className: cn("inline-flex h-9 items-center gap-1.5 rounded-full px-2 text-sm transition-colors", liked ? "text-like drop-shadow-[0_0_10px_#f472b655]" : "text-muted hover:text-fg"),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: cn("size-4", liked && "fill-current") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "tabular-nums",
										children: likes
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: () => void onRepost(),
									className: cn("inline-flex h-9 items-center gap-1.5 rounded-full px-2 text-sm", reposted ? "text-emerald-300" : "text-muted hover:text-fg"),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Repeat2, { className: "size-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: reposts })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: () => setQuoteOpen(true),
									className: "inline-flex h-9 items-center gap-1.5 rounded-full px-2 text-sm text-muted hover:text-fg",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Quote, { className: "size-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: post.quoteCount })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => void onBookmark(),
									className: cn("inline-flex h-9 items-center gap-1.5 rounded-full px-2 text-sm", bookmarked ? "text-fuchsia-300" : "text-muted hover:text-fg"),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bookmark, { className: cn("size-4", bookmarked && "fill-current") })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => void copyPostId(),
									className: "inline-flex h-9 items-center gap-1.5 rounded-full px-2 text-sm text-muted hover:text-fg",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "size-4" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => {
										if (!viewerId) {
											navigate({ to: "/login" });
											return;
										}
										toggleReaction({ data: {
											id: post.id,
											reaction: "like"
										} }).then(() => queryClient.invalidateQueries({ queryKey: ["feed"] })).catch(() => toast.error("Não foi possível reagir."));
									},
									className: "inline-flex h-9 items-center gap-1.5 rounded-full px-2 text-sm text-muted hover:text-fg",
									children: "✨"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/post/$postId",
									params: { postId: post.id },
									className: "inline-flex h-9 items-center gap-1.5 rounded-full px-2 text-sm text-muted hover:text-fg",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { className: "size-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "tabular-nums",
										children: post.commentCount
									})]
								})
							]
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				open: quoteOpen,
				onOpenChange: setQuoteOpen,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "Citar publicação" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: "Adicione seu comentário e publique uma citação." })] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
						value: quoteBody,
						onChange: (e) => setQuoteBody(e.target.value.slice(0, 500)),
						placeholder: "O que você acha?"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						onClick: () => void onQuote(),
						disabled: busy || !quoteBody.trim(),
						children: "Publicar citação"
					})
				] })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				open: reportOpen,
				onOpenChange: setReportOpen,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "Denunciar publicação" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: "Conte o que está errado. A equipe avalia cada relato." })] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
						value: reason,
						onChange: (e) => setReason(e.target.value),
						placeholder: "Descreva o motivo",
						maxLength: 400
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						onClick: () => void onReport(),
						disabled: busy || reason.trim().length < 8,
						children: "Enviar denúncia"
					})
				] })
			})
		]
	});
}
//#endregion
export { DialogTitle as a, DialogHeader as i, DialogContent as n, PostCard as o, DialogDescription as r, Dialog as t };
