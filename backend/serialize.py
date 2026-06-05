import eml_parser
import datetime
import json

def serialize(obj):
  if isinstance(obj, datetime.datetime):
    return obj.isoformat()
  raise TypeError("Object of type {} is not JSON serializable".format(type(obj).__name__))

ep = eml_parser.EmlParser(include_raw_body=True, include_attachment_data=True)

def parse_email(eml_bytes):
    with open(eml_bytes, 'rb') as f:
        raw = ep.decode_email_bytes(f.read())
    return raw

raw_email = parse_email('sample.eml')

# print(json.dumps(raw_email, default=serialize, indent=2))

message_id = raw_email.get('header', {}).get('header', {}).get('message-id', '')
subject = raw_email.get('header', {}).get('subject', '')
date = raw_email.get('header', {}).get('date', '')
from_ = raw_email.get('header', {}).get('from', '')
to = raw_email.get('header', {}).get('to', '')
body_text = raw_email.get('body', {})[0].get('content', '')
body_html = raw_email.get('body', {})[1].get('content', '')

# print(message_id)
# print(subject)
# print(date)
# print(from_)
# print(to)
print(body_text)
print(body_html)

# message id
# subject
# date (utc)
# from
# to
# body (text and html)
# attachments