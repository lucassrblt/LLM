from flask import request

def register_routes(app):
    @app.route('/')
    def hello_world():
        return 'Hello, World!'
    
    @app.route('/about')
    def about():
        return 'About page'
    
    @app.route('/prompt', methods=['POST'])
    def prompt():
        data = request.json
        print('data', data)
        return 'Prompt page'