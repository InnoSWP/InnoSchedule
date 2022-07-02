# InnoSchedule
InnoSchedule is an easy-to-use schedule editor.

## Table of contents
- [About](#about)
- [How to use](#how-to-use)
- [Running](#running)

## About
InnoSchedule is a tool for creating your own schedule with ease. Project provides creating study groups with their own schedule. It catches conflicts on the different courses. And students can check the released schedule.

## Demo
[Demo Video](https://www.youtube.com/watch?v=Zn-5mNiuf-M)



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

