from wsgiref.simple_server import make_server
from pyramid.config import Configurator

def main(global_config, **settings):
    config = Configurator(settings=settings)
    config.include('pyramid_chameleon')
    config.add_route('home', '/')
    config.add_route('resume', '/resume')
    config.add_route('projects', '/projects')  
    config.add_route('qr', '/qr')  
    config.add_static_view('/static', 'resources', cache_max_age = 0) 
    config.scan('views')  
    
    return config.make_wsgi_app()    
