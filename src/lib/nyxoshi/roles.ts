import { getSql, type Sql } from "@/lib/db";

export const ROLE_ORDER = [
  "user",
  "tester",
  "bug_tester",
  "designer",
  "moderator",
  "admin",
  "founder",
] as const;

export type NyxoshiRole = (typeof ROLE_ORDER)[number];

const founderEnvKeys = ["NYXOSHI_FOUNDER_1_EMAIL", "NYXOSHI_FOUNDER_2_EMAIL", "NYXOSHI_FOUNDER_3_EMAIL"] as const;

export async function syncRoleForUser(sql: Sql, userId: string) {
  const rows = await sql<{ email: string }>`select email from "user" where id = ${userId} limit 1`;
  const email = rows[0]?.email?.trim().toLowerCase();
  if (!email) return getRole(sql, userId);

  let founderNumber: number | null = null;
  for (let i = 0; i < founderEnvKeys.length; i += 1) {
    const configured = process.env[founderEnvKeys[i]]?.trim().toLowerCase();
    if (configured && configured === email) founderNumber = i + 1;
  }

  if (founderNumber) {
    await sql`
      insert into user_roles (user_id, role, founder_number)
      values (${userId}, 'founder', ${founderNumber})
      on conflict (user_id) do update set role='founder', founder_number=${founderNumber}, updated_at=now()
    `;
  } else {
    await sql`
      insert into user_roles (user_id, role)
      values (${userId}, 'user')
      on conflict (user_id) do nothing
    `;
  }
  return getRole(sql, userId);
}

export async function getRole(sql: Sql, userId: string) {
  const rows = await sql<{ role: NyxoshiRole; founder_number: number | null; muted_until: string | null; shadow_banned: boolean; banned_until: string | null }>`
    select role, founder_number, muted_until::text as muted_until, shadow_banned, banned_until::text as banned_until
    from user_roles where user_id = ${userId} limit 1
  `;
  return rows[0] ?? { role: "user" as const, founder_number: null, muted_until: null, shadow_banned: false, banned_until: null };
}

export async function requireRole(userId: string, minimum: NyxoshiRole) {
  const sql = await getSql();
  const current = await syncRoleForUser(sql, userId);
  const currentIndex = ROLE_ORDER.indexOf(current.role);
  const minimumIndex = ROLE_ORDER.indexOf(minimum);
  if (currentIndex < minimumIndex) throw new Error("Você não tem permissão para esta ação.");
  if (current.banned_until && new Date(current.banned_until).getTime() > Date.now()) {
    throw new Error("Esta conta está temporariamente suspensa.");
  }
  return { sql, role: current };
}

export async function requireFounder(userId: string) {
  const result = await requireRole(userId, "founder");
  if (result.role.role !== "founder") throw new Error("Apenas fundadores podem acessar esta área.");
  return result;
}

export async function requireFounder1(userId: string) {
  const sql = await getSql();
  const rows = await sql<{email:string}>`select email from "user" where id=${userId} limit 1`;
  const email = rows[0]?.email?.trim().toLowerCase();
  const founder1 = process.env.NYXOSHI_FOUNDER_1_EMAIL?.trim().toLowerCase();
  if (!email || !founder1 || email !== founder1) throw new Error("Apenas a Fundadora #1 pode acessar esta área confidencial.");
  const role = await syncRoleForUser(sql,userId);
  if (role.role !== "founder" || role.founder_number !== 1) throw new Error("Apenas a Fundadora #1 pode acessar esta área confidencial.");
  return {sql,role};
}
