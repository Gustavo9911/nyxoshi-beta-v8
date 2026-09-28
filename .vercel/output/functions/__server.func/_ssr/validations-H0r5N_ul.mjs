import { n as createMiddleware } from "./ssr.mjs";
import { D as _enum, F as object, M as literal, P as number, R as string } from "../_libs/@better-auth/core+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/validations-H0r5N_ul.js
/**
* Auth middleware for server functions — the standard way to get the caller's
* verified user id. When deployed the session cookie is same-origin and rides
* along automatically. In the live preview the client also forwards the bearer
* token (partitioned cookies) via the `.client` hook below — call sites do not
* thread it themselves.
*
*   import { createServerFn } from "@tanstack/react-start";
*   import { getSql } from "@/lib/db";
*   import { authMiddleware } from "@/lib/auth/middleware";
*
*   export const listTodos = createServerFn({ method: "GET" })
*     .middleware([authMiddleware])
*     .handler(async ({ context }) => {
*       const sql = await getSql();
*       return sql`select * from todos where user_id = ${context.userId}`;
*     });
*
* Signed out with auth on (live preview included) -> throws `UnauthorizedError`
* (see `verify.server.ts`). With auth disabled (`VITE_AUTH_ENABLED=false`, the
* shipped default) it resolves the shared dev user — but throws instead when a
* `DATABASE_URL` is also set, so an app without sign-in must not use this at
* all. On the auth-on path, use it on every server function that touches
* per-user data and scope every query by `context.userId`.
*/
var authMiddleware = createMiddleware({ type: "function" }).client(async ({ next }) => {
	const { getBearerToken } = await import("./client-B40BzJxt.mjs").then((n) => n.n).then((n) => n.n);
	return next({ sendContext: { bearerToken: getBearerToken() ?? void 0 } });
}).server(async ({ next, context }) => {
	const { assertSameSiteRequest } = await import("./isolation.server-CGNg1r0B.mjs");
	const { requireUserId } = await import("./verify.server-awRlgvMe.mjs");
	assertSameSiteRequest();
	return next({ context: { userId: await requireUserId(context.bearerToken) } });
});
/**
* Forwards the live-preview bearer token and resolves a session if one exists.
* Unlike authMiddleware, this never throws — public reads stay public.
*/
var optionalAuthMiddleware = createMiddleware({ type: "function" }).client(async ({ next }) => {
	const { getBearerToken } = await import("./client-B40BzJxt.mjs").then((n) => n.n).then((n) => n.n);
	return next({ sendContext: { bearerToken: getBearerToken() ?? void 0 } });
}).server(async ({ next, context }) => {
	const { getSessionUser } = await import("./verify.server-awRlgvMe.mjs");
	return next({ context: { userId: (await getSessionUser(context.bearerToken))?.id ?? null } });
});
var createPostSchema = object({ body: string().trim().min(1, "Escreva alguma coisa.").max(500, "Máximo de 500 caracteres.") });
var createCommentSchema = object({
	postId: string().min(1),
	parentId: string().optional().nullable(),
	body: string().trim().min(1, "Escreva um comentário.").max(300, "Máximo de 300 caracteres.")
});
var updateProfileSchema = object({
	displayName: string().trim().min(1, "Informe um nome.").max(40, "Máximo de 40 caracteres."),
	username: string().trim().toLowerCase().regex(/^[a-z0-9_]{3,20}$/, "Use 3–20 caracteres: a–z, 0–9 e _."),
	bio: string().trim().max(160, "Máximo de 160 caracteres."),
	image: string().trim().url().optional().or(literal("")),
	bannerUrl: string().trim().url().optional().or(literal("")),
	profileGifUrl: string().trim().url().optional().or(literal("")),
	websiteUrl: string().trim().url().optional().or(literal(""))
});
var reportSchema = object({
	targetUserId: string().optional(),
	targetPostId: string().optional(),
	targetMessageId: string().optional(),
	reason: string().trim().min(8, "Descreva o motivo.").max(400, "Máximo de 400 caracteres.")
});
var feedQuerySchema = object({ tab: _enum(["forYou", "following"]).default("forYou") });
var searchQuerySchema = object({ q: string().trim().min(1).max(80) });
var sendMessageSchema = object({
	recipientId: string().min(1),
	body: string().trim().min(1, "Escreva uma mensagem.").max(2e3, "Máximo de 2000 caracteres."),
	replyToId: string().nullable().optional()
});
var messageDecisionSchema = object({
	requestId: string().min(1),
	action: _enum([
		"accept",
		"decline",
		"spam"
	])
});
var moderationSchema = object({
	targetUserId: string().min(1),
	action: _enum([
		"ban",
		"unban",
		"mute",
		"unmute",
		"shadow_ban",
		"shadow_unban"
	]),
	reason: string().trim().max(400).optional(),
	durationHours: number().int().positive().max(8760).optional()
});
var roleSchema = object({
	targetUserId: string().min(1),
	role: _enum([
		"user",
		"tester",
		"bug_tester",
		"designer",
		"moderator",
		"admin",
		"founder"
	]),
	founderNumber: number().int().min(1).max(3).optional()
});
var reactionSchema = object({
	id: string().min(1),
	reaction: string().trim().min(1).max(24)
});
var quotePostSchema = object({
	postId: string().min(1),
	body: string().trim().min(1).max(500)
});
object({ q: string().trim().min(1).max(80) });
//#endregion
export { messageDecisionSchema as a, quotePostSchema as c, roleSchema as d, searchQuerySchema as f, feedQuerySchema as i, reactionSchema as l, updateProfileSchema as m, createCommentSchema as n, moderationSchema as o, sendMessageSchema as p, createPostSchema as r, optionalAuthMiddleware as s, authMiddleware as t, reportSchema as u };
