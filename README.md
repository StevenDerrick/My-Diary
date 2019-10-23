<h1 align="center"> :blue_book: My-Diary :pencil: </h1>

[![Build Status](https://travis-ci.org/StevenDerrick/My-Diary.svg?branch=develop)](https://travis-ci.org/StevenDerrick/My-Diary)
[![codecov](https://codecov.io/gh/StevenDerrick/My-Diary/branch/develop/graph/badge.svg)](https://codecov.io/gh/StevenDerrick/My-Diary)
[![Maintainability](https://api.codeclimate.com/v1/badges/89f513c7fcd2f4d06230/maintainability)](https://codeclimate.com/github/StevenDerrick/My-Diary/maintainability)

> MyDiary is an online journal where users can pen down their thoughts and feelings.

> An Andela Bootcamp Challenge.

> For API documentation, please visit https://documenter.getpostman.com/view/9247920/SVzw51AC

# Table of Contents
* [Live Link](#live-link-globe_with_meridians)
* [Features](#features-rocket)
* [API Endpoints](#api-endpoints-droplet)
* [Technologies Stack](#technologies-stack-gear)
* [Management](#management-pencil)
* [Contributions](#contribution-guidelines-two_men_holding_hands)
* [Author](#author-computer)
* [Bugs](#bugs-bug)
* [Acknowledgments](#acknowledgments-bow)


# Live Link :globe_with_meridians:

> My-Diary front end is hosted on gh-pages [My-Diary UI](https://stevenderrick.github.io/My-Diary/) and the backend is on Heroku [My-Diary API](https://my-diary-steven.herokuapp.com/)


# Features :rocket:

- View all entries
- View a specific entry
- User can a modify an entry
- User can delete an entry
- User can create an account
- User can create an entry
- User can sign in


# API Endpoints :droplet:

*HTTP Method*|*End point* | *Public Access*|*Action*
:----------|:---------|:------------:|:-----
POST | /v1/auth/signup | true | Create a user in the API
POST | /v1/auth/signin | true | User can sign in the API
POST | /v1/entries | true | Create an entry
PATCH | /v1/entries/<entryId> | true | Modify a specifc entry
DELETE | /v1/entries/<entryId> | true | Delete an entry
GET | /v1/entries/ | true | Fetch all entries
GET | /v1/entries/<entryId> | true | Fetch a specific entry

# Prerequisites :wrench:
- Clone this project with `https://github.com/StevenDerrick/My-Diary.git`.
- Head to project directory `cd My-Diary`

#### UI
 - Navigate to UI/html folder `cd UI/html`
 - These are HTML and CSS based pages that can be run directly in your browser.

#### Server
 - Install the project dependencies `npm install`
 - Launch the server `npm start`

# Technologies Stack :gear:
| Frontend-UI | Backend-API    |
| ---------   | -----------    |
| HTML        | Nodejs/Express |
| CSS         | Mocha          |
| JS          | Travis-CI      |


# Management :pencil:
This project is managed using [Pivotal Tracker](https://www.pivotaltracker.com/n/projects/2406522).

# Contribution Guidelines :two_men_holding_hands:
1. Explain why you're making a change.
2. Please consider the scope of your change.
3. Please modify only one template per pull request.
4. The more you can make me understand the change you're making, the more likely I'll be to accept your contribution quickly.

# Bugs :bug:
No known bugs.
If you spot one, kindly email me @ ishimwesteven1@gmail.com
# Author :computer:

 [Steven Ishimwe](https://github.com/StevenDerrick)

# Acknowledgments :bow:
[Andela Rwanda](https://www.andela.com)
