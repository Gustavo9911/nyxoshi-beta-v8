import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { f as require_jsx_runtime } from "../_libs/@radix-ui/react-avatar+[...].mjs";
import { t as Button } from "./use-current-user-CHvoGxh7.mjs";
import { D as Flag, N as Check, d as ShieldAlert, h as Reply, m as Search, r as Users, s as Trash2, t as X, w as Heart, x as MessageCircle } from "../_libs/lucide-react.mjs";
import { r as useQueryClient, t as useQuery } from "../_libs/tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { A as listGroups, D as listConversations, I as searchNyxoshi, K as toggleMessageReaction, L as sendGroupMessage, M as listMessages, R as sendMessage, W as toggleGroupMessageReaction, _ as getMessageThreadForUser, a as UserAvatar, c as createGroup, d as decideMessageRequest, f as deleteGroupMessage, i as Textarea, j as listMessageRequests, k as listGroupMessages, p as deleteMessage, s as createGlobalAnnouncement, u as createReport } from "./landing-DyPUp5dK.mjs";
import { n as useMe, t as SignedShell } from "./signed-shell-19pAj6J_.mjs";
import { t as Input } from "./input-CqfiuKoe.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/messages-D-k54pKK.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function MessagesPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SignedShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessagesInner, {}) });
}
function MessagesInner() {
	const { me } = useMe();
	const qc = useQueryClient();
	const [tab, setTab] = (0, import_react.useState)("conversations");
	const [selected, setSelected] = (0, import_react.useState)(null);
	const [selectedGroup, setSelectedGroup] = (0, import_react.useState)(null);
	const [q, setQ] = (0, import_react.useState)("");
	const [groupName, setGroupName] = (0, import_react.useState)("");
	const [groupMembers, setGroupMembers] = (0, import_react.useState)([]);
	const conversations = useQuery({
		queryKey: ["conversations"],
		queryFn: () => listConversations(),
		enabled: Boolean(me)
	});
	const groups = useQuery({
		queryKey: ["groups"],
		queryFn: () => listGroups(),
		enabled: Boolean(me)
	});
	const requests = useQuery({
		queryKey: ["message-requests"],
		queryFn: () => listMessageRequests(),
		enabled: Boolean(me)
	});
	const search = useQuery({
		queryKey: ["message-user-search", q],
		queryFn: () => searchNyxoshi({ data: { q } }),
		enabled: q.trim().length >= 2
	});
	async function decide(id, a) {
		try {
			await decideMessageRequest({ data: {
				requestId: id,
				action: a
			} });
			await qc.invalidateQueries({ queryKey: ["message-requests"] });
			await qc.invalidateQueries({ queryKey: ["conversations"] });
			toast.success("AÃ§Ã£o concluÃ­da.");
		} catch (e) {
			toast.error(e instanceof Error ? e.message : "NÃ£o foi possÃ­vel concluir.");
		}
	}
	async function create() {
		if (!groupName.trim() || groupMembers.length < 1) return;
		try {
			await createGroup({ data: {
				name: groupName,
				memberIds: groupMembers
			} });
			setGroupName("");
			setGroupMembers([]);
			await qc.invalidateQueries({ queryKey: ["groups"] });
			toast.success("Grupo criado.");
		} catch (e) {
			toast.error(e instanceof Error ? e.message : "NÃ£o foi possÃ­vel criar o grupo.");
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-dvh",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "sticky top-0 z-20 border-b border-border bg-bg/90 px-4 py-3 backdrop-blur-sm",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "font-display text-xl",
						children: "Mensagens"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative mt-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: q,
							onChange: (e) => setQ(e.target.value),
							placeholder: "Buscar pessoas...",
							className: "rounded-full bg-secondary pl-9"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-3 grid grid-cols-4 rounded-xl border border-border p-1 text-xs",
						children: [
							"conversations",
							"groups",
							"requests",
							"spam"
						].map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setTab(t),
							className: `rounded-lg px-2 py-2 ${tab === t ? "bg-secondary text-fg" : "text-muted"}`,
							children: t === "conversations" ? "Conversas" : t === "groups" ? "Grupos" : t === "requests" ? `SolicitaÃ§Ãµes (${requests.data?.filter((r) => r.status === "pending").length ?? 0})` : "Spam"
						}, t))
					})
				]
			}),
			q.trim().length >= 2 && search.data?.people.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "border-b border-border p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-muted",
					children: "Pessoas"
				}), search.data.people.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-2 flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						className: "flex min-w-0 flex-1 items-center gap-3 text-left",
						onClick: async () => {
							const id = await getMessageThreadForUser({ data: p.userId });
							setSelected({
								threadId: id ?? "",
								other: p,
								lastMessage: null,
								unread: 0
							});
							setSelectedGroup(null);
							setTab("conversations");
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserAvatar, {
							username: p.username,
							displayName: p.displayName,
							image: p.image,
							toProfile: false
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: p.displayName }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "block text-xs text-muted",
							children: ["@", p.username]
						})] })]
					}), tab === "groups" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "rounded-lg border px-2 py-1 text-xs",
						onClick: () => setGroupMembers((v) => v.includes(p.userId) ? v.filter((x) => x !== p.userId) : [...v, p.userId]),
						children: groupMembers.includes(p.userId) ? "Selecionado" : "Adicionar"
					}) : null]
				}, p.userId))]
			}) : null,
			tab === "groups" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "nyx-panel rounded-2xl p-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-medium",
							children: "Criar grupo"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							className: "mt-3",
							value: groupName,
							onChange: (e) => setGroupName(e.target.value),
							placeholder: "Nome do grupo"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-2 text-xs text-muted",
							children: ["Selecionados: ", groupMembers.length]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							className: "mt-3 w-full",
							onClick: () => void create(),
							disabled: !groupName.trim() || !groupMembers.length,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "size-4" }), "Criar grupo"]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-4 space-y-2",
					children: groups.data?.map((g) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						className: "flex w-full items-center gap-3 rounded-xl border border-border p-3 text-left",
						onClick: () => {
							setSelectedGroup(g);
							setSelected(null);
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "size-5" }), g.name]
					}, g.id))
				})]
			}) : tab !== "conversations" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-3 p-4",
				children: requests.data?.filter((r) => tab === "spam" ? r.status === "spam" : r.status === "pending").map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "nyx-panel rounded-2xl p-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserAvatar, {
								username: r.sender.username,
								displayName: r.sender.displayName,
								image: r.sender.image,
								toProfile: false
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: r.sender.displayName })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-sm",
							children: r.body
						}),
						tab === "requests" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-3 flex gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									size: "sm",
									onClick: () => void decide(r.id, "accept"),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {}), "Aceitar"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									size: "sm",
									variant: "outline",
									onClick: () => void decide(r.id, "decline"),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {}), "Recusar"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									size: "sm",
									variant: "ghost",
									onClick: () => void decide(r.id, "spam"),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldAlert, {}), "Spam"]
								})
							]
						}) : null
					]
				}, r.id))
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-2 p-4",
				children: conversations.data?.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					className: "flex w-full items-center gap-3 rounded-xl p-3 text-left hover:bg-secondary",
					onClick: () => {
						setSelected(c);
						setSelectedGroup(null);
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserAvatar, {
						username: c.other.username,
						displayName: c.other.displayName,
						image: c.other.image,
						toProfile: false
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "min-w-0 flex-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
							className: "block truncate",
							children: c.other.displayName
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "block truncate text-sm text-muted",
							children: c.lastMessage?.body ?? "Conversa iniciada"
						})]
					})]
				}, c.threadId))
			}),
			selected ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConversationPanel, {
				selected,
				meId: me?.userId ?? ""
			}) : null,
			selectedGroup ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GroupPanel, {
				group: selectedGroup,
				meId: me?.userId ?? "",
				isFounder: me?.role === "founder"
			}) : null
		]
	});
}
function ConversationPanel({ selected, meId }) {
	const query = useQuery({
		queryKey: ["messages", selected.threadId],
		queryFn: () => listMessages({ data: selected.threadId }),
		enabled: Boolean(selected.threadId)
	});
	const [body, setBody] = (0, import_react.useState)("");
	const [reply, setReply] = (0, import_react.useState)(null);
	const [hold, setHold] = (0, import_react.useState)(null);
	const msgs = query.data ?? [];
	async function send() {
		if (!body.trim()) return;
		try {
			const r = await sendMessage({ data: {
				recipientId: selected.other.userId,
				body,
				replyToId: reply
			} });
			setBody("");
			setReply(null);
			if (r.kind === "message") await query.refetch();
			toast.success("Mensagem enviada.");
		} catch (e) {
			toast.error(e instanceof Error ? e.message : "NÃ£o foi possÃ­vel enviar.");
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "fixed inset-0 z-40 flex flex-col bg-bg md:absolute md:inset-auto md:right-4 md:top-24 md:h-[70vh] md:w-[min(440px,calc(100vw-2rem))] md:rounded-2xl md:border md:border-border md:shadow-2xl",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-3 border-b border-border p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserAvatar, {
					username: selected.other.username,
					displayName: selected.other.displayName,
					image: selected.other.image,
					toProfile: false
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: selected.other.displayName })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex-1 space-y-2 overflow-y-auto p-4",
				children: msgs.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: `flex ${m.senderId === meId ? "justify-end" : "justify-start"}`,
					onDoubleClick: () => void toggleMessageReaction({ data: {
						messageId: m.id,
						reaction: "â¤ï¸"
					} }).then(() => query.refetch()),
					onContextMenu: (e) => {
						e.preventDefault();
						setHold(m.id);
					},
					onPointerDown: () => window.setTimeout(() => setHold(m.id), 550),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "max-w-[82%]",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-2xl bg-secondary px-3 py-2 text-sm",
								children: [m.replyToId ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mb-1 rounded-lg border-l-2 border-fuchsia-400 px-2 text-xs text-muted",
									children: "Respondendo a uma mensagem"
								}) : null, m.body]
							}),
							m.reactions?.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-1 flex flex-wrap gap-1",
								children: m.reactions.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									className: "rounded-full border px-2 py-0.5 text-xs",
									onClick: () => void toggleMessageReaction({ data: {
										messageId: m.id,
										reaction: r.reaction
									} }).then(() => query.refetch()),
									children: [
										r.reaction,
										" ",
										r.count
									]
								}, r.reaction))
							}) : null,
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-1 flex gap-2 text-xs text-muted",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => void toggleMessageReaction({ data: {
											messageId: m.id,
											reaction: "â¤ï¸"
										} }).then(() => query.refetch()),
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: "inline size-3" })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => setReply(m.id),
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reply, { className: "inline size-3" })
									}),
									m.senderId === meId ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => void deleteMessage({ data: m.id }).then(() => query.refetch()),
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "inline size-3" })
									}) : null,
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => {
											const reason = window.prompt("Motivo da denÃºncia");
											if (reason) createReport({ data: {
												targetMessageId: m.id,
												reason
											} }).then(() => toast.success("Mensagem denunciada."));
										},
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flag, { className: "inline size-3" })
									})
								]
							}),
							hold === m.id ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-1 rounded-lg border bg-bg p-2 text-xs",
								children: "AÃ§Ãµes disponÃ­veis: reagir, responder, denunciar e apagar sua mensagem."
							}) : null
						]
					})
				}, m.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "border-t border-border p-3",
				children: [
					reply ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-2 flex items-center justify-between rounded-lg bg-secondary px-3 py-2 text-xs",
						children: ["Respondendo a uma mensagem", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setReply(null),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" })
						})]
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
						value: body,
						onChange: (e) => setBody(e.target.value),
						placeholder: "Escreva uma mensagem..."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						className: "mt-2 w-full",
						onClick: () => void send(),
						children: "Enviar"
					})
				]
			})
		]
	});
}
function GroupPanel({ group, meId, isFounder }) {
	const q = useQuery({
		queryKey: ["group-messages", group.id],
		queryFn: () => listGroupMessages({ data: group.id })
	});
	const [body, setBody] = (0, import_react.useState)("");
	const [reply, setReply] = (0, import_react.useState)(null);
	const [announcement, setAnnouncement] = (0, import_react.useState)("");
	const msgs = q.data ?? [];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "fixed inset-0 z-40 flex flex-col bg-bg md:absolute md:inset-auto md:right-4 md:top-24 md:h-[70vh] md:w-[min(440px,calc(100vw-2rem))] md:rounded-2xl md:border md:border-border md:shadow-2xl",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "border-b border-border p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: group.name }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted",
						children: "Grupo"
					}),
					group.name === "Fundadores" && isFounder ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3 rounded-xl border border-fuchsia-400/20 p-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs font-medium text-fuchsia-200",
								children: "Mensagem do Nyxoshi"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
								className: "mt-2",
								value: announcement,
								onChange: (e) => setAnnouncement(e.target.value),
								placeholder: "Mensagem que aparecerÃ¡ para todos...",
								maxLength: 500
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								className: "mt-2 w-full",
								size: "sm",
								onClick: async () => {
									if (!announcement.trim()) return;
									try {
										await createGlobalAnnouncement({ data: {
											body: announcement,
											seconds: 12
										} });
										setAnnouncement("");
										toast.success("Comunicado enviado.");
									} catch (e) {
										toast.error(e instanceof Error ? e.message : "NÃ£o foi possÃ­vel enviar.");
									}
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { className: "size-4" }), "Enviar para todo o Nyxoshi"]
							})
						]
					}) : null
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex-1 space-y-2 overflow-y-auto p-4",
				children: msgs.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: `flex ${m.sender_id === meId ? "justify-end" : "justify-start"}`,
					onDoubleClick: () => void toggleGroupMessageReaction({ data: {
						messageId: m.id,
						reaction: "â¤ï¸"
					} }).then(() => q.refetch()),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "max-w-[82%] rounded-2xl bg-secondary px-3 py-2 text-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: m.body }),
							m.reactions?.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-1 text-xs",
								children: m.reactions.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "mr-1 rounded-full border px-1",
									children: [
										r.reaction,
										" ",
										r.count
									]
								}, r.reaction))
							}) : null,
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-1 flex gap-2 text-xs text-muted",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => setReply(m.id),
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reply, { className: "inline size-3" })
									}),
									m.sender_id === meId ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => void deleteGroupMessage({ data: m.id }).then(() => q.refetch()),
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "inline size-3" })
									}) : null,
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => void toggleGroupMessageReaction({ data: {
											messageId: m.id,
											reaction: "â¤ï¸"
										} }).then(() => q.refetch()),
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: "inline size-3" })
									})
								]
							})
						]
					})
				}, m.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "border-t border-border p-3",
				children: [
					reply ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-2 text-xs text-muted",
						children: ["Respondendo a uma mensagem ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setReply(null),
							children: "cancelar"
						})]
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
						value: body,
						onChange: (e) => setBody(e.target.value),
						placeholder: "Mensagem no grupo..."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						className: "mt-2 w-full",
						onClick: async () => {
							if (!body.trim()) return;
							await sendGroupMessage({ data: {
								groupId: group.id,
								body,
								replyToId: reply
							} });
							setBody("");
							setReply(null);
							q.refetch();
						},
						children: "Enviar"
					})
				]
			})
		]
	});
}
//#endregion
export { MessagesPage as component };
