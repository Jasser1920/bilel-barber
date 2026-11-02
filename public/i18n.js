// Translations for the site: French (default), English, Arabic (right-to-left).
(function () {
  const LANGS = {
    fr: { label: "FR", locale: "fr-FR", dir: "ltr" },
    en: { label: "EN", locale: "en-GB", dir: "ltr" },
    ar: { label: "عربي", locale: "ar-TN-u-nu-latn", dir: "rtl" },
  };
  const DEFAULT = "fr";

  const T = {
    fr: {
      "meta.title": "Bilel Hedhli — Barbier",
      "meta.desc": "Réservez votre coupe ou votre barbe chez Bilel Hedhli en ligne. Tél. 54 182 077.",
      "nav.services": "Services", "nav.gallery": "Galerie", "nav.book": "Réserver", "nav.instagram": "Instagram", "nav.lang": "Langue",
      "hero.eyebrow": "Hedhli · Barbier", "hero.cta": "Prendre rendez-vous",
      "intro.eyebrow": "Le fauteuil",
      "intro.lead": "Des lignes nettes, des dégradés précis et un rasage soigné. Installez-vous.",
      "hours": "Ouvert {open} – {close}",
      "split.cut": "La coupe", "split.cutSub": "Ciseaux & tondeuse",
      "split.beard": "La barbe", "split.beardSub": "Finition serviette chaude",
      "services.title": "Services", "services.sub": "Sur rendez-vous", "services.more": "Réserver →",
      "svc.haircut": "Coupe", "svc.beard": "Barbe", "svc.combo": "Coupe + Barbe",
      "gal.fade": "Dégradé", "gal.lines": "Contours", "gal.shave": "Rasage", "gal.detail": "Détails", "gal.shop": "Le salon",
      "band.eyebrow": "Repartez impeccable", "band.title": "Votre fauteuil<br>vous attend", "band.cta": "Réserver",
      "contact.call": "Appeler le <span dir=\"ltr\">54 182 077</span>", "contact.ig": "Instagram @bilel_hedhli24",
      "book.title": "Réserver", "step.day": "Jour", "step.time": "Heure", "step.details": "Vos coordonnées",
      "form.name": "Nom", "form.namePh": "Votre nom", "form.phone": "Téléphone", "form.phonePh": "Pour que Bilel puisse vous joindre",
      "form.confirm": "Confirmer", "summary.empty": "Choisissez un jour et une heure.",
      "day.today": "Auj.", "day.closed": "Fermé",
      "slots.loading": "Chargement des horaires…", "slots.pickDay": "Choisissez d'abord un jour.",
      "slots.closed": "Bilel est fermé le {date}. Choisissez un autre jour.", "slots.none": "Plus de créneaux ce jour-là. Essayez demain.",
      "slots.taken": "Déjà réservé",
      "done.eyebrow": "C'est réservé",
      "done.text": "À bientôt, {name}. Bilel vous appellera au {phone} en cas de changement. Pour modifier, appelez le \u206654 182 077\u2069.",
      "done.again": "Nouvelle réservation",
      "footer.login": "Espace barbier",
      "err.missing_details": "Merci d'indiquer votre nom et votre téléphone.",
      "err.taken": "Ce créneau vient d'être pris. Choisissez-en un autre.",
      "err.closed": "Le salon est fermé ce jour-là. Choisissez une autre date.",
      "err.outside_hours": "Cet horaire est en dehors des heures d'ouverture.",
      "err.bad_date": "Choisissez une date valide.",
      "err.wrong_password": "Mot de passe incorrect.", "err.auth": "Veuillez vous reconnecter.",
      "err.bad_time": "Les heures doivent ressembler à 15:00.", "err.bad_slot": "Durée invalide.",
      "err.no_slots": "Ces horaires ne laissent pas de place pour un rendez-vous.", "err.not_found": "Rendez-vous introuvable.",
      "err.generic": "Une erreur est survenue. Réessayez.",

      "a.title": "Bilel Hedhli · Admin", "a.admin": "Admin", "a.viewSite": "Voir le site", "a.logout": "Se déconnecter",
      "a.login": "Espace barbier", "a.password": "Mot de passe", "a.signin": "Se connecter",
      "a.tab.schedule": "Planning", "a.tab.calendar": "Calendrier", "a.tab.hours": "Horaires",
      "a.today": "Aujourd'hui", "a.prevDay": "Jour précédent", "a.nextDay": "Jour suivant", "a.prevMonth": "Mois précédent", "a.nextMonth": "Mois suivant",
      "a.c.total": "au total", "a.c.waiting": "en attente", "a.c.delayed": "en retard", "a.c.done": "terminés",
      "a.closedNote": "Ce jour est fermé. Les clients ne peuvent pas réserver.", "a.noAppts": "Aucun rendez-vous ce jour-là.",
      "a.done": "Terminé", "a.undo": "Rétablir", "a.delay": "Retarder", "a.changeDelay": "Modifier le retard", "a.onTime": "À l'heure",
      "a.delete": "Supprimer", "a.confirmDelete": "Appuyez encore pour supprimer", "a.cancel": "Annuler",
      "a.pill.booked": "En attente", "a.pill.delayed": "En retard", "a.pill.done": "Terminé",
      "a.cal.closed": "Fermé", "a.cal.booked": "{n} rés.", "a.cal.hint": "Touchez un jour pour le fermer ou l'ouvrir.",
      "a.seeSchedule": "Voir le planning", "a.openDay": "Ouvrir ce jour", "a.closeDay": "Fermer toute la journée",
      "a.weekly": "{date} est fermé car vous fermez chaque {weekday}. Modifiable dans Horaires.",
      "a.dayClosed": "{date} est fermé.", "a.dayOpen": "{date} est ouvert.",
      "a.dayOpenN": "{date} est ouvert avec {n} réservation(s). Si vous le fermez, elles restent : pensez à appeler ces clients.",
      "a.h.title": "Horaires de réservation", "a.h.from": "Les clients peuvent réserver à partir de", "a.h.to": "Le dernier rendez-vous se termine à",
      "a.h.length": "Durée d'un rendez-vous", "a.h.min": "{n} minutes", "a.h.hour": "1 heure", "a.h.weekly": "Fermé chaque semaine le",
      "a.h.preview": "Les clients peuvent réserver de {open} à {close}{overnight} : {n} rendez-vous par jour, le dernier commence à {last}.",
      "a.h.overnight": " (après minuit)", "a.h.save": "Enregistrer", "a.h.saved": "Enregistré. Le site utilise maintenant les nouveaux horaires.",
    },

    en: {
      "meta.title": "Bilel Hedhli — Barber",
      "meta.desc": "Book your haircut or beard trim with Bilel Hedhli online. Call 54 182 077.",
      "nav.services": "Services", "nav.gallery": "Gallery", "nav.book": "Book", "nav.instagram": "Instagram", "nav.lang": "Language",
      "hero.eyebrow": "Hedhli · Barber", "hero.cta": "Book an appointment",
      "intro.eyebrow": "The chair",
      "intro.lead": "Clean lines, sharp fades and a proper shave. Take a seat.",
      "hours": "Open {open} – {close}",
      "split.cut": "The cut", "split.cutSub": "Scissors & clippers",
      "split.beard": "The beard", "split.beardSub": "Hot towel finish",
      "services.title": "Services", "services.sub": "By appointment", "services.more": "Book →",
      "svc.haircut": "Haircut", "svc.beard": "Beard trim", "svc.combo": "Haircut + Beard",
      "gal.fade": "Fade", "gal.lines": "Lines", "gal.shave": "Shave", "gal.detail": "Detail", "gal.shop": "The shop",
      "band.eyebrow": "Walk out looking sharp", "band.title": "Your chair<br>is waiting", "band.cta": "Book now",
      "contact.call": "Call <span dir=\"ltr\">54 182 077</span>", "contact.ig": "Instagram @bilel_hedhli24",
      "book.title": "Book", "step.day": "Day", "step.time": "Time", "step.details": "Your details",
      "form.name": "Name", "form.namePh": "Your name", "form.phone": "Phone", "form.phonePh": "So Bilel can reach you",
      "form.confirm": "Confirm booking", "summary.empty": "Pick a day and a time.",
      "day.today": "Today", "day.closed": "Closed",
      "slots.loading": "Loading times…", "slots.pickDay": "Pick a day first.",
      "slots.closed": "Bilel is closed on {date}. Pick another day.", "slots.none": "No times left on this day. Try tomorrow.",
      "slots.taken": "Already booked",
      "done.eyebrow": "You're booked",
      "done.text": "See you then, {name}. Bilel will call {phone} if anything changes. To change it, call \u206654 182 077\u2069.",
      "done.again": "Book another",
      "footer.login": "Barber login",
      "err.missing_details": "Please enter your name and phone number.",
      "err.taken": "Someone just took that time. Pick another one.",
      "err.closed": "The shop is closed that day. Pick another date.",
      "err.outside_hours": "That time is outside opening hours.",
      "err.bad_date": "Pick a valid date.",
      "err.wrong_password": "Wrong password.", "err.auth": "Please log in again.",
      "err.bad_time": "Times must look like 15:00.", "err.bad_slot": "Invalid appointment length.",
      "err.no_slots": "Those hours leave no time for a single appointment.", "err.not_found": "Booking not found.",
      "err.generic": "Something went wrong. Please try again.",

      "a.title": "Bilel Hedhli · Admin", "a.admin": "Admin", "a.viewSite": "View site", "a.logout": "Log out",
      "a.login": "Barber login", "a.password": "Password", "a.signin": "Log in",
      "a.tab.schedule": "Schedule", "a.tab.calendar": "Calendar", "a.tab.hours": "Booking hours",
      "a.today": "Today", "a.prevDay": "Previous day", "a.nextDay": "Next day", "a.prevMonth": "Previous month", "a.nextMonth": "Next month",
      "a.c.total": "total", "a.c.waiting": "waiting", "a.c.delayed": "delayed", "a.c.done": "done",
      "a.closedNote": "This day is closed. Customers cannot book it.", "a.noAppts": "No appointments on this day.",
      "a.done": "Done", "a.undo": "Undo", "a.delay": "Delay", "a.changeDelay": "Change delay", "a.onTime": "On time",
      "a.delete": "Delete", "a.confirmDelete": "Tap again to delete", "a.cancel": "Cancel",
      "a.pill.booked": "Waiting", "a.pill.delayed": "Delayed", "a.pill.done": "Done",
      "a.cal.closed": "Closed", "a.cal.booked": "{n} booked", "a.cal.hint": "Tap a day to close it or open it.",
      "a.seeSchedule": "See schedule", "a.openDay": "Open this day", "a.closeDay": "Close this whole day",
      "a.weekly": "{date} is closed because you close every {weekday}. Change that in Booking hours.",
      "a.dayClosed": "{date} is closed.", "a.dayOpen": "{date} is open.",
      "a.dayOpenN": "{date} is open with {n} booking(s). Closing it keeps those bookings, so call those customers.",
      "a.h.title": "Booking hours", "a.h.from": "Customers can book from", "a.h.to": "Last appointment ends at",
      "a.h.length": "Each appointment lasts", "a.h.min": "{n} minutes", "a.h.hour": "1 hour", "a.h.weekly": "Closed every week on",
      "a.h.preview": "Customers can book from {open} to {close}{overnight}: {n} appointments a day, last one starts at {last}.",
      "a.h.overnight": " (after midnight)", "a.h.save": "Save hours", "a.h.saved": "Saved. The booking page uses the new hours now.",
    },

    ar: {
      "meta.title": "بلال الهذلي — حلاق",
      "meta.desc": "احجز موعد قصّ الشعر أو تهذيب اللحية عند بلال الهذلي عبر الإنترنت. الهاتف 54 182 077.",
      "nav.services": "الخدمات", "nav.gallery": "معرض الصور", "nav.book": "احجز", "nav.instagram": "إنستغرام", "nav.lang": "اللغة",
      "hero.eyebrow": "الهذلي · حلاق", "hero.cta": "احجز موعدك",
      "intro.eyebrow": "الكرسي",
      "intro.lead": "خطوط نظيفة، تدرّجات دقيقة وحلاقة متقنة. تفضّل بالجلوس.",
      "hours": "مفتوح من {open} إلى {close}",
      "split.cut": "القصّة", "split.cutSub": "مقصّ وماكينة",
      "split.beard": "اللحية", "split.beardSub": "لمسة المنشفة الساخنة",
      "services.title": "الخدمات", "services.sub": "بموعد مسبق", "services.more": "احجز ←",
      "svc.haircut": "قصّ الشعر", "svc.beard": "تهذيب اللحية", "svc.combo": "شعر + لحية",
      "gal.fade": "تدريج", "gal.lines": "خطوط", "gal.shave": "حلاقة", "gal.detail": "تفاصيل", "gal.shop": "الصالون",
      "band.eyebrow": "اخرج بإطلالة أنيقة", "band.title": "كرسيّك<br>بانتظارك", "band.cta": "احجز الآن",
      "contact.call": "اتصل على <span dir=\"ltr\">54 182 077</span>", "contact.ig": "إنستغرام @bilel_hedhli24",
      "book.title": "الحجز", "step.day": "اليوم", "step.time": "الوقت", "step.details": "معلوماتك",
      "form.name": "الاسم", "form.namePh": "اسمك", "form.phone": "الهاتف", "form.phonePh": "ليتمكّن بلال من الاتصال بك",
      "form.confirm": "تأكيد الحجز", "summary.empty": "اختر اليوم والوقت.",
      "day.today": "اليوم", "day.closed": "مغلق",
      "slots.loading": "جارٍ تحميل المواعيد…", "slots.pickDay": "اختر اليوم أولاً.",
      "slots.closed": "بلال مغلق يوم {date}. اختر يوماً آخر.", "slots.none": "لا توجد مواعيد متبقية في هذا اليوم. جرّب الغد.",
      "slots.taken": "محجوز",
      "done.eyebrow": "تمّ الحجز",
      "done.text": "نراك قريباً يا {name}. سيتصل بك بلال على {phone} إذا تغيّر شيء. لتعديل الموعد اتصل على \u206654 182 077\u2069.",
      "done.again": "حجز آخر",
      "footer.login": "دخول الحلاق",
      "err.missing_details": "يرجى إدخال اسمك ورقم هاتفك.",
      "err.taken": "تمّ حجز هذا الموعد للتوّ. اختر موعداً آخر.",
      "err.closed": "المحل مغلق في هذا اليوم. اختر تاريخاً آخر.",
      "err.outside_hours": "هذا الوقت خارج ساعات العمل.",
      "err.bad_date": "اختر تاريخاً صحيحاً.",
      "err.wrong_password": "كلمة المرور غير صحيحة.", "err.auth": "يرجى تسجيل الدخول من جديد.",
      "err.bad_time": "يجب أن يكون الوقت مثل 15:00.", "err.bad_slot": "مدة الموعد غير صحيحة.",
      "err.no_slots": "هذه الساعات لا تتّسع لأيّ موعد.", "err.not_found": "الموعد غير موجود.",
      "err.generic": "حدث خطأ. حاول مرة أخرى.",

      "a.title": "بلال الهذلي · الإدارة", "a.admin": "الإدارة", "a.viewSite": "عرض الموقع", "a.logout": "تسجيل الخروج",
      "a.login": "دخول الحلاق", "a.password": "كلمة المرور", "a.signin": "دخول",
      "a.tab.schedule": "المواعيد", "a.tab.calendar": "التقويم", "a.tab.hours": "ساعات الحجز",
      "a.today": "اليوم", "a.prevDay": "اليوم السابق", "a.nextDay": "اليوم التالي", "a.prevMonth": "الشهر السابق", "a.nextMonth": "الشهر التالي",
      "a.c.total": "المجموع", "a.c.waiting": "في الانتظار", "a.c.delayed": "متأخّر", "a.c.done": "منتهٍ",
      "a.closedNote": "هذا اليوم مغلق. لا يمكن للزبائن الحجز فيه.", "a.noAppts": "لا توجد مواعيد في هذا اليوم.",
      "a.done": "تمّ", "a.undo": "تراجع", "a.delay": "تأخير", "a.changeDelay": "تعديل التأخير", "a.onTime": "في الموعد",
      "a.delete": "حذف", "a.confirmDelete": "اضغط مرة أخرى للحذف", "a.cancel": "إلغاء",
      "a.pill.booked": "في الانتظار", "a.pill.delayed": "متأخّر", "a.pill.done": "تمّ",
      "a.cal.closed": "مغلق", "a.cal.booked": "{n} حجز", "a.cal.hint": "اضغط على يوم لإغلاقه أو فتحه.",
      "a.seeSchedule": "عرض المواعيد", "a.openDay": "فتح هذا اليوم", "a.closeDay": "إغلاق اليوم كاملاً",
      "a.weekly": "{date} مغلق لأنك تغلق كل {weekday}. يمكنك تغيير ذلك في ساعات الحجز.",
      "a.dayClosed": "{date} مغلق.", "a.dayOpen": "{date} مفتوح.",
      "a.dayOpenN": "{date} مفتوح وفيه {n} حجز. إذا أغلقته تبقى هذه الحجوزات، فاتصل بهؤلاء الزبائن.",
      "a.h.title": "ساعات الحجز", "a.h.from": "يمكن للزبائن الحجز ابتداءً من", "a.h.to": "ينتهي آخر موعد على الساعة",
      "a.h.length": "مدة كل موعد", "a.h.min": "{n} دقيقة", "a.h.hour": "ساعة واحدة", "a.h.weekly": "مغلق كل أسبوع يوم",
      "a.h.preview": "يمكن للزبائن الحجز من {open} إلى {close}{overnight}: {n} موعداً في اليوم، وآخرها يبدأ على {last}.",
      "a.h.overnight": " (بعد منتصف الليل)", "a.h.save": "حفظ", "a.h.saved": "تمّ الحفظ. الموقع يستعمل الآن الساعات الجديدة.",
    },
  };

  let lang = DEFAULT;
  try {
    const fromUrl = new URLSearchParams(location.search).get("lang");
    const saved = localStorage.getItem("bilel_lang");
    if (LANGS[fromUrl]) lang = fromUrl;
    else if (LANGS[saved]) lang = saved;
  } catch {}

  const listeners = [];
  const pad = (n) => String(n).padStart(2, "0");

  function t(key, vars) {
    let s = T[lang][key] ?? T[DEFAULT][key] ?? key;
    if (vars) for (const [k, v] of Object.entries(vars)) s = s.split(`{${k}}`).join(v);
    return s;
  }

  // Minutes since midnight (may exceed 1440 for after-midnight slots) -> clock time.
  function time(min) {
    const m = ((min % 1440) + 1440) % 1440, h = Math.floor(m / 60), mm = pad(m % 60);
    if (lang === "en") return `${((h + 11) % 12) + 1}:${mm} ${h < 12 ? "AM" : "PM"}`;
    if (lang === "fr") return `${pad(h)}h${mm}`;
    return `${pad(h)}:${mm}`;
  }
  const fmt = (opts) => new Intl.DateTimeFormat(LANGS[lang].locale, opts);
  const at = (dateStr) => new Date(dateStr + "T12:00:00");
  const dateLong = (s) => fmt({ weekday: "long", day: "numeric", month: "long" }).format(at(s));
  const dateShort = (s) => fmt({ weekday: "short", day: "numeric", month: "short" }).format(at(s));
  const monthYear = (d) => fmt({ month: "long", year: "numeric" }).format(d);
  const monthShort = (d) => fmt({ month: "short" }).format(d);
  // Jan 4 1970 was a Sunday: index 0 = Sunday … 6 = Saturday.
  const weekday = (i, style = "short") => fmt({ weekday: style }).format(new Date(1970, 0, 4 + i, 12));

  function apply(root = document) {
    const L = LANGS[lang];
    document.documentElement.lang = lang;
    document.documentElement.dir = L.dir;
    root.querySelectorAll("[data-i18n]").forEach((el) => (el.textContent = t(el.dataset.i18n)));
    root.querySelectorAll("[data-i18n-html]").forEach((el) => (el.innerHTML = t(el.dataset.i18nHtml)));
    root.querySelectorAll("[data-i18n-ph]").forEach((el) => (el.placeholder = t(el.dataset.i18nPh)));
    root.querySelectorAll("[data-i18n-aria]").forEach((el) => el.setAttribute("aria-label", t(el.dataset.i18nAria)));
    root.querySelectorAll("[data-i18n-alt]").forEach((el) => (el.alt = t(el.dataset.i18nAlt)));
    const titleKey = document.documentElement.dataset.titleKey;
    if (titleKey) document.title = t(titleKey);
    const desc = document.querySelector('meta[name="description"]');
    if (desc && T[lang]["meta.desc"]) desc.content = t("meta.desc");
    document.querySelectorAll(".lang-switch").forEach(renderSwitch);
  }

  function renderSwitch(box) {
    box.setAttribute("role", "group");
    box.setAttribute("aria-label", t("nav.lang"));
    box.innerHTML = "";
    for (const [code, L] of Object.entries(LANGS)) {
      const b = document.createElement("button");
      b.type = "button";
      b.textContent = L.label;
      b.lang = code;
      b.setAttribute("aria-pressed", String(code === lang));
      b.onclick = () => setLang(code);
      box.appendChild(b);
    }
  }

  function setLang(code) {
    if (!LANGS[code] || code === lang) return;
    lang = code;
    try { localStorage.setItem("bilel_lang", code); } catch {}
    apply();
    listeners.forEach((fn) => fn(lang));
  }

  window.I18N = {
    get lang() { return lang; },
    t, time, dateLong, dateShort, monthYear, monthShort, weekday, apply, setLang,
    onChange: (fn) => listeners.push(fn),
    error: (code) => t("err." + (code || "generic")),
  };
})();
