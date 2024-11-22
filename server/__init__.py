from flask import Flask
from .routes import register_routes
from .s3 import s3_client
from dotenv import load_dotenv

load_dotenv()

def create_app():
    app = Flask(__name__)
    s3_client_instance = s3_client()
    register_routes(app, s3_client_instance)
    
    return app, s3_client_instance