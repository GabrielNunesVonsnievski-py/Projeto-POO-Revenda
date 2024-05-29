from flask import Flask, render_template, request
from models.usuario import usuario, db
class App():
    def __init__(self):
        self.app = Flask(__name__)
        self.app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:''@localhost/revenda'
        db.init_app(self.app)
        self.default_routes()
    def home(self):
            user = usuario("eduardo", "eduardo@gmail.com")
            return render_template('index.html', user=user)
    
    def usuario(self):
        if request.method == 'POST':
            try:
                 data = request.get_json()
                 print(data)
                 user = usuario(data['codigo'], data['nome'], data['login'], data['senha'])
                 db.session.add(user)
                 db.session.commit()
                 return 'Usuario criado com sucesso', 200
            except Exception as e:
                 return 'O usuario nao foi criado', 405
            
        elif request.method == 'GET':
            try:
                data = usuario.query.all()
                return render_template('usuario.html',data={'usuario':[usuario.to_dict() for usuario in data]})
            
            except Exception  as e:
                 return 'Não foi possivel buscar usuários', 405
    
    def default_routes(self):
        self.app.route('/')(self.home)
        self.app.route('/usuario', methods=['POST','GET'])(self.usuario)

    def run(self):
        return self.app.run(port=3000, host="localhost", debug=True)
    
app = App()
app.run() 

# venv/Scripts/activate