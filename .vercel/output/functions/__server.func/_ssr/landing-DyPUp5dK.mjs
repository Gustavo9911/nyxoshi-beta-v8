import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { d as useRouterState, v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { f as require_jsx_runtime, n as AvatarFallback$1, r as AvatarImage$1, t as Avatar$1 } from "../_libs/@radix-ui/react-avatar+[...].mjs";
import { r as createServerFn } from "./ssr.mjs";
import { i as signOut } from "./client-B40BzJxt.mjs";
import { i as cn, n as Logo, r as MoonMark, t as Button } from "./use-current-user-CHvoGxh7.mjs";
import { a as hasGateSessionMarker } from "./server-VLaKapud.mjs";
import { a as messageDecisionSchema, c as quotePostSchema, d as roleSchema, f as searchQuerySchema, i as feedQuerySchema, l as reactionSchema, m as updateProfileSchema, n as createCommentSchema, o as moderationSchema, p as sendMessageSchema, r as createPostSchema, s as optionalAuthMiddleware, t as authMiddleware, u as reportSchema } from "./validations-H0r5N_ul.mjs";
import { C as House, F as Bell, L as ArrowRight, S as LogOut, a as User, c as Sparkles, f as Settings, i as UsersRound, j as Compass, m as Search, t as X, u as ShieldCheck, v as PenLine, x as MessageCircle } from "../_libs/lucide-react.mjs";
import { r as useQueryClient, t as useQuery } from "../_libs/tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { a as createSsrRpc } from "./router-CdWjU9fN.mjs";
import { a as DialogOverlay, n as DialogClose, o as DialogPortal, r as DialogContent, s as DialogTitle, t as Dialog } from "../_libs/@radix-ui/react-dialog+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/landing-DyPUp5dK.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Textarea = import_react.forwardRef(({ className, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
		className: cn("flex min-h-24 w-full rounded-lg border border-input bg-transparent px-3 py-3 text-base text-fg placeholder:text-subtle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50", className),
		ref,
		...props
	});
});
Textarea.displayName = "Textarea";
var Avatar = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Avatar$1, {
	ref,
	className: cn("relative flex size-10 shrink-0 overflow-hidden rounded-full bg-secondary", className),
	...props
}));
Avatar.displayName = Avatar$1.displayName;
var AvatarImage = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarImage$1, {
	ref,
	className: cn("aspect-square size-full object-cover", className),
	...props
}));
AvatarImage.displayName = AvatarImage$1.displayName;
var AvatarFallback = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarFallback$1, {
	ref,
	className: cn("flex size-full items-center justify-center rounded-full bg-secondary text-sm font-medium text-muted", className),
	...props
}));
AvatarFallback.displayName = AvatarFallback$1.displayName;
function UserAvatar({ username, displayName, image, className, toProfile = true }) {
	const letter = (displayName || username || "N").charAt(0).toUpperCase();
	const node = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Avatar, {
		className: cn("size-10", className),
		children: [image ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarImage, {
			src: image,
			alt: ""
		}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarFallback, { children: letter })]
	});
	if (!toProfile) return node;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
		to: "/u/$username",
		params: { username },
		className: "shrink-0 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
		children: node
	});
}
var ensureMyProfile = createServerFn({ method: "POST" }).middleware([authMiddleware]).handler(createSsrRpc("199c9c4d341a459816149b0c988f97d05f76de94f7805cf8a4f2f01661566496"));
var getFeed = createServerFn({ method: "GET" }).middleware([optionalAuthMiddleware]).validator((data) => feedQuerySchema.parse(data ?? { tab: "forYou" })).handler(createSsrRpc("293ff56c265258bb31531dcfdc56933d529112222d4d22970f1ca0156f1bf916"));
var createPost = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((data) => createPostSchema.parse(data)).handler(createSsrRpc("c95aefb7ae16db30962885182d29372dee59401f3a822e03350bbcbc04f63acd"));
var deletePost = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((id) => id).handler(createSsrRpc("029b399571fbd3b47d4d2487023db6e3a4e01cbeae64ea043db9f5cc3b80be85"));
var toggleLike = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((postId) => postId).handler(createSsrRpc("49b84f79a60609524ceb8c8d44e9650628306d94d26d31d408b23ee2e95f92de"));
var getPost = createServerFn({ method: "GET" }).middleware([optionalAuthMiddleware]).validator((postId) => postId).handler(createSsrRpc("74093ac8e40b9caa9fcf362d947835e89529dac9c68ef88ca2965fc3ceee63dc"));
var listComments = createServerFn({ method: "GET" }).middleware([optionalAuthMiddleware]).validator((postId) => postId).handler(createSsrRpc("98fbe71f5eabba1ba7277f11f630b3bee5fd20634642e31ba6faa14ff4234a95"));
var createComment = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((data) => createCommentSchema.parse(data)).handler(createSsrRpc("d4eea952ef297d7903bb237dfdd7f509064e5bcb119bc29c1174039abd3c4dec"));
var getProfileByUsername = createServerFn({ method: "GET" }).middleware([optionalAuthMiddleware]).validator((username) => username.trim().toLowerCase()).handler(createSsrRpc("7ca34c581eb0946682e01790b4e57b865b27b127a4de7c8dcfd88069f5fcbf8f"));
var getProfilePosts = createServerFn({ method: "GET" }).middleware([optionalAuthMiddleware]).validator((username) => username.trim().toLowerCase()).handler(createSsrRpc("ed158dbf295174554485a5e9adc24007371ea8ae9cd989701dd44d32185cd7f5"));
var updateMyProfile = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((data) => updateProfileSchema.parse(data)).handler(createSsrRpc("52f95b1b448b6302f3d34a3ca92dd18caec55cebe9d10668e60e3823939cbe96"));
var toggleFollow = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((userId) => userId).handler(createSsrRpc("659c706ccacd33ef609e5e2868a205589948a57cd9c5fddcccd8dbd732b566d4"));
var toggleBlock = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((userId) => userId).handler(createSsrRpc("bccc11e80c80e04ef02b38a2e29a56e6664618a25a5acca935f1685da0d07849"));
var createReport = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((data) => reportSchema.parse(data)).handler(createSsrRpc("3a14221986ee0877005e363914eb7299b5209cbfe143f473513fad7f28363a58"));
var searchNyxoshi = createServerFn({ method: "GET" }).middleware([optionalAuthMiddleware]).validator((data) => searchQuerySchema.parse(data)).handler(createSsrRpc("b157ab9fb5d06607128364da72d094756838a415c1559c31c31305d14e1732b8"));
var suggestedPeople = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("152760d88f4d8883affd523fc95bf010cfd717ea21e4337bddfb9b8a8e740d81"));
var listNotifications = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("b614fa96edc38a090b7f6413a88efa2cc245ecc52aa14380d259d369e4c5c8e0"));
var unreadNotificationCount = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("e76e2eab37a8249fbd9393db87fbb9fc3c0cbe85c5c77cfee5a35f23bf26222b"));
var markNotificationsRead = createServerFn({ method: "POST" }).middleware([authMiddleware]).handler(createSsrRpc("94f8c403e0f1e4553ea4ae1c93ffcd83de931d247b705e3d586235262e5fe34b"));
var listMessageRequests = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("a0ad1b9431e385a3db9a38a175d3589bc7e237ee7a0388bd98a403dc77c649d6"));
var listConversations = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("69e84feb3fe3aad2d0b8801f6a8c16c00be2ec186ff0b1e2b31c8bf24eae6b36"));
var listMessages = createServerFn({ method: "GET" }).middleware([authMiddleware]).validator((threadId) => threadId).handler(createSsrRpc("22a47b81f8e637350adfa8363196719dc6c381a035bb2e12353bf7c71b6b2af0"));
var sendMessage = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((data) => sendMessageSchema.parse(data)).handler(createSsrRpc("600bbf0ef4394aa7bef390c0cedfe7ff8da5b4807ea5f0d163b3719831d8292e"));
var decideMessageRequest = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((data) => messageDecisionSchema.parse(data)).handler(createSsrRpc("79fa543e490f6bc499e17f319e0f502cf0ae7a5fa6751c806c2b9311de5f3a8d"));
var getMessageThreadForUser = createServerFn({ method: "GET" }).middleware([authMiddleware]).validator((userId) => userId).handler(createSsrRpc("8f1d0e251ea974a1ea9ccc36020f38b4e3251bd221122f83a6d8d906a563049d"));
var getModerationOverview = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("438a95b388bd69631b4fe852824fb4609e5e97b69e490438478df09caba244f2"));
createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((data) => moderationSchema.parse(data)).handler(createSsrRpc("c4671b860dfa2090c0cf6ed03fd86db29ad58f93b1f08f9f4f6a55538f113be7"));
var setUserRole = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((data) => roleSchema.parse(data)).handler(createSsrRpc("3f0b153d7ce36ddda7031a8f5a42af959a34b4b4ae285714918d9996dd4b0470"));
var listFounders = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("e84e3e1a2b295295d48a399972c3c744bb601b478b16a576ed571fbd67e493ad"));
var toggleReaction = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((data) => reactionSchema.parse(data)).handler(createSsrRpc("d75c962cdde2c7ea9ff45d63c7ee2c9450fe3ee57e5944492294e43461a1c061"));
var toggleCommentReaction = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((data) => reactionSchema.parse(data)).handler(createSsrRpc("116b458678049bb95d8490aeaad5df6480499f77920ec72c73370553b3323a03"));
var toggleRepost = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((id) => id).handler(createSsrRpc("7f96348eb27f0158b0d4a2e3e6ebe17db2125f47ba70247f75a71e8927bd32f9"));
var toggleBookmark = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((id) => id).handler(createSsrRpc("20564446b23d075b96439496fec662f25e36f6a89719810c6e89c0ce2a6ff87a"));
var createQuote = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((data) => quotePostSchema.parse(data)).handler(createSsrRpc("d9f45dad4f4cf9dab6ae0c7c1fe8d0b3e7d0fe392ac824b82da8e1c58032bd73"));
createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("7af4c173fe64d90fa0ac23f22f3637c7294f2c4423498f75c1ed36d6367ce4ab"));
var getProfileReposts = createServerFn({ method: "GET" }).middleware([optionalAuthMiddleware]).validator((username) => username.trim().toLowerCase()).handler(createSsrRpc("83d797d0bdd395dbf106cdf9c3289e6a5feb72e3623227ebbcb7b77685f07ece"));
var getProfileLikes = createServerFn({ method: "GET" }).middleware([optionalAuthMiddleware]).validator((username) => username.trim().toLowerCase()).handler(createSsrRpc("9f1de26860000ea52941ca7e26f72b8ee199bf00e3a8d6abb037c8035da8be47"));
var toggleMute = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((userId) => userId).handler(createSsrRpc("e0417850f963f3c946cee2b0c07d5c6496f8ae8681ccb199e9dbad32f46d9a33"));
var toggleRestriction = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((userId) => userId).handler(createSsrRpc("995e36014b764a35613d96ee596a1202516b77013443e8c6a0552bfe459469ab"));
var getUserSecurityInfo = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("7d5f57b88c4f8f4386e6076540b16b744d2cf35da7bbd50980d73b393f2ed5b5"));
var revealUserEmail = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((data) => {
	if (!data.targetUserId || data.reason.trim().length < 8) throw new Error("Informe um motivo com pelo menos 8 caracteres.");
	return data;
}).handler(createSsrRpc("5278a77b941a2ef0a444024963846314a7bb2a2691f335e6849ed7d4bf59231e"));
var getMyPreferences = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("9967ad30b1cb74e655d403152e4106027cae1642119fc3f8f63abf38d44ef780"));
var updateMyPreferences = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((data) => data).handler(createSsrRpc("a5885d911b4a9f5c3255f659472b2085534c77b3ec9def419d802ff2f3616a4b"));
var toggleMessageReaction = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((data) => {
	if (!data.messageId || !data.reaction) throw new Error("Reação inválida.");
	return data;
}).handler(createSsrRpc("1a718d91923531b4ddce20fc28cc9ce3579921b0686303d73cc1814c46e1c987"));
var deleteMessage = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((messageId) => messageId).handler(createSsrRpc("58c396e475ede2f57bf2cd47dc21fdda88f16aa3961e9ff2c6ea27e1246f3716"));
var createGroup = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((data) => {
	const name = data.name.trim();
	if (name.length < 2 || name.length > 80) throw new Error("Nome do grupo inválido.");
	return {
		name,
		memberIds: [...new Set(data.memberIds)]
	};
}).handler(createSsrRpc("8ad22ab3658f5a379f3a691c7ebf5512a2d61b2b96f4d6a673876b7a0bccae9c"));
var listGroups = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("6b7b4e9aaa5001330dc5d0ab9e959a1ad61f0b097f1033ad1e869970b586d44f"));
var listGroupMessages = createServerFn({ method: "GET" }).middleware([authMiddleware]).validator((id) => id).handler(createSsrRpc("64d84c7bf4252534fde8cf895b6191e37a14bb063ee3a32843949d7ad5e70ffe"));
var sendGroupMessage = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((data) => {
	if (!data.body.trim()) throw new Error("Escreva uma mensagem.");
	return {
		...data,
		body: data.body.trim().slice(0, 2e3)
	};
}).handler(createSsrRpc("7b875a0ba97b85c47f3b407c47f16d461c30ef416cc39074cf3ac05685ff9af3"));
var toggleGroupMessageReaction = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((data) => data).handler(createSsrRpc("04e04b44db6422f32724da32491f9edbc7de9aba72a4f1e7708f53466d56924c"));
var deleteGroupMessage = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((id) => id).handler(createSsrRpc("529a40bc18a75d983818593f204d48fe0d871e14db453829ab37dbacc6f8ad5b"));
var createGlobalAnnouncement = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((data) => {
	if (data.body.trim().length < 1) throw new Error("Mensagem vazia.");
	return {
		body: data.body.trim().slice(0, 500),
		seconds: Math.min(Math.max(data.seconds ?? 10, 3), 60)
	};
}).handler(createSsrRpc("ab78aa84920d50cf778710541e51b193b40547485c13559a29e99b1471769875"));
var listActiveGlobalAnnouncements = createServerFn({ method: "GET" }).middleware([optionalAuthMiddleware]).handler(createSsrRpc("31aa505e1be87559e5b4c4db7c33cba5d3241ac5ad46dc94e6e1e4ebbb3a5b14"));
var MAX = 500;
function Compose({ me, autoFocus = false, compact = false, onPosted }) {
	const queryClient = useQueryClient();
	const [body, setBody] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	const remaining = MAX - body.length;
	const canPost = body.trim().length > 0 && body.length <= MAX && !busy;
	async function submit() {
		if (!canPost) return;
		setBusy(true);
		try {
			await createPost({ data: { body } });
			setBody("");
			queryClient.invalidateQueries({ queryKey: ["feed"] });
			queryClient.invalidateQueries({ queryKey: ["profile"] });
			onPosted?.();
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "Não foi possível publicar.");
		} finally {
			setBusy(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("flex gap-3", compact ? "py-0" : "border-b border-border px-4 py-4"),
		children: [!compact ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserAvatar, {
			username: me.username,
			displayName: me.displayName,
			image: me.image
		}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "min-w-0 flex-1",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
				value: body,
				onChange: (e) => setBody(e.target.value.slice(0, MAX)),
				placeholder: "O que a noite guarda?",
				autoFocus,
				className: cn("resize-none border-0 p-0 text-[17px] leading-relaxed focus-visible:ring-0", compact ? "min-h-[48px]" : "min-h-[96px]"),
				onKeyDown: (e) => {
					if ((e.metaKey || e.ctrlKey) && e.key === "Enter") submit();
				}
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: cn("text-xs tabular-nums", remaining < 40 ? "text-destructive" : "text-subtle"),
					children: remaining
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					size: "pill",
					onClick: () => void submit(),
					disabled: !canPost,
					children: "Publicar"
				})]
			})]
		})]
	});
}
var Sheet = Dialog;
var SheetPortal = DialogPortal;
var SheetOverlay = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, {
	ref,
	className: cn("fixed inset-0 z-50 bg-bg/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", className),
	...props
}));
SheetOverlay.displayName = DialogOverlay.displayName;
var SheetContent = import_react.forwardRef(({ className, children, side = "bottom", ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetOverlay, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
	ref,
	className: cn("fixed z-50 border border-border bg-card p-5 shadow-2xl duration-[var(--motion-slow)] data-[state=open]:animate-in data-[state=closed]:animate-out", side === "bottom" && "inset-x-0 bottom-0 rounded-t-xl data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom", side === "right" && "inset-y-0 right-0 h-full w-80 rounded-l-xl data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right", className),
	...props,
	children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogClose, {
		className: "absolute top-3 right-3 rounded-sm p-1 text-muted",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "sr-only",
			children: "Fechar"
		})]
	})]
})] }));
SheetContent.displayName = DialogContent.displayName;
function SheetHeader({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("mb-4 flex flex-col gap-1 pr-8", className),
		...props
	});
}
var SheetTitle = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
	ref,
	className: cn("font-display text-lg font-medium", className),
	...props
}));
SheetTitle.displayName = DialogTitle.displayName;
var NAV = [
	{
		to: "/",
		label: "Início",
		icon: House,
		exact: true
	},
	{
		to: "/search",
		label: "Explorar",
		icon: Compass,
		exact: false
	},
	{
		to: "/communities",
		label: "Comunidades",
		icon: UsersRound,
		exact: false
	},
	{
		to: "/messages",
		label: "Mensagens",
		icon: MessageCircle,
		exact: false
	},
	{
		to: "/notifications",
		label: "Notificações",
		icon: Bell,
		exact: false
	}
];
function AppShell({ me, children }) {
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const [composeOpen, setComposeOpen] = (0, import_react.useState)(false);
	const unread = useQuery({
		queryKey: ["unread"],
		queryFn: () => unreadNotificationCount()
	});
	const announcements = useQuery({
		queryKey: ["global-announcements"],
		queryFn: () => listActiveGlobalAnnouncements(),
		refetchInterval: 5e3
	});
	const suggestions = useQuery({
		queryKey: ["suggestions"],
		queryFn: () => suggestedPeople()
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "night-wash min-h-dvh",
		children: [
			announcements.data?.[0] ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "fixed inset-x-4 top-4 z-[100] mx-auto max-w-lg rounded-2xl border border-fuchsia-400/30 bg-bg/95 p-4 shadow-2xl backdrop-blur",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "absolute right-2 top-2 text-muted",
						onClick: () => void announcements.refetch(),
						"aria-label": "Fechar",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-semibold text-fuchsia-300",
						children: "Nyxoshi · Equipe dos Fundadores"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 whitespace-pre-wrap pr-5 text-sm",
						children: announcements.data[0].body
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-[11px] text-muted",
						children: new Date(announcements.data[0].created_at).toLocaleTimeString([], {
							hour: "2-digit",
							minute: "2-digit"
						})
					})
				]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto grid min-h-dvh max-w-6xl grid-cols-1 md:grid-cols-[220px_minmax(0,1fr)] lg:grid-cols-[240px_minmax(0,640px)_280px]",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
						className: "sticky top-0 hidden h-dvh flex-col justify-between border-r border-border px-4 py-5 md:flex",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
								className: "mt-8 flex flex-col gap-1",
								children: [
									NAV.map((item) => {
										const active = item.exact ? pathname === item.to : pathname.startsWith(item.to);
										return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
											to: item.to,
											className: cn("relative flex h-11 items-center gap-3 rounded-lg px-3 text-[15px] transition-colors", active ? "bg-secondary text-fg" : "text-muted hover:bg-secondary hover:text-fg"),
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(item.icon, { className: "size-5" }),
												item.label,
												item.to === "/notifications" && (unread.data ?? 0) > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "ml-auto grid min-w-5 place-items-center rounded-full bg-primary px-1.5 text-[11px] font-medium text-primary-foreground tabular-nums",
													children: unread.data
												}) : null
											]
										}, item.to);
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
										to: "/u/$username",
										params: { username: me.username },
										className: cn("flex h-11 items-center gap-3 rounded-lg px-3 text-[15px] transition-colors", pathname.startsWith("/u/") ? "bg-secondary text-fg" : "text-muted hover:bg-secondary hover:text-fg"),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "size-5" }), "Perfil"]
									}),
									me.role === "founder" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
										to: "/founders",
										className: cn("flex h-11 items-center gap-3 rounded-lg px-3 text-[15px] transition-colors", pathname === "/founders" ? "bg-secondary text-fg" : "text-muted hover:bg-secondary hover:text-fg"),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "size-5" }), "Fundadores"]
									}) : null,
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
										to: "/settings",
										className: cn("flex h-11 items-center gap-3 rounded-lg px-3 text-[15px] transition-colors", pathname === "/settings" ? "bg-secondary text-fg" : "text-muted hover:bg-secondary hover:text-fg"),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Settings, { className: "size-5" }), "Conta"]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								className: "mt-6 w-full nyx-glow",
								size: "pill",
								onClick: () => setComposeOpen(true),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PenLine, {}), "Publicar"]
							})
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccountChip, { me })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
						className: "min-w-0 border-border md:border-r pb-20 md:pb-0",
						children
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
						className: "sticky top-0 hidden h-dvh overflow-y-auto p-5 lg:block",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/search",
							className: "nyx-panel flex h-11 items-center gap-2 rounded-full px-4 text-sm text-muted",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "size-4" }), "Buscar na noite"]
						}), suggestions.data && suggestions.data.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
							className: "nyx-panel mt-5 rounded-2xl p-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-display text-lg tracking-tight",
								children: "Quem seguir"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: "mt-3 space-y-3",
								children: suggestions.data.map((person) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/u/$username",
									params: { username: person.username },
									className: "flex items-center gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserAvatar, {
										username: person.username,
										displayName: person.displayName,
										image: person.image,
										toProfile: false,
										className: "size-9"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "min-w-0",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "block truncate text-sm font-medium",
											children: person.displayName
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "block truncate text-xs text-muted",
											children: ["@", person.username]
										})]
									})]
								}) }, person.userId))
							})]
						}) : null]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
				className: "fixed inset-x-0 bottom-0 z-30 grid grid-cols-5 border-t border-border bg-[#09060fee] pb-[env(safe-area-inset-bottom)] backdrop-blur-xl md:hidden",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabLink, {
						to: "/",
						icon: House,
						label: "Início",
						active: pathname === "/"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabLink, {
						to: "/search",
						icon: Compass,
						label: "Explorar",
						active: pathname.startsWith("/search")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => setComposeOpen(true),
						className: "grid place-items-center py-2 text-fg",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "grid size-11 place-items-center rounded-full bg-gradient-to-br from-fuchsia-500 to-violet-700 text-white shadow-[0_0_25px_#a855f755]",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PenLine, { className: "size-5" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "sr-only",
							children: "Publicar"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabLink, {
						to: "/messages",
						icon: MessageCircle,
						label: "Mensagens",
						active: pathname.startsWith("/messages")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabLink, {
						to: "/u/$username",
						params: { username: me.username },
						icon: User,
						label: "Perfil",
						active: pathname.startsWith("/u/")
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sheet, {
				open: composeOpen,
				onOpenChange: setComposeOpen,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetContent, {
					side: "bottom",
					className: "md:mx-auto md:max-w-xl",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetTitle, { children: "Nova publicação" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Compose, {
						me,
						autoFocus: true,
						onPosted: () => setComposeOpen(false)
					})]
				})
			})
		]
	});
}
function TabLink({ to, params, icon: Icon, label, active, badge }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to,
		params,
		className: cn("relative grid place-items-center py-2", active ? "text-fg" : "text-muted"),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-5" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "sr-only",
				children: label
			}),
			badge && badge > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute top-1 right-[calc(50%-18px)] size-1.5 rounded-full bg-primary" }) : null
		]
	});
}
function AccountChip({ me }) {
	const [signingOut, setSigningOut] = (0, import_react.useState)(false);
	const gateSession = typeof window !== "undefined" ? hasGateSessionMarker() : false;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center gap-2 rounded-xl border border-border p-2",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserAvatar, {
				username: me.username,
				displayName: me.displayName,
				image: me.image,
				className: "size-9"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0 flex-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "truncate text-sm font-medium",
					children: me.displayName
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "truncate text-xs text-muted",
					children: ["@", me.username]
				})]
			}),
			!gateSession ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				variant: "ghost",
				size: "icon",
				className: "size-9 text-muted",
				disabled: signingOut,
				onClick: () => {
					setSigningOut(true);
					signOut("/").catch(() => setSigningOut(false));
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "size-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "sr-only",
					children: "Sair"
				})]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MoonMark, { className: "mr-1 size-4 text-muted" })
		]
	});
}
function Landing() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "night-wash starfield relative min-h-dvh overflow-hidden",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "mx-auto flex max-w-6xl items-center justify-between px-5 py-5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				asChild: true,
				variant: "outline",
				size: "sm",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/login",
					children: "Entrar"
				})
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
			className: "relative mx-auto grid min-h-[calc(100dvh-88px)] max-w-6xl items-center gap-12 px-5 pb-16 pt-6 lg:grid-cols-[1.05fr_.95fr]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "max-w-xl",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-5 inline-flex items-center gap-2 rounded-full border border-fuchsia-400/20 bg-fuchsia-500/10 px-3 py-1.5 text-xs text-fuchsia-200",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-3.5" }), " Rede social independente"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
						className: "mt-4 font-display text-5xl leading-[1.02] tracking-[-0.04em] sm:text-7xl",
						children: [
							"Conecte-se.",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "bg-gradient-to-r from-fuchsia-300 via-violet-300 to-indigo-300 bg-clip-text text-transparent",
								children: "Compartilhe."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
							"Faça parte de algo maior."
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-6 max-w-lg text-base leading-relaxed text-muted",
						children: "Nyxoshi é um espaço social independente para pessoas, ideias e comunidades. Um lugar para criar conexões sem precisar caber no mesmo molde."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-8 flex flex-col gap-3 sm:flex-row",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							size: "lg",
							className: "nyx-glow",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/login",
								children: ["Criar conta ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {})]
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							variant: "outline",
							size: "lg",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/login",
								children: "Já tenho conta"
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-10 grid gap-3 sm:grid-cols-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Feature, {
								icon: UsersRound,
								title: "Comunidade",
								text: "Pessoas com interesses em comum."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Feature, {
								icon: MessageCircle,
								title: "Conversa",
								text: "Posts, comentários e mensagens."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Feature, {
								icon: MoonMark,
								title: "Identidade",
								text: "Seu perfil, seu espaço, sua noite."
							})
						]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative mx-auto w-full max-w-md",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -inset-10 rounded-[50%] bg-violet-600/10 blur-3xl" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "nyx-panel relative overflow-hidden rounded-[32px] p-4 shadow-2xl",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-[25px] border border-fuchsia-400/15 bg-[#09060e] p-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "rounded-full bg-fuchsia-500/10 px-2.5 py-1 text-xs text-fuchsia-200",
									children: "Ao vivo"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-6 flex gap-3 overflow-hidden",
								children: Array.from({ length: 5 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "story-ring shrink-0",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "block size-12 rounded-full bg-gradient-to-br from-[#24113e] to-[#0b0712]" })
								}, i))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-5 rounded-2xl border border-fuchsia-400/10 bg-[#100a19] p-4",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "grid size-10 place-items-center rounded-full bg-violet-500/15 text-violet-300",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MoonMark, {})
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-sm font-semibold",
											children: "Nyxoshi"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs text-muted",
											children: "@nyxoshi · agora"
										})] })]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-4 text-sm leading-relaxed",
										children: "A noite também pode ser um lugar para encontrar pessoas. ✦"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mt-4 h-40 rounded-xl bg-gradient-to-br from-violet-950 via-fuchsia-950 to-black opacity-90" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-3 flex gap-5 text-xs text-muted",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "♡ 124" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "◌ 23" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "↗ 7" })
										]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-4 grid grid-cols-4 gap-2 text-center text-[10px] text-muted",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
										"⌂",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
										"Início"
									] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
										"⌕",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
										"Explorar"
									] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-fuchsia-300",
										children: [
											"＋",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
											"Publicar"
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
										"◉",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
										"Perfil"
									] })
								]
							})
						]
					})
				})]
			})]
		})]
	});
}
function Feature({ icon: Icon, title, text }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "nyx-panel rounded-2xl p-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-4 text-fuchsia-300" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm font-medium",
				children: title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-xs leading-relaxed text-muted",
				children: text
			})
		]
	});
}
//#endregion
export { listGroups as A, toggleBlock as B, getProfilePosts as C, listConversations as D, listComments as E, revealUserEmail as F, toggleLike as G, toggleCommentReaction as H, searchNyxoshi as I, toggleReaction as J, toggleMessageReaction as K, sendGroupMessage as L, listMessages as M, listNotifications as N, listFounders as O, markNotificationsRead as P, updateMyProfile as Q, sendMessage as R, getProfileLikes as S, getUserSecurityInfo as T, toggleFollow as U, toggleBookmark as V, toggleGroupMessageReaction as W, toggleRestriction as X, toggleRepost as Y, updateMyPreferences as Z, getMessageThreadForUser as _, UserAvatar as a, getPost as b, createGroup as c, decideMessageRequest as d, deleteGroupMessage as f, getFeed as g, ensureMyProfile as h, Textarea as i, listMessageRequests as j, listGroupMessages as k, createQuote as l, deletePost as m, Compose as n, createComment as o, deleteMessage as p, toggleMute as q, Landing as r, createGlobalAnnouncement as s, AppShell as t, createReport as u, getModerationOverview as v, getProfileReposts as w, getProfileByUsername as x, getMyPreferences as y, setUserRole as z };
