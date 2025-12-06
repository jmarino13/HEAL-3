// app.js

document.addEventListener("DOMContentLoaded", () => {
  // Set footer year(s)
  document.querySelectorAll("#year").forEach((n) => {
    n.textContent = new Date().getFullYear();
  });

  // Attach submit handler for fake checkout form
  const form = document.getElementById("checkout-lead-form");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = form.elements["name"].value || "there";
      const email = form.elements["email"].value || "";
      const plan = form.elements["plan"].value || "";

      // This is the "fake backend" – in production you’d send this to your API, EMR, or Zapier.
      console.log("New membership lead:", { name, email, plan });

      const msg = document.getElementById("checkout-success");
      if (msg) {
        msg.textContent =
          "Thank you! A HEAL team member will reach out shortly to complete your membership.";
        msg.style.display = "block";
      }

      form.reset();
      // Close after a short delay
      setTimeout(closeCheckout, 1800);
    });
  }
});

const planCopy = {
  core: { name: "Core Concierge", price: "$499 / month" },
  optimize: { name: "Optimize Concierge", price: "$799 / month" },
  elite: { name: "Elite Concierge", price: "$1,199 / month" }
};

function startCheckout(planKey) {
  const modal = document.getElementById("checkout-modal");
  const title = document.getElementById("checkout-plan-title");
  const subtitle = document.getElementById("checkout-plan-subtitle");
  const hiddenPlan = document.getElementById("checkout-plan-input");

  const plan = planCopy[planKey] || planCopy.core;

  if (title) title.textContent = plan.name;
  if (subtitle) subtitle.textContent = plan.price + " • Secure concierge sign-up";
  if (hiddenPlan) hiddenPlan.value = plan.name;

  if (modal) {
    modal.classList.remove("hidden");
  }
}

function closeCheckout() {
  const modal = document.getElementById("checkout-modal");
  if (modal) {
    modal.classList.add("hidden");
  }
}
