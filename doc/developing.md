# Developer documentation

## Design overview

AskOpenData has a React frontend and a Python backend. There is a finite set of questions which the user can view. Given a question ID, the backend provides preprocessed data for the corresponding plot. The frontend lays out and draws the final plot to match the user's screen size. Question search is typically handled by the backend (see below).
