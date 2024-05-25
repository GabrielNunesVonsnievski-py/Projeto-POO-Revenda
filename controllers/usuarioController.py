from flask import request, render_template
from database.db import db
from models.usuario import usuario

def usuario_controller():
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
            
        elif request.method == 'PUT':
             try:
                  data = request.get_json()
                  put_usuario_id = data['id']
                  put_usuario = usuario.query.get(put_usuario_id)
                  if put_usuario is None:
                       return {'error': 'usuario não encontrado'}, 404
                  put_usuario.nome = data.get('nome', put_usuario.nome)
                  put_usuario.email = data.get('email', put_usuario.email)
                  print(put_usuario.codigo, put_usuario.nome, put_usuario.login, put_usuario.senha)
                  db.session.commit()
                  return 'usuario atualizado com sucesso',200
             except Exception as e:
                  return {'error': 'erro ao atualizar usuario. Erro{}' .format(e)}, 400
             
        elif request.method == 'DELETE':
             try:
                  data = request.get_json()
                  delete_usuario_id = data['id']
                  delete_usuario = usuario.query.get(delete_usuario_id)
                  if delete_usuario is None:
                       return {'error': 'usuario não encontrado'}, 404
                  db.session.delete(delete_usuario)
                  db.session.commit()
                  return 'usuario atualizado com sucesso',200
             except Exception as e:
                  return {'error': 'erro ao atualizar usuario. Erro{}' .format(e)}, 400
     