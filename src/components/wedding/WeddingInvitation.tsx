import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  ArrowUp, CalendarHeart, Check, ChevronDown, CirclePlay, Gift, Heart,
  Hotel, Image as ImageIcon, MapPin, Menu, MessageCircleHeart, Music2,
  Navigation, Pause, Phone, Plane, Play, Quote, Sparkles, Users, X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { wedding, type WeddingEvent } from "@/lib/wedding-data";
import { ScratchReveal } from "./ScratchReveal";





const sections = [
  ["home", "Home"], ["story", "Our story"], ["events", "Celebrations"],
  ["gallery", "Moments"], ["stay", "Guest guide"], ["rsvp", "RSVP"],
] as const;

function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const reduced = useReducedMotion();
  return <motion.div initial={reduced ? false : { opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-70px" }} transition={{ duration: .7, delay }} className={className}>{children}</motion.div>;
}

function Ornament() {
  return <div className="ornament" aria-hidden="true"><span /><Sparkles className="size-4" /><span /></div>;
}

function SectionTitle({ eyebrow, title, copy }: { eyebrow: string; title: string; copy?: string }) {
  return <Reveal className="mx-auto mb-10 max-w-2xl text-center sm:mb-14"><p className="eyebrow">{eyebrow}</p><h2 className="section-title">{title}</h2><Ornament />{copy && <p className="mt-5 text-sm leading-7 text-muted-foreground sm:text-base">{copy}</p>}</Reveal>;
}

function Countdown() {
  const getTime = () => Math.max(0, new Date(wedding.weddingDate).getTime() - Date.now());
  const [remaining, setRemaining] = useState(0);
  useEffect(() => {
    setRemaining(getTime());
    const timer = window.setInterval(() => setRemaining(getTime()), 1000);
    return () => window.clearInterval(timer);
  }, []);
  const units = [
    ["Days", Math.floor(remaining / 86400000)], ["Hours", Math.floor(remaining / 3600000) % 24],
    ["Minutes", Math.floor(remaining / 60000) % 60], ["Seconds", Math.floor(remaining / 1000) % 60],
  ] as const;
  return <div className="grid grid-cols-4 gap-2 sm:gap-3" aria-label="Countdown to the wedding">{units.map(([label, value]) => <div key={label} className="countdown-tile"><strong>{String(value).padStart(2, "0")}</strong><span>{label}</span></div>)}</div>;
}

function Navbar({ musicPlaying, onMusic }: { musicPlaying: boolean; onMusic: () => void }) {
  
  const [open, setOpen] = useState(false);
  return <header className="fixed inset-x-0 top-0 z-50 border-b border-primary-foreground/10 bg-primary/90 text-primary-foreground backdrop-blur-xl">
    <div className="mx-auto grid h-16 max-w-7xl grid-cols-[auto_1fr_auto] items-center px-4 sm:px-6">
      <a href="#home" className="font-display text-xl text-gold-soft" aria-label="Home">{wedding.couple.groom.firstName[0]} <span className="text-sm">&</span> {wedding.couple.bride.firstName[0]}</a>
      <nav className="hidden justify-center gap-6 lg:flex">{sections.map(([id, label]) => <a className="nav-link" href={`#${id}`} key={id}>{label}</a>)}</nav>
      <div className="flex items-center justify-end gap-1">
        <Button variant="ghost" size="icon" onClick={onMusic} className="text-primary-foreground hover:bg-primary-foreground/10 hover:text-gold-soft" aria-label={musicPlaying ? "Pause background music" : "Play background music"}>{musicPlaying ? <Pause /> : <Music2 />}</Button>
        <Button variant="ghost" size="icon" onClick={() => setOpen(!open)} className="text-primary-foreground hover:bg-primary-foreground/10 lg:hidden" aria-label="Open menu">{open ? <X /> : <Menu />}</Button>
      </div>
    </div>
    <AnimatePresence>{open && <motion.nav initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden border-t border-primary-foreground/10 bg-primary lg:hidden"><div className="grid gap-1 p-4">{sections.map(([id, label]) => <a onClick={() => setOpen(false)} className="rounded-sm px-4 py-3 text-sm text-primary-foreground/80 hover:bg-primary-foreground/10" href={`#${id}`} key={id}>{label}</a>)}</div></motion.nav>}</AnimatePresence>
  </header>;
}

function Hero() {
  const reduced = useReducedMotion();
  return <section id="home" className="hero relative min-h-[860px] overflow-hidden sm:min-h-[900px]">
    <img src={wedding.heroImage} width={1200} height={1600} alt={`${wedding.couple.groom.firstName} and ${wedding.couple.bride.firstName}`} className="absolute inset-0 h-full w-full object-cover -mt-30 md:mt-10 object-top-center md:object-[52%_42%]" fetchPriority="high" />
    <div className="hero-overlay absolute inset-0" />
    <div className="hero-frame absolute inset-4 z-[2] sm:inset-7" aria-hidden="true"><span /><span /><span /><span /></div>
    <div className="petals" aria-hidden="true">{[...Array(10)].map((_, i) => <i key={i} style={{ left: `${7 + i * 9}%`, animationDelay: `${i * .6}s`, animationDuration: `${8 + (i % 4)}s` }} />)}</div>
    <motion.div initial={reduced ? false : { opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.1 }} className="relative z-10 mx-auto flex min-h-[860px] max-w-7xl flex-col items-center justify-end px-7 pb-16 pt-28 text-center text-hero sm:min-h-[900px] sm:pb-20">
      <div className="mb-5 grid size-12 rotate-45 place-items-center border border-gold-soft/70"><span className="-rotate-45 text-lg text-gold-soft">ॐ</span></div>
      <p className="eyebrow text-gold-soft">Together with their families</p>
      <h1 className="mt-4 font-display text-6xl font-light leading-[.88] sm:text-8xl md:text-9xl">{wedding.couple.groom.firstName} <span className="my-2 block font-script text-5xl font-normal text-gold-soft sm:text-7xl">&</span> {wedding.couple.bride.firstName}</h1>
      <p className="mt-5 text-xs uppercase tracking-[0.28em] text-hero/80 sm:text-sm">{wedding.displayDate} · {wedding.cityShort}</p>
      <div className="mt-8 w-full max-w-xl"><Countdown /></div>
      <Button asChild size="lg" variant="royal" className="mt-8 h-12 px-8"><a href="#rsvp"><Heart /> Kindly RSVP</a></Button>
      <a href="#reveal" className="mt-7 animate-bounce text-hero/70" aria-label="Scroll to reveal the date"><ChevronDown /></a>
    </motion.div>
  </section>;
}

function CoupleAndStory() {
  return <>
    <section className="section-wrap bg-background" id="couple"><SectionTitle eyebrow="Two hearts, one home" title="Meet the happy couple" />
      <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-[1fr_auto_1fr] md:items-center">
        {[wedding.couple.bride, wedding.couple.groom].map((person, index) => <Reveal key={person.name} delay={index * .12} className={`profile-card ${index ? "md:order-3" : ""}`}><div className="profile-portrait"><img src={index ? wedding.groomImage : wedding.brideImage} alt={person.name} className={`h-full w-full object-cover ${index ? "object-[31%_25%]" : "object-[67%_25%]"}`} loading="lazy" /></div><p className="eyebrow mt-6">{index ? "The groom" : "The bride"}</p><h3 className="mt-2 font-display text-3xl">{person.name}</h3><p className="mt-3 text-sm leading-6 text-muted-foreground">{person.intro}</p><p className="mt-4 text-xs font-semibold uppercase tracking-[0.16em] text-primary">{person.parents}</p></Reveal>)}
        <div className="hidden h-52 w-px bg-border md:block" />
      </div>
    </section>
    <section id="story" className="section-wrap bg-blush"><SectionTitle eyebrow="Written in the stars" title="Our story" copy="Some stories begin with a grand gesture. Ours began with a charging cable and a delayed flight." />
      <div className="mx-auto max-w-4xl"><div className="story-line">{wedding.story.map((item, index) => <Reveal key={item.year} delay={index * .08} className="story-item"><span className="story-dot" /><p className="eyebrow">{item.year}</p><h3 className="mt-2 font-display text-2xl">{item.title}</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">{item.text}</p></Reveal>)}</div></div>
    </section>
  </>;
}

function DateReveal() {
  return <section id="reveal" className="section-wrap mandala-bg bg-cream"><div className="invitation-frame mx-auto max-w-5xl px-5 py-12 sm:px-12 sm:py-16"><SectionTitle eyebrow="A little secret" title="The date is waiting" copy="A tiny gesture before the grand celebration—scratch the card with your finger or mouse." /><Reveal><ScratchReveal date={wedding.displayDate} /></Reveal><Reveal className="mx-auto mt-10 max-w-xl text-center"><CalendarHeart className="mx-auto size-7 text-primary" /><h3 className="mt-4 font-display text-4xl">Save the date</h3><p className="mt-3 text-muted-foreground">We would be honoured to have you by our side as we begin forever.</p></Reveal></div></section>;
}

function EventCard({ event, active, onClick }: { event: WeddingEvent; active: boolean; onClick: () => void }) {
  return <button onClick={onClick} className={`py-0 sm:py-2 event-tab ${active ? "event-tab-active" : ""}`} aria-pressed={active}><span className="text-[10px] uppercase tracking-[.2em]">{event.date.split(" ").slice(0, 2).map((part, i) => i ? part.slice(0, 3) : part).join(" ")}</span><strong>{event.shortName}</strong></button>;
}



function Events() {
  const [selectedId, setSelectedId] = useState<string>(wedding.events[0]?.id ?? "");
  const selected = wedding.events.find(event => event.id === selectedId);
  if (!selected) return null;
  return <section id="events" className="section-wrap bg-background"><SectionTitle eyebrow={`${wedding.events.length} celebrations`} title="Wedding functions" copy="Come for one moment or stay for every one. Select a celebration to see all the details." />
    <div className="mx-auto max-w-6xl"><div className="scrollbar-hide flex gap-2 overflow-x-auto pb-4">{wedding.events.map(event => <EventCard key={event.id} event={event} active={selected.id === event.id} onClick={() => setSelectedId(event.id)} />)}</div>
      <AnimatePresence mode="wait"><motion.article key={selected.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="event-detail">
        <div className="relative min-h-64 overflow-hidden bg-primary">{selected.image ? <img src={selected.image} alt={`${selected.name} celebration`} className="absolute inset-0 h-full w-full object-cover" loading="lazy" /> : <div className="event-pattern absolute inset-0" />}<div className="absolute inset-0 bg-primary/35" /><div className="relative flex min-h-64 items-end p-7 text-primary-foreground"><div><p className="eyebrow text-gold-soft">{selected.day} · {selected.time}</p><h3 className="mt-2 font-display text-4xl sm:text-5xl">{selected.name}</h3></div></div></div>
        <div className="p-6 sm:p-8"><p className="leading-7 text-muted-foreground">{selected.description}</p><div className="mt-7 grid gap-5 border-y border-border py-6 sm:grid-cols-3"><Detail icon={<CalendarHeart />} label="Date & time" value={`${selected.date}, ${selected.time}`} /><Detail icon={<MapPin />} label="Venue" value={selected.venue} /><Detail icon={<Sparkles />} label="Dress code" value={selected.dressCode} /></div><Button asChild variant="outline" className="mt-6 rounded-none border-primary text-primary hover:bg-primary hover:text-primary-foreground"><a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(selected.address)}`} target="_blank" rel="noreferrer"><Navigation /> Get directions</a></Button></div>
      </motion.article></AnimatePresence>
    </div>
  </section>;
}

function Detail({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) { return <div className="flex gap-3 [&_svg]:mt-0.5 [&_svg]:size-4 [&_svg]:shrink-0 [&_svg]:text-gold"><div>{icon}</div><div><p className="text-[10px] uppercase tracking-[.18em] text-muted-foreground">{label}</p><p className="mt-1 text-sm font-semibold">{value}</p></div></div>; }

function Families() {
  return <section id="family" className="section-wrap bg-primary text-primary-foreground"><SectionTitle eyebrow="With joyful hearts" title="Our families" copy="Two families, many traditions, and a whole lot of love come together." /><div className="mx-auto grid max-w-5xl gap-px bg-gold/25 md:grid-cols-2">{([wedding.families.bride, wedding.families.groom] as const).map((family, index) => <Reveal key={index} className="bg-primary p-8 text-center sm:p-12"><Users className="mx-auto size-7 text-gold-soft" /><p className="eyebrow mt-5 text-gold-soft">{index ? wedding.familyNames.groom : wedding.familyNames.bride}</p><div className="mt-7 space-y-4">{family.map(member => <p key={member} className="font-display text-xl">{member}</p>)}</div></Reveal>)}</div></section>;
}

function Gallery() {
  const [active, setActive] = useState<string | null>(null);
  return <section id="gallery" className="section-wrap bg-cream"><SectionTitle eyebrow="A few favourite frames" title="Moments we treasure" />
    <div className="mx-auto grid max-w-6xl auto-rows-[170px] grid-cols-2 gap-2 sm:auto-rows-[230px] md:grid-cols-3">{wedding.gallery.map((image, index) => <motion.button whileHover={{ scale: .985 }} onClick={() => setActive(image)} key={`${image}-${index}`} className={`gallery-item ${index === 0 || index === 3 ? "row-span-2" : ""}`} aria-label={`Open memory ${index + 1}`}><img src={image} alt={`Wedding memory ${index + 1}`} width={1200} height={index === 0 ? 1600 : 900} loading="lazy" className="h-full w-full object-cover" /><span><ImageIcon /></span></motion.button>)}</div>
    <AnimatePresence>{active && <motion.div className="lightbox" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setActive(null)} role="dialog" aria-modal="true" aria-label="Photo preview"><Button variant="ghost" size="icon" onClick={() => setActive(null)} className="absolute right-4 top-4 z-10 text-primary-foreground hover:bg-primary-foreground/10"><X /></Button><motion.img initial={{ scale: .94 }} animate={{ scale: 1 }} src={active} alt="Enlarged wedding memory" onClick={event => event.stopPropagation()} /></motion.div>}</AnimatePresence>
    
<Reveal className="mx-auto mt-16 max-w-5xl">
  <div id="video" className="border border-gold/30 bg-background p-4 shadow-xl sm:p-8">

    <div className="mb-7 text-center">
      <p className="eyebrow">Our beautiful journey</p>

      <h3 className="mt-3 font-display text-4xl sm:text-5xl">
        {wedding.video.title}
      </h3>

      <Ornament />

      <p className="mt-4 text-sm text-muted-foreground">
        {wedding.video.description}
      </p>
    </div>

    <div className="overflow-hidden rounded-2xl border border-gold/20 bg-black">
      <video
        controls
        playsInline
        preload="metadata"
        poster={wedding.video.poster}
        className="aspect-video w-full  object-contain"
      >
        <source
          src={wedding.video.src}
          type="video/mp4"
        />
        Your browser does not support video playback.
      </video>
    </div>

    <p className="mt-6 text-center font-script text-3xl text-primary">
      {wedding.couple.groom.firstName} &amp; {wedding.couple.bride.firstName}
    </p>

    <p className="mt-2 text-center text-xs uppercase tracking-[0.2em] text-muted-foreground">
      Forever Begins Here · {wedding.video.shortDate}
    </p>

  </div>
</Reveal>

  </section>;
}



function GuestGuide() {
  const icons = [Hotel, Plane, Navigation, Sparkles];
  return <section id="stay" className="section-wrap bg-background"><SectionTitle eyebrow="Come away with us" title="Guest guide" copy="Everything you need for a comfortable, effortless celebration." /><div className="mx-auto grid max-w-6xl gap-4 sm:grid-cols-2 lg:grid-cols-4">{wedding.stay.map((item, index) => { const Icon = icons[index] ?? Sparkles; return <Reveal key={item.title} delay={index * .08} className="info-card"><Icon className="size-6 text-primary" /><h3 className="mt-5 font-display text-2xl">{item.title}</h3><p className="mt-3 text-sm leading-6 text-muted-foreground">{item.text}</p></Reveal>; })}</div>
    <Reveal className="mx-auto mt-12 grid max-w-6xl overflow-hidden border border-border bg-cream lg:grid-cols-[.8fr_1.2fr]"><div className="p-7 sm:p-10"><p className="eyebrow">The wedding venue</p><h3 className="mt-3 font-display text-4xl">{wedding.venue.name}</h3><p className="mt-4 text-sm leading-7 text-muted-foreground">{wedding.venue.address}<br />{wedding.venue.note}<br />Contact: {wedding.contact.phones.join(" · ")}</p><Button asChild className="mt-7 rounded-none"><a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(wedding.venue.name + " " + wedding.venue.address)}`} target="_blank" rel="noreferrer"><MapPin /> Open in Maps</a></Button></div><iframe title={`Map of ${wedding.venue.name}`} src={`https://www.google.com/maps?q=${encodeURIComponent(wedding.venue.name + " " + wedding.venue.address)}&output=embed`} className="min-h-full w-full border-0" loading="lazy" referrerPolicy="no-referrer-when-downgrade" /></Reveal>
  </section>;
}





function RSVP() {
  const [selected, setSelected] = useState<string[]>(["wedding"]);
  const [submitted, setSubmitted] = useState(false);
  const toggle = (id: string) => setSelected(current => current.includes(id) ? current.filter(item => item !== id) : [...current, id]);
  // if (submitted) return <section id="rsvp" className="section-wrap bg-primary text-primary-foreground"><motion.div initial={{ opacity: 0, scale: .9 }} animate={{ opacity: 1, scale: 1 }} className="mx-auto max-w-xl text-center"><span className="mx-auto grid size-16 place-items-center rounded-full border border-gold text-gold-soft"><Check className="size-8" /></span><p className="eyebrow mt-7 text-gold-soft">Shukriya</p><h2 className="mt-3 font-display text-5xl">We can’t wait to celebrate!</h2><p className="mt-5 leading-7 text-primary-foreground/70">Your RSVP has been received for this invitation preview. See you soon!</p><Button variant="outline" onClick={() => setSubmitted(false)} className="mt-8 rounded-none border-gold bg-transparent text-gold-soft hover:bg-gold hover:text-primary">Edit response</Button></motion.div></section>;
  // return <section id="rsvp" className="section-wrap bg-primary text-primary-foreground"><SectionTitle eyebrow="Be part of our story" title="Which functions are you attending?" copy={`Kindly respond by ${wedding.rsvpBy}. Select every celebration you’ll join.`} /><form onSubmit={(event) => { event.preventDefault(); if (selected.length) setSubmitted(true); }} className="mx-auto max-w-3xl space-y-7">
  //   <div className="grid gap-4 sm:grid-cols-2"><label className="form-field"><span>Your name</span><Input required name="name" placeholder="Full name" /></label><label className="form-field"><span>Mobile number</span><Input required name="mobile" type="tel" placeholder="+91 98765 43210" /></label><label className="form-field"><span>Number of guests</span><Input required name="guests" type="number" min="1" max="8" defaultValue="1" /></label><label className="form-field"><span>Meal preference</span><select name="meal" required className="h-11 w-full rounded-sm border border-primary-foreground/20 bg-primary px-3 text-sm"><option value="vegetarian">Vegetarian</option><option value="non-vegetarian">Non-vegetarian</option><option value="other">Other / Dietary request</option></select></label></div>
  //   <fieldset><legend className="mb-3 text-xs uppercase tracking-[.18em] text-primary-foreground/70">Choose your celebrations</legend><div className="grid grid-cols-2 gap-2 sm:grid-cols-4">{wedding.events.map(event => { const checked = selected.includes(event.id); return <label key={event.id} className={`rsvp-event ${checked ? "rsvp-event-active" : ""}`}><input type="checkbox" className="sr-only" checked={checked} onChange={() => toggle(event.id)} /><span className="grid size-5 place-items-center rounded-full border border-current">{checked && <Check className="size-3" />}</span><span>{event.shortName}</span></label>; })}</div></fieldset>
  //   <label className="form-field"><span>A note for the couple</span><Textarea name="message" rows={4} placeholder="Share a wish, song request, or anything we should know…" /></label>
  //   <Button type="submit" size="lg" className="h-12 w-full rounded-none bg-gold text-primary hover:bg-gold-soft"><Heart /> Send my RSVP</Button>
  // </form></section>;
}

function WishesAndGift() {
  const [wishes, setWishes] = useState<Array<{ name: string; text: string }>>([...wedding.wishes]);
  const [name, setName] = useState(""); const [message, setMessage] = useState("");
  // return <><section id="wishes" className="section-wrap bg-blush"><SectionTitle eyebrow="From the heart" title="Blessings & wishes" />
  //   <div className="mx-auto grid max-w-6xl gap-5 md:grid-cols-3">{wishes.map((wish, index) => <Reveal key={`${wish.name}-${index}`} delay={index * .08} className="wish-card"><Quote className="size-7 text-gold" /><p className="mt-5 font-display text-xl leading-8">“{wish.text}”</p><p className="mt-5 text-xs font-bold uppercase tracking-[.16em] text-primary">— {wish.name}</p></Reveal>)}</div>
  //   <form onSubmit={event => { event.preventDefault(); if (name.trim() && message.trim()) { setWishes(current => [...current, { name, text: message }]); setName(""); setMessage(""); } }} className="mx-auto mt-8 grid max-w-3xl gap-3 border border-border bg-background p-5 sm:grid-cols-[.4fr_1fr_auto] sm:p-6"><Input aria-label="Your name" value={name} onChange={event => setName(event.target.value)} placeholder="Your name" required /><Input aria-label="Your blessing" value={message} onChange={event => setMessage(event.target.value)} placeholder="Write a blessing…" required /><Button type="submit" className="rounded-none"><MessageCircleHeart /> Send</Button></form>
  // </section>{wedding.gift.enabled && <section className="section-wrap bg-cream"><Reveal className="mx-auto grid max-w-5xl items-center gap-8 border-y border-gold/40 py-10 text-center md:grid-cols-[auto_1fr]"><div className="mx-auto grid size-32 place-items-center border border-primary bg-background"><div className="qr-pattern grid size-24 place-items-center"><Gift className="size-8 text-primary" /></div></div><div className="md:text-left"><p className="eyebrow">Your presence is our gift</p><h2 className="mt-3 font-display text-4xl">Blessings, not boxes</h2><p className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground">{wedding.gift.note}</p><p className="mt-4 font-mono text-sm text-primary">UPI · {wedding.gift.upiId}</p></div></Reveal></section>}</>;
}

function Finale() {
  return <footer className="relative overflow-hidden bg-primary px-6 py-24 text-center text-primary-foreground sm:py-32"><div className="finale-mandala" aria-hidden="true" /><div className="absolute inset-5 border border-gold/30" aria-hidden="true" /><Reveal className="relative mx-auto max-w-3xl"><p className="font-script text-4xl text-gold-soft">With love and blessings</p><h2 className="mt-4 font-display text-6xl font-light sm:text-8xl">Join us</h2><Ornament /><p className="mx-auto mt-6 max-w-2xl font-display text-xl leading-9 text-primary-foreground/80">As we take our seven sacred vows, your presence will make every moment more meaningful and every memory more complete.</p><p className="mt-8 text-xs uppercase tracking-[.25em] text-gold-soft">{wedding.couple.groom.firstName} & {wedding.couple.bride.firstName} · {wedding.shortDate}</p><p className="mt-12 text-[10px] uppercase tracking-[.2em] text-primary-foreground/40">Made with love · {wedding.hashtag}</p></Reveal></footer>;
}

function FloatingActions() {
  return <div className="fixed bottom-4 right-3 z-40 flex flex-col gap-2 sm:bottom-6 sm:right-6">{[
    { href: `https://wa.me/${wedding.contact.whatsapp}?text=${encodeURIComponent(`We’re delighted to celebrate ${wedding.couple.groom.firstName} & ${wedding.couple.bride.firstName}!`)}`, label: "WhatsApp RSVP", icon: MessageCircleHeart },
    { href: `tel:${wedding.contact.phone}`, label: "Call the family", icon: Phone },
    { href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(wedding.venue.name + " " + wedding.venue.address)}`, label: "Wedding location", icon: MapPin },
    { href: "#home", label: "Back to top", icon: ArrowUp },
  ].map(({ href, label, icon: Icon }) => <a key={label} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className="floating-action group" aria-label={label}><Icon /><span className="text-white rounded-4xl">{label}</span></a>)}</div>;
}

export function WeddingInvitation() {
  const audioRef = useRef<HTMLAudioElement>(null); const [musicPlaying, setMusicPlaying] = useState(false);
  const toggleMusic = async () => { const audio = audioRef.current; if (!audio) return; if (audio.paused) { await audio.play(); setMusicPlaying(true); } else { audio.pause(); setMusicPlaying(false); } };
  const eventJson = useMemo(() => wedding.events.map(event => ({ "@type": "Event", name: event.name, startDate: `${event.date} ${event.time}`, location: { "@type": "Place", name: event.venue, address: event.address } })), []);
  return <main className="overflow-x-hidden"><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(eventJson) }} /><audio ref={audioRef} src="/wedding-ambience.mp3" loop onEnded={() => setMusicPlaying(false)} /><Navbar musicPlaying={musicPlaying} onMusic={toggleMusic} /><Hero /><DateReveal /><CoupleAndStory /><Events /><Families /><Gallery /><GuestGuide /><RSVP /><WishesAndGift /><Finale /><FloatingActions /></main>;
}