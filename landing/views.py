from pyramid.renderers import get_renderer
from pyramid.response import Response
from pyramid.view import view_config

def layout():
    renderer = get_renderer("common/layout.pt")
    layout = renderer.implementation().macros['layout']
    return layout

@view_config(renderer="pages/home.pt", route_name="home")
def home(request):    
    return {"layout": layout(),
            "description": "Aaron Greenwald is a software developer in the Washington, DC area. This is his personal website.",
            "title": "Home"}

@view_config(renderer="pages/resume.pt", route_name="resume")
def resume(request):    
    return {"layout": layout(),
            "description": "Aaron Greenwald's resume/professional bio - software developer.",
            "title": "Resume"}
            
@view_config(renderer="pages/projects.pt", route_name="projects")
def projects(request):    
    return {"layout": layout(),
            "description": "Aaron Greenwald's software projects",
            "title": "Projects"}            

@view_config(renderer="pages/qr.pt", route_name="qr")
def qr(request):    
    return {}     
