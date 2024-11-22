import sqlite3
import mylogger as ml


class ConexionSQLite:


    def __init__(self):
        self.__conn = sqlite3.connect('usuarios.db')
        self.__cursor = self.__conn.cursor()
        self.create_table()
        

    def create_table(self):
        test = self.__cursor.execute('''CREATE TABLE IF NOT EXISTS usuarios(
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                nombre TEXT NOT NULL,
                email TEXT NOT NULL UNIQUE
                )''')
        self.__conn.commit()
##        print('Tabla creada correctamente')

    def insert_data(self, nombre, email):
        ml.logger.debug('Insertando usuario en la base de datos')
        try:
            self.__cursor.execute('''
                    INSERT INTO usuarios (nombre, email)  VALUES (?,?)
                    ''',(nombre, email))
            self.__conn.commit()
##            print('Datos insertados correctamente...{} {}'.format(nombre,email))
            return True
            
        except sqlite3.IntegrityError:
##            print('No pueden existir correos duplicados')
            
            ml.logger.error('Intento de correo duplicado.. {}'.format(email))
            return False
        
        except Exception as e:
            ml.logger.warning('Error inesperado.. {}'.format(e))
            

    def insert_bulk(self, bulk):
        ml.logger.debug('Uso de la carga masiva de usuarios')
        for tupla in bulk:
            nombre, email = tupla
            self.insert_data(nombre,email)
            

    def select_all(self):
        ml.logger.debug('Busqueda masiva de todos los usuarios')
        self.__cursor.execute('''
                SELECT * FROM usuarios
                ''')
        return self.__cursor.fetchall()

    def select_by_email(self, email):
        ml.logger.debug('Busqueda usuario por correo')
        self.__cursor.execute('''
            SELECT * FROM usuarios WHERE email = ?
            ''', (email,))
        return self.__cursor.fetchall()
        

    

    def __del__(self):
        self.__conn.close()
        
     

if __name__ == "__main__":

    conn = sqlite3.connect('usuarios.db')
    cursor=conn.cursor()
    
    cursor.execute('''
                SELECT * FROM usuarios
                ''')

    for row in cursor.fetchall():
        print(row)

    conn.close()
