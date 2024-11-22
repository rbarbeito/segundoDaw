import logging, os
from logging.handlers import RotatingFileHandler
from dotenv import load_dotenv

load_dotenv()

level = os.getenv('LEVEL')


if not os.path.exists("./logs"):
    os.makedirs('logs')

logger = logging.getLogger(__name__)
logger.setLevel(10)
formatter = logging.Formatter("%(asctime)s - %(levelname)s - %(message)s",
                            datefmt="%Y-%m-%d %H:%M",
                            )




console_handler = logging.StreamHandler()
console_handler.setLevel('ERROR')
logger.addHandler(console_handler)


rotate_handler = RotatingFileHandler(filename='./logs/log.out',
                              maxBytes=5000000,
                              backupCount=3)

rotate_handler.setLevel(level) #'DEBUG'
rotate_handler.setFormatter(formatter)
logger.addHandler(rotate_handler)


##file_handler = logging.FileHandler("logs/log_a.out", mode="a", encoding="utf-8")
##file_handler.setLevel(10)
##file_handler.setFormatter(formatter)
##logger.addHandler(file_handler)






if __name__ == "__main__":
    
    logger.info("Watch out - info!")
    logger.debug("Watch out - debug!")
    logger.warning("Watch out - warning!")
    logger.error("Watch out - error!")
    logger.critical("Watch out - critical!")
