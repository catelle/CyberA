-- The completion badge is rendered from public.modules.title, so modules that
-- still carried the original seed titles printed "Hygiene Numerique" on the
-- module 1 badge while the learning space already used the curriculum title.
-- Only rows still holding a legacy seed title are touched, so any title edited
-- from the CMS or already synchronised with the curriculum stays untouched.
update public.modules as m
set
  title = c.title,
  subtitle = c.subtitle
from (
  values
    (1, 'Hygiene Numerique', 'The Digital World / Le Monde Numérique', 'Comprendre ce qui se passe vraiment derrière l''écran'),
    (2, 'E-Reputation & Desinformation', 'Digital Survivor / Survivant du Numérique', 'Reconnaître le danger, se protéger et aider quelqu''un d''autre'),
    (3, 'Online Scams & Digital Safety', 'Digital Toolbox / Outils & Pratiques', 'Des capacités pratiques que tu peux réellement utiliser'),
    (4, 'Leadership & Advocacy', 'Digital Citizenship Leadership / Leadership Citoyen Numérique', 'Aider les autres à mieux naviguer dans le monde numérique')
) as c(order_index, legacy_title, title, subtitle)
where m.order_index = c.order_index
  and m.title = c.legacy_title;

-- Badges already awarded keep the label captured at award time, so realign them
-- with the module they certify.
update public.module_badges as b
set
  badge_name = 'Badge ' || m.title,
  badge_focus = m.title
from public.modules as m
where m.id = b.module_id
  and b.badge_focus is distinct from m.title;
