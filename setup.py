from setuptools import setup

requires = [
    'pyramid',
    'pyramid_chameleon'
]

setup(name='landing',
      install_requires=requires,
      entry_points="""\
      [paste.app_factory]
      main = landing:main
      """,
)
