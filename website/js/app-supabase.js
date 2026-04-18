import { getSupabaseClient, pingSupabaseAuth } from "./supabase-client.js";

function setStatus(el, message, state) {
  el.textContent = message;
  el.dataset.state = state;
}

document.addEventListener("DOMContentLoaded", async function () {
  var el = document.getElementById("supabase-status");
  if (!el) return;

  var ping = await pingSupabaseAuth();
  if (ping.reason === "not_configured") {
    setStatus(
      el,
      "Supabase: not configured yet. Copy supabase-config.example.js to supabase-config.js, or add GitHub Actions secrets for deploy.",
      "idle"
    );
    return;
  }

  if (!ping.ok) {
    var detail =
      ping.reason && ping.reason.indexOf("http_") === 0
        ? ping.reason.replace("http_", "")
        : ping.reason || "unknown";
    setStatus(
      el,
      "Supabase: could not reach project (" + detail + "). Check URL and anon key.",
      "error"
    );
    return;
  }

  var client = await getSupabaseClient();
  if (!client) {
    setStatus(el, "Supabase: client failed to initialize.", "error");
    return;
  }

  setStatus(
    el,
    "Supabase: connected. You can query tables from script next (remember Row Level Security).",
    "ok"
  );
});
