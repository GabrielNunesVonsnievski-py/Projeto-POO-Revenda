from flask import request, render_template
from database.db import db
from models.usuario import usuario

def usuario_controller():
        if request.method == 'POST':
            try:
                 data = request.get_json()
                 user = usuario(data['nome'], data['login'], data['senha'])
                 print(user)
                 db.session.add(user)
                 db.session.commit()
                 return {"message": 'Usuario criado com sucesso'}, 200
            except Exception as e:
                 return {"message": 'O usuario nao foi criado. ERRO: {}'.format(e)}, 405
            
        elif request.method == 'GET':
            try:
                data = usuario.query.all()
                print(data)
                return {'usuario':[usuario.to_dict() for usuario in data]}
                return render_template('usuario.html',data={'usuario':[usuario.to_dict() for usuario in data]})
            
            except Exception  as e:
                 return {'O usuario nao foi buscado. ERRO: {}'.format(e)}, 405
            
        elif request.method == 'PUT':
             try:
                  data = request.get_json()
                  put_usuario_id = data['id']
                  put_usuario = usuario.query.get(put_usuario_id)
                  if put_usuario is None:
                       return {'error': 'usuario não encontrado'}, 404
                  put_usuario.nome = data.get('nome', put_usuario.nome)
                  put_usuario.email = data.get('login', put_usuario.login)
                  put_usuario.senha = data.get('senha', put_usuario.senha)
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
                  return 'usuario deletado com sucesso',200
             except Exception as e:
                  return {'error': 'erro ao deletar usuario. Erro{}' .format(e)}, 400
     