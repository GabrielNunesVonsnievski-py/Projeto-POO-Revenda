from flask import Flask
from routes.index import default_routes
from database.db import db

class App():
    def __init__(self):
        self.app = Flask(__name__)
        self.app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:''@localhost/revenda'
        db.init_app(self.app)
        default_routes(self.app)

    def run(self):
        return self.app.run(port=3000, host="localhost", debug=True)
    
app = App()
app.run() 

# venv/Scripts/activate