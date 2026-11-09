(() => {
  const form = document.querySelector(".contact-form");
  const startedInput = document.querySelector("[data-form-started]");
  if (startedInput instanceof HTMLInputElement) {
    startedInput.value = Math.floor(Date.now() / 1000).toString();
  }

  // Seules les deux valeurs produites par le serveur sont utilisées comme sélecteur.
  const formStatus = new URLSearchParams(window.location.search).get("status");
  const statusBox = ["sent", "error"].includes(formStatus)
    ? document.querySelector(`[data-status="${formStatus}"]`)
    : null;
  if (statusBox instanceof HTMLElement) {
    statusBox.hidden = false;
    statusBox.focus();
  }

  const container = document.querySelector("[data-contact-verification]");
  const status = document.querySelector("[data-verification-status]");
  const retry = document.querySelector("[data-verification-retry]");
  const submit = form?.querySelector('button[type="submit"]');
  if (!(form instanceof HTMLFormElement) || !(container instanceof HTMLElement)
    || !(status instanceof HTMLElement) || !(retry instanceof HTMLButtonElement)
    || !(submit instanceof HTMLButtonElement)) return;

  let widgetId = null;
  let activeScript = null;
  let loadTimer;
  let verified = false;

  const waiting = () => {
    verified = false;
    submit.disabled = true;
    retry.hidden = true;
    status.textContent = "Vérification avant l’envoi en cours…";
  };
  const failed = (reason, message, code) => {
    verified = false;
    submit.disabled = true;
    retry.hidden = false;
    status.textContent = message;
    const safeCode = /^\d{3,6}$/.test(String(code)) ? String(code) : undefined;
    container.dataset.verificationFailure = reason;
    if (safeCode) container.dataset.verificationCode = safeCode;
    else delete container.dataset.verificationCode;
    // Aucun contenu du formulaire ni jeton : seulement un motif technique.
    window.dispatchEvent(new CustomEvent("lectix:verification-error", {
      detail: { reason, code: safeCode },
    }));
  };

  const render = () => {
    window.clearTimeout(loadTimer);
    if (widgetId !== null) return;
    try {
      widgetId = window.turnstile.render(container, {
        sitekey: container.dataset.sitekey,
        action: "contact",
        theme: "light",
        language: "fr",
        callback: () => {
          verified = true;
          submit.disabled = false;
          retry.hidden = true;
          status.textContent = "Vérification réussie. Vous pouvez envoyer votre message.";
        },
        "error-callback": (code) => {
          failed("challenge", "La vérification a échoué. Réessayez ; votre message reste dans le formulaire.", code);
        },
        "expired-callback": () => failed("expired", "La vérification a expiré. Relancez-la avant d’envoyer votre message."),
        "timeout-callback": () => failed("timeout", "La vérification a pris trop de temps. Vous pouvez réessayer."),
        "unsupported-callback": () => failed("unsupported", "La vérification ne fonctionne pas dans ce navigateur. Essayez avec un navigateur à jour."),
      });
    } catch {
      failed("render", "La vérification est indisponible. Vous pouvez réessayer sans effacer votre message.");
    }
  };

  const start = () => {
    waiting();
    window.clearTimeout(loadTimer);
    if (window.turnstile?.render) {
      if (widgetId === null) render();
      else {
        try { window.turnstile.reset(widgetId); }
        catch { failed("reset", "La vérification est indisponible. Réessayez dans quelques instants."); }
      }
      return;
    }
    activeScript?.remove();
    const script = document.createElement("script");
    activeScript = script;
    script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
    script.async = true;
    script.addEventListener("load", () => { if (activeScript === script) render(); });
    script.addEventListener("error", () => {
      if (activeScript !== script) return;
      window.clearTimeout(loadTimer);
      failed("script_load", "La vérification n’a pas pu se charger. Vérifiez votre connexion puis réessayez.");
    });
    loadTimer = window.setTimeout(() => {
      if (activeScript === script) failed("script_timeout", "La vérification tarde à se charger. Vous pouvez réessayer.");
    }, 20000);
    document.head.append(script);
  };

  retry.addEventListener("click", start);
  form.addEventListener("submit", (event) => {
    let usableToken = false;
    try {
      usableToken = verified && widgetId !== null
        && Boolean(window.turnstile.getResponse(widgetId)) && !window.turnstile.isExpired(widgetId);
    } catch { /* La validation serveur reste obligatoire. */ }
    if (!usableToken) {
      event.preventDefault();
      failed("expired", "Relancez la vérification avant d’envoyer votre message.");
      status.focus();
    }
  });
  window.addEventListener("pageshow", (event) => { if (event.persisted) start(); });
  start();
})();
