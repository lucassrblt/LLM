from __init__ import create_app

app, _ = create_app()

if __name__ == '__main__':
    app.run(debug=True)