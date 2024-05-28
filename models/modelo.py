from database.db import db
from sqlalchemy import ForeignKey
from sqlalchemy.orm import relationship

class modelo(db.Model):

    def to_dict(self):
        return {
            'codigo'   :self.codigo,
            'nome'     :self.nome,
            'codmarca' : self.codmarca,
        }
    codigo = db.Column(db.Integer, primary_key=True)
    nome   = db.Column(db.String(50))
    codmarca  = db.Column(db.Integer,ForeignKey('marca.codigo')(50))


    def __init__(self,codigo, nome, codmarca):
        self.codigo   = codigo
        self.nome     = nome
        self.codmarca = codmarca  
        