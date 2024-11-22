from flask import request
from .s3 import get_s3_file
from .file import save_file, extract_text

def register_routes(app, s3_client_instance):
    @app.route('/')
    def hello_world():
        return 'Hello, World!'
    
    @app.route('/about')
    def about():
        return 'About page'
    
    @app.route('/prompt', methods=['POST'])
    def prompt():
        data = request.json
        file_path = data['file']
        prompt = data['prompt']
        
        file = get_s3_file(file_path, s3_client_instance)
        save_file(file, file_path)
        extract_text(file_path)


        print('data', data)
        return 'Prompt page'