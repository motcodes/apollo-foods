# Changelog

- new landing page
- 2 column grid on `cook/[id]` for screens >= 1024px
- adding custom recipes is now possible
- if a recipe already exists you can "like" it now.
  - when "liking" a recipe it gets saved in `savedMeals`
  - if you are the first created of the recipe it gets saved in `createdMeals`
  - updated user page for created and liked recipes
- `Stage` and `PouchModel` are dynamically imported now to minimize load time on the landing page
  - static html gets shipped without the canvas.
  - from 354kb to 131kb
  - vercel server analytics went from a score of 37 to 99 on index page
  - helps SEO

## Bug Fixes

- Fixed username null error on /profileSetup
- Fixed Css Grid line break on longer ingredients/measure
- Fixed most Html/Css errors
  - Validator can't handle custom react props like `color="var(--orange-50)"`, which shouldn't be an error
  - Css props are missing too, like `transform-origin: center;`
- Fixed account deletion
  - All the related data like `savedMeals` gets delete now too
