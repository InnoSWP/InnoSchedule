# InnoSchedule
InnoSchedule is an easy-to-use schedule editor.

## Table of contents
- [About](#about)
- [How to use](#how-to-use)
- [Running](#running)

## About
InnoSchedule is a tool for creating your own schedule with ease. Project provides creating study groups with their own schedule. It catches conflicts on the different courses. And students can check the released schedule.

## Demo
 -> [Demo Video](https://www.youtube.com/watch?v=Zn-5mNiuf-M) <-

![Image](https://sun9-69.userapi.com/impf/79BttDiT_79xUQkBRACkLFwaQIZ1nX5J-3pZ5A/ZxLIHtNto9g.jpg?size=1920x1080&quality=96&sign=04f3c283aa9b0086e945572e2a549f7c&type=album)
![Image](https://sun9-62.userapi.com/impf/Hu_K8q-fhevb8gnCzZ-Zb9xP8_ItMpjmfiweCA/SsoyNgX4ONY.jpg?size=1920x1080&quality=96&sign=b6125a7b83425fe0148ac83859eae463&type=album)
![Image](https://sun1.megafon-nn.userapi.com/impf/SJPp8kpNjiaL8KrsaWX3-SWD9wGl3BkNiRUT4g/fIfJ5w5Bgr0.jpg?size=1920x1080&quality=96&sign=0059e727679a3884be6ec96343611a2a&type=album)
![Image](https://sun9-51.userapi.com/impf/xKJUGSq38L9DolYm8Wj0d571lXjAdP3K0j4Lpw/zbKAs4Uc6ok.jpg?size=1920x1080&quality=96&sign=fa56981ff659f1fb6160aebaeb5dd562&type=album)



## How to use
This tool will be deployed as soon as it will be complete to use. Now you can build tool by yourself using Running section. API developer build version is now available to test in Innopolis University Intranet on the following address: https://10.90.138.239:8000/api/v1/

## Features list
 - Creating and editing the schedule
 - Adding teachers, rooms and additional activities
 - Warning about conflicts between events
 - Drag'n'drop creating events
 - Creating a division by groups in course
 - Showing schedules for students and teachers 
 - REST API

## Used

### Backend API
- Python 3.10
- PostgreSQL
- Django & Django Rest Framework

### Web client
- ReactJS & Redux
- MaterialUI

## Running

Requirements:
Docker

Clone repository:
```shell
git clone https://github.com/InnoSWP/InnoSchedule.git
```

Setup environment:
1. Rename `.env-example` to `.env`.
2. Edit it.

Run Docker containers:
```shell
docker-compose build
docker-compose -d up  # -d to run in background
docker-compose ps
```

