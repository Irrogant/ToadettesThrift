# GobShop

Final project for the Web Technologies 2025 course created by Iréne Åbrandt (irene.abrandt@abo.fi).

The project utilizes Django for the backend and serves React.js for the frontend through Node.js.

## Implemented Requirements 

All requirements (1-18) have been implemented.


## Run Project


### Backend + Frontend
To install dependencies for both the backend and frontend, locate the project root and run:

    npm run setup
Note: creating and activating a Python virtual environment for the backend before running setup is recommended.

To start both the backend and frontend simultaneously, locate the project root and run: 

    npm run dev

____
### Backend
The backend runs at 

    http://localhost:7000/

and serves API views only, apart from a landing page used to populate the database.

To create a virtual environment for the backend depencencies, first run:

    python3 -m venv venv
    
and activate it by running:

    source venvbin/activate (on macOS/Linux)
    venv\Scripts\activate (on Windows)
    
To install the dependencies, cd backend and run:

    pip install -r requirements.txt

To run the backend, then cd backend/GobShop and run:

	python3 manage.py runserver 7000

___
### Frontend
The frontend runs at 

    http://localhost:5173/
and serves a single-page application.

To install the dependencies, cd frontend and run:

    npm install

To run the frontend, go to frontend and run:

    npm run dev








