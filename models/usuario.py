from database.db import db
from sqlalchemy import ForeignKey
from sqlalchemy.orm import relationship

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
    senha  = db.Column(db.Integer(50))

    def __init__(self,codigo, nome, login, senha):
        self.codigo = codigo
        self.nome   = nome
        self.login  = login
        self.senha  = senha
        