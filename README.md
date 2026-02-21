# Toadettes Thrift
Submission for DaTes yearly hackathon. This year we were tasked with creating an technically working UI but with unituitive design.

The project utilizes Django for the backend and serves React.js for the frontend through Node.js.

## Implemented Requirements 
All requirements (1-18) have been implemented.


## Run Project
This project requires Python and Node.js to run. 

It is recommended to install dependencies inside a virtual environment.

Create a virtual environment through running:

    python -m venv venv
    
and activate it:

    source venv/bin/activate (on macOS/Linux)
    venv\Scripts\activate (on Windows)
    

### Backend + Frontend
To install dependencies for both the backend and frontend, locate the project root and run:

    npm install
	npm run setup

To start both the backend and frontend simultaneously, locate the project root and run: 

    npm run dev

The backend runs at 

    http://localhost:7000/

The frontend runs at 

    http://localhost:5173/


____
### Backend

The Django backend serves API views only, apart from a landing page used to populate the database.

If you want to run it independently:

To install the dependencies, cd backend and run:

    pip install -r requirements.txt

To apply migrations, cd backend/ToadettesThrift and run:

	python manage.py migrate

To run the backend, cd backend/ToadettesThrift and run:

	python manage.py runserver 7000

___
### Frontend
The React frontend serves a single-page application.

If you want to run it independently:

To install the dependencies, cd frontend and run:

    npm install

To run the frontend, cd frontend and run:

    npm run dev








