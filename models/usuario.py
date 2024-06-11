from database.db import db

class usuario(db.Model):
    def to_dict(self):
        return {
            'codigo':self.codigo,
            'nome'  :self.nome,
            'login' : self.login,
            'senha' : self.senha
        }
    codigo = db.Column(db.Integer, primary_key=True)
    nome   = db.Column(db.String(50))
    login  = db.Column(db.String(50))
    senha  = db.Column(db.String(10))

    def __init__(self, nome, login, senha):
        self.nome   = nome
        self.login  = login
        self.senha  = senha
        