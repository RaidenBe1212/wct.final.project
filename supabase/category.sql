alter table public.products
add column category text not null default 'Espresso Drinks';

-- Espresso Drinks
update public.products
set category = 'Espresso Drinks'
where name in (
  'Caffè Latte',
  'Cappuccino',
  'Caffè Americano',
  'Espresso',
  'Caramel Macchiato',
  'Caffè Mocha',
  'White Chocolate Mocha',
  'Toasted Coconut Latte'
);

-- Cold Coffee
update public.products
set category = 'Cold Coffee'
where name in (
  'Iced Caramel Macchiato',
  'Iced Brown Sugar Oatmilk Shaken Espresso',
  'Iced Shaken Espresso',
  'Iced Lavender Latte',
  'Iced Ube Coconut Macchiato'
);

-- Cold Brew
update public.products
set category = 'Cold Brew'
where name in (
  'Coffee Cold Brew',
  'Vanilla Sweet Cream Cold Brew',
  'Nitro Cold Brew',
  'Toasted Coconut Cream Cold Brew'
);

-- Tea & Matcha
update public.products
set category = 'Tea & Matcha'
where name in (
  'Iced Lavender Cream Chai',
  'Matcha Latte',
  'Iced Matcha Latte',
  'Iced Lavender Cream Matcha',
  'Chai Latte'
);

-- Refreshers
update public.products
set category = 'Refreshers'
where name in (
  'Strawberry Açaí Refresher',
  'Mango Dragonfruit Refresher',
  'Pink Drink',
  'Tropical Butterfly Refresher',
  'Blue Coconut Refresher'
);

-- Frappuccino
update public.products
set category = 'Frappuccino'
where name in (
  'Smores Frappuccino',
  'Caramel Frappuccino',
  'Java Chip Frappuccino'
);