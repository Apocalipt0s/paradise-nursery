// Local SVG artwork is included, so the shop works without an image service.
// You can replace each image with your own licensed product photographs.
export const categories = [
  {
    id: 'air-purifying',
    title: 'Air-Purifying Plants',
    subtitle: 'Breathe a little easier',
    description: 'Fresh greenery for brighter, happier indoor spaces.',
  },
  {
    id: 'tropical',
    title: 'Tropical Favorites',
    subtitle: 'Bring the outdoors in',
    description: 'Bold leaves and lush textures that make any corner shine.',
  },
  {
    id: 'easy-care',
    title: 'Easy-Care Plants',
    subtitle: 'Low effort, lots of love',
    description: 'Beautifully unfussy friends for your everyday routine.',
  },
];

const plantsByCategory = [
  [
    ['snake-plant', 'Snake Plant', 24, 'Sturdy upright leaves, perfect for beginners.', 'Low light', 'Easy'],
    ['peace-lily', 'Peace Lily', 29, 'Glossy foliage with elegant white blooms.', 'Indirect light', 'Moderate'],
    ['spider-plant', 'Spider Plant', 18, 'Arching striped leaves that love to cascade.', 'Indirect light', 'Easy'],
    ['boston-fern', 'Boston Fern', 26, 'Soft, feathery fronds for a leafy sanctuary.', 'Filtered light', 'Moderate'],
    ['rubber-plant', 'Rubber Plant', 38, 'A dramatic statement with shiny deep-green leaves.', 'Bright light', 'Easy'],
    ['areca-palm', 'Areca Palm', 42, 'Graceful palm fronds and effortless tropical charm.', 'Bright indirect', 'Moderate'],
  ],
  [
    ['monstera', 'Monstera Deliciosa', 45, 'Iconic split leaves with a striking silhouette.', 'Indirect light', 'Easy'],
    ['bird-of-paradise', 'Bird of Paradise', 54, 'Architectural, broad leaves that steal the show.', 'Bright light', 'Moderate'],
    ['philodendron', 'Heartleaf Philodendron', 25, 'Trailing heart-shaped leaves full of character.', 'Indirect light', 'Easy'],
    ['calathea', 'Calathea Orbifolia', 36, 'Round, silvery-striped leaves with serious style.', 'Indirect light', 'Moderate'],
    ['fiddle-leaf-fig', 'Fiddle-Leaf Fig', 58, 'Sculptural foliage for a sunny living room.', 'Bright indirect', 'Moderate'],
    ['alocasia', 'Alocasia Polly', 34, 'Bold arrow-shaped leaves with pale veining.', 'Indirect light', 'Moderate'],
  ],
  [
    ['golden-pothos', 'Golden Pothos', 19, 'A cheerful trailing vine with golden marbling.', 'Low light', 'Easy'],
    ['zz-plant', 'ZZ Plant', 32, 'Shiny leaflets and wonderfully relaxed care.', 'Low light', 'Easy'],
    ['aloe-vera', 'Aloe Vera', 21, 'A sunny windowsill classic with sculptural leaves.', 'Bright light', 'Easy'],
    ['jade-plant', 'Jade Plant', 23, 'Plump emerald leaves on a miniature tree.', 'Bright light', 'Easy'],
    ['echeveria', 'Echeveria', 16, 'A pretty rosette succulent in soft green hues.', 'Bright light', 'Easy'],
    ['string-of-pearls', 'String of Pearls', 27, 'Playful bead-like vines for a hanging planter.', 'Bright indirect', 'Easy'],
  ],
];

export const plants = plantsByCategory.flatMap((entries, categoryIndex) =>
  entries.map(([id, name, price, description, light, care]) => ({
    id,
    name,
    price,
    description,
    light,
    care,
    category: categories[categoryIndex].id,
    image: `${import.meta.env.BASE_URL}plants/${id}.svg`,
  }))
);

export const formatPrice = (amount) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
