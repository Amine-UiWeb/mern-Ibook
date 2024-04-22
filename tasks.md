# TASKS

## basic backend setup

- [x] Setup an express __server__ with basic __Routes__ and __Middlewares__.
- [x] Add a __User & Review models__ with __mongoose__.

## build the main website layout

- [x] Build the __header__ & __footer__ of the website.
- [x] Create __login__ and __registration__ pages.
- [x] Create a __LandingPage__ page that displays books in carousels.
- [x] Create a __BooksCarousel__ and __CarouselCard__ components to display a list of books
- [x] Create a __DotsLoader__ component for loading a book cover.
- [x] Handle __routing__ between pages using react router (v6.4 minimum).

## add a toggling navigation menu

- [x] Add a __nav__ toggler.
- [x] Implement __nav__ toggling.

- [x] Add a dropdown menu in the __nav__ to browse books by different choices.
- [x] Add a link to browse the __user collection__ (only if authenticated).

- [x] Add __dark/light themes__ toggler button in __nav__.
- [ ] Apply __theme__ change.

## create main pages with skeleton loading applied

- [x] Create __WorkPage__ and.
- [x] Create __AuthorPage__ page.
- [x] Add __skeleton loaders__ for headers, texts and pictures.

## implement form validation and accessibility features for user registration

- [x] Implement __form validation__
- [x] Display __validation errors__, for __login__ and __registration__ forms.

- [x] Implement __state management__ for user authentication using __redux-toolkit__.

- [x] Setup login and registration __api endpoints__.
- [x] Add login and registration __logic for the client__.

- [x] Allow persisted user login using __httpOnly jwt cookie__ and __localstorage__.

## add search functionality for books and authors

- [x] Create a __search bar__ to search a book by __title__/__author__/__genre__.
- [x] Display search results(5) in a menu upon typing (use debouncing).
- [ ] display search results in a __search results__ on hitting ENTER/search-icon
