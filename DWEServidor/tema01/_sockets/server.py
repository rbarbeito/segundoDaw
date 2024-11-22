from database import ConexionSQLite
import socket, os, os.path
import mylogger as ml
from my_functions import MyFunctions
from miscorreos import Email

mf = MyFunctions()
db = ConexionSQLite()
m_email = Email()


HOST='0.0.0.0'
PORT=65432

with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:

    s.bind((HOST, PORT))
    s.listen(10)

    
    print('{}> Esperando conexiones...'.format(os.getpid()))

    while True:

        conn,addr=s.accept()
        ml.logger.debug('Cliente conectado desde ... {} '.format(addr))

        with conn:

            data = conn.recv(1024)
            solicitud = mf.get_method(data)
            metodo, pagina, protocolo = solicitud
            ext_solicitada =  pagina.split('.')[-1]
                          
            if metodo=='GET':

                head_response = mf.get_head(ext_solicitada)

                if ext_solicitada == '/':
                   
                    contenido=''
                    with open('./htmls/index.html','r', encoding='utf-8') as f:
                        contenido = f.read()

                    html = head_response + contenido

                    conn.sendall(html.encode())
                    
                elif  ext_solicitada in ['js', 'css']:
                    
                    contenido=''
                    with open('./htmls/{}'.format(pagina), 'r', encoding='utf-8') as f:
                        contenido = f.read()
                        
                    html = head_response + contenido
                    conn.sendall(html.encode())



                elif  ext_solicitada in ['bmp', 'jpeg', 'png', 'webp', 'gif', 'ico']:

                    imagen=b''
                    try:
                        with open('./htmls{}'.format(pagina), 'rb') as f:
                            imagen=f.read()
                    except FileNotFoundError:
                        ml.logger.error('Error 404: Archivo no encontrado {}'.format(pagina.split('/')[-1]))
                        html_head = 'html/1.1 404 Archivo no encontrado {}'.format(pagina.split('/')[-1])
                    except Exception as e:
                        ml.logger.debug('Nuevo error {}'.format(e), exc_info=True)

                    add_length=head_response.split('\r\n')[:-2]
                    add_length.append('Content-Length: {}'.format(len(imagen)))
                    head_response = '\r\n'.join(add_length) + '\r\n\r\n'
                                          
                    html = bytes(head_response,'utf-8') + imagen
                    conn.sendall(html)
                    
                else:
                    ml.logger.warning(
                        'Solicitu de recurso desconocido por el server {}'. format(ext_solicitada))
                    
                    pass
                    

              

            elif metodo == 'POST':

                if pagina == '/registro':

                    datos_formulario = data.decode('utf-8').split('\r\n')[-1].split('&')
                    name  = mf.especial_char(datos_formulario[0].split('=')[-1])
                    email = mf.especial_char(datos_formulario[1].split('=')[-1])
                    

                    if len(name) == 0:
                        ml.logger.error('El campo nombre esta vacio')
                    elif len(email) == 0:
                        ml.logger.error('El campo email esta vacio')
                    else:
                        if not db.insert_data(name,email):
                            msg='''HTTP/1.1 200 OK\r\nContent-Type: text/html\r\nServer: Apache\r\n\r\n
                            <!DOCTYPE html>
                                <html lang="en">
                                <head>
                                    <meta charset="UTF-8">
                                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                                <title>Document</title>
                                </head>
                                <body>
                                    {}
                                </body>
                                </html>
                            '''.format('<h1>SO cabrón los datos estan mal</h1>')
                            conn.sendall(msg.encode('utf-8'))
                        else:

                            email_content=''
                            with open('./htmls/welcome.html','r', encoding='utf-8') as f:
                                email_content=f.read()
                                
                            hostname = mf.get_local_ip()
                            
                            email_content=email_content.replace('{nombre}', name)
                            email_content = email_content.replace('{server_host}',
                                                                  'https://codeqba.com/sockets/'.format(hostname,PORT))

                            

                            try:
                                m_email.send_email(email, 'Bienvenido al sistema', email_content)
                            except Exception as e:
                                ml.logger.debug('Error enviado mensaje: {}'.format(e), exc_info=True)

                            try:
                                
                                web= 'HTTP/1.1 200 OK\r\nContent-Type: text/html\r\n\r\n{}'.format(email_content)
                                conn.sendall(web.encode('utf-8'))
                            except Exception as e:
                                ml.logger.debug('Error pagina de confirmacion{}'.format(e), exc_info=True)

            

            

            else:
                print(data.decode('utf-8'))


            
        


        
