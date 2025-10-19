Clinic Management System

A modern, responsive web application for managing clinic operations and patient records. Built with Vue.js 3, this system provides an intuitive interface for healthcare professionals to efficiently manage patient information.

🌟 Features
Patient Management

    Patient Registration: Complete patient registration with detailed information

    Patient Records: Store and manage patient data including medical history

    Search Functionality: Quickly find patients by name, contact, or medical history

    Real-time Updates: Instant updates with Vuex state management

User Interface

    Responsive Design: Works seamlessly on desktop, tablet, and mobile devices

    Modern UI: Clean, professional interface with smooth animations

    Data Persistence: Local storage integration for data persistence

    Form Validation: Comprehensive form validation and user feedback

Dashboard

    Overview Statistics: Quick access to total patient count and appointments

    Quick Actions: Easy navigation to key features

    Real-time Data: Live updates of clinic statistics

🚀 Live Demo

Check out the live application: https://glittering-cheesecake-1fc945.netlify.app/


🛠 Technology Stack

    Frontend Framework: Vue.js 3

    State Management: Vuex 4

    Routing: Vue Router 4

    Styling: SCSS with CSS Grid and Flexbox

    Build Tool: Vue CLI

    Storage: Browser LocalStorage

📁 Project Structure
text

    Clinic Management System/
    ├── public/
    │   └── index.html
    ├── src/
    │   ├── router/
    │   │   └── index.js          # Vue Router configuration
    │   ├── store/
    │   │   └── index.js          # Vuex store with patient management
    │   ├── views/
    │   │   ├── Home.vue          # Dashboard view
    │   │   └── Patients.vue      # Patient management view
    │   ├── App.vue               # Root component
    │   └── main.js              # Application entry point
    └── package.json

🏃‍♂️ Getting Started
Prerequisites

    Node.js (version 14 or higher)

    npm or yarn package manager

Installation

  Clone the repository
  bash

    git clone <repository-url>
    cd clinic-management-system

Install dependencies
bash

    npm install

Run the development server
bash

    npm run serve

Build for production
bash

    npm run build

Available Scripts

    npm run serve - Start development server

    npm run build - Build for production

    npm run dev - Alias for serve command

💡 Usage
Managing Patients

  Register New Patients:

      Navigate to the Patients page

      Fill in patient details (name, contact, age, gender, medical history)

      Submit the form to register the patient

  View and Search Patients:

      All registered patients are displayed in a searchable list

      Use the search box to filter patients by name, contact, or medical history

  Delete Patients:

      Click the "Delete" button next to any patient to remove them from the system

Dashboard

    View total patient count

    Check today's appointments (mock data)

    Quick access to patient management features

🔧 Key Components
Vuex Store

The application uses Vuex for state management with the following features:

    Patient CRUD operations (Create, Read, Update, Delete)

    LocalStorage persistence

    Async actions with loading states

    Getters for computed patient data

Routing

    Home route (/): Dashboard overview

    Patients route (/patients): Patient management interface

Responsive Design

    Mobile-first approach

    Flexible grid layouts

    Touch-friendly interface elements
