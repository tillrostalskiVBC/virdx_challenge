from requests import Session


def get_http_session():
    session = Session()
    try:
        yield session
    finally:
        session.close()
