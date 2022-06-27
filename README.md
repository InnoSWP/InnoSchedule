# InnoSchedule
InnoSchedule is an easy-to-use schedule editor.

## Table of contents
- [About](#about)
- [How to use](#how-to-use)
- [Running](#running)

## About
InnoSchedule is a tool for creating your own schedule with ease. Project provides creating study groups with their own schedule. It catches conflicts on the different courses. And students can check the released schedule.

## How to use
...

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
