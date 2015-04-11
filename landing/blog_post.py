class BlogPost(object):
    """docstring for BlogPost"""
    def __init__(self, slug):
        super(BlogPost, self).__init__()
        self.slug = slug

    def load(self, *args):
        """"pass in True to truncate the content"""
        try:
            with open('./blog/' + self.slug) as f:
                self.title = f.readline()
                self.date = f.readline()
                self.tags = f.readline()
                if len(args) and args[0]:
                    self.content = f.read(300)
                else:
                    self.content = f.read()               
        except IOError as e:
            print(e)
            raise NotFound
        return self
