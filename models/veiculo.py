from database.db import db

class Marca(db.Model):

    def to_dict(self):
        return{
            'codigo'      : self.codigo,
            'descricao'   : self.descricao,
            'codcategoria': self.codcategoria,
            'codmodelo'   : self.codmodelo,
            'ano'         : self.ano,
            'cor'         : self.placa,
            'opcional'    : self.opcional,
            'valor'       : self.valor,
            'foto'       : self.foto

        }
    
    codigo       = db.Column(db.Integer, primary_key=True, nullable=False, unique=True)
    descricao    = db.Column(db.String(100))
    codcategoria = db.Column(db.Integer(10))
    codmodelo    = db.Column(db.Integer(10))
    ano          = db.Column(db.Integer(10))
    cor          = db.Column(db.String(100))
    placa        = db.Column(db.Integer(10))
    opcional     = db.Column(db.String(100))
    valor        = db.Column(db.Integer(100))
    foto         = db.Column(db.String(100))

    def __init__(self, codigo, descricao, codcategoria, codmodelo, ano, cor, placa, opcional, valor, foto):
        self.codigo       = codigo
        self.descricao    = descricao
        self.codcategoria = codcategoria
        self.codmodelo    = codmodelo
        self.ano          = ano
        self.cor          = cor
        self.placa        = placa
        self.opcional     = opcional
        self.valor        = valor
        self.foto         = foto
