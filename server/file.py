import os
import shutil
import fitz

def save_file(file, file_name):
    with open(file_name, 'wb') as f:
        f.write(file.read())
        documents_dir = 'server/documents'

    if not os.path.exists(documents_dir):
        os.makedirs(documents_dir)
    shutil.move(file_name, os.path.join(documents_dir, file_name))


def extract_text(path):
    pdf_document = fitz.open(f'server/documents/{path}')
    pdf_text = ""
    for page_num in range(pdf_document.page_count):
        page = pdf_document[page_num]
        pdf_text += page.get_text()
    return pdf_text