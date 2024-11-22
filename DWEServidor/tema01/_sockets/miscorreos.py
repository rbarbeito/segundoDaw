import smtplib, ssl, os
from dotenv import load_dotenv
import mylogger as ml

from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

load_dotenv()


class Email:
    __instance=None
    __PASSWORD=os.getenv('PASSWORD')
    __SENDER=os.getenv('SENDER')

    
    def __new__(cls, HOST='smtp.gmail.com', PORT='465' ):
        if cls.__instance is None:
            cls.__instance = super(Email, cls).__new__(cls)
            cls.__instance.server = cls._create_configuration(HOST, PORT)
            
        return cls.__instance


    @staticmethod
    def _create_configuration(HOST, PORT):

        context = ssl.create_default_context()
        server =  smtplib.SMTP_SSL(HOST, PORT, context=context)
               
        return server


    def send_email(self, destinatario, asunto, mensaje='Mensaje predefinido'):
        ml.logger.info('Se envio mensaje de correo a {}'.format(destinatario))

        
        message=MIMEMultipart('alternative')

        message['Subject']=asunto
        message['From']= self.__SENDER
        message['To'] = destinatario

        parte1=MIMEText( mensaje ,'html', 'utf-8')

        message.attach(parte1)
        
        self.server.login(self.__SENDER, self.__PASSWORD)
        self.server.sendmail(self.__SENDER, destinatario, message.as_string())
        self.server.close()



if __name__=='__main__':

    email = Email()
    email.send_email('rbarbeito@gmail.com','test de la Clase Email', 'Test satisfactorio de la clase Email')
    print('correo enviado')
