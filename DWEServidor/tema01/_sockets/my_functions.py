import time
import mylogger as ml
import socket

class MyFunctions:

    def __init__(self):
        pass


    def get_method(self, param):
        ml.logger.debug('Obteniendo Methodo de la solicitud')
        return param.decode('utf-8').split('\r\n')[0].split(' ')

    def get_head(self, extension_solicitada):
        ml.logger.debug('Obteniendo Cabecera html correcta')
        named_tuple = time.localtime()
        
        return 'HTTP/1.1 200 OK\r\nContent-Type: {}\r\nChartset: utf-8\r\nDate: {}\r\n\r\n'.format(self.content_type(extension_solicitada),
                                                                                                  time.strftime("%a, %d %b %Y %H:%M:%S", named_tuple))

    def especial_char(self, param):
        ml.logger.debug('Remplezando caracteres especiales')
        especiales={'%40':'@', '+':' '}

        # Toca optimizar al final
        for key in especiales.keys():
            if key in param:
                return param.replace(key, especiales[key])
        return param
    
    def get_local_ip(self):
        ml.logger.debug('Obteniendo Direccion io local')
        try:
            with socket.socket(socket.AF_INET, socket.SOCK_DGRAM) as s:
                s.connect(("8.8.8.8", 80))
                local_ip = s.getsockname()[0]
            return local_ip
        except Exception as e:
            return f"Error al obtener la IP local: {e}"

    @staticmethod  
    def content_type(ext):
        ml.logger.debug('Obteniendo Content-Type correcto para la solicitud')

        content = {
                '/': 'text/html',
                'aac': 'audio/aac',
                'abw': 'application/x-abiword',
                'arc': 'application/x-freearc',
                'avi': 'video/x-msvideo',
                'azw': 'application/vnd.amazon.ebook',
                'bin': 'application/octet-stream',
                'bmp': 'image/bmp',
                'bz': 'application/x-bzip',
                'bz2': 'application/x-bzip2',
                'csh': 'application/x-csh',
                'css': 'text/css',
                'csv': 'text/csv',
                'doc': 'application/msword',
                'docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                'eot': 'application/vnd.ms-fontobject',
                'epub': 'application/epub+zip',
                'gz': 'application/gzip',
                'gif': 'image/gif',
                'htm .html': 'text/html',
                'ico': 'image/vnd.microsoft.icon',
                'ics': 'text/calendar',
                'jar': 'application/java-archive',
                'jpeg': 'image/jpeg',
                'jpg': 'image/jpeg',
                'js': 'text/javascript',
                'json': 'application/json',
                'jsonld': 'application/ld+json',
                'mid': 'audio/midi',
                'midi': 'audio/x-midi',
                'mjs': 'text/javascript',
                'mp3': 'audio/mpeg',
                'mpeg': 'video/mpeg',
                'mpkg': 'application/vnd.apple.installer+xml',
                'odp': 'application/vnd.oasis.opendocument.presentation',
                'ods': 'application/vnd.oasis.opendocument.spreadsheet',
                'odt': 'application/vnd.oasis.opendocument.text',
                'oga': 'audio/ogg',
                'ogv': 'video/ogg',
                'ogx': 'application/ogg',
                'opus': 'audio/opus',
                'otf': 'font/otf',
                'png': 'image/png',
                'pdf': 'application/pdf',
                'php': 'application/php',
                'ppt': 'application/vnd.ms-powerpoint',
                'pptx': 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
                'rar': 'application/vnd.rar',
                'rtf': 'application/rtf',
                'sh': 'application/x-sh',
                'svg': 'image/svg+xml',
                'swf': 'application/x-shockwave-flash',
                'tar': 'application/x-tar',
                'tif .tiff': 'image/tiff',
                'ts': 'video/mp2t',
                'ttf': 'font/ttf',
                'txt': 'text/plain',
                'vsd': 'application/vnd.visio',
                'wav': 'audio/wav',
                'weba': 'audio/webm',
                'webm': 'video/webm',
                'webp': 'image/webp',
                'woff': 'font/woff',
                'woff2': 'font/woff2',
                'xhtml': 'application/xhtml+xml',
                'xls': 'application/vnd.ms-excel',
                'xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                'xul': 'application/vnd.mozilla.xul+xml',
                'zip': 'application/zip',
                '3gp': "video/3gpp",
                '3g2': "video/3gpp2",
                '7z': 'application/x-7z-compressed',
                'md': 'text/markdown'
                }
        try: 
            return content[ext]
        except KeyError:
            ml.logger.debug('Nueva Content-Type no codificado: {}'.format(ext))
            


