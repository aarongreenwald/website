from wsgiref.simple_server import make_server
from pyramid.config import Configurator
from pyramid.response import Response

def main(global_config, **settings):
    config = Configurator(settings=settings)
    config.include('pyramid_chameleon')
    
    config.add_route('home', '/')
    config.add_route('resume', '/resume')
    config.add_route('cv', '/cv')
    config.add_route('projects', '/projects')  

    config.add_route('blog', '/blog')
    config.add_route('blog-post', '/blog/{slug}')  
    config.add_route('blog-tag', '/blog/tag/{tag}')

    config.add_route('qr', '/qr')

    config.add_static_view('/static', 'resources', cache_max_age = 0) 

    def notfound(request):
        return Response('Not Found', status='404 Not Found')

    config.add_notfound_view(notfound)
    
    config.scan()  
    return config.make_wsgi_app()    