# Meta Glasses Review Analytics Dashboard

A Full Stack Review Analytics & Intelligence Platform built using a real-world Meta Smart Glasses reviews dataset.

The project combines:

* Public Review Analytics
* Admin Dashboard
* User Dashboard
* Authentication System
* MongoDB Aggregation Pipelines
* Review Intelligence System
* Search & Filtering
* Sentiment Analysis
* Responsive Dashboard UI

---

# Project Overview

This project is designed as a production-style analytics platform where users can explore customer feedback, analyze product trends, and manage review data through interactive dashboards.

The platform supports three access levels:

* Public Visitors
* Authenticated Users
* Admins

The application is intentionally designed as:

* a public analytics platform
* a personalized dashboard system
* an admin management panel

instead of a completely login-locked application.

---

# Project Timeline

## Backend Development Phase

13 May 2026 – 28 May 2026

Includes:

* MongoDB integration
* REST APIs
* JWT authentication
* Aggregation pipelines
* Middleware architecture
* Postman testing

---

## Frontend Development Phase

29 May 2026 – 13 June 2026

Includes:

* Dashboard UI
* API integration
* Authentication flow
* Analytics visualization
* CRUD management system
* Responsive design

---

# Tech Stack

## Frontend

* React (Vite)
* Redux Toolkit
* Tailwind CSS
* Material UI (MUI)
* Axios
* React Router
* Formik
* Yup
* Recharts / Chart.js

---

## Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* bcryptjs

---

## Development Tools

* Postman
* ESLint
* Prettier
* Nodemon

---

# Main Features

# Public Features

Public visitors can:

* browse reviews
* search reviews
* filter reviews
* view analytics
* explore sentiment statistics
* analyze rating distributions
* view trending keywords

Public pages:

* Home
* Reviews
* Analytics
* Login
* Register

---

# User Features

Authenticated users can:

* login/register
* access personal dashboard
* manage profile
* save/bookmark reviews
* access advanced filtering
* customize settings

User pages:

* Dashboard
* Profile
* Saved Reviews
* Settings

---

# Admin Features

Admins can:

* create reviews
* update reviews
* delete reviews
* manage users
* moderate content
* access advanced analytics
* manage platform data

Admin pages:

* Admin Dashboard
* Reviews Management
* Users Management
* Analytics Management

---

# Dataset Information

The project uses a Meta Smart Glasses reviews dataset containing:

* ratings
* review text
* countries
* helpfulness scores
* verified purchases
* review titles
* review images
* sentiment labels
* review metadata

Dataset analysis was completed before implementation to:

* identify entities
* design MongoDB schemas
* define API structure
* optimize database collections

---

# Database Collections

# Reviews Collection

Stores:

* review information
* ratings
* review text
* helpfulness data
* sentiment labels
* review metadata

Fields include:

* reviewID
* name
* date
* verifiedPurchase
* rating
* helpful
* title
* review
* country
* reviewImage
* helpfulness_score
* is_positive_review

---

# Users Collection

Stores:

* authentication data
* user profiles
* account roles
* session information

Fields include:

* name
* email
* password
* role
* avatar
* createdAt

---

# Backend Architecture

Backend follows MVC Architecture.

---

# Backend Folder Structure

backend/
│
├── src/
│   │
│   ├── config/
│   ├── controllers/
│   ├── services/
│   ├── models/
│   ├── routes/
│   ├── middlewares/
│   ├── validators/
│   ├── utils/
│   ├── seed/
│   │
│   ├── app.js
│   └── index.js
│
├── package.json
├── .env
├── .gitignore
└── README.md

---

# app.js

Responsible for:

* Express app initialization
* Middleware configuration
* Route setup
* Error middleware setup

---

# index.js

Responsible for:

* MongoDB connection
* Server startup
* PORT listening
* Application initialization

---

# Frontend Architecture

Frontend follows Feature-Based Architecture.

Frontend is directly integrated with backend APIs.

---

# Frontend Folder Structure

frontend/
│
├── public/
│
├── src/
│
├── components/
├── pages/
├── features/
├── hooks/
├── services/
├── store/
├── layouts/
├── routes/
└── utils/

---

# Authentication System

JWT-based authentication system implemented.

Features:

* User Registration
* User Login
* JWT Token Generation
* Protected Routes
* Logout Functionality
* Token Persistence
* Auto Login

---

# Role-Based Access Control (RBAC)

Supported roles:

* admin
* user

Public visitors do not require authentication.

Protected routes validate:

* JWT token
* user role
* route permissions

---

# CRUD Operations

Implemented for:

* Reviews
* Users

Operations include:

* Create
* Read
* Update
* Delete

---

# API Features

# Filtering

Supports:

* rating filters
* country filters
* verified purchase filters
* positivity filters

---

# Sorting

Supports:

* ascending sorting
* descending sorting
* multi-field sorting

---

# Pagination

Backend pagination implemented using:

* page
* limit

Frontend integrated with backend pagination APIs.

---

# Search System

Implemented:

* keyword search
* title search
* regex search
* review text search

---

# Dynamic Query Builder

Reusable filtering system implemented to:

* reduce duplicate routes
* support scalable APIs
* allow flexible querying

---

# MongoDB Features

Implemented:

* schema validation
* indexing
* aggregation pipelines
* query optimization
* projection
* filtering
* sorting
* pagination

---

# Aggregation Features

Implemented using:

* $match
* $group
* $project
* $sort
* $avg
* $sum

Analytics include:

* average ratings
* monthly trends
* country statistics
* sentiment analysis
* top reviewers
* most helpful reviews

---

# Sentiment Analysis

Dataset includes sentiment labels.

Features:

* positive review statistics
* negative review statistics
* sentiment charts
* sentiment filtering

---

# AI Features

Implemented:

* AI-generated review summaries
* review intelligence analytics
* trending review insights

---

# Middleware System

Implemented middlewares:

* Authentication Middleware
* Validation Middleware
* Logging Middleware
* Error Middleware
* Rate Limiting Middleware

---

# Middleware Chaining

Multiple middleware functions execute sequentially.

Example flow:

1. Authentication Middleware
2. Validation Middleware
3. Controller Execution

---
    
# Error Handling System

Implemented:

* Global Error Handler
* Async Error Wrapper
* Validation Errors
* Standardized API Responses

---

# API Response Structure

Example response format:

{
success: true,
message: "Data fetched successfully",
data: []
}

---

# Validation System

Validation includes:

* schema validation
* request validation
* password validation
* protected update validation

---

# Security Features

Implemented:

* JWT Authentication
* Password Hashing
* Protected Routes
* CORS Configuration
* Rate Limiting
* Secure API Access

---

# Request Logging

Logging middleware records:

* request methods
* URLs
* timestamps

Useful for:

* debugging
* monitoring
* development

---

# Health Check APIs

Implemented:

* server health check
* API status monitoring

---

# Frontend Dashboard System

Dashboard includes:

* Sidebar Navigation
* Top Navbar
* Analytics Cards
* Charts
* Tables
* CRUD Modals
* Search Bars
* Filters
* Pagination Controls
* Toast Notifications
* Skeleton Loaders

---

# UI/UX Features

Implemented:

* responsive design
* dark mode
* light mode
* loading states
* empty states
* error states

---

# Redux Toolkit

Redux Store contains:

* Auth Slice
* User Slice
* Data Slice
* UI Slice

---

# Axios API Layer

Centralized Axios instance includes:

* request interceptors
* response interceptors
* JWT token attachment
* global error handling

---

# Forms & Validation

Implemented using:

* Formik
* Yup

Supports:

* dynamic forms
* validation
* error handling

---

# Storage System

## localStorage

Used for:

* JWT token
* user session
* theme preference

---

## sessionStorage

Used for:

* temporary filters
* form progress

---

# SEO Features

Implemented:

* dynamic page titles
* meta descriptions
* Open Graph tags
* React Helmet
* sitemap
* structured data

---

# Performance Optimization

Implemented:

* MongoDB indexing
* query optimization
* lazy loading
* code splitting
* optimized Redux state
* pagination
* memoization

---

# Scaling Concepts Studied

* Vertical Scaling
* Horizontal Scaling
* Load Balancing
* Replication
* Sharding
* Caching Concepts

---

# Installation Guide

# Clone Repository

git clone <repository-url>

---

# Backend Setup

cd backend

npm install

Create `.env` file:

PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret

Run backend:

npm run dev

---

# Frontend Setup

cd frontend

npm install

Run frontend:

npm run dev

---

# Environment Variables

# Backend

PORT=
MONGO_URI=
JWT_SECRET=
NODE_ENV=

---

# Frontend

VITE_API_URL=

---

# Main API Endpoints

# Authentication APIs

POST /auth/register

POST /auth/login

GET /auth/me

---

# Review APIs

GET /reviews

POST /reviews

PATCH /reviews/:id

DELETE /reviews/:id

---

# Analytics APIs

GET /stats/average-rating

GET /stats/top-reviewers

GET /stats/monthly-average

GET /stats/sentiment

---

# Documentation

Includes:

* README Documentation
* Postman Collection
* API Examples
* Folder Structure Explanation

---

# Future Improvements

* Real-time notifications
* Elasticsearch integration
* AI recommendation engine
* Docker deployment
* CI/CD pipeline
* PDF/CSV exports
* advanced NLP analysis

---

# Learning Outcomes

This project demonstrates:

* Full Stack Development
* REST API Design
* MongoDB Aggregation
* JWT Authentication
* Dashboard Development
* Analytics Visualization
* Backend Architecture
* Frontend State Management
* Production-style Development

---

# License

This project is created for educational and portfolio purposes.

---

# Author

Developed by <Your Name>
