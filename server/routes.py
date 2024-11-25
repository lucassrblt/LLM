from flask import request
from s3 import get_s3_file
from file import save_file, extract_text
from ollama import ollama_interaction

def register_routes(app, s3_client_instance):

    @app.route('/', methods=['GET'])
    def hello():
        return 'Hello, World!'
    
    @app.route('/prompt', methods=['POST'])
    def prompt():
        data = request.json
        file_path = data['file']
        question = data['question']

        if not file_path:
            response = ollama_interaction("", question)
        else:
            file = get_s3_file(file_path, s3_client_instance)
            save_file(file, file_path)
            text = extract_text(file_path)
            response = ollama_interaction(text, question)
        return response

