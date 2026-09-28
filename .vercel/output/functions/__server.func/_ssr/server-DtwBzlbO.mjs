import { r as createServerFn } from "./ssr.mjs";
import { t as createServerRpc } from "./createServerRpc-CcvdN_gc.mjs";
import { r as getSql } from "./db-cTd--cSX.mjs";
import { a as messageDecisionSchema, c as quotePostSchema, d as roleSchema, f as searchQuerySchema, i as feedQuerySchema, l as reactionSchema, m as updateProfileSchema, n as createCommentSchema, o as moderationSchema, p as sendMessageSchema, r as createPostSchema, s as optionalAuthMiddleware, t as authMiddleware, u as reportSchema } from "./validations-H0r5N_ul.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/server-DtwBzlbO.js
function slugifyUsername(seed) {
	const stripped = seed.normalize("NFD").replace(/\p{M}/gu, "").toLowerCase().replace(/[^a-z0-9_]+/g, "").replace(/^_+|_+$/g, "").slice(0, 16);
	if (stripped.length >= 3) return stripped;
	if (stripped.length > 0) return `${stripped}nyx`.slice(0, 16);
	return "nyx";
}
var ROLE_ORDER = [
	"user",
	"tester",
	"bug_tester",
	"designer",
	"moderator",
	"admin",
	"founder"
];
var founderEnvKeys = [
	"NYXOSHI_FOUNDER_1_EMAIL",
	"NYXOSHI_FOUNDER_2_EMAIL",
	"NYXOSHI_FOUNDER_3_EMAIL"
];
async function syncRoleForUser(sql, userId) {
	const email = (await sql`select email from "user" where id = ${userId} limit 1`)[0]?.email?.trim().toLowerCase();
	if (!email) return getRole(sql, userId);
	let founderNumber = null;
	for (let i = 0; i < founderEnvKeys.length; i += 1) {
		const configured = process.env[founderEnvKeys[i]]?.trim().toLowerCase();
		if (configured && configured === email) founderNumber = i + 1;
	}
	if (founderNumber) await sql`
      insert into user_roles (user_id, role, founder_number)
      values (${userId}, 'founder', ${founderNumber})
      on conflict (user_id) do update set role='founder', founder_number=${founderNumber}, updated_at=now()
    `;
	else await sql`
      insert into user_roles (user_id, role)
      values (${userId}, 'user')
      on conflict (user_id) do nothing
    `;
	return getRole(sql, userId);
}
async function getRole(sql, userId) {
	return (await sql`
    select role, founder_number, muted_until::text as muted_until, shadow_banned, banned_until::text as banned_until
    from user_roles where user_id = ${userId} limit 1
  `)[0] ?? {
		role: "user",
		founder_number: null,
		muted_until: null,
		shadow_banned: false,
		banned_until: null
	};
}
async function requireRole(userId, minimum) {
	const sql = await getSql();
	const current = await syncRoleForUser(sql, userId);
	if (ROLE_ORDER.indexOf(current.role) < ROLE_ORDER.indexOf(minimum)) throw new Error("Você não tem permissão para esta ação.");
	if (current.banned_until && new Date(current.banned_until).getTime() > Date.now()) throw new Error("Esta conta está temporariamente suspensa.");
	return {
		sql,
		role: current
	};
}
async function requireFounder(userId) {
	const result = await requireRole(userId, "founder");
	if (result.role.role !== "founder") throw new Error("Apenas fundadores podem acessar esta área.");
	return result;
}
async function requireFounder1(userId) {
	const sql = await getSql();
	const email = (await sql`select email from "user" where id=${userId} limit 1`)[0]?.email?.trim().toLowerCase();
	const founder1 = process.env.NYXOSHI_FOUNDER_1_EMAIL?.trim().toLowerCase();
	if (!email || !founder1 || email !== founder1) throw new Error("Apenas a Fundadora #1 pode acessar esta área confidencial.");
	const role = await syncRoleForUser(sql, userId);
	if (role.role !== "founder" || role.founder_number !== 1) throw new Error("Apenas a Fundadora #1 pode acessar esta área confidencial.");
	return {
		sql,
		role
	};
}
function asIso(value) {
	if (value instanceof Date) return value.toISOString();
	const text = String(value ?? "");
	const parsed = new Date(text);
	return Number.isNaN(parsed.getTime()) ? text : parsed.toISOString();
}
function mapPost(row) {
	return {
		id: row.id,
		body: row.body,
		createdAt: asIso(row.created_at),
		author: {
			userId: row.user_id,
			username: row.username,
			displayName: row.display_name,
			image: row.image,
			role: row.author_role,
			founderNumber: row.author_founder_number
		},
		quotedPost: row.quoted_post_id && row.quoted_user_id ? {
			id: row.quoted_post_id,
			body: row.quoted_body ?? "",
			createdAt: asIso(row.quoted_created_at),
			author: {
				userId: row.quoted_user_id,
				username: row.quoted_username ?? "",
				displayName: row.quoted_display_name ?? "",
				image: row.quoted_image ?? null,
				role: row.quoted_role ?? void 0,
				founderNumber: row.quoted_founder_number ?? null
			}
		} : null,
		likeCount: Number(row.like_count) || 0,
		commentCount: Number(row.comment_count) || 0,
		likedByMe: Boolean(row.liked_by_me),
		reactionCount: Number(row.reaction_count) || 0,
		repostCount: Number(row.repost_count) || 0,
		quoteCount: Number(row.quote_count) || 0,
		bookmarkedByMe: Boolean(row.bookmarked_by_me),
		repostedByMe: Boolean(row.reposted_by_me)
	};
}
async function assertCanAct(sql, userId, options = {}) {
	const role = await syncRoleForUser(sql, userId);
	if (role.banned_until && new Date(role.banned_until).getTime() > Date.now()) throw new Error("Sua conta está suspensa.");
	if (options.messaging && role.muted_until && new Date(role.muted_until).getTime() > Date.now()) throw new Error("Sua conta está silenciada.");
	return role;
}
async function uniqueUsername(sql, seed, exceptUserId) {
	const base = slugifyUsername(seed);
	for (let i = 0; i < 30; i += 1) {
		const candidate = i === 0 ? base : `${base.slice(0, 16)}${i + 1}`.slice(0, 20);
		if ((exceptUserId ? await sql`select 1 from profiles where username = ${candidate} and user_id <> ${exceptUserId} limit 1` : await sql`select 1 from profiles where username = ${candidate} limit 1`).length === 0) return candidate;
	}
	return `${base.slice(0, 12)}${crypto.randomUUID().slice(0, 6)}`;
}
async function ensureProfileFor(sql, userId) {
	const existing = await sql`
    select user_id, username, display_name, bio, image, banner_url, profile_gif_url, website_url, created_at::text as created_at
    from profiles
    where user_id = ${userId} and deleted_at is null
    limit 1
  `;
	if (existing[0]) {
		await syncRoleForUser(sql, userId);
		return existing[0];
	}
	const source = (await sql`
    select name, email, image from "user" where id = ${userId} limit 1
  `)[0];
	const displayName = source?.name?.trim() || source?.email?.split("@")[0] || "Nyx";
	const inserted = await sql`
    insert into profiles (user_id, username, display_name, bio, image)
    values (${userId}, ${await uniqueUsername(sql, source?.name || source?.email?.split("@")[0] || "nyx")}, ${displayName}, '', ${source?.image ?? null})
    on conflict (user_id) do update set
      updated_at = now(),
      image = coalesce(profiles.image, excluded.image)
    returning user_id, username, display_name, bio, image, banner_url, profile_gif_url, website_url, created_at::text as created_at
  `;
	if (!inserted[0]) throw new Error("Não foi possível criar o perfil.");
	await syncRoleForUser(sql, userId);
	return inserted[0];
}
var POST_SELECT = `
  p.id,
  p.body,
  p.created_at::text as created_at,
  pr.user_id,
  pr.username,
  pr.display_name,
  pr.image,
  ur.role as author_role,
  ur.founder_number as author_founder_number,
  qp.id as quoted_post_id, qp.body as quoted_body, qp.created_at::text as quoted_created_at,
  qpr.user_id as quoted_user_id, qpr.username as quoted_username, qpr.display_name as quoted_display_name, qpr.image as quoted_image,
  qur.role as quoted_role, qur.founder_number as quoted_founder_number,
  (select count(*)::int from likes l where l.post_id = p.id) as like_count,
  (select count(*)::int from post_reactions r where r.post_id = p.id) as reaction_count,
  (select count(*)::int from comments c where c.post_id = p.id and c.deleted_at is null) as comment_count,
  (select count(*)::int from reposts rp where rp.post_id = p.id) as repost_count,
  (select count(*)::int from quotes q where q.post_id = p.id and q.deleted_at is null) as quote_count
`;
async function listPosts(sql, viewerId, opts) {
	const limit = opts.limit ?? 50;
	const params = [];
	const where = ["p.deleted_at is null", "pr.deleted_at is null"];
	if (viewerId) {
		params.push(viewerId);
		where.push(`not exists (
      select 1 from user_roles sr where sr.user_id = p.user_id and sr.shadow_banned = true and p.user_id <> $1
    )`);
		where.push(`not exists (
      select 1 from blocks b
      where (b.blocker_id = $1 and b.blocked_id = p.user_id)
         or (b.blocker_id = p.user_id and b.blocked_id = $1)
    )`);
	} else where.push(`not exists (select 1 from user_roles sr where sr.user_id = p.user_id and sr.shadow_banned = true)`);
	if (opts.authorId) {
		params.push(opts.authorId);
		where.push(`p.user_id = $${params.length}`);
	}
	if (opts.tab === "following") {
		if (!viewerId) return [];
		where.push(`exists (
      select 1 from follows f
      where f.follower_id = $1 and f.following_id = p.user_id
    )`);
	}
	const viewerParam = viewerId ? "$1" : "null";
	const likedSql = viewerId ? `exists(select 1 from likes l where l.post_id = p.id and l.user_id = ${viewerParam})` : "false";
	const bookmarkedSql = viewerId ? `exists(select 1 from bookmarks b where b.post_id=p.id and b.user_id=${viewerParam})` : "false";
	const repostedSql = viewerId ? `exists(select 1 from reposts rp where rp.post_id=p.id and rp.user_id=${viewerParam})` : "false";
	params.push(limit);
	const limitPlaceholder = `$${params.length}`;
	const text = `
    select ${POST_SELECT},
      ${likedSql} as liked_by_me,
      ${bookmarkedSql} as bookmarked_by_me,
      ${repostedSql} as reposted_by_me
    from posts p
    join profiles pr on pr.user_id = p.user_id
    left join user_roles ur on ur.user_id=p.user_id
    left join posts qp on qp.id=p.quoted_post_id and qp.deleted_at is null
    left join profiles qpr on qpr.user_id=qp.user_id
    left join user_roles qur on qur.user_id=qp.user_id
    where ${where.join(" and ")}
      and (${viewerId ? "$1" : "null"} is null or not exists(select 1 from user_mutes um where um.muter_id=${viewerParam} and um.muted_id=p.user_id))
    order by p.created_at desc
    limit ${limitPlaceholder}
  `;
	return (await sql.query(text, params)).map(mapPost);
}
async function registerMentions(sql, body, actorId, target) {
	const usernames = [...body.matchAll(/@([a-z0-9_]{3,20})/gi)].map((m) => m[1].toLowerCase());
	const unique = [...new Set(usernames)];
	for (const username of unique) {
		const user = (await sql`select user_id from profiles where lower(username)=${username} and deleted_at is null limit 1`)[0];
		if (!user || user.user_id === actorId) continue;
		await sql`insert into mentions (id,post_id,comment_id,mentioned_user_id,actor_id) values (${crypto.randomUUID()},${target.postId ?? null},${target.commentId ?? null},${user.user_id},${actorId})`;
		await notify(sql, user.user_id, actorId, "mention", target.postId ?? null, target.commentId ?? null, JSON.stringify({ username }));
	}
}
async function notify(sql, userId, actorId, type, postId, commentId = null, metadata = null) {
	if (userId === actorId) return;
	const [prefs] = await sql`select likes,comments,follows,messages,reposts,mentions,quotes,reactions from notification_preferences where user_id=${userId} limit 1`;
	if (!(type === "like" ? prefs?.likes !== false : type === "comment" ? prefs?.comments !== false : type === "follow" ? prefs?.follows !== false : type === "repost" ? prefs?.reposts !== false : type === "quote" ? prefs?.quotes !== false : type === "mention" ? prefs?.mentions !== false : prefs?.reactions !== false)) return;
	await sql`
    insert into notifications (id, user_id, actor_id, type, post_id, comment_id, metadata)
    values (${crypto.randomUUID()}, ${userId}, ${actorId}, ${type}, ${postId}, ${commentId}, ${metadata})
  `;
}
async function hydrateProfile(sql, row, viewerId) {
	const role = await syncRoleForUser(sql, row.user_id);
	const [followers] = await sql`
    select count(*)::int as n from follows where following_id = ${row.user_id}
  `;
	const [following] = await sql`
    select count(*)::int as n from follows where follower_id = ${row.user_id}
  `;
	const [posts] = await sql`
    select count(*)::int as n from posts where user_id = ${row.user_id} and deleted_at is null
  `;
	const isSelf = viewerId === row.user_id;
	let isFollowing = false;
	let isBlocked = false;
	if (viewerId && !isSelf) {
		isFollowing = (await sql`select 1 from follows where follower_id = ${viewerId} and following_id = ${row.user_id} limit 1`).length > 0;
		isBlocked = (await sql`select 1 from blocks where blocker_id = ${viewerId} and blocked_id = ${row.user_id} limit 1`).length > 0;
	}
	return {
		userId: row.user_id,
		username: row.username,
		displayName: row.display_name,
		bio: row.bio ?? "",
		image: row.image,
		bannerUrl: row.banner_url,
		profileGifUrl: row.profile_gif_url,
		websiteUrl: row.website_url,
		role: role.role,
		founderNumber: role.founder_number,
		createdAt: asIso(row.created_at),
		followers: Number(followers?.n) || 0,
		following: Number(following?.n) || 0,
		posts: Number(posts?.n) || 0,
		isFollowing,
		isBlocked,
		isSelf
	};
}
var ensureMyProfile_createServerFn_handler = createServerRpc({
	id: "199c9c4d341a459816149b0c988f97d05f76de94f7805cf8a4f2f01661566496",
	name: "ensureMyProfile",
	filename: "src/lib/nyxoshi/server.ts"
}, (opts) => ensureMyProfile.__executeServer(opts));
var ensureMyProfile = createServerFn({ method: "POST" }).middleware([authMiddleware]).handler(ensureMyProfile_createServerFn_handler, async ({ context }) => {
	const sql = await getSql();
	return hydrateProfile(sql, await ensureProfileFor(sql, context.userId), context.userId);
});
var getFeed_createServerFn_handler = createServerRpc({
	id: "293ff56c265258bb31531dcfdc56933d529112222d4d22970f1ca0156f1bf916",
	name: "getFeed",
	filename: "src/lib/nyxoshi/server.ts"
}, (opts) => getFeed.__executeServer(opts));
var getFeed = createServerFn({ method: "GET" }).middleware([optionalAuthMiddleware]).validator((data) => feedQuerySchema.parse(data ?? { tab: "forYou" })).handler(getFeed_createServerFn_handler, async ({ context, data }) => {
	const sql = await getSql();
	if (context.userId) await ensureProfileFor(sql, context.userId);
	return listPosts(sql, context.userId, { tab: data.tab });
});
var createPost_createServerFn_handler = createServerRpc({
	id: "c95aefb7ae16db30962885182d29372dee59401f3a822e03350bbcbc04f63acd",
	name: "createPost",
	filename: "src/lib/nyxoshi/server.ts"
}, (opts) => createPost.__executeServer(opts));
var createPost = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((data) => createPostSchema.parse(data)).handler(createPost_createServerFn_handler, async ({ context, data }) => {
	const sql = await getSql();
	await ensureProfileFor(sql, context.userId);
	await assertCanAct(sql, context.userId);
	const id = crypto.randomUUID();
	await sql`
      insert into posts (id, user_id, body)
      values (${id}, ${context.userId}, ${data.body})
    `;
	await registerMentions(sql, data.body, context.userId, { postId: id });
	const tags = [...data.body.matchAll(/#([a-z0-9_]{2,40})/gi)].map((m) => m[1].toLowerCase());
	for (const tag of [...new Set(tags)]) {
		const h = await sql`insert into hashtags(id,tag) values(${crypto.randomUUID()},${tag}) on conflict(tag) do update set tag=excluded.tag returning id`;
		if (h[0]) await sql`insert into post_hashtags(post_id,hashtag_id) values(${id},${h[0].id}) on conflict do nothing`;
	}
	const created = (await listPosts(sql, context.userId, {
		tab: "forYou",
		authorId: context.userId,
		limit: 1
	})).find((p) => p.id === id);
	if (created) return created;
	return {
		id,
		body: data.body,
		createdAt: (/* @__PURE__ */ new Date()).toISOString(),
		author: {
			userId: context.userId,
			username: "me",
			displayName: "Você",
			image: null
		},
		likeCount: 0,
		commentCount: 0,
		likedByMe: false,
		reactionCount: 0,
		repostCount: 0,
		quoteCount: 0,
		bookmarkedByMe: false,
		repostedByMe: false
	};
});
var deletePost_createServerFn_handler = createServerRpc({
	id: "029b399571fbd3b47d4d2487023db6e3a4e01cbeae64ea043db9f5cc3b80be85",
	name: "deletePost",
	filename: "src/lib/nyxoshi/server.ts"
}, (opts) => deletePost.__executeServer(opts));
var deletePost = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((id) => id).handler(deletePost_createServerFn_handler, async ({ context, data: id }) => {
	await (await getSql())`
      update posts
      set deleted_at = now(), updated_at = now()
      where id = ${id} and user_id = ${context.userId} and deleted_at is null
    `;
	return { ok: true };
});
var toggleLike_createServerFn_handler = createServerRpc({
	id: "49b84f79a60609524ceb8c8d44e9650628306d94d26d31d408b23ee2e95f92de",
	name: "toggleLike",
	filename: "src/lib/nyxoshi/server.ts"
}, (opts) => toggleLike.__executeServer(opts));
var toggleLike = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((postId) => postId).handler(toggleLike_createServerFn_handler, async ({ context, data: postId }) => {
	const sql = await getSql();
	await ensureProfileFor(sql, context.userId);
	if ((await sql`
      select 1 from likes where user_id = ${context.userId} and post_id = ${postId} limit 1
    `).length > 0) {
		await sql`delete from likes where user_id = ${context.userId} and post_id = ${postId}`;
		return { liked: false };
	}
	const post = await sql`
      select user_id from posts where id = ${postId} and deleted_at is null limit 1
    `;
	if (!post[0]) throw new Error("Publicação não encontrada.");
	await sql`insert into likes (user_id, post_id) values (${context.userId}, ${postId})`;
	await notify(sql, post[0].user_id, context.userId, "like", postId);
	return { liked: true };
});
var getPost_createServerFn_handler = createServerRpc({
	id: "74093ac8e40b9caa9fcf362d947835e89529dac9c68ef88ca2965fc3ceee63dc",
	name: "getPost",
	filename: "src/lib/nyxoshi/server.ts"
}, (opts) => getPost.__executeServer(opts));
var getPost = createServerFn({ method: "GET" }).middleware([optionalAuthMiddleware]).validator((postId) => postId).handler(getPost_createServerFn_handler, async ({ context, data: postId }) => {
	const posts = await (await getSql()).query(`
      select ${POST_SELECT},
        ${context.userId ? "exists(select 1 from likes l where l.post_id = p.id and l.user_id = $2)" : "false"} as liked_by_me,
        ${context.userId ? "exists(select 1 from bookmarks b where b.post_id=p.id and b.user_id=$2)" : "false"} as bookmarked_by_me,
        ${context.userId ? "exists(select 1 from reposts rp where rp.post_id=p.id and rp.user_id=$2)" : "false"} as reposted_by_me
      from posts p
      join profiles pr on pr.user_id = p.user_id
      left join user_roles ur on ur.user_id=p.user_id
      left join posts qp on qp.id=p.quoted_post_id and qp.deleted_at is null
      left join profiles qpr on qpr.user_id=qp.user_id
      left join user_roles qur on qur.user_id=qp.user_id
      where p.id = $1 and p.deleted_at is null and pr.deleted_at is null
      limit 1
    `, context.userId ? [postId, context.userId] : [postId]);
	if (!posts[0]) return null;
	return mapPost(posts[0]);
});
var listComments_createServerFn_handler = createServerRpc({
	id: "98fbe71f5eabba1ba7277f11f630b3bee5fd20634642e31ba6faa14ff4234a95",
	name: "listComments",
	filename: "src/lib/nyxoshi/server.ts"
}, (opts) => listComments.__executeServer(opts));
var listComments = createServerFn({ method: "GET" }).middleware([optionalAuthMiddleware]).validator((postId) => postId).handler(listComments_createServerFn_handler, async ({ context, data: postId }) => {
	return (await (await getSql())`
      select
        c.id, c.body, c.parent_id, c.created_at::text as created_at,
        pr.user_id, pr.username, pr.display_name, pr.image,
        (select count(*)::int from comment_reactions cr where cr.comment_id=c.id) as reaction_count,
        exists(select 1 from comment_reactions cr where cr.comment_id=c.id and cr.user_id=${context.userId ?? ""} and cr.reaction='like') as reacted_by_me,
        (select count(*)::int from comments rc where rc.parent_id=c.id and rc.deleted_at is null) as reply_count
      from comments c
      join profiles pr on pr.user_id = c.user_id
      where c.post_id = ${postId} and c.deleted_at is null and pr.deleted_at is null
      order by c.created_at asc
    `).map((row) => ({
		id: row.id,
		body: row.body,
		parentId: row.parent_id,
		createdAt: asIso(row.created_at),
		author: {
			userId: row.user_id,
			username: row.username,
			displayName: row.display_name,
			image: row.image
		},
		reactionCount: Number(row.reaction_count) || 0,
		reactedByMe: Boolean(row.reacted_by_me),
		replyCount: Number(row.reply_count) || 0
	}));
});
var createComment_createServerFn_handler = createServerRpc({
	id: "d4eea952ef297d7903bb237dfdd7f509064e5bcb119bc29c1174039abd3c4dec",
	name: "createComment",
	filename: "src/lib/nyxoshi/server.ts"
}, (opts) => createComment.__executeServer(opts));
var createComment = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((data) => createCommentSchema.parse(data)).handler(createComment_createServerFn_handler, async ({ context, data }) => {
	const sql = await getSql();
	await ensureProfileFor(sql, context.userId);
	await assertCanAct(sql, context.userId);
	const post = await sql`
      select user_id from posts where id = ${data.postId} and deleted_at is null limit 1
    `;
	if (!post[0]) throw new Error("Publicação não encontrada.");
	const id = crypto.randomUUID();
	await sql`
      insert into comments (id, post_id, user_id, body, parent_id)
      values (${id}, ${data.postId}, ${context.userId}, ${data.body}, ${data.parentId ?? null})
    `;
	await notify(sql, post[0].user_id, context.userId, "comment", data.postId, id);
	await registerMentions(sql, data.body, context.userId, {
		commentId: id,
		postId: data.postId
	});
	return { id };
});
var getProfileByUsername_createServerFn_handler = createServerRpc({
	id: "7ca34c581eb0946682e01790b4e57b865b27b127a4de7c8dcfd88069f5fcbf8f",
	name: "getProfileByUsername",
	filename: "src/lib/nyxoshi/server.ts"
}, (opts) => getProfileByUsername.__executeServer(opts));
var getProfileByUsername = createServerFn({ method: "GET" }).middleware([optionalAuthMiddleware]).validator((username) => username.trim().toLowerCase()).handler(getProfileByUsername_createServerFn_handler, async ({ context, data: username }) => {
	const sql = await getSql();
	const rows = await sql`
      select user_id, username, display_name, bio, image, banner_url, profile_gif_url, website_url, created_at::text as created_at
      from profiles
      where username = ${username} and deleted_at is null
      limit 1
    `;
	if (!rows[0]) return null;
	return hydrateProfile(sql, rows[0], context.userId);
});
var getProfilePosts_createServerFn_handler = createServerRpc({
	id: "ed158dbf295174554485a5e9adc24007371ea8ae9cd989701dd44d32185cd7f5",
	name: "getProfilePosts",
	filename: "src/lib/nyxoshi/server.ts"
}, (opts) => getProfilePosts.__executeServer(opts));
var getProfilePosts = createServerFn({ method: "GET" }).middleware([optionalAuthMiddleware]).validator((username) => username.trim().toLowerCase()).handler(getProfilePosts_createServerFn_handler, async ({ context, data: username }) => {
	const sql = await getSql();
	const profile = await sql`
      select user_id from profiles where username = ${username} and deleted_at is null limit 1
    `;
	if (!profile[0]) return [];
	return listPosts(sql, context.userId, {
		tab: "forYou",
		authorId: profile[0].user_id
	});
});
var updateMyProfile_createServerFn_handler = createServerRpc({
	id: "52f95b1b448b6302f3d34a3ca92dd18caec55cebe9d10668e60e3823939cbe96",
	name: "updateMyProfile",
	filename: "src/lib/nyxoshi/server.ts"
}, (opts) => updateMyProfile.__executeServer(opts));
var updateMyProfile = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((data) => updateProfileSchema.parse(data)).handler(updateMyProfile_createServerFn_handler, async ({ context, data }) => {
	const sql = await getSql();
	await ensureProfileFor(sql, context.userId);
	if ((await sql`
      select 1 from profiles
      where username = ${data.username} and user_id <> ${context.userId}
      limit 1
    `).length > 0) throw new Error("Esse @ já está em uso.");
	const rows = await sql`
      update profiles
      set
        username = ${data.username},
        display_name = ${data.displayName},
        bio = ${data.bio},
        image = ${data.image ?? null},
        banner_url = ${data.bannerUrl ?? null},
        profile_gif_url = ${data.profileGifUrl ?? null},
        website_url = ${data.websiteUrl ?? null},
        updated_at = now()
      where user_id = ${context.userId}
      returning user_id, username, display_name, bio, image, banner_url, profile_gif_url, website_url, created_at::text as created_at
    `;
	if (!rows[0]) throw new Error("Não foi possível atualizar o perfil.");
	return hydrateProfile(sql, rows[0], context.userId);
});
var toggleFollow_createServerFn_handler = createServerRpc({
	id: "659c706ccacd33ef609e5e2868a205589948a57cd9c5fddcccd8dbd732b566d4",
	name: "toggleFollow",
	filename: "src/lib/nyxoshi/server.ts"
}, (opts) => toggleFollow.__executeServer(opts));
var toggleFollow = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((userId) => userId).handler(toggleFollow_createServerFn_handler, async ({ context, data: userId }) => {
	if (userId === context.userId) throw new Error("Você não pode seguir a si.");
	const sql = await getSql();
	await ensureProfileFor(sql, context.userId);
	await assertCanAct(sql, context.userId);
	if ((await sql`select 1 from profiles where user_id = ${userId} and deleted_at is null limit 1`).length === 0) throw new Error("Perfil não encontrado.");
	if ((await sql`
      select 1 from blocks
      where (blocker_id = ${context.userId} and blocked_id = ${userId})
         or (blocker_id = ${userId} and blocked_id = ${context.userId})
      limit 1
    `).length > 0) throw new Error("Não é possível seguir esta conta.");
	if ((await sql`
      select 1 from follows where follower_id = ${context.userId} and following_id = ${userId} limit 1
    `).length > 0) {
		await sql`delete from follows where follower_id = ${context.userId} and following_id = ${userId}`;
		return { following: false };
	}
	await sql`insert into follows (follower_id, following_id) values (${context.userId}, ${userId})`;
	await notify(sql, userId, context.userId, "follow", null);
	return { following: true };
});
var toggleBlock_createServerFn_handler = createServerRpc({
	id: "bccc11e80c80e04ef02b38a2e29a56e6664618a25a5acca935f1685da0d07849",
	name: "toggleBlock",
	filename: "src/lib/nyxoshi/server.ts"
}, (opts) => toggleBlock.__executeServer(opts));
var toggleBlock = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((userId) => userId).handler(toggleBlock_createServerFn_handler, async ({ context, data: userId }) => {
	if (userId === context.userId) throw new Error("Ação inválida.");
	const sql = await getSql();
	if ((await sql`
      select 1 from blocks where blocker_id = ${context.userId} and blocked_id = ${userId} limit 1
    `).length > 0) {
		await sql`delete from blocks where blocker_id = ${context.userId} and blocked_id = ${userId}`;
		return { blocked: false };
	}
	await sql`insert into blocks (blocker_id, blocked_id) values (${context.userId}, ${userId})`;
	await sql`delete from follows where (follower_id = ${context.userId} and following_id = ${userId})
      or (follower_id = ${userId} and following_id = ${context.userId})`;
	return { blocked: true };
});
var createReport_createServerFn_handler = createServerRpc({
	id: "3a14221986ee0877005e363914eb7299b5209cbfe143f473513fad7f28363a58",
	name: "createReport",
	filename: "src/lib/nyxoshi/server.ts"
}, (opts) => createReport.__executeServer(opts));
var createReport = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((data) => reportSchema.parse(data)).handler(createReport_createServerFn_handler, async ({ context, data }) => {
	if (!data.targetUserId && !data.targetPostId && !data.targetMessageId) throw new Error("Informe o alvo da denúncia.");
	await (await getSql())`
      insert into reports (id, reporter_id, target_user_id, target_post_id, target_message_id, reason)
      values (
        ${crypto.randomUUID()},
        ${context.userId},
        ${data.targetUserId ?? null},
        ${data.targetPostId ?? null},
        ${data.targetMessageId ?? null},
        ${data.reason}
      )
    `;
	return { ok: true };
});
var searchNyxoshi_createServerFn_handler = createServerRpc({
	id: "b157ab9fb5d06607128364da72d094756838a415c1559c31c31305d14e1732b8",
	name: "searchNyxoshi",
	filename: "src/lib/nyxoshi/server.ts"
}, (opts) => searchNyxoshi.__executeServer(opts));
var searchNyxoshi = createServerFn({ method: "GET" }).middleware([optionalAuthMiddleware]).validator((data) => searchQuerySchema.parse(data)).handler(searchNyxoshi_createServerFn_handler, async ({ context, data }) => {
	const sql = await getSql();
	const like = `%${data.q.replace(/[%_]/g, "")}%`;
	const people = await sql`
      select user_id, username, display_name, bio, image, banner_url, profile_gif_url, website_url, created_at::text as created_at
      from profiles
      where deleted_at is null
        and not exists (select 1 from user_roles sr where sr.user_id=profiles.user_id and sr.shadow_banned=true)
        and (username ilike ${like} or display_name ilike ${like})
      order by created_at desc
      limit 12
    `;
	const posts = await sql.query(`
      select ${POST_SELECT},
        ${context.userId ? "exists(select 1 from likes l where l.post_id = p.id and l.user_id = $2)" : "false"} as liked_by_me,
        ${context.userId ? "exists(select 1 from bookmarks b where b.post_id=p.id and b.user_id=$2)" : "false"} as bookmarked_by_me,
        ${context.userId ? "exists(select 1 from reposts rp where rp.post_id=p.id and rp.user_id=$2)" : "false"} as reposted_by_me
      from posts p
      join profiles pr on pr.user_id = p.user_id
      where p.deleted_at is null and pr.deleted_at is null
        and not exists (select 1 from user_roles sr where sr.user_id=p.user_id and sr.shadow_banned=true and ($2 is null or p.user_id<>$2))
        and p.body ilike $1
      order by p.created_at desc
      limit 20
    `, [like, context.userId ?? null]);
	return {
		people: (await Promise.all(people.map((row) => hydrateProfile(sql, row, context.userId)))).filter((p) => !p.isBlocked),
		posts: posts.map(mapPost)
	};
});
var suggestedPeople_createServerFn_handler = createServerRpc({
	id: "152760d88f4d8883affd523fc95bf010cfd717ea21e4337bddfb9b8a8e740d81",
	name: "suggestedPeople",
	filename: "src/lib/nyxoshi/server.ts"
}, (opts) => suggestedPeople.__executeServer(opts));
var suggestedPeople = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(suggestedPeople_createServerFn_handler, async ({ context }) => {
	const sql = await getSql();
	await ensureProfileFor(sql, context.userId);
	const rows = await sql`
      select user_id, username, display_name, bio, image, banner_url, profile_gif_url, website_url, created_at::text as created_at
      from profiles
      where deleted_at is null
        and user_id <> ${context.userId}
        and not exists (
          select 1 from follows f
          where f.follower_id = ${context.userId} and f.following_id = profiles.user_id
        )
        and not exists (
          select 1 from blocks b
          where (b.blocker_id = ${context.userId} and b.blocked_id = profiles.user_id)
             or (b.blocker_id = profiles.user_id and b.blocked_id = ${context.userId})
        )
      order by created_at desc
      limit 6
    `;
	return Promise.all(rows.map((row) => hydrateProfile(sql, row, context.userId)));
});
var listNotifications_createServerFn_handler = createServerRpc({
	id: "b614fa96edc38a090b7f6413a88efa2cc245ecc52aa14380d259d369e4c5c8e0",
	name: "listNotifications",
	filename: "src/lib/nyxoshi/server.ts"
}, (opts) => listNotifications.__executeServer(opts));
var listNotifications = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(listNotifications_createServerFn_handler, async ({ context }) => {
	return (await (await getSql())`
      select
        n.id,
        n.type,
        n.created_at::text as created_at,
        n.read_at::text as read_at,
        n.post_id,
        pr.user_id,
        pr.username,
        pr.display_name,
        pr.image
      from notifications n
      join profiles pr on pr.user_id = n.actor_id
      where n.user_id = ${context.userId}
      order by n.created_at desc
      limit 50
    `).map((row) => ({
		id: row.id,
		type: row.type,
		createdAt: asIso(row.created_at),
		read: Boolean(row.read_at),
		postId: row.post_id,
		actor: {
			userId: row.user_id,
			username: row.username,
			displayName: row.display_name,
			image: row.image
		}
	}));
});
var unreadNotificationCount_createServerFn_handler = createServerRpc({
	id: "e76e2eab37a8249fbd9393db87fbb9fc3c0cbe85c5c77cfee5a35f23bf26222b",
	name: "unreadNotificationCount",
	filename: "src/lib/nyxoshi/server.ts"
}, (opts) => unreadNotificationCount.__executeServer(opts));
var unreadNotificationCount = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(unreadNotificationCount_createServerFn_handler, async ({ context }) => {
	const [row] = await (await getSql())`
      select count(*)::int as n from notifications
      where user_id = ${context.userId} and read_at is null
    `;
	return Number(row?.n) || 0;
});
var markNotificationsRead_createServerFn_handler = createServerRpc({
	id: "94f8c403e0f1e4553ea4ae1c93ffcd83de931d247b705e3d586235262e5fe34b",
	name: "markNotificationsRead",
	filename: "src/lib/nyxoshi/server.ts"
}, (opts) => markNotificationsRead.__executeServer(opts));
var markNotificationsRead = createServerFn({ method: "POST" }).middleware([authMiddleware]).handler(markNotificationsRead_createServerFn_handler, async ({ context }) => {
	await (await getSql())`
      update notifications set read_at = now()
      where user_id = ${context.userId} and read_at is null
    `;
	return { ok: true };
});
var listMessageRequests_createServerFn_handler = createServerRpc({
	id: "a0ad1b9431e385a3db9a38a175d3589bc7e237ee7a0388bd98a403dc77c649d6",
	name: "listMessageRequests",
	filename: "src/lib/nyxoshi/server.ts"
}, (opts) => listMessageRequests.__executeServer(opts));
var listMessageRequests = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(listMessageRequests_createServerFn_handler, async ({ context }) => {
	return (await (await getSql())`
      select mr.id, mr.sender_id, mr.recipient_id, mr.body, mr.status,
        mr.created_at::text as created_at, p.username, p.display_name, p.image
      from message_requests mr
      join profiles p on p.user_id = mr.sender_id
      where mr.recipient_id = ${context.userId}
        and mr.status in ('pending', 'spam')
        and p.deleted_at is null
      order by mr.created_at desc
      limit 100
    `).map((r) => ({
		id: r.id,
		senderId: r.sender_id,
		recipientId: r.recipient_id,
		body: r.body,
		status: r.status,
		createdAt: asIso(r.created_at),
		sender: {
			userId: r.sender_id,
			username: r.username,
			displayName: r.display_name,
			image: r.image
		}
	}));
});
var listConversations_createServerFn_handler = createServerRpc({
	id: "69e84feb3fe3aad2d0b8801f6a8c16c00be2ec186ff0b1e2b31c8bf24eae6b36",
	name: "listConversations",
	filename: "src/lib/nyxoshi/server.ts"
}, (opts) => listConversations.__executeServer(opts));
var listConversations = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(listConversations_createServerFn_handler, async ({ context }) => {
	return (await (await getSql())`
      select t.id as thread_id, p.user_id as other_id, p.username, p.display_name, p.image,
        lm.body, lm.created_at::text as message_created_at, lm.sender_id,
        (select count(*)::int from messages um where um.thread_id=t.id and um.sender_id<>${context.userId} and um.read_at is null and um.deleted_at is null) as unread
      from message_threads t
      join profiles p on p.user_id = case when t.user_a=${context.userId} then t.user_b else t.user_a end
      left join lateral (select m.body, m.created_at, m.sender_id from messages m where m.thread_id=t.id and m.deleted_at is null order by m.created_at desc limit 1) lm on true
      where (t.user_a=${context.userId} or t.user_b=${context.userId}) and p.deleted_at is null
      order by coalesce(lm.created_at, t.updated_at) desc
    `).map((r) => ({
		threadId: r.thread_id,
		other: {
			userId: r.other_id,
			username: r.username,
			displayName: r.display_name,
			image: r.image
		},
		lastMessage: r.body ? {
			body: r.body,
			createdAt: asIso(r.message_created_at),
			senderId: r.sender_id
		} : null,
		unread: Number(r.unread) || 0
	}));
});
var listMessages_createServerFn_handler = createServerRpc({
	id: "22a47b81f8e637350adfa8363196719dc6c381a035bb2e12353bf7c71b6b2af0",
	name: "listMessages",
	filename: "src/lib/nyxoshi/server.ts"
}, (opts) => listMessages.__executeServer(opts));
var listMessages = createServerFn({ method: "GET" }).middleware([authMiddleware]).validator((threadId) => threadId).handler(listMessages_createServerFn_handler, async ({ context, data: threadId }) => {
	const sql = await getSql();
	if (!(await sql`select 1 from message_threads where id=${threadId} and (${context.userId}=user_a or ${context.userId}=user_b) limit 1`).length) throw new Error("Conversa não encontrada.");
	const rows = await sql`
      select m.id,m.body,m.created_at::text as created_at,m.sender_id,m.read_at::text as read_at,m.reply_to_id,
        coalesce((select json_agg(json_build_object('reaction',x.reaction,'count',x.count,'reactedByMe',x.reacted)) from (select reaction,count(*)::int count,bool_or(user_id=${context.userId}) reacted from message_reactions where message_id=m.id group by reaction)x),'[]') as reactions
      from messages m where m.thread_id=${threadId} and m.deleted_at is null order by m.created_at asc limit 200
    `;
	await sql`update messages set read_at=now() where thread_id=${threadId} and sender_id<>${context.userId} and read_at is null`;
	return rows.map((r) => ({
		id: r.id,
		body: r.body,
		createdAt: asIso(r.created_at),
		senderId: r.sender_id,
		readAt: r.read_at ? asIso(r.read_at) : null,
		replyToId: r.reply_to_id,
		reactions: Array.isArray(r.reactions) ? r.reactions : []
	}));
});
var sendMessage_createServerFn_handler = createServerRpc({
	id: "600bbf0ef4394aa7bef390c0cedfe7ff8da5b4807ea5f0d163b3719831d8292e",
	name: "sendMessage",
	filename: "src/lib/nyxoshi/server.ts"
}, (opts) => sendMessage.__executeServer(opts));
var sendMessage = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((data) => sendMessageSchema.parse(data)).handler(sendMessage_createServerFn_handler, async ({ context, data }) => {
	const sql = await getSql();
	await ensureProfileFor(sql, context.userId);
	if (!(await sql`select user_id from profiles where user_id=${data.recipientId} and deleted_at is null limit 1`).length || data.recipientId === context.userId) throw new Error("Usuário não encontrado.");
	if ((await sql`select 1 from blocks where (blocker_id=${context.userId} and blocked_id=${data.recipientId}) or (blocker_id=${data.recipientId} and blocked_id=${context.userId}) limit 1`).length) throw new Error("Não é possível enviar mensagem para esta conta.");
	await assertCanAct(sql, context.userId, { messaging: true });
	const existing = await sql`select id from message_threads where (user_a=${context.userId} and user_b=${data.recipientId}) or (user_a=${data.recipientId} and user_b=${context.userId}) limit 1`;
	if (existing[0]) {
		const id = crypto.randomUUID();
		await sql`insert into messages (id,thread_id,sender_id,body,reply_to_id) values (${id},${existing[0].id},${context.userId},${data.body},${data.replyToId ?? null})`;
		await sql`update message_threads set updated_at=now() where id=${existing[0].id}`;
		return {
			kind: "message",
			threadId: existing[0].id,
			id
		};
	}
	if ((await sql`select id from message_requests where sender_id=${context.userId} and recipient_id=${data.recipientId} and status='pending' limit 1`)[0]) throw new Error("Você já enviou uma solicitação para esta pessoa.");
	const id = crypto.randomUUID();
	await sql`insert into message_requests (id,sender_id,recipient_id,body,status) values (${id},${context.userId},${data.recipientId},${data.body},'pending')`;
	return {
		kind: "request",
		requestId: id
	};
});
var decideMessageRequest_createServerFn_handler = createServerRpc({
	id: "79fa543e490f6bc499e17f319e0f502cf0ae7a5fa6751c806c2b9311de5f3a8d",
	name: "decideMessageRequest",
	filename: "src/lib/nyxoshi/server.ts"
}, (opts) => decideMessageRequest.__executeServer(opts));
var decideMessageRequest = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((data) => messageDecisionSchema.parse(data)).handler(decideMessageRequest_createServerFn_handler, async ({ context, data }) => {
	const sql = await getSql();
	const request = (await sql`select id,sender_id,recipient_id,body from message_requests where id=${data.requestId} and recipient_id=${context.userId} and status in ('pending','spam') limit 1`)[0];
	if (!request) throw new Error("Solicitação não encontrada.");
	if (data.action === "spam") {
		await sql`update message_requests set status='spam',updated_at=now() where id=${request.id}`;
		return { ok: true };
	}
	if (data.action === "decline") {
		await sql`update message_requests set status='declined',updated_at=now() where id=${request.id}`;
		return { ok: true };
	}
	const [a, b] = request.sender_id < request.recipient_id ? [request.sender_id, request.recipient_id] : [request.recipient_id, request.sender_id];
	await sql`insert into message_threads (id,user_a,user_b) values (${crypto.randomUUID()},${a},${b}) on conflict (user_a,user_b) do update set updated_at=now()`;
	const thread = await sql`select id from message_threads where user_a=${a} and user_b=${b} limit 1`;
	await sql`insert into messages (id,thread_id,sender_id,body) values (${crypto.randomUUID()},${thread[0].id},${request.sender_id},${request.body})`;
	await sql`update message_requests set status='accepted',updated_at=now() where id=${request.id}`;
	return {
		ok: true,
		threadId: thread[0].id
	};
});
var getMessageThreadForUser_createServerFn_handler = createServerRpc({
	id: "8f1d0e251ea974a1ea9ccc36020f38b4e3251bd221122f83a6d8d906a563049d",
	name: "getMessageThreadForUser",
	filename: "src/lib/nyxoshi/server.ts"
}, (opts) => getMessageThreadForUser.__executeServer(opts));
var getMessageThreadForUser = createServerFn({ method: "GET" }).middleware([authMiddleware]).validator((userId) => userId).handler(getMessageThreadForUser_createServerFn_handler, async ({ context, data: otherId }) => {
	return (await (await getSql())`select id from message_threads where (user_a=${context.userId} and user_b=${otherId}) or (user_a=${otherId} and user_b=${context.userId}) limit 1`)[0]?.id ?? null;
});
var getModerationOverview_createServerFn_handler = createServerRpc({
	id: "438a95b388bd69631b4fe852824fb4609e5e97b69e490438478df09caba244f2",
	name: "getModerationOverview",
	filename: "src/lib/nyxoshi/server.ts"
}, (opts) => getModerationOverview.__executeServer(opts));
var getModerationOverview = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(getModerationOverview_createServerFn_handler, async ({ context }) => {
	await requireRole(context.userId, "moderator");
	const sql = await getSql();
	const [users] = await sql`select count(*)::int as n from profiles where deleted_at is null`;
	const [posts] = await sql`select count(*)::int as n from posts where deleted_at is null`;
	const [reports] = await sql`select count(*)::int as n from reports`;
	const roles = await sql`
      select r.user_id,r.role,r.founder_number,p.username,p.display_name,p.image from user_roles r join profiles p on p.user_id=r.user_id where p.deleted_at is null order by r.role desc,p.created_at desc limit 100
    `;
	return {
		counts: {
			users: Number(users?.n) || 0,
			posts: Number(posts?.n) || 0,
			reports: Number(reports?.n) || 0
		},
		roles
	};
});
var moderateUser_createServerFn_handler = createServerRpc({
	id: "c4671b860dfa2090c0cf6ed03fd86db29ad58f93b1f08f9f4f6a55538f113be7",
	name: "moderateUser",
	filename: "src/lib/nyxoshi/server.ts"
}, (opts) => moderateUser.__executeServer(opts));
var moderateUser = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((data) => moderationSchema.parse(data)).handler(moderateUser_createServerFn_handler, async ({ context, data }) => {
	await requireRole(context.userId, "moderator");
	const sql = await getSql();
	if (data.targetUserId === context.userId) throw new Error("Você não pode moderar a própria conta.");
	const target = await syncRoleForUser(sql, data.targetUserId);
	await syncRoleForUser(sql, context.userId);
	const actorEmailRows = await sql`select email from "user" where id=${context.userId} limit 1`;
	const isFounder1 = Boolean(actorEmailRows[0]?.email?.trim().toLowerCase() === process.env.NYXOSHI_FOUNDER_1_EMAIL?.trim().toLowerCase());
	if (target.role === "founder" && !isFounder1 && data.action !== "shadow_ban" && data.action !== "shadow_unban") throw new Error("Somente a Fundadora #1 pode moderar outros fundadores.");
	const expires = data.durationHours ? new Date(Date.now() + data.durationHours * 36e5).toISOString() : null;
	const field = {
		ban: "banned_until",
		unban: "banned_until",
		mute: "muted_until",
		unmute: "muted_until",
		shadow_ban: "shadow_banned",
		shadow_unban: "shadow_banned"
	}[data.action];
	if (field === "banned_until") await sql`update user_roles set banned_until=${data.action === "ban" ? expires : null},ban_reason=${data.action === "ban" ? data.reason ?? null : null},updated_at=now() where user_id=${data.targetUserId}`;
	if (field === "muted_until") await sql`update user_roles set muted_until=${data.action === "mute" ? expires : null},updated_at=now() where user_id=${data.targetUserId}`;
	if (field === "shadow_banned") await sql`update user_roles set shadow_banned=${data.action === "shadow_ban"},updated_at=now() where user_id=${data.targetUserId}`;
	await sql`insert into moderation_actions (id,actor_id,target_user_id,action,reason,expires_at) values (${crypto.randomUUID()},${context.userId},${data.targetUserId},${data.action},${data.reason ?? null},${expires})`;
	return { ok: true };
});
var setUserRole_createServerFn_handler = createServerRpc({
	id: "3f0b153d7ce36ddda7031a8f5a42af959a34b4b4ae285714918d9996dd4b0470",
	name: "setUserRole",
	filename: "src/lib/nyxoshi/server.ts"
}, (opts) => setUserRole.__executeServer(opts));
var setUserRole = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((data) => roleSchema.parse(data)).handler(setUserRole_createServerFn_handler, async ({ context, data }) => {
	const { sql } = await requireFounder1(context.userId);
	if (data.targetUserId === context.userId) throw new Error("A conta da Fundadora #1 não pode perder o cargo por este painel.");
	await syncRoleForUser(sql, data.targetUserId);
	await sql`update user_roles set role=${data.role}, founder_number = case when ${data.role}='founder' then coalesce(${data.founderNumber ?? null}, founder_number) else null end, updated_at=now() where user_id=${data.targetUserId}`;
	await sql`insert into audit_log (id,actor_id,action,target_user_id,metadata) values (${crypto.randomUUID()},${context.userId},'set_role',${data.targetUserId},${JSON.stringify({ role: data.role })})`;
	return { ok: true };
});
var listFounders_createServerFn_handler = createServerRpc({
	id: "e84e3e1a2b295295d48a399972c3c744bb601b478b16a576ed571fbd67e493ad",
	name: "listFounders",
	filename: "src/lib/nyxoshi/server.ts"
}, (opts) => listFounders.__executeServer(opts));
var listFounders = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(listFounders_createServerFn_handler, async ({ context }) => {
	await requireFounder(context.userId);
	return (await getSql())`
      select r.user_id,r.role,r.founder_number,p.username,p.display_name,p.image from user_roles r join profiles p on p.user_id=r.user_id where r.role='founder' order by r.founder_number nulls last
    `;
});
var toggleReaction_createServerFn_handler = createServerRpc({
	id: "d75c962cdde2c7ea9ff45d63c7ee2c9450fe3ee57e5944492294e43461a1c061",
	name: "toggleReaction",
	filename: "src/lib/nyxoshi/server.ts"
}, (opts) => toggleReaction.__executeServer(opts));
var toggleReaction = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((data) => reactionSchema.parse(data)).handler(toggleReaction_createServerFn_handler, async ({ context, data }) => {
	const sql = await getSql();
	await assertCanAct(sql, context.userId);
	if ((await sql`select 1 from post_reactions where user_id=${context.userId} and post_id=${data.id} and reaction=${data.reaction} limit 1`).length) {
		await sql`delete from post_reactions where user_id=${context.userId} and post_id=${data.id} and reaction=${data.reaction}`;
		return { active: false };
	}
	const post = await sql`select user_id from posts where id=${data.id} and deleted_at is null limit 1`;
	if (!post[0]) throw new Error("Publicação não encontrada.");
	await sql`insert into post_reactions(user_id,post_id,reaction) values(${context.userId},${data.id},${data.reaction})`;
	await notify(sql, post[0].user_id, context.userId, "reaction", data.id);
	return { active: true };
});
var toggleCommentReaction_createServerFn_handler = createServerRpc({
	id: "116b458678049bb95d8490aeaad5df6480499f77920ec72c73370553b3323a03",
	name: "toggleCommentReaction",
	filename: "src/lib/nyxoshi/server.ts"
}, (opts) => toggleCommentReaction.__executeServer(opts));
var toggleCommentReaction = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((data) => reactionSchema.parse(data)).handler(toggleCommentReaction_createServerFn_handler, async ({ context, data }) => {
	const sql = await getSql();
	const comment = await sql`select user_id,post_id from comments where id=${data.id} and deleted_at is null limit 1`;
	if (!comment[0]) throw new Error("Comentário não encontrado.");
	if ((await sql`select 1 from comment_reactions where user_id=${context.userId} and comment_id=${data.id} and reaction=${data.reaction} limit 1`).length) {
		await sql`delete from comment_reactions where user_id=${context.userId} and comment_id=${data.id} and reaction=${data.reaction}`;
		return { active: false };
	}
	await sql`insert into comment_reactions(user_id,comment_id,reaction) values(${context.userId},${data.id},${data.reaction})`;
	await notify(sql, comment[0].user_id, context.userId, "reaction", comment[0].post_id, data.id);
	return { active: true };
});
var toggleRepost_createServerFn_handler = createServerRpc({
	id: "7f96348eb27f0158b0d4a2e3e6ebe17db2125f47ba70247f75a71e8927bd32f9",
	name: "toggleRepost",
	filename: "src/lib/nyxoshi/server.ts"
}, (opts) => toggleRepost.__executeServer(opts));
var toggleRepost = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((id) => id).handler(toggleRepost_createServerFn_handler, async ({ context, data: postId }) => {
	const sql = await getSql();
	const post = await sql`select user_id from posts where id=${postId} and deleted_at is null limit 1`;
	if (!post[0]) throw new Error("Publicação não encontrada.");
	if ((await sql`select 1 from reposts where user_id=${context.userId} and post_id=${postId} limit 1`).length) {
		await sql`delete from reposts where user_id=${context.userId} and post_id=${postId}`;
		return { reposted: false };
	}
	await sql`insert into reposts(user_id,post_id) values(${context.userId},${postId})`;
	await notify(sql, post[0].user_id, context.userId, "repost", postId);
	return { reposted: true };
});
var toggleBookmark_createServerFn_handler = createServerRpc({
	id: "20564446b23d075b96439496fec662f25e36f6a89719810c6e89c0ce2a6ff87a",
	name: "toggleBookmark",
	filename: "src/lib/nyxoshi/server.ts"
}, (opts) => toggleBookmark.__executeServer(opts));
var toggleBookmark = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((id) => id).handler(toggleBookmark_createServerFn_handler, async ({ context, data: postId }) => {
	const sql = await getSql();
	if ((await sql`select 1 from bookmarks where user_id=${context.userId} and post_id=${postId} limit 1`).length) {
		await sql`delete from bookmarks where user_id=${context.userId} and post_id=${postId}`;
		return { bookmarked: false };
	}
	await sql`insert into bookmarks(user_id,post_id) values(${context.userId},${postId})`;
	return { bookmarked: true };
});
var createQuote_createServerFn_handler = createServerRpc({
	id: "d9f45dad4f4cf9dab6ae0c7c1fe8d0b3e7d0fe392ac824b82da8e1c58032bd73",
	name: "createQuote",
	filename: "src/lib/nyxoshi/server.ts"
}, (opts) => createQuote.__executeServer(opts));
var createQuote = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((data) => quotePostSchema.parse(data)).handler(createQuote_createServerFn_handler, async ({ context, data }) => {
	const sql = await getSql();
	await assertCanAct(sql, context.userId);
	const post = await sql`select user_id from posts where id=${data.postId} and deleted_at is null limit 1`;
	if (!post[0]) throw new Error("Publicação não encontrada.");
	const id = crypto.randomUUID();
	await sql`insert into posts(id,user_id,body,quoted_post_id) values(${id},${context.userId},${data.body},${data.postId})`;
	await sql`insert into quotes(id,user_id,post_id,body) values(${crypto.randomUUID()},${context.userId},${data.postId},${data.body})`;
	await registerMentions(sql, data.body, context.userId, { postId: data.postId });
	await notify(sql, post[0].user_id, context.userId, "quote", data.postId);
	return { id };
});
var listBookmarks_createServerFn_handler = createServerRpc({
	id: "7af4c173fe64d90fa0ac23f22f3637c7294f2c4423498f75c1ed36d6367ce4ab",
	name: "listBookmarks",
	filename: "src/lib/nyxoshi/server.ts"
}, (opts) => listBookmarks.__executeServer(opts));
var listBookmarks = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(listBookmarks_createServerFn_handler, async ({ context }) => {
	return (await (await getSql())`select ${POST_SELECT}, exists(select 1 from likes l where l.post_id=p.id and l.user_id=${context.userId}) as liked_by_me, true as bookmarked_by_me, exists(select 1 from reposts rp where rp.post_id=p.id and rp.user_id=${context.userId}) as reposted_by_me from bookmarks b join posts p on p.id=b.post_id join profiles pr on pr.user_id=p.user_id left join user_roles ur on ur.user_id=p.user_id left join posts qp on qp.id=p.quoted_post_id and qp.deleted_at is null left join profiles qpr on qpr.user_id=qp.user_id left join user_roles qur on qur.user_id=qp.user_id where b.user_id=${context.userId} and p.deleted_at is null order by b.created_at desc limit 200`).map(mapPost);
});
var getProfileReposts_createServerFn_handler = createServerRpc({
	id: "83d797d0bdd395dbf106cdf9c3289e6a5feb72e3623227ebbcb7b77685f07ece",
	name: "getProfileReposts",
	filename: "src/lib/nyxoshi/server.ts"
}, (opts) => getProfileReposts.__executeServer(opts));
var getProfileReposts = createServerFn({ method: "GET" }).middleware([optionalAuthMiddleware]).validator((username) => username.trim().toLowerCase()).handler(getProfileReposts_createServerFn_handler, async ({ context, data: username }) => {
	const sql = await getSql();
	const p = await sql`select user_id from profiles where username=${username} and deleted_at is null limit 1`;
	if (!p[0]) return [];
	return (await sql`select ${POST_SELECT}, false as liked_by_me, false as bookmarked_by_me, true as reposted_by_me from reposts rp join posts p on p.id=rp.post_id join profiles pr on pr.user_id=p.user_id left join user_roles ur on ur.user_id=p.user_id left join posts qp on qp.id=p.quoted_post_id and qp.deleted_at is null left join profiles qpr on qpr.user_id=qp.user_id left join user_roles qur on qur.user_id=qp.user_id where rp.user_id=${p[0].user_id} and p.deleted_at is null order by rp.created_at desc limit 200`).map(mapPost);
});
var getProfileLikes_createServerFn_handler = createServerRpc({
	id: "9f1de26860000ea52941ca7e26f72b8ee199bf00e3a8d6abb037c8035da8be47",
	name: "getProfileLikes",
	filename: "src/lib/nyxoshi/server.ts"
}, (opts) => getProfileLikes.__executeServer(opts));
var getProfileLikes = createServerFn({ method: "GET" }).middleware([optionalAuthMiddleware]).validator((username) => username.trim().toLowerCase()).handler(getProfileLikes_createServerFn_handler, async ({ context, data: username }) => {
	const sql = await getSql();
	const p = await sql`select user_id from profiles where username=${username} and deleted_at is null limit 1`;
	if (!p[0]) return [];
	return (await sql`select ${POST_SELECT}, ${context.userId ? `exists(select 1 from likes lm where lm.post_id=p.id and lm.user_id='${context.userId.replace(/'/g, "''")}')` : "false"} as liked_by_me, false as bookmarked_by_me, false as reposted_by_me from likes lk join posts p on p.id=lk.post_id join profiles pr on pr.user_id=p.user_id left join user_roles ur on ur.user_id=p.user_id left join posts qp on qp.id=p.quoted_post_id and qp.deleted_at is null left join profiles qpr on qpr.user_id=qp.user_id left join user_roles qur on qur.user_id=qp.user_id where lk.user_id=${p[0].user_id} and p.deleted_at is null order by lk.created_at desc limit 200`).map(mapPost);
});
var toggleMute_createServerFn_handler = createServerRpc({
	id: "e0417850f963f3c946cee2b0c07d5c6496f8ae8681ccb199e9dbad32f46d9a33",
	name: "toggleMute",
	filename: "src/lib/nyxoshi/server.ts"
}, (opts) => toggleMute.__executeServer(opts));
var toggleMute = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((userId) => userId).handler(toggleMute_createServerFn_handler, async ({ context, data }) => {
	if (data === context.userId) throw new Error("Você não pode silenciar a si.");
	const sql = await getSql();
	if ((await sql`select 1 from user_mutes where muter_id=${context.userId} and muted_id=${data} limit 1`).length) {
		await sql`delete from user_mutes where muter_id=${context.userId} and muted_id=${data}`;
		return { muted: false };
	}
	await sql`insert into user_mutes(muter_id,muted_id) values(${context.userId},${data}) on conflict do nothing`;
	return { muted: true };
});
var toggleRestriction_createServerFn_handler = createServerRpc({
	id: "995e36014b764a35613d96ee596a1202516b77013443e8c6a0552bfe459469ab",
	name: "toggleRestriction",
	filename: "src/lib/nyxoshi/server.ts"
}, (opts) => toggleRestriction.__executeServer(opts));
var toggleRestriction = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((userId) => userId).handler(toggleRestriction_createServerFn_handler, async ({ context, data }) => {
	if (data === context.userId) throw new Error("Você não pode restringir a si.");
	const sql = await getSql();
	if ((await sql`select 1 from user_restrictions where restrictor_id=${context.userId} and restricted_id=${data} limit 1`).length) {
		await sql`delete from user_restrictions where restrictor_id=${context.userId} and restricted_id=${data}`;
		return { restricted: false };
	}
	await sql`insert into user_restrictions(restrictor_id,restricted_id) values(${context.userId},${data}) on conflict do nothing`;
	return { restricted: true };
});
var getUserSecurityInfo_createServerFn_handler = createServerRpc({
	id: "7d5f57b88c4f8f4386e6076540b16b744d2cf35da7bbd50980d73b393f2ed5b5",
	name: "getUserSecurityInfo",
	filename: "src/lib/nyxoshi/server.ts"
}, (opts) => getUserSecurityInfo.__executeServer(opts));
var getUserSecurityInfo = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(getUserSecurityInfo_createServerFn_handler, async ({ context }) => {
	const { sql } = await requireFounder1(context.userId);
	return (await sql`select p.user_id,p.username,p.display_name,u.email,r.role,r.founder_number,u."createdAt"::text as created_at from profiles p join "user" u on u.id=p.user_id left join user_roles r on r.user_id=p.user_id where p.deleted_at is null order by u."createdAt" desc limit 500`).map((r) => ({
		...r,
		emailMasked: r.email.replace(/^(.{2}).*(@.*)$/, "$1***$2")
	}));
});
var revealUserEmail_createServerFn_handler = createServerRpc({
	id: "5278a77b941a2ef0a444024963846314a7bb2a2691f335e6849ed7d4bf59231e",
	name: "revealUserEmail",
	filename: "src/lib/nyxoshi/server.ts"
}, (opts) => revealUserEmail.__executeServer(opts));
var revealUserEmail = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((data) => {
	if (!data.targetUserId || data.reason.trim().length < 8) throw new Error("Informe um motivo com pelo menos 8 caracteres.");
	return data;
}).handler(revealUserEmail_createServerFn_handler, async ({ context, data }) => {
	const { sql } = await requireFounder1(context.userId);
	const rows = await sql`select email from "user" where id=${data.targetUserId} limit 1`;
	if (!rows[0]) throw new Error("Usuário não encontrado.");
	await sql`insert into audit_log(id,actor_id,action,target_user_id,metadata) values(${crypto.randomUUID()},${context.userId},'reveal_email',${data.targetUserId},${JSON.stringify({ reason: data.reason.trim() })})`;
	return { email: rows[0].email };
});
var getMyPreferences_createServerFn_handler = createServerRpc({
	id: "9967ad30b1cb74e655d403152e4106027cae1642119fc3f8f63abf38d44ef780",
	name: "getMyPreferences",
	filename: "src/lib/nyxoshi/server.ts"
}, (opts) => getMyPreferences.__executeServer(opts));
var getMyPreferences = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(getMyPreferences_createServerFn_handler, async ({ context }) => {
	const sql = await getSql();
	const [n] = await sql`select likes,comments,follows,messages,reposts,mentions,quotes,reactions from notification_preferences where user_id=${context.userId} limit 1`;
	const [p] = await sql`select message_policy,mention_policy,discoverable from privacy_preferences where user_id=${context.userId} limit 1`;
	return {
		notifications: n ?? {
			likes: true,
			comments: true,
			follows: true,
			messages: true,
			reposts: true,
			mentions: true,
			quotes: true,
			reactions: true
		},
		privacy: p ?? {
			message_policy: "requests",
			mention_policy: "everyone",
			discoverable: true
		}
	};
});
var updateMyPreferences_createServerFn_handler = createServerRpc({
	id: "a5885d911b4a9f5c3255f659472b2085534c77b3ec9def419d802ff2f3616a4b",
	name: "updateMyPreferences",
	filename: "src/lib/nyxoshi/server.ts"
}, (opts) => updateMyPreferences.__executeServer(opts));
var updateMyPreferences = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((data) => data).handler(updateMyPreferences_createServerFn_handler, async ({ context, data }) => {
	const sql = await getSql();
	const n = data.notifications;
	if (n) await sql`insert into notification_preferences(user_id,likes,comments,follows,messages,reposts,mentions,quotes,reactions) values(${context.userId},${n.likes ?? true},${n.comments ?? true},${n.follows ?? true},${n.messages ?? true},${n.reposts ?? true},${n.mentions ?? true},${n.quotes ?? true},${n.reactions ?? true}) on conflict(user_id) do update set likes=excluded.likes,comments=excluded.comments,follows=excluded.follows,messages=excluded.messages,reposts=excluded.reposts,mentions=excluded.mentions,quotes=excluded.quotes,reactions=excluded.reactions,updated_at=now()`;
	const v = data.privacy;
	if (v) await sql`insert into privacy_preferences(user_id,message_policy,mention_policy,discoverable) values(${context.userId},${v.message_policy ?? "requests"},${v.mention_policy ?? "everyone"},${v.discoverable ?? true}) on conflict(user_id) do update set message_policy=excluded.message_policy,mention_policy=excluded.mention_policy,discoverable=excluded.discoverable,updated_at=now()`;
	return { ok: true };
});
var toggleMessageReaction_createServerFn_handler = createServerRpc({
	id: "1a718d91923531b4ddce20fc28cc9ce3579921b0686303d73cc1814c46e1c987",
	name: "toggleMessageReaction",
	filename: "src/lib/nyxoshi/server.ts"
}, (opts) => toggleMessageReaction.__executeServer(opts));
var toggleMessageReaction = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((data) => {
	if (!data.messageId || !data.reaction) throw new Error("Reação inválida.");
	return data;
}).handler(toggleMessageReaction_createServerFn_handler, async ({ context, data }) => {
	const sql = await getSql();
	if (!(await sql`select 1 from messages m join message_threads t on t.id=m.thread_id where m.id=${data.messageId} and (${context.userId}=t.user_a or ${context.userId}=t.user_b) limit 1`).length) throw new Error("Mensagem não encontrada.");
	if ((await sql`select 1 from message_reactions where user_id=${context.userId} and message_id=${data.messageId} and reaction=${data.reaction} limit 1`).length) {
		await sql`delete from message_reactions where user_id=${context.userId} and message_id=${data.messageId} and reaction=${data.reaction}`;
		return { active: false };
	}
	await sql`insert into message_reactions(user_id,message_id,reaction) values(${context.userId},${data.messageId},${data.reaction})`;
	return { active: true };
});
var deleteMessage_createServerFn_handler = createServerRpc({
	id: "58c396e475ede2f57bf2cd47dc21fdda88f16aa3961e9ff2c6ea27e1246f3716",
	name: "deleteMessage",
	filename: "src/lib/nyxoshi/server.ts"
}, (opts) => deleteMessage.__executeServer(opts));
var deleteMessage = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((messageId) => messageId).handler(deleteMessage_createServerFn_handler, async ({ context, data }) => {
	await (await getSql())`update messages set deleted_at=now() where id=${data} and sender_id=${context.userId}`;
	return { ok: true };
});
var createGroup_createServerFn_handler = createServerRpc({
	id: "8ad22ab3658f5a379f3a691c7ebf5512a2d61b2b96f4d6a673876b7a0bccae9c",
	name: "createGroup",
	filename: "src/lib/nyxoshi/server.ts"
}, (opts) => createGroup.__executeServer(opts));
var createGroup = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((data) => {
	const name = data.name.trim();
	if (name.length < 2 || name.length > 80) throw new Error("Nome do grupo inválido.");
	return {
		name,
		memberIds: [...new Set(data.memberIds)]
	};
}).handler(createGroup_createServerFn_handler, async ({ context, data }) => {
	const sql = await getSql();
	const id = crypto.randomUUID();
	await sql`insert into message_groups(id,name,created_by) values(${id},${data.name},${context.userId})`;
	await sql`insert into message_group_members(group_id,user_id,role) values(${id},${context.userId},'owner') on conflict do nothing`;
	for (const memberId of data.memberIds) {
		if (memberId === context.userId) continue;
		if ((await sql`select 1 from profiles where user_id=${memberId} and deleted_at is null limit 1`).length) await sql`insert into message_group_members(group_id,user_id,role) values(${id},${memberId},'member') on conflict do nothing`;
	}
	return { groupId: id };
});
var listGroups_createServerFn_handler = createServerRpc({
	id: "6b7b4e9aaa5001330dc5d0ab9e959a1ad61f0b097f1033ad1e869970b586d44f",
	name: "listGroups",
	filename: "src/lib/nyxoshi/server.ts"
}, (opts) => listGroups.__executeServer(opts));
var listGroups = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(listGroups_createServerFn_handler, async ({ context }) => {
	const sql = await getSql();
	if ((await syncRoleForUser(sql, context.userId)).role === "founder") {
		const founders = await sql`select user_id from user_roles where role='founder' order by founder_number nulls last`;
		let g = await sql`select id from message_groups where name='Fundadores' order by created_at asc limit 1`;
		if (!g[0]) {
			const id = crypto.randomUUID();
			await sql`insert into message_groups(id,name,created_by) values(${id},'Fundadores',${context.userId})`;
			g = [{ id }];
		}
		for (const f of founders) await sql`insert into message_group_members(group_id,user_id,role) values(${g[0].id},${f.user_id},case when ${f.user_id}=${context.userId} then 'owner' else 'member' end) on conflict do nothing`;
	}
	return sql`select g.id,g.name,g.created_by from message_groups g join message_group_members gm on gm.group_id=g.id where gm.user_id=${context.userId} order by g.updated_at desc`;
});
var listGroupMessages_createServerFn_handler = createServerRpc({
	id: "64d84c7bf4252534fde8cf895b6191e37a14bb063ee3a32843949d7ad5e70ffe",
	name: "listGroupMessages",
	filename: "src/lib/nyxoshi/server.ts"
}, (opts) => listGroupMessages.__executeServer(opts));
var listGroupMessages = createServerFn({ method: "GET" }).middleware([authMiddleware]).validator((id) => id).handler(listGroupMessages_createServerFn_handler, async ({ context, data: groupId }) => {
	const sql = await getSql();
	if (!(await sql`select 1 from message_group_members where group_id=${groupId} and user_id=${context.userId} limit 1`).length) throw new Error("Grupo não encontrado.");
	return sql`select gm.id,gm.body,gm.created_at::text as created_at,gm.sender_id,gm.reply_to_id, coalesce((select json_agg(json_build_object('reaction',x.reaction,'count',x.count,'reactedByMe',x.reacted)) from (select reaction,count(*)::int count,bool_or(user_id=${context.userId}) reacted from group_message_reactions where message_id=gm.id group by reaction)x),'[]') reactions from group_messages gm where gm.group_id=${groupId} and gm.deleted_at is null order by gm.created_at asc limit 300`;
});
var sendGroupMessage_createServerFn_handler = createServerRpc({
	id: "7b875a0ba97b85c47f3b407c47f16d461c30ef416cc39074cf3ac05685ff9af3",
	name: "sendGroupMessage",
	filename: "src/lib/nyxoshi/server.ts"
}, (opts) => sendGroupMessage.__executeServer(opts));
var sendGroupMessage = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((data) => {
	if (!data.body.trim()) throw new Error("Escreva uma mensagem.");
	return {
		...data,
		body: data.body.trim().slice(0, 2e3)
	};
}).handler(sendGroupMessage_createServerFn_handler, async ({ context, data }) => {
	const sql = await getSql();
	if (!(await sql`select 1 from message_group_members where group_id=${data.groupId} and user_id=${context.userId} limit 1`).length) throw new Error("Você não pertence a este grupo.");
	const id = crypto.randomUUID();
	await sql`insert into group_messages(id,group_id,sender_id,body,reply_to_id) values(${id},${data.groupId},${context.userId},${data.body},${data.replyToId ?? null})`;
	await sql`update message_groups set updated_at=now() where id=${data.groupId}`;
	return { id };
});
var toggleGroupMessageReaction_createServerFn_handler = createServerRpc({
	id: "04e04b44db6422f32724da32491f9edbc7de9aba72a4f1e7708f53466d56924c",
	name: "toggleGroupMessageReaction",
	filename: "src/lib/nyxoshi/server.ts"
}, (opts) => toggleGroupMessageReaction.__executeServer(opts));
var toggleGroupMessageReaction = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((data) => data).handler(toggleGroupMessageReaction_createServerFn_handler, async ({ context, data }) => {
	const sql = await getSql();
	if (!(await sql`select 1 from group_messages gm join message_group_members m on m.group_id=gm.group_id and m.user_id=${context.userId} where gm.id=${data.messageId} limit 1`).length) throw new Error("Mensagem não encontrada.");
	if ((await sql`select 1 from group_message_reactions where user_id=${context.userId} and message_id=${data.messageId} and reaction=${data.reaction} limit 1`).length) {
		await sql`delete from group_message_reactions where user_id=${context.userId} and message_id=${data.messageId} and reaction=${data.reaction}`;
		return { active: false };
	}
	await sql`insert into group_message_reactions(user_id,message_id,reaction) values(${context.userId},${data.messageId},${data.reaction})`;
	return { active: true };
});
var deleteGroupMessage_createServerFn_handler = createServerRpc({
	id: "529a40bc18a75d983818593f204d48fe0d871e14db453829ab37dbacc6f8ad5b",
	name: "deleteGroupMessage",
	filename: "src/lib/nyxoshi/server.ts"
}, (opts) => deleteGroupMessage.__executeServer(opts));
var deleteGroupMessage = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((id) => id).handler(deleteGroupMessage_createServerFn_handler, async ({ context, data }) => {
	await (await getSql())`update group_messages set deleted_at=now() where id=${data} and sender_id=${context.userId}`;
	return { ok: true };
});
var createGlobalAnnouncement_createServerFn_handler = createServerRpc({
	id: "ab78aa84920d50cf778710541e51b193b40547485c13559a29e99b1471769875",
	name: "createGlobalAnnouncement",
	filename: "src/lib/nyxoshi/server.ts"
}, (opts) => createGlobalAnnouncement.__executeServer(opts));
var createGlobalAnnouncement = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((data) => {
	if (data.body.trim().length < 1) throw new Error("Mensagem vazia.");
	return {
		body: data.body.trim().slice(0, 500),
		seconds: Math.min(Math.max(data.seconds ?? 10, 3), 60)
	};
}).handler(createGlobalAnnouncement_createServerFn_handler, async ({ context, data }) => {
	const { sql } = await requireFounder(context.userId);
	if (!(await sql`select 1 from message_groups g join message_group_members gm on gm.group_id=g.id where g.name='Fundadores' and gm.user_id=${context.userId} limit 1`).length) throw new Error("Somente membros do grupo dos Fundadores podem enviar comunicados.");
	const id = crypto.randomUUID();
	await sql`insert into global_announcements(id,body,created_by,expires_at) values(${id},${data.body},${context.userId},now()+(${data.seconds} || ' seconds')::interval)`;
	return { id };
});
var listActiveGlobalAnnouncements_createServerFn_handler = createServerRpc({
	id: "31aa505e1be87559e5b4c4db7c33cba5d3241ac5ad46dc94e6e1e4ebbb3a5b14",
	name: "listActiveGlobalAnnouncements",
	filename: "src/lib/nyxoshi/server.ts"
}, (opts) => listActiveGlobalAnnouncements.__executeServer(opts));
var listActiveGlobalAnnouncements = createServerFn({ method: "GET" }).middleware([optionalAuthMiddleware]).handler(listActiveGlobalAnnouncements_createServerFn_handler, async () => {
	return (await getSql())`select id,body,created_at::text as created_at,expires_at::text as expires_at from global_announcements where expires_at>now() order by created_at desc limit 3`;
});
//#endregion
export { createComment_createServerFn_handler, createGlobalAnnouncement_createServerFn_handler, createGroup_createServerFn_handler, createPost_createServerFn_handler, createQuote_createServerFn_handler, createReport_createServerFn_handler, decideMessageRequest_createServerFn_handler, deleteGroupMessage_createServerFn_handler, deleteMessage_createServerFn_handler, deletePost_createServerFn_handler, ensureMyProfile_createServerFn_handler, getFeed_createServerFn_handler, getMessageThreadForUser_createServerFn_handler, getModerationOverview_createServerFn_handler, getMyPreferences_createServerFn_handler, getPost_createServerFn_handler, getProfileByUsername_createServerFn_handler, getProfileLikes_createServerFn_handler, getProfilePosts_createServerFn_handler, getProfileReposts_createServerFn_handler, getUserSecurityInfo_createServerFn_handler, listActiveGlobalAnnouncements_createServerFn_handler, listBookmarks_createServerFn_handler, listComments_createServerFn_handler, listConversations_createServerFn_handler, listFounders_createServerFn_handler, listGroupMessages_createServerFn_handler, listGroups_createServerFn_handler, listMessageRequests_createServerFn_handler, listMessages_createServerFn_handler, listNotifications_createServerFn_handler, markNotificationsRead_createServerFn_handler, moderateUser_createServerFn_handler, revealUserEmail_createServerFn_handler, searchNyxoshi_createServerFn_handler, sendGroupMessage_createServerFn_handler, sendMessage_createServerFn_handler, setUserRole_createServerFn_handler, suggestedPeople_createServerFn_handler, toggleBlock_createServerFn_handler, toggleBookmark_createServerFn_handler, toggleCommentReaction_createServerFn_handler, toggleFollow_createServerFn_handler, toggleGroupMessageReaction_createServerFn_handler, toggleLike_createServerFn_handler, toggleMessageReaction_createServerFn_handler, toggleMute_createServerFn_handler, toggleReaction_createServerFn_handler, toggleRepost_createServerFn_handler, toggleRestriction_createServerFn_handler, unreadNotificationCount_createServerFn_handler, updateMyPreferences_createServerFn_handler, updateMyProfile_createServerFn_handler };
