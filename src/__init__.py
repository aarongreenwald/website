from wsgiref.simple_server import make_server
from pyramid.config import Configurator

def main():
    config = Configurator()
    config.include('pyramid_chameleon')
    config.add_route('home', '/')
    config.add_route('resume', '/resume')
    config.add_route('projects', '/projects')  
    config.add_route('qr', '/qr')  
    config.add_static_view('/static', 'resources', cache_max_age = 0) 
    config.scan('views')  
    
    app = config.make_wsgi_app()
    return app

if __name__ == '__main__':
    app = main()
    server = make_server('0.0.0.0', 6547, app)
    print ('Starting up server on http://localhost:6547')
    server.serve_forever()
