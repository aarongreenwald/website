
from pyramid.events import NewRequest
from pyramid.events import subscriber
import csv
import datetime


class UserAccess():

    def __init__(self, user, method, url, query_string, body):
        self.method = method
        self.url = url
        self.user = user
        self.query_string = query_string
        self.body = body
        
    def __str__(self):
        return self.method + ' - ' + self.url

    def csvlog(self):        
        with open('user_access.csv', 'a') as f:
            log = csv.writer(f, delimiter=',')
            data = [[unicode(datetime.datetime.now()), self.user, self.method, self.url, self.query_string, self.body]]
            log.writerows(data)

@subscriber(NewRequest)
def log_user_access(event):
    request = event.request
    #ignore request types that are redundant
    if (request.path[-4:] != '.css' 
            and request.path[-3:] != '.js'
            and request.path[-4:] != '.otf'
            and request.path[-4:] != '.png'
            and request.path[-4:] != '.ico'):
        user_access = UserAccess(request.client_addr, request.method, request.path, request.query_string, request.body) #client_addr?
        user_access.csvlog()