import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { SignedShell } from "@/components/signed-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { updateMyProfile, getMyPreferences, updateMyPreferences } from "@/lib/nyxoshi/server";
import { useMe } from "@/hooks/use-me";
import { signOut } from "@/lib/auth/client";

export const Route = createFileRoute("/settings")({ component: SettingsPage });

function SettingsPage() {
  return <SignedShell><SettingsInner /></SignedShell>;
}

function SettingsInner() {
  const { me } = useMe();
  const queryClient = useQueryClient();
  const [displayName,setDisplayName]=useState("");
  const [username,setUsername]=useState("");
  const [bio,setBio]=useState("");
  const [image,setImage]=useState("");
  const [bannerUrl,setBannerUrl]=useState("");
  const [profileGifUrl,setProfileGifUrl]=useState("");
  const [websiteUrl,setWebsiteUrl]=useState("");
  const [busy,setBusy]=useState(false);
  const [prefs,setPrefs]=useState({likes:true,comments:true,follows:true,messages:true,reposts:true,mentions:true,quotes:true,reactions:true,discoverable:true,message_policy:"requests",mention_policy:"everyone"});
  useEffect(()=>{if(!me)return; void getMyPreferences().then(v=>setPrefs({...v.notifications,...v.privacy}));setDisplayName(me.displayName);setUsername(me.username);setBio(me.bio);setImage(me.image??"");setBannerUrl(me.bannerUrl??"");setProfileGifUrl(me.profileGifUrl??"");setWebsiteUrl(me.websiteUrl??"");},[me]);
  if(!me)return null;
  async function save(e:React.FormEvent){e.preventDefault();setBusy(true);try{const updated=await updateMyProfile({data:{displayName,username,bio,image,bannerUrl,profileGifUrl,websiteUrl}});await updateMyPreferences({data:{notifications:{likes:prefs.likes,comments:prefs.comments,follows:prefs.follows,messages:prefs.messages,reposts:prefs.reposts,mentions:prefs.mentions,quotes:prefs.quotes,reactions:prefs.reactions},privacy:{discoverable:prefs.discoverable,message_policy:prefs.message_policy,mention_policy:prefs.mention_policy}}});await queryClient.invalidateQueries({queryKey:["me"]});toast.success("Perfil atualizado.");}catch(err){toast.error(err instanceof Error?err.message:"Não foi possível salvar.");}finally{setBusy(false);}}
  async function logout(){try{await signOut("/");}catch(err){toast.error(err instanceof Error?err.message:"Não foi possível sair.");}}
  return <div>
    <header className="sticky top-0 z-20 border-b border-border bg-bg/85 px-4 py-3 backdrop-blur-sm"><h1 className="font-display text-xl tracking-tight">Configurações</h1></header>
    <form onSubmit={(e)=>void save(e)} className="space-y-8 px-4 py-6">
      <section><h2 className="font-display text-lg">Perfil</h2><p className="mt-1 text-sm text-muted">Personalize como as pessoas verão você.</p><div className="mt-4 space-y-4">
        <Field label="Nome"><Input value={displayName} onChange={e=>setDisplayName(e.target.value)} maxLength={40} required/></Field>
        <Field label="Usuário"><div className="relative"><span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted">@</span><Input value={username} onChange={e=>setUsername(e.target.value.toLowerCase())} className="pl-7" maxLength={20} required/></div></Field>
        <Field label="Bio"><Textarea value={bio} onChange={e=>setBio(e.target.value.slice(0,160))} maxLength={160} placeholder="Uma linha sobre você"/></Field>
      </div></section>
      <section><h2 className="font-display text-lg">Personalização visual</h2><p className="mt-1 text-sm text-muted">Use URLs públicas de imagem/GIF nesta primeira beta. O armazenamento próprio pode ser conectado depois.</p><div className="mt-4 space-y-4">
        <Field label="Foto de perfil (URL)"><Input value={image} onChange={e=>setImage(e.target.value)} type="url" placeholder="https://..."/></Field>
        <Field label="Banner (URL)"><Input value={bannerUrl} onChange={e=>setBannerUrl(e.target.value)} type="url" placeholder="https://..."/></Field>
        <Field label="GIF do perfil (URL)"><Input value={profileGifUrl} onChange={e=>setProfileGifUrl(e.target.value)} type="url" placeholder="https://...gif"/></Field>
        <Field label="Site/link"><Input value={websiteUrl} onChange={e=>setWebsiteUrl(e.target.value)} type="url" placeholder="https://..."/></Field>
      </div></section>
      <section><h2 className="font-display text-lg">Privacidade, notificações e segurança</h2><div className="mt-4 space-y-3 text-sm"><Link className="block rounded-xl border border-border p-3 hover:bg-secondary" to="/messages">Mensagens e solicitações →</Link><div className="grid gap-2 sm:grid-cols-2">{(["likes","comments","follows","messages","reposts","mentions","quotes","reactions"] as const).map(k=><label key={k} className="flex items-center justify-between rounded-xl border border-border p-3"><span>{k}</span><input type="checkbox" checked={Boolean(prefs[k])} onChange={e=>setPrefs(v=>({...v,[k]:e.target.checked}))}/></label>)}</div><label className="flex items-center justify-between rounded-xl border border-border p-3"><span>Permitir descoberta do perfil</span><input type="checkbox" checked={prefs.discoverable} onChange={e=>setPrefs(v=>({...v,discoverable:e.target.checked}))}/></label><p className="text-xs text-muted">Bloqueios, silenciamentos e restrições também podem ser controlados diretamente no perfil de cada pessoa.</p></div></section>
      <section className="rounded-2xl border border-border p-4"><p className="text-sm font-medium">Seu cargo</p><p className="mt-1 text-sm text-muted">{me.role === "founder" ? `Fundadora${me.founderNumber ? ` #${me.founderNumber}` : ""}` : me.role.replaceAll("_"," ")}</p>{me.role === "founder"?<Link to="/founders" className="mt-3 inline-block text-sm text-fuchsia-300">Abrir painel dos fundadores →</Link>:null}</section>
      <div className="flex flex-col gap-3 sm:flex-row"><Button type="submit" disabled={busy}>{busy?"Salvando…":"Salvar alterações"}</Button><Button type="button" variant="outline" onClick={()=>void logout()}>Sair da conta</Button></div>
    </form>
  </div>;
}
function Field({label,children}:{label:string;children:React.ReactNode}){return <div className="space-y-1.5"><Label>{label}</Label>{children}</div>}
