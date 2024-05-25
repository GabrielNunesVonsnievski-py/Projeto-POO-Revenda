from flask import request, render_template
from database.db import db
from sqlalchemy import ForeignKey
from models.modelo import modelo

def modelo_controller():
        if request.method == 'POST':
            try:
                 data = request.get_json()
                 print(data)
                 user = modelo(data['codigo'], data['nome'], data['codmarca'])
                 db.session.add(user)
                 db.session.commit()
                 return 'Modelo criado com sucesso', 200
            except Exception as e:
                 return 'O Modelo nao foi criado', 405
            
        elif request.method == 'GET':
            try:
                data = modelo.query.all()
                return render_template('modelo.html',data={'modelo':[modelo.to_dict() for modelo in data]})
            
            except Exception  as e:
                 return 'Não foi possivel buscar modelos', 405
            
        elif request.method == 'PUT':
             try:
                  data = request.get_json()
                  put_modelo_id = data['id']
                  put_modelo = modelo.query.get(put_modelo_id)
                  if put_modelo is None:
                       return {'error': 'modelo não encontrado'}, 404
                  put_modelo.codigo = data.get('codigo', put_modelo.codigo)
                  put_modelo.nome = data.get('nome', put_modelo.nome)
                  put_modelo.codmarca = data.get('codmarca', put_modelo.codmarca)
                  print(put_modelo.codigo, put_modelo.nome, put_modelo.codmarca)
                  db.session.commit()
                  return 'modelo atualizado com sucesso',200
             except Exception as e:
                  return {'error': 'erro ao atualizar modelo. Erro{}' .format(e)}, 400
             
        elif request.method == 'DELETE':
             try:
                  data = request.get_json()
                  delete_modelo_id = data['id']
                  delete_modelo = modelo.query.get(delete_modelo_id)
                  if delete_modelo is None:
                       return {'error': 'modelo não encontrado'}, 404
                  db.session.delete(delete_modelo)
                  db.session.commit()
                  return 'modelo atualizado com sucesso',200
             except Exception as e:
                  return {'error': 'erro ao atualizar modelo. Erro{}' .format(e)}, 400
     