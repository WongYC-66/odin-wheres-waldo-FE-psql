# odin-wheres-waldo-FE-psql
A simple game of photo tagging app built with react, FrontEnd build with React/Bootstrap.

1. modify /src/api_url.js, 

```const API_URL = "< your backend root URL>"```

2. npm run dev

# 

FE demo (built with react/vite/bootstrap) : https://wongyc-66.github.io/odin-wheres-waldo-FE-psql/

FE (source) :  https://github.com/WongYC-66/odin-wheres-waldo-FE-psql

BE demo (built with nodeJS/express/postgreSQL) : https://odin-wheres-waldo-be-psql.adaptable.app/

BE (source) : https://github.com/WongYC-66/odin-wheres-waldo-BE-psql

#
BE APIs :
1.  /v1/success_guess_post 
    - input : {val, x-coor, y-coor}
    - output : true/ false

2.  /v1/score_board_get
    - output : [{username1, score1}, ...]

3.  /v1/score_board_post
    - input : {username, time}
    - output : success/submission failed
