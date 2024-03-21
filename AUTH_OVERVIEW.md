# user authentication

## login

* set the state with user data received from the api

## logout

* reset user state manually, and clear jwt cookie by hitting logout endpoint

## page reload

_on persisting login:_

* refresh the access Token and user data
* if refresh is unsuccessFull (expired refresh token), clear jwt cookie by hitting the logout endpoint

_on none persisting login:_

* user is technically logged out, because all data is cleared automatically

## adding book to favorites

* display bookmarking icon only when user is logged in

## posting a book review

* display all reviews for the specific book in WorkPage page
