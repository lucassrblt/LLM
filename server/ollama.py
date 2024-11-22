import ollama

def ollama_interaction(text, question):
    client = ollama.Client()
    model = "llama3:latest"
    if text == "":
        prompt = f"Question: {question}\nRéponse:"
    else :
        prompt = f"Texte: {text}\nQuestion: {question}\nRéponse:"
    result = client.generate(model=model, prompt=prompt)
    return result['response']