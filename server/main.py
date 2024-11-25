from flask import Flask
from flask_cors import CORS
from routes import register_routes
from s3 import s3_client
from dotenv import load_dotenv

load_dotenv()


app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": ["http://localhost:5173", "http://localhost:5174" ]}})
s3_client_instance = s3_client()
register_routes(app, s3_client_instance)

@app.route('/')
def index():
    return "It works with Flaskkkkk!"

application = app

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
