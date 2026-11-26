const projectDetails = {
  miMiel: {
    title: "Mi Miel",
    category: "Media kit",
    description: "A brand launch deck for Mi Miel. The cover pairs a black-and-white photograph with the wordmark, while the product section shifts to warm photography and a quieter layout.",
    images: [
      ["mi-miel-cover", "Mi Miel 2026 brand launch cover"],
      ["mi-miel-products", "Mi Miel product section divider with amber-toned photography"],
    ],
  },
  sensory: {
    title: "The Sensory Dinner",
    category: "Event web design",
    description: "A single-page HTML flyer for an event about food and fragrance. The page uses an opening image, a short introduction and a photo sequence to show what the evening is about.",
    images: [
      ["sensory-dinner-hero", "Opening section of The Sensory Dinner event page"],
      ["sensory-dinner-layout", "Event page excerpt showing the editorial layout and photography"],
    ],
  },
  arden: {
    title: "House of Arden",
    category: "Brand identity",
    description: "A visual identity built around a serif wordmark, an interlocking monogram and a palette of emerald, brass and bone. The brand direction explored how the wordmark, type and colours could work together across applications.",
    images: [["arden-identity", "The House of Arden wordmark on an emerald background"], ["arden-palette", "The House of Arden palette with five colour swatches"]],
  },
  becoming: {
    title: "Becoming Her",
    category: "Packaging",
    description: "A keepsake box and printed insert for SHE IS BARE. The supplier proof shows how the typography and warm, tonal artwork are placed across the box panels.",
    images: [["becoming-her", "Becoming Her keepsake box artwork and panel placement"]],
  },
  littleTheos: {
    title: "Little Theo’s",
    category: "Menu design",
    description: "A two-sided menu for the Kambah takeaway. One side covers pizzas and meal bundles. The other groups burgers, seafood and sides, with prices aligned for quick scanning.",
    images: [
      ["little-theos-pizza", "Side one of the Little Theo’s menu, featuring pizzas and meal bundles"],
      ["little-theos-burgers", "Side two of the Little Theo’s menu, featuring burgers, seafood and sides"],
    ],
  },
  evolvedBoundaries: {
    title: "Evolved Boundaries Café",
    category: "Menu design",
    description: "A two-sided A3 menu for Evolved Boundaries Café. The food side gives breakfast and lunch their own columns alongside ordering information. The drinks side uses the same sage palette and grid to organise coffee, juices, smoothies and shakes.",
    images: [
      ["evolved-boundaries-food", "Evolved Boundaries Café food side with breakfast and lunch"],
      ["evolved-boundaries-drinks", "Evolved Boundaries Café drinks side with coffee, juices, smoothies and shakes"],
    ],
  },
  mame: {
    title: "MAME Essentials",
    category: "Packaging & campaign",
    description: "A gift-card box sleeve, three Christmas pillow-box wraps and a mobile fragrance promotion for MAME Essentials. The packaging previews show how the artwork wraps around each box.",
    images: [
      ["mame-gift-box", "MAME gift-card box with a cream printed wrap"],
      ["mame-pillow-boxes", "MAME pillow boxes with red, green and cream Christmas wraps"],
      ["mame-campaign", "Vertical MAME Essentials fragrance promotion"],
    ],
  },
  jayde: {
    title: "Jayde’s Planners",
    category: "Fillable PDFs",
    description: "A set of interactive planner PDFs. These two sample pages show a daily self-care tracker and a morning routine checklist. The original PDFs use form fields for typed responses and checkboxes.",
    images: [
      ["jayde-self-care-planner", "Self-care planner page with trackers and space for daily notes"],
      ["jayde-morning-checklist", "Morning routine checklist with space for tasks and priorities"],
    ],
  },
  olympus: {
    title: "Olympus Gym",
    category: "Logo application",
    description: "The Olympus Gym emblem shown up close and in use on an A3 gym rules poster. Large type and numbered sections make the poster easy to scan on the gym floor.",
    images: [
      ["olympus-gym-logo", "Close-up of the Olympus Gym emblem on the rules poster"],
      ["olympus-gym-signage", "Complete Olympus Gym rules poster in black, yellow and white"],
    ],
  },
  keystone: {
    title: "Keystone Pointing",
    category: "Large-format print",
    description: "A services banner designed for a 7.2 by 2 metre format. The company name leads, with services and contact details grouped below. The production file uses vector artwork so it scales for print.",
    images: [["keystone-banner", "Keystone Pointing vector services banner"]],
  },
  boxing: {
    title: "KH Boxing",
    category: "Business card",
    description: "A double-sided business card for Kristy Harris. The maroon and black reverse pairs Georgia typography with her existing KH Boxing logo. The other side of the printed card carries her professional details and a Linktree QR code.",
    images: [["boxing-card", "The maroon and black reverse of Kristy Harris's business card"]],
  },
};

const filters = document.querySelector(".filters");
const filterButtons = [...filters.querySelectorAll("button")];
const projects = [...document.querySelectorAll(".project")];
const status = document.querySelector("#work-status");
filters.hidden = false;

for (const button of filterButtons) {
  button.addEventListener("click", () => {
    const active = button.dataset.filter;
    let count = 0;
    for (const option of filterButtons) {
      option.setAttribute("aria-pressed", String(option === button));
    }
    for (const project of projects) {
      project.hidden = active !== "all" && !project.dataset.category.split(" ").includes(active);
      if (!project.hidden) count += 1;
    }
    status.textContent = count + (count === 1 ? " project shown." : " projects shown.");
  });
}

const dialog = document.querySelector("#project-dialog");
const drawerImages = document.querySelector("#detail-images");
let opener;
for (const project of projects) {
  const link = project.querySelector(".project-open");
  link.addEventListener("click", (event) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || typeof dialog.showModal !== "function") return;
    event.preventDefault();
    opener = link;
    const details = projectDetails[project.dataset.project];
    document.querySelector("#detail-title").textContent = details.title;
    document.querySelector("#detail-category").textContent = details.category;
    document.querySelector("#detail-copy").textContent = details.description;
    const images = details.images.map(([slug, label]) => {
      const image = document.createElement("img");
      image.src = "assets/" + slug + ".webp";
      image.alt = label;
      image.decoding = "async";
      return image;
    });
    drawerImages.replaceChildren(...images);
    dialog.showModal();
    dialog.scrollTop = 0;
  });
}

dialog.addEventListener("close", () => opener?.focus());
