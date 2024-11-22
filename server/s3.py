import boto3
import os

def s3_client():
    aws_access_key_id = os.getenv('AWS_ACCESS_KEY_ID', '')
    aws_secret_access_key = os.getenv('AWS_SECRET_ACCESS_KEY', '')
    s3_client = boto3.client('s3', aws_access_key_id=aws_access_key_id, aws_secret_access_key=aws_secret_access_key)
    return s3_client


def get_s3_file(document_name, client):
    response = client.get_object(Bucket='privategpt-docs', Key=document_name)
    return response['Body']