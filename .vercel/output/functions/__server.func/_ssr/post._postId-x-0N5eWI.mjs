import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { f as require_jsx_runtime } from "../_libs/@radix-ui/react-avatar+[...].mjs";
import { t as Button } from "./use-current-user-CHvoGxh7.mjs";
import { R as ArrowLeft, h as Reply, w as Heart } from "../_libs/lucide-react.mjs";
import { r as useQueryClient, t as useQuery } from "../_libs/tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { r as Route$2 } from "./router-CdWjU9fN.mjs";
import { E as listComments, H as toggleCommentReaction, a as UserAvatar, b as getPost, i as Textarea, o as createComment } from "./landing-DyPUp5dK.mjs";
import { n as useMe, t as SignedShell } from "./signed-shell-19pAj6J_.mjs";
import { t as relativeTime } from "./time-CB02cFBf.mjs";
import { o as PostCard } from "./post-card-CFdUJDkd.mjs";
import { n as FeedSkeleton } from "./feed-CGCUfyUU.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/post._postId-x-0N5eWI.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function PostPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SignedShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PostInner, {}) });
}
function PostInner() {
	const { postId } = Route$2.useParams();
	const { me } = useMe();
	const queryClient = useQueryClient();
	const post = useQuery({
		queryKey: ["post", postId],
		queryFn: () => getPost({ data: postId })
	});
	const comments = useQuery({
		queryKey: ["comments", postId],
		queryFn: () => listComments({ data: postId })
	});
	const [body, setBody] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [replyTo, setReplyTo] = (0, import_react.useState)(null);
	async function submit() {
		if (!body.trim()) return;
		setBusy(true);
		try {
			await createComment({ data: {
				postId,
				body,
				parentId: replyTo
			} });
			setBody("");
			setReplyTo(null);
			queryClient.invalidateQueries({ queryKey: ["comments", postId] });
			queryClient.invalidateQueries({ queryKey: ["post", postId] });
			queryClient.invalidateQueries({ queryKey: ["feed"] });
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "Não foi possível comentar.");
		} finally {
			setBusy(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: "sticky top-0 z-20 flex items-center gap-3 border-b border-border bg-bg/85 px-3 py-3 backdrop-blur-sm",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
			variant: "ghost",
			size: "icon",
			className: "size-9",
			onClick: () => history.back(),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "size-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "sr-only",
				children: "Voltar"
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "font-display text-xl tracking-tight",
			children: "Publicação"
		})]
	}), post.isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FeedSkeleton, {}) : !post.data ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "px-6 py-16 text-center text-sm text-muted",
		children: "Esta publicação não existe mais."
	}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PostCard, {
			post: post.data,
			viewerId: me?.userId ?? null,
			onChanged: () => void post.refetch()
		}),
		me ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex gap-3 border-b border-border px-4 py-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserAvatar, {
				username: me.username,
				displayName: me.displayName,
				image: me.image
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0 flex-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
					value: body,
					onChange: (e) => setBody(e.target.value.slice(0, 300)),
					placeholder: replyTo ? "Respondendo ao comentário…" : "Escreva um comentário",
					className: "min-h-20"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-2 flex justify-end",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "sm",
						onClick: () => void submit(),
						disabled: busy || !body.trim(),
						children: "Responder"
					})
				})]
			})]
		}) : null,
		comments.data?.map((comment) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
			className: `flex gap-3 border-b border-border px-4 py-4 ${comment.parentId ? "ml-8 bg-secondary/20" : ""}`,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserAvatar, {
				username: comment.author.username,
				displayName: comment.author.displayName,
				image: comment.author.image,
				className: "size-9"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0 flex-1",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-medium",
								children: comment.author.displayName
							}),
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-muted",
								children: ["@", comment.author.username]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-subtle",
								children: [" · ", relativeTime(comment.createdAt)]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 whitespace-pre-wrap text-sm leading-relaxed",
						children: comment.body
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-2 flex items-center gap-1",
						children: [
							me ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => void toggleCommentReaction({ data: {
									id: comment.id,
									reaction: "like"
								} }).then(() => queryClient.invalidateQueries({ queryKey: ["comments", postId] })),
								className: `inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs ${comment.reactedByMe ? "text-like" : "text-muted hover:text-fg"}`,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: `size-3.5 ${comment.reactedByMe ? "fill-current" : ""}` }), comment.reactionCount]
							}) : null,
							me ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => {
									setReplyTo(comment.id);
									window.scrollTo({
										top: 0,
										behavior: "smooth"
									});
								},
								className: "inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs text-muted hover:text-fg",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reply, { className: "size-3.5" }), "Responder"]
							}) : null,
							comment.replyCount ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "px-2 text-xs text-muted",
								children: [comment.replyCount, " resposta(s)"]
							}) : null
						]
					})
				]
			})]
		}, comment.id))
	] })] });
}
//#endregion
export { PostPage as component };
