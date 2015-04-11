from pyramid.renderers import get_renderer
from pyramid.response import Response
from pyramid.view import view_config
from pyramid.exceptions import NotFound
import os
from blog_post import BlogPost

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

#This function returns the skeleton object to return 
#as part of the various blog views
def blog_data():
    return {"layout": layout(),
            "description": "Aaron Greenwald's software blog",
            "title": "Blog",
            "post": {
                   "title": "",
                   "date": "",
                   "content":""
                },
            "post_list": []
   }
        

@view_config(renderer="pages/blog.pt", route_name="blog")
def blog(request):    
    result = blog_data() 
    #this is ok for now, but isn't scalable. We'll need to prepare this data in advance
    posts = [f for f in os.listdir('./blog') if os.path.isfile(os.path.join('./blog',f))]
    for post in posts:
        result['post_list'].append(BlogPost(post).load(True))   
    result['post_list'].sort(key=lambda x: x.date, reverse=True)
    return result
           
@view_config(renderer="pages/blog.pt", route_name="blog-post")
def blog_post(request):    
    result = blog_data()
    result['post'] = BlogPost(request.matchdict['slug']).load()
    result['title'] = result['post'].title
    return result

@view_config(renderer="pages/qr.pt", route_name="qr")
def qr(request):    
    return {}     
